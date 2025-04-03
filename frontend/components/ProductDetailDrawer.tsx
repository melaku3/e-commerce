"use client"

import { useCallback, useMemo, useState } from "react"
import { Minus, Plus, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, } from "@/components/ui/drawer"
import { Badge } from "@/components/ui/badge"
import ColorSwatch from "@/components/ColorSwatch"
import type { IProduct } from "@/config/types"

interface ProductDetailDrawerProps {
    product: IProduct
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function ProductDetailDrawer({ product, open, onOpenChange }: ProductDetailDrawerProps) {
    const [selectedColor, setSelectedColor] = useState<string | null>(product.color.length > 0 ? product.color[0] : null)
    const [selectedSize, setSelectedSize] = useState<string | null>(product.size.length > 0 ? product.size[0] : null)
    const [quantity, setQuantity] = useState(1)

    const increaseQuantity = useCallback(() => {
        setQuantity((prev) => Math.min(prev + 1, product.countInStock))
    }, [product.countInStock])

    const decreaseQuantity = useCallback(() => {
        setQuantity((prev) => Math.max(prev - 1, 1))
    }, [])

    const StarRating = useMemo(() => (
        <div className="flex items-center mt-1">
            {Array(5)
                .fill(0)
                .map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < product.rating ? "fill-primary text-primary" : "text-muted-foreground"}`} aria-hidden="true" />
                ))}
            <span className="text-xs text-muted-foreground ml-1" aria-label={`Rated ${product.rating.toFixed(1)} out of 5 stars`}>
                ({product.rating.toFixed(1)})
            </span>
        </div>
    ), [product.rating])

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent >
                <div className="mx-auto w-full max-w-md">
                    <DrawerHeader>
                        <DrawerTitle className="text-xl">{product.name}</DrawerTitle>
                        <DrawerDescription className="flex items-center justify-between">
                            <span>By {product.brand}</span>
                            <span className="font-semibold text-foreground">${product.price.toFixed(2)}</span>
                        </DrawerDescription>
                        {StarRating}
                    </DrawerHeader>

                    <div className="px-4 py-2">
                        <p className="text-sm text-muted-foreground mb-4">{product.description}</p>

                        <div className="space-y-4">
                            {product.color.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Color</h4>
                                    <div className="flex gap-2">
                                        {product.color.map((color) => (
                                            <ColorSwatch key={color} color={color} selected={selectedColor === color} onClick={() => setSelectedColor(color)} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {product.size.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Size</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {product.size.map((size) => (
                                            <Button key={size} variant={selectedSize === size ? "default" : "outline"} size="sm" onClick={() => setSelectedSize(size)} className="min-w-[3rem]">
                                                {size}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <h4 className="text-sm font-medium mb-2">Quantity</h4>
                                <div className="flex items-center">
                                    <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1} aria-label="Decrease quantity">
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-12 text-center" aria-live="polite">
                                        {quantity}
                                    </span>
                                    <Button variant="outline" size="icon" onClick={increaseQuantity} disabled={quantity >= product.countInStock} aria-label="Increase quantity">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {product.tags.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags.map((tag) => (
                                            <Badge key={tag} variant="outline">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <DrawerFooter>
                        <Button disabled={product.countInStock === 0} className="w-full" aria-label={product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}>
                            {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
                        </Button>
                        <Button variant="outline" onClick={(e) => {
                            e.stopPropagation()
                            onOpenChange(false)
                        }}>
                            Cancel
                        </Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

