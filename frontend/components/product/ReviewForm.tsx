"use client"

import type React from "react"
import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useUser } from "@/hooks/useUser"
import { toast } from "sonner"
import type { CreateReviewRequest } from "@/types/api"

interface ReviewFormProps {
  productId: string
  onSuccess?: () => void
  isSubmitting?: boolean
  submitReview?: (data: Omit<CreateReviewRequest, "userId">, options?: { onSuccess?: () => void }) => void
}

export default function ReviewForm({ productId, onSuccess, isSubmitting = false, submitReview }: ReviewFormProps) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { loggedUser, isLoading: isUserLoading } = useUser()

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (rating < 1) {
      newErrors.rating = "Please select a rating"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!loggedUser) {
      toast.error("Authentication required", { description: "You must be logged in to submit a review" })
      return
    }

    if (!validateForm()) return

    if (!submitReview) {
      toast.error("Something went wrong", { description: "Unable to submit review at this time" })
      return
    }

    submitReview(
      { productId, rating, comment: comment.trim() || undefined },
      {
        onSuccess: () => {
          // Reset form
          setRating(5)
          setComment("")

          if (onSuccess) {
            onSuccess()
          }
        },
      },
    )
  }

  if (isUserLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center py-8">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!loggedUser) {
    return (
      <Card>
        <CardContent className="pt-6 text-center py-8">
          <p className="text-muted-foreground mb-4">Please sign in to leave a review</p>
          <Button>Sign In</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rating">
              Rating <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`h-6 w-6 ${star <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && <p className="text-xs text-red-500">{errors.rating}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Your Review</Label>
            <Textarea
              id="comment"
              placeholder="Share your experience with this product..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
