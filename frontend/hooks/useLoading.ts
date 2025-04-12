"use client"

import { useState, useCallback } from "react"

export function useLoading(initialState = false) {
    const [isLoading, setIsLoading] = useState(initialState)

    const startLoading = useCallback(() => {
        setIsLoading(true)
    }, [])

    const stopLoading = useCallback(() => {
        setIsLoading(false)
    }, [])

    // Utility to wrap async functions with loading state
    const withLoading = useCallback(
        <T extends (...args: any[]) => Promise<any>>(fn: T): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
            return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
                try {
                    startLoading()
                    const result = await fn(...args)
                    return result
                } finally {
                    stopLoading()
                }
            }
        },
        [startLoading, stopLoading],
    )

    return { isLoading, setIsLoading, startLoading, stopLoading, withLoading, }
}

