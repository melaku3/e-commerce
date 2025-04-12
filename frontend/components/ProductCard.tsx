"use client"

import type React from "react"

import { useCallback, useMemo, useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import ColorSwatch from "./ColorSwatch"
import ProductDetailDrawer from "./ProductDetailDrawer"
import type { Product } from "@/types/api"

interface ProductCardProps extends Product {
    isFavorite?: boolean
}

export default function ProductCard(props: ProductCardProps) {
    const { name, description, price, images, category, color = [], countInStock, rating, size = [], isFavorite = false } = props

    const [favorite, setFavorite] = useState(isFavorite)
    const [isHovered, setIsHovered] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    const toggleFavorite = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        setFavorite((prev) => !prev)
    }, [])

    const handleCardClick = useCallback(() => { setShowDetails(true) }, [])

    const handleMouseEnter = useCallback(() => { setIsHovered(true) }, [])

    const handleMouseLeave = useCallback(() => { setIsHovered(false) }, [])

    const StarRating = useMemo(
        () => (
            <div className="flex items-center mt-1">
                {Array(5).fill(0).map((_, i) => (<Star key={i} className={cn("h-4 w-4", i < rating ? "fill-primary text-primary" : "text-muted-foreground")} aria-hidden="true" />))}
                <span className="text-xs text-muted-foreground ml-1" aria-label={`Rated ${rating.toFixed(1)} out of 5 stars`}>
                    ({rating.toFixed(1)})
                </span>
            </div>
        ),
        [rating]
    )

    const HoverDetails = useMemo(() => {
        if (!isHovered) return null

        return (
            <div className="mt-2 text-sm text-muted-foreground animate-fadeIn">
                <p>• {countInStock > 0 ? `${countInStock} in stock` : "Out of stock"}</p>
                {size?.length > 0 && <p>• {size.length} sizes available</p>}
                {color?.length > 0 && <p>• {color.length} colors available</p>}
                <p>• Free shipping</p>
            </div>
        )
    }, [isHovered, countInStock, size?.length, color?.length])

    const imageUrl = images[0] || "https://res.cloudinary.com/dtolkvgly/image/upload/v1743674356/Placeholder-_-Glossary_dt50gb.svg"
    const isInStock = countInStock > 0

    return (
        <Card
            className={cn("overflow-hidden transition-all duration-300 h-full cursor-pointer", isHovered && "transform scale-[1.02] shadow-lg")}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardClick}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
            role="button"
            aria-label={`View details for ${name}`}>
            <div className="relative">
                <div className="aspect-[4/3] relative overflow-hidden m-0 p-0">
                    <Image src={imageUrl} alt={`Product image of ${name}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-300 hover:scale-105" priority={false} />
                </div>
                <button onClick={toggleFavorite} className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary" aria-label={favorite ? "Remove from favorites" : "Add to favorites"} type="button">
                    <Heart className={cn("h-5 w-5 transition-colors", favorite ? "fill-red-500 text-red-500" : "text-gray-600")} />
                </button>
                {category?.name && (
                    <Badge className="absolute top-2 left-2" variant="secondary">
                        {category.name}
                    </Badge>
                )}
            </div>

            <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
                    <span className="font-bold text-lg">${price.toFixed(2)}</span>
                </div>
                {StarRating}
            </CardHeader>

            <CardContent className="p-4">
                <CardDescription className="line-clamp-2 h-10">{description}</CardDescription>

                {color?.length > 0 && (
                    <div className="mt-3">
                        <div className="flex gap-1 mt-1">
                            {color?.slice(0, 4).map((c) => (
                                <ColorSwatch key={c} color={c} className="w-4 h-4" />
                            ))}
                            {color?.length > 4 && (
                                <span className="text-xs text-muted-foreground flex items-center">+{color?.length - 4}</span>
                            )}
                        </div>
                    </div>
                )}

                {HoverDetails}
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button className="w-full gap-2 transition-all hover:gap-3" disabled={!isInStock} aria-label={isInStock ? "Add to Cart" : "Out of Stock"}                >
                    <ShoppingCart className="h-4 w-4" />
                    <span>{isInStock ? "Add to Cart" : "Out of Stock"}</span>
                </Button>
            </CardFooter>

            <ProductDetailDrawer product={props} open={showDetails} onOpenChange={setShowDetails} />
        </Card>
    )
}

