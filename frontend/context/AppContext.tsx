"use client"

import { useUser } from "@clerk/nextjs"
import { createContext, useContext, type ReactNode } from "react"
import { slides as initialSlides } from "@/public/assets"


// Define the context type 
interface AppContextType {
    // User
    user: ReturnType<typeof useUser>["user"]
    isSignedIn: boolean

    // Content
    slides: typeof initialSlides
}

// Create context 
const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
    children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {

    // Get user from Clerk
    const { user, isSignedIn } = useUser()

    // Context value
    const value: AppContextType = {
        user,
        isSignedIn: !!isSignedIn,
        slides: initialSlides,
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider")
    }
    return context
}

