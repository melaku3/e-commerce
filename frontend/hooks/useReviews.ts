"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiClient, apiRequest } from "@/lib/apiClient"
import type { ReviewByProductIdResponse, CreateReviewRequest, ApiResponse } from "@/types/api"
import { toast } from "sonner"
import { useUser } from "./useUser"

export function useReviews(productId: string) {
    const apiClient = useApiClient()
    const queryClient = useQueryClient()
    const { loggedUser: user } = useUser()

    // Fetch reviews for a product
    const { data: reviews, isLoading, error, refetch } = useQuery({
        queryKey: ["reviews", productId],
        queryFn: async () => {
            try {
                const response = await apiRequest<ReviewByProductIdResponse[]>(apiClient, { url: `/reviews/product/${productId}`, method: "GET" })
                return response || []
            } catch (error) {
                console.error("Error fetching reviews:", error)
                return []
            }
        },
    })

    // Check if user has already reviewed this product
    const hasUserReviewed = Array.isArray(reviews) && reviews.some((review: ReviewByProductIdResponse) => review.userId._id === user?._id)

    // Submit a new review
    const { mutate: submitReview, isPending: isSubmitting } = useMutation({
        mutationFn: async (reviewData: Omit<CreateReviewRequest, "userId">) => {
            if (!user) throw new Error("You must be logged in to submit a review")

            return apiRequest<ApiResponse<{ message: string }>>(apiClient, {
                url: "/reviews",
                method: "POST",
                data: { ...reviewData, userId: user._id },
            })
        },
        onSuccess: () => {
            toast.success("Review submitted", {
                description: "Your review has been successfully submitted.",
            })
            queryClient.invalidateQueries({ queryKey: ["reviews", productId] })
            queryClient.invalidateQueries({ queryKey: ["product", productId] })
        },
        onError: (error: any) => {
            toast.error("Review submission failed", {
                description: error.response?.data?.message || "Failed to submit your review.",
            })
        },
    })


    // Delete a review (user can delete their own review, admin can delete any)
    const { mutate: deleteReview, isPending: isDeleting } = useMutation({
        mutationFn: async (reviewId: string) => {
            return apiRequest<ApiResponse<{ message: string }>>(apiClient, {
                url: `/reviews/${reviewId}`,
                method: "DELETE",
            })
        },
        onSuccess: () => {
            toast.success("Review deleted", {
                description: "The review has been successfully deleted.",
            })
            queryClient.invalidateQueries({ queryKey: ["reviews", productId] })
            queryClient.invalidateQueries({ queryKey: ["product", productId] })
        },
        onError: (error: any) => {
            toast.error("Failed to delete review", {
                description: error.response?.data?.message || "An error occurred while deleting the review.",
            })
        },
    })

    return { reviews, isLoading, error, refetch, submitReview, deleteReview, isSubmitting, isDeleting, hasUserReviewed }
}
