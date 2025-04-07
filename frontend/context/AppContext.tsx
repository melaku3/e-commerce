"use client"

import { useUser } from "@clerk/nextjs"
import { createContext, useContext, useEffect, useState, useMemo, useCallback, type ReactNode } from "react"
import axios from "@/config/axios"
import type { IProduct } from "@/config/types"

interface ProductsResponse {
    page: number;
    totalPages: number;
    totalProducts: number;
    products: IProduct[];
}

interface ILoggedUser {
    _id: string;
    clerkUserId: string;
    email: string;
    role: string;
}

interface AppContextType {
    // User
    user: ReturnType<typeof useUser>["user"]
    loggedUser: ILoggedUser | null
    isSignedIn: boolean

    // Products
    products: IProduct[]
    setProducts: (products: IProduct[]) => void
    refreshProducts: (page?: number, limit?: number) => Promise<void>

    // Pagination
    currentPage: number
    totalPages: number
    totalProducts: number
    setCurrentPage: (page: number) => void
    productsPerPage: number
    setProductsPerPage: (count: number) => void

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
    const [loggedUser, setLoggedUser] = useState<ILoggedUser | null>(null)

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [totalProducts, setTotalProducts] = useState(0)

    // Get user from Clerk
    const { user, isSignedIn } = useUser()

    // Fetch products from the server
    const fetchProducts = useCallback(async (page: number = 1, limit: number = 10): Promise<void> => {
        setLoading(true)
        try {
            const response = await axios.get<ProductsResponse>(`/products?page=${page}&limit=${limit}`)
            setProducts(response.data.products)
            setTotalPages(response.data.totalPages)
            setTotalProducts(response.data.totalProducts)
            setCurrentPage(response.data.page)
        } catch (error) {
            console.error("Error fetching products:", error)
        } finally {
            setLoading(false)
        }
    }, [])

    // Fetch user data from the server
    const fetchUserData = useCallback(async () => {
        if (user) {
            try {
                const response = await axios.get<ILoggedUser>(`/auth/user/${user.id}`)
                setLoggedUser(response.data)
            } catch (error) {
                console.error("Error fetching user data:", error)
            }
        }
    }, [user]);

    useEffect(() => {
        fetchProducts(currentPage, productsPerPage)
    }, [fetchProducts, currentPage, productsPerPage])

    useEffect(() => {
        if (isSignedIn) {
            fetchUserData()
        }
    }, [isSignedIn, fetchUserData])

    const contextValue = useMemo(
        () => ({ user, loggedUser, isSignedIn: !!isSignedIn, products, setProducts, refreshProducts: fetchProducts, loading, setLoading, currentPage, totalPages, totalProducts, setCurrentPage, productsPerPage, setProductsPerPage }),
        [user, loggedUser, isSignedIn, products, loading, fetchProducts, currentPage, totalPages, totalProducts, productsPerPage]
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

