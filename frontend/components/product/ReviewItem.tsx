"use client"

import { useMemo } from "react"
import { Star, Trash } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { Review } from "@/types/api"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useUser } from "@/hooks/useUser"

interface ReviewItemProps {
  review: Review
  onDelete?: (reviewId: string) => void
  isDeleting?: boolean
}

export default function ReviewItem({ review, onDelete, isDeleting }: ReviewItemProps) {
  const { loggedUser } = useUser()

  const formattedDate = useMemo(() => {
    try {
      return review.createdAt ? formatDistanceToNow(new Date(review.createdAt), { addSuffix: true }) : "recently"
    } catch (error) {
      console.log(error)
      return "recently"
    }
  }, [review.createdAt])

  // Get first letter of user ID for avatar fallback with null check
  const userInitial = useMemo(() => {
    if (!review.userId || typeof review.userId !== "string") return "U"
    return review.userId.charAt(0).toUpperCase()
  }, [review.userId])

  // Check if current user can delete this review (own review or admin)
  const canDelete = useMemo(() => {
    if (!loggedUser || !review.userId) return false
    return loggedUser._id === review.userId || loggedUser.role === "admin"
  }, [loggedUser, review.userId])

  const handleDelete = () => {
    if (onDelete && !isDeleting) onDelete(review._id)
  }

  return (
    <div className="border rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {review.userId && typeof review.userId === "string"
                ? `User ${review.userId.substring(0, 6)}...`
                : "Anonymous User"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
          {canDelete && onDelete && (
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleDelete} disabled={isDeleting} aria-label="Delete review">
              <Trash className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </Button>
          )}
        </div>
      </div>

      {review.comment && <p className="text-sm">{review.comment}</p>}
    </div>
  )
}
