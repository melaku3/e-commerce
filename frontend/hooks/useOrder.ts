"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { AxiosError } from "axios"
import { useApiClient, apiRequest } from "@/lib/apiClient"
import { useUser } from "@/hooks/useUser"
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
 * Custom hook for all order-related operations
 * Handles fetching orders, order details, and placing orders
 */
export function useOrder(orderId?: string) {
  const router = useRouter()
  const apiClient = useApiClient()
  const queryClient = useQueryClient()
  const { isSignedIn } = useUser()

  // Fetch all orders for the current user - only when signed in
  const { data: orders = [], isLoading: isLoadingOrders, error: ordersError, refetch: refetchOrders } = useQuery<OrderResponse[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      return apiRequest<OrderResponse[]>(apiClient, {
        method: "GET",
        url: "/orders",
      })
    },
    enabled: !!isSignedIn,
  })

  // Fetch a single order by ID if orderId is provided and user is signed in
  const { data: order, isLoading: isLoadingOrder, error: orderError, refetch: refetchOrder } =
    useQuery<OrderResponse>({
      queryKey: ["order", orderId],
      queryFn: async () => {
        return apiRequest<OrderResponse>(apiClient, {
          method: "GET",
          url: `/orders/${orderId}`,
        })
      },
      enabled: !!orderId && !!isSignedIn, // Only run the query if orderId is provided AND user is signed in
    })

  // Place a new order
  const placeOrderMutation = useMutation<OrderResponse, AxiosError<ErrorResponse>, OrderPayload>({
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

      // Invalidate orders query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["orders"] })

      // Store the new order ID in sessionStorage to show success message
      sessionStorage.setItem("newOrder", data._id)

      router.push(`/my-orders/${data._id}`)
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

  // Cancel an order
  const cancelOrderMutation = useMutation<OrderResponse, AxiosError<ErrorResponse>, string>({
    mutationFn: async (orderId: string) => {
      return apiRequest<OrderResponse>(apiClient, {
        method: "PATCH",
        url: `/orders/${orderId}/cancel`,
      })
    },

    onSuccess: (data) => {
      refetchOrder() // Refetch the order details to get the updated status
      toast.success("Order cancelled successfully!", { description: `Order #${data._id} has been cancelled.` })

      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      queryClient.invalidateQueries({ queryKey: ["order", data._id] })
    },

    onError: (error) => {
      const message = error.response?.data?.message || error.message || "Failed to cancel order"
      toast.error("Error", { description: message })
    },
  })

  return {
    // Queries
    orders, isLoadingOrders, ordersError, refetchOrders, order, isLoadingOrder, orderError, refetchOrder,
    // Mutations
    placeOrder: (orderData: OrderPayload, options?: UsePlaceOrderOptions) => {
      placeOrderMutation.mutate(orderData, {
        onSuccess: (data) => {
          if (options?.onSuccess) { options.onSuccess(data) }
        }
      })
    },
    isPlacingOrder: placeOrderMutation.isPending,

    cancelOrder: (orderId: string) => cancelOrderMutation.mutate(orderId),
    isCancellingOrder: cancelOrderMutation.isPending,
  }
}
