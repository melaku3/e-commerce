"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import ReviewItem from "./ReviewItem"
import ReviewForm from "./ReviewForm"
import { useReviews } from "@/hooks/useReviews"
import { RoleGate } from "@/components/auth/RoleGate"
import type { ReviewByProductIdResponse } from "@/types/api"

interface ProductReviewsProps {
  productId: string
  onReviewAdded?: () => void
}

export default function ProductReviews({ productId, onReviewAdded }: ProductReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)

  // Fetch reviews from the database
  const { reviews, isLoading, submitReview, deleteReview, isSubmitting, isDeleting, hasUserReviewed, refetch } = useReviews(productId)

  const handleReviewSuccess = () => {
    setShowReviewForm(false)
    refetch()
    if (onReviewAdded) {
      onReviewAdded()
    }
  }


  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Customer Reviews</h3>
        <RoleGate allowedRoles={["user", "admin"]}>
          <Button variant="outline" onClick={() => setShowReviewForm(!showReviewForm)} disabled={hasUserReviewed && showReviewForm}>
            {showReviewForm ? "Cancel" : hasUserReviewed ? "You've Reviewed" : "Write a Review"}
          </Button>
        </RoleGate>
      </div>

      {/* Review Form */}
      {showReviewForm && !hasUserReviewed && (
        <div className="mb-6">
          <ReviewForm productId={productId} onSuccess={handleReviewSuccess} isSubmitting={isSubmitting} submitReview={submitReview} />
        </div>
      )}

      <Separator className="my-4" />

      {/* Reviews List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading reviews...</p>
          </div>
        ) : !Array.isArray(reviews) || reviews.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No reviews yet. Be the first to review this product!</p>
        ) : (
          <>
            <div className="space-y-4">
              {Array.isArray(reviews) && reviews.slice(0, 3).map((review: ReviewByProductIdResponse) => (
                <ReviewItem key={review._id} review={{ ...review, productId: review.productId._id, userId: review.userId._id }} onDelete={deleteReview} isDeleting={isDeleting} />
              ))}
            </div>

            {Array.isArray(reviews) && reviews.length > 3 && (
              <Button variant="outline" className="w-full mt-4">
                View All {Array.isArray(reviews) ? reviews.length : 0} Reviews
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
