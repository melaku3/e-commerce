"use client"

import { useUser as useClerkUser } from "@clerk/nextjs"
import { useState, useCallback, useEffect } from "react"
import { apiClient } from "@/lib/apiClient"
import type { ILoggedUser } from "@/types/api"

type ApiError = { response?: { data?: { message?: string; exists?: boolean } } }

export function useUser() {
    const [loggedUser, setLoggedUser] = useState<ILoggedUser | null>(null)
    const { user, isSignedIn } = useClerkUser()
    const [isLoading, setIsLoading] = useState(true)
    const [isRegistered, setIsRegistered] = useState<boolean>(false)

    // Check if user exists in our backend
    const checkUserExists = useCallback(async (clerkUserId: string): Promise<boolean> => {
        try {
            const res = await apiClient.get<{ exists: boolean }>(`/auth/check-user/${clerkUserId}`)
            return res.data.exists
        }
        catch (error) {
            console.error("Error checking user:", (error as ApiError)?.response?.data?.exists)
            return false
        }
    }, [])

    // Register user in our backend
    const registerUser = useCallback(async (): Promise<void> => {
        if (!user) return
        try {
            const alreadyRegistered = await checkUserExists(user.id)
            setIsRegistered(alreadyRegistered)

            if (alreadyRegistered) return

            await apiClient.post("/auth/register", {
                clerkUserId: user.id,
                email: user.emailAddresses[0].emailAddress,
            })
            setIsRegistered(true)
        } catch (error) {
            console.error("Registration failed:", (error as ApiError)?.response?.data?.message)
        }
    }, [user, checkUserExists])

    // Fetch user data from the server
    const fetchUserData = useCallback(async () => {
        if (user) {
            try {
                const response = await apiClient.get<ILoggedUser>(`/auth/user/${user.id}`)
                setLoggedUser(response.data)
                setIsLoading(false)
            } catch (error) {
                setLoggedUser(null)
                setIsLoading(false)
                console.error("Error fetching user data:", error)
            }
        } else {
            setLoggedUser(null)
            setIsLoading(false)
        }
    }, [user])
    // Handle user registration and data fetching
    useEffect(() => {
        if (isSignedIn) {
            // First ensure the user is registered, then fetch their data
            const handleUserAuth = async () => {
                setIsLoading(true)
                if (!isRegistered) {
                    await registerUser()
                }
                await fetchUserData()
            }

            handleUserAuth()
        } else { setLoggedUser(null), setIsRegistered(false), setIsLoading(false) }
    }, [isSignedIn, isRegistered, registerUser, fetchUserData])

    return { loggedUser, isSignedIn: !!isSignedIn, refreshUserData: fetchUserData, isLoading, isAdmin: loggedUser?.role === "admin", isRegistered }
}
