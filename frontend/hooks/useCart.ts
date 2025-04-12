"use client"

import { useState, useEffect, useCallback } from "react"
import { useApiClient, apiRequest } from "@/lib/apiClient"
import { useUser } from "@/hooks/useUser"
import { toast } from "sonner"
import type { Product, UseCartReturn, CartItem } from "@/types/api"

const DEFAULT_SHIPPING_RATE = 5.99
const DEFAULT_TAX_RATE = 0.0725

export function useCart(): UseCartReturn {
    const [items, setItems] = useState<CartItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSyncing, setIsSyncing] = useState(false)

    const apiClient = useApiClient()
    const { loggedUser: user, isSignedIn } = useUser()

    const summary = items.reduce(
        (acc, item) => {
            acc.subtotal += item.price * item.quantity
            acc.itemCount += item.quantity
            return acc
        },
        { subtotal: 0, shipping: items.length > 0 ? DEFAULT_SHIPPING_RATE : 0, tax: 0, total: 0, itemCount: 0 },
    )

    summary.tax = Number((summary.subtotal * DEFAULT_TAX_RATE).toFixed(2))
    summary.total = summary.subtotal + summary.shipping + summary.tax

    useEffect(() => {
        const loadCart = async () => {
            setIsLoading(true)
            try {
                if (isSignedIn && user) await fetchCartFromApi()
                else {
                    const local = localStorage.getItem("cart")
                    if (local) setItems(Array.isArray(JSON.parse(local)) ? JSON.parse(local) : [])
                }
            } catch (err) {
                toast.error("Failed to load your cart")
            } finally {
                setIsLoading(false)
            }
        }

        loadCart()
    }, [isSignedIn, user])

    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem("cart", JSON.stringify(items))
            if (isSignedIn && user) syncCartWithApi()
        }
    }, [items, isSignedIn, user])

    const fetchCartFromApi = useCallback(async () => {
        if (!isSignedIn || !user) return
        try {
            const res = await apiRequest<{ items: CartItem[] }>(apiClient, {
                url: "/api/v1/cart",
                method: "GET",
            })
            setItems(Array.isArray(res.items) ? res.items : [])
        } catch (err) {
            const local = localStorage.getItem("cart")
            if (local) setItems(JSON.parse(local))
        }
    }, [isSignedIn, user, apiClient])

    const syncCartWithApi = useCallback(async () => {
        if (!isSignedIn || !user) return
        try {
            setIsSyncing(true)
            await apiRequest(apiClient, {
                url: "/api/v1/cart",
                method: "PUT",
                data: { items },
            })
        } catch (_) { } finally {
            setIsSyncing(false)
        }
    }, [items, isSignedIn, user, apiClient])

    const addToCart = useCallback(
        (product: Product, options: { quantity: number; color?: string | null; size?: string | null }) => {
            const { quantity, color, size } = options
            if (!product._id || quantity <= 0 || product.countInStock <= 0) {
                toast.error("Invalid product or quantity")
                return
            }

            setItems((prev) => {
                const index = prev.findIndex(
                    (item) => item.productId === product._id && item.color === color && item.size === size,
                )

                if (index >= 0) {
                    const updated = [...prev]
                    const item = updated[index]
                    const total = item.quantity + quantity

                    if (total > product.countInStock) {
                        toast.error(`Only ${product.countInStock} available`)
                        updated[index].quantity = product.countInStock
                        return updated
                    }

                    updated[index].quantity = total
                    toast.success(`Updated quantity`, { description: `${product.name} (${total})` })
                    return updated
                }

                const newItem: CartItem = {
                    _id: `${product._id}_${color || "default"}_${size || "default"}_${Date.now()}`,
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.images?.[0] || "",
                    quantity,
                    color,
                    size,
                    countInStock: product.countInStock,
                }

                toast.success(`Added to cart`, { description: `${product.name} (${quantity})` })
                return [...prev, newItem]
            })
        },
        [],
    )

    const updateQuantity = useCallback((id: string, qty: number) => {
        if (qty <= 0) return removeFromCart(id)

        setItems((prev) => {
            const index = prev.findIndex((i) => i._id === id)
            if (index === -1) return prev

            const item = prev[index]
            if (qty > item.countInStock) {
                toast.error(`Only ${item.countInStock} available`)
                qty = item.countInStock
            }

            const updated = [...prev]
            updated[index].quantity = qty
            return updated
        })
    }, [])

    const removeFromCart = useCallback((id: string) => {
        setItems((prev) => {
            const item = prev.find((i) => i._id === id)
            if (item) toast.success(`Removed`, { description: item.name })
            return prev.filter((i) => i._id !== id)
        })
    }, [])

    const clearCart = useCallback(() => {
        setItems([])
        toast.success("Cart cleared")
    }, [])

    return { items, summary, addToCart, updateQuantity, removeFromCart, clearCart, isLoading, isSyncing }
}