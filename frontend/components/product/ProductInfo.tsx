"use client"

import { useMemo } from "react"
import { Star, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { ProductInfoProps } from "@/types/product"

export default function ProductInfo({ product }: ProductInfoProps) {
    // Safely get category name
    const categoryName = useMemo(() => {
        if (product?.category && typeof product.category === "object" && product.category.name) {
            return product.category.name
        }
        return "Uncategorized"
    }, [product?.category])

    // Create star rating component
    const StarRating = useMemo(() => {
        const rating = product?.rating || 0
        const reviewCount = Array.isArray(product?.reviews) ? product.reviews.length : 0

        return (
            <div className="flex items-center">
                {Array(5).fill(0).map((_, i) => (<Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-primary text-primary" : "text-muted-foreground"}`} aria-hidden="true" />))}
                <span className="text-sm text-muted-foreground ml-1" aria-label={`Rated ${rating.toFixed(1)} out of 5 stars`}>
                    ({rating.toFixed(1)})
                </span>
                <span className="text-sm text-muted-foreground ml-2">
                    {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                </span>
            </div>
        )
    }, [product?.rating, product?.reviews])

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center justify-between">
                    <Badge variant="outline" className="mb-2">
                        {categoryName}
                    </Badge>
                    <Button variant="ghost" size="icon" aria-label="Add to wishlist">
                        <Heart className="h-5 w-5" />
                    </Button>
                </div>
                <h1 className="text-2xl font-bold tracking-tight">{product?.name}</h1>
                <p className="text-sm text-muted-foreground">By {product?.brand || "Unknown Brand"}</p>
                {StarRating}
            </div>

            <div>
                <div className="flex items-baseline justify-between">
                    <p className="text-2xl font-semibold">${(product?.price || 0).toFixed(2)}</p>
                </div>
            </div>

            <Separator />
        </div>
    )
}

