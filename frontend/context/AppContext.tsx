"use client"

import { useUser } from "@clerk/nextjs"
import { createContext, useContext, useEffect, useState, useMemo, useCallback, type ReactNode } from "react"
import axios from "@/config/axios"
import type { IProduct } from "@/config/types"

interface AppContextType {
    // User
    user: ReturnType<typeof useUser>["user"]
    isSignedIn: boolean

    // Products
    products: IProduct[]
    setProducts: (products: IProduct[]) => void
    refreshProducts: () => Promise<void>

    // Loading
    loading: boolean
    setLoading: (loading: boolean) => void
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
    children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
    // State for products and loading
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(true)

    // Get user from Clerk
    const { user, isSignedIn } = useUser()

    // Fetch products from the server
    const fetchProducts = useCallback(async (): Promise<void> => {
        setLoading(true)
        try {
            const response = await axios.get<{ products: IProduct[] }>("/products")
            setProducts(response.data.products)
        } catch (error) {
            console.error("Error fetching products:", error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    const contextValue = useMemo(
        () => ({ user, isSignedIn: !!isSignedIn, products, setProducts, refreshProducts: fetchProducts, loading, setLoading, }),
        [user, isSignedIn, products, loading, fetchProducts]
    )

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider")
    }
    return context
}

