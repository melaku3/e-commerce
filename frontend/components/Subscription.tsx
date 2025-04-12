"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Loader2, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Subscription() {
    const [mounted, setMounted] = useState(false)
    const [email, setEmail] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        setError(null)

        if (!email) return setError("Please enter your email address")
        if (!validateEmail(email)) return setError("Please enter a valid email address")

        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500))
            setIsSuccess(true)
            setEmail("")
            setTimeout(() => setIsSuccess(false), 3000)
        } catch (error) {
            console.error("Subscribe error:", error)
            setError("Failed to subscribe. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative overflow-hidden rounded-lg border bg-background p-8 shadow-md">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative flex flex-col items-center space-y-8">
                <div className="flex flex-col space-y-3 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">Stay in the loop</h2>
                    <p className="max-w-md text-muted-foreground">
                        Subscribe to our newsletter to receive updates, exclusive offers, and the latest news directly in your inbox.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col sm:flex-row items-center gap-3">
                    <div className="relative w-full">
                        <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className={cn("pr-4 py-6 text-base", error ? "border-destructive focus-visible:ring-destructive" : "")} disabled={isLoading || isSuccess} aria-label="Email address" aria-invalid={!!error} aria-describedby={error ? "email-error" : undefined} />
                        {error && (
                            <p id="email-error" className="mt-1 text-sm text-destructive sm:absolute -bottom-6 left-0">
                                {error}
                            </p>
                        )}
                    </div>

                    <Button type="submit" className="w-full sm:w-auto py-6 px-8" disabled={isLoading || isSuccess}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Subscribing...
                            </>
                        ) : isSuccess ? (
                            <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Subscribed!
                            </>
                        ) : (
                            "Subscribe"
                        )}
                    </Button>
                </form>

                <p className="text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
            </div>
        </div>
    )
}
