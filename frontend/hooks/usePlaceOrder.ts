"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { AxiosError } from "axios"
import { useApiClient, apiRequest } from "@/lib/apiClient"
import type { OrderPayload } from "@/types/api"

type ErrorResponse = {
    message: string
    errors?: Record<string, string[]>
}

export type OrderResponse = OrderPayload & {
    _id: string
    createdAt: string
    updatedAt: string
}

interface UsePlaceOrderOptions {
    onSuccess?: (data: OrderResponse) => void
}

/**
 * Custom hook for placing orders using React Query's useMutation
 * and the authenticated API client
 */
export function usePlaceOrder(options?: UsePlaceOrderOptions) {
    const router = useRouter()
    const apiClient = useApiClient()

    return useMutation<OrderResponse, AxiosError<ErrorResponse>, OrderPayload>({
        mutationFn: async (orderData: OrderPayload) => {
            // Validate total price matches sum of components
            const calculatedTotal = orderData.itemsPrice + orderData.shippingPrice + orderData.taxPrice

            if (Math.abs(calculatedTotal - orderData.totalPrice) > 0.01) {
                throw new Error("Total price must equal the sum of items price, shipping price, and tax price.")
            }

            // Use the apiRequest helper with the authenticated client
            return apiRequest<OrderResponse>(apiClient, { method: "POST", url: "/orders", data: orderData })
        },

        onSuccess: (data) => {
            toast.success("Order placed successfully!", { description: `Order #${data._id} has been created.` })

            // Call custom onSuccess handler if provided
            if (options?.onSuccess) options.onSuccess(data)


            // Redirect to orders page
            router.push("/my-orders")
        },

        onError: (error) => {
            // Handle API validation errors
            if (error.response?.data?.errors) {
                // If the API returns specific validation errors
                const errorMessages = Object.values(error.response.data.errors).flat().join(", ")

                toast.error("Failed to place order", { description: errorMessages })
            } else if (error.response?.data?.message) {
                // If the API returns a general error message
                toast.error("Failed to place order", { description: error.response.data.message })
            } else if (error.message) {
                // For client-side validation errors or network issues
                toast.error("Failed to place order", { description: error.message })
            } else {
                // Fallback error message
                toast.error("Failed to place order", { description: "An unexpected error occurred. Please try again." })
            }
        },
    })
}
