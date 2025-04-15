"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"
import { useEffect } from "react"
import type { Product, CartItem, CartSummary } from "@/types/api"

// Types


// Constants
const TAX_RATE = 0.0725 // 7.25%
const SHIPPING_RATE = 5.99
const CART_STORAGE_KEY = "ecommerce-cart"

// Helper functions
const getStoredCart = (): CartItem[] => {
    if (typeof window === "undefined") return []

    try {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY)
        return storedCart ? JSON.parse(storedCart) : []
    } catch (error) {
        console.error("Failed to parse cart from localStorage", error)
        return []
    }
}

const storeCart = (items: CartItem[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

const calculateSummary = (items: CartItem[]): CartSummary => {
    const itemCount = items.reduce((count, item) => count + item.quantity, 0)
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
    const shipping = items.length > 0 ? SHIPPING_RATE : 0
    const tax = Number((subtotal * TAX_RATE).toFixed(2))
    const total = subtotal + shipping + tax

    return { subtotal, shipping, tax, total, itemCount }
}

// API functions for server sync
const syncCartWithServer = async (userId: string, items: CartItem[]): Promise<CartItem[]> => {
    // This would be an actual API call in production
    // For now, we'll simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return items
}

const fetchCartFromServer = async (userId: string): Promise<CartItem[]> => {
    // This would be an actual API call in production
    // For now, we'll return the local cart
    await new Promise((resolve) => setTimeout(resolve, 300))
    return getStoredCart()
}

/**
 * Hook for managing cart state and operations using React Query
 * This hook can be used directly in components without a context provider
 */
export function useCart() {
    const queryClient = useQueryClient()
    const { user, isSignedIn } = useUser()
    const userId = user?.id

    // Fetch cart data
    const { data: items = [], isLoading, refetch } = useQuery({
        queryKey: ["cart", userId],
        queryFn: async () => {
            // For authenticated users, fetch from API
            if (isSignedIn && userId) {
                return fetchCartFromServer(userId)
            }
            // For guests, use localStorage
            return getStoredCart()
        },
        initialData: getStoredCart,
    })

    // Sync with server when user signs in
    useEffect(() => {
        if (isSignedIn && userId) {
            refetch()
        }
    }, [isSignedIn, userId, refetch])

    // Update cart mutation
    const updateCartMutation = useMutation({
        mutationFn: async (newItems: CartItem[]) => {
            // Always store in localStorage for guests and as backup
            storeCart(newItems)

            // If user is signed in, sync with server
            if (isSignedIn && userId) {
                return syncCartWithServer(userId, newItems)
            }

            return newItems
        },
        onSuccess: (newItems) => {
            queryClient.setQueryData(["cart", userId], newItems)
        },
    })

    // Add to cart
    const addToCart = (product: Product, options: { quantity: number; color?: string | null; size?: string | null }) => {
        const { quantity, color, size } = options

        if (!product._id || quantity <= 0 || product.countInStock <= 0) {
            toast.error("Cannot add product to cart", {
                description: "Invalid product or out of stock",
            })
            return
        }

        const existingItemIndex = items.findIndex(
            (item) => item.productId === product._id && item.color === color && item.size === size,
        )

        let newItems: CartItem[]

        if (existingItemIndex >= 0) {
            // Item already exists, update quantity
            newItems = [...items]
            const existingItem = newItems[existingItemIndex]
            const newQuantity = existingItem.quantity + quantity

            // Check if new quantity exceeds stock
            if (newQuantity > product.countInStock) {
                toast.error(`Only ${product.countInStock} available in stock`)
                newItems[existingItemIndex].quantity = product.countInStock
            } else {
                newItems[existingItemIndex].quantity = newQuantity
                toast.success(`Updated quantity`, {
                    description: `${product.name} (${newQuantity})`,
                })
            }
        } else {
            // Add new item
            const newItem: CartItem = {
                _id: `${product._id}_${color || "default"}_${size || "default"}_${Date.now()}`,
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images?.[0] || "",
                quantity,
                color: color || null,
                size: size || null,
                countInStock: product.countInStock,
            }

            newItems = [...items, newItem]
            toast.success(`Added to cart`, { description: `${product.name} (${quantity})` })
        }

        updateCartMutation.mutate(newItems)
    }

    // Update quantity
    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id)
            return
        }

        const itemIndex = items.findIndex((item) => item._id === id)
        if (itemIndex === -1) return

        const item = items[itemIndex]
        let newQuantity = quantity

        // Check if quantity exceeds stock
        if (quantity > item.countInStock) {
            toast.error(`Only ${item.countInStock} available in stock`)
            newQuantity = item.countInStock
        }

        const newItems = [...items]
        newItems[itemIndex].quantity = newQuantity
        updateCartMutation.mutate(newItems)
    }

    // Remove from cart
    const removeFromCart = (id: string) => {
        const item = items.find((item) => item._id === id)
        if (item) {
            toast.success(`Removed from cart`, {
                description: item.name,
            })
        }

        const newItems = items.filter((item) => item._id !== id)
        updateCartMutation.mutate(newItems)
    }

    // Clear cart
    const clearCart = () => {
        updateCartMutation.mutate([])
        toast.success("Cart cleared")
    }

    // Calculate summary
    const summary = calculateSummary(items)

    return {
        // Cart state
        items, summary, isLoading, isSyncing: updateCartMutation.isPending,

        // Cart actions
        addToCart, updateQuantity, removeFromCart, clearCart
    }
}
