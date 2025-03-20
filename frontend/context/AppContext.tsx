"use client";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
    theme: string;
    user: ReturnType<typeof useUser>['user'];
    isSignedIn: ReturnType<typeof useUser>['isSignedIn'];
    setTheme: (theme: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState('light');
    const { user, isSignedIn } = useUser();
    const value = { theme, setTheme, user, isSignedIn };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}
