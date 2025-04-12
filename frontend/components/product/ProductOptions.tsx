"use client"

import { useState, useCallback, useEffect } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import ColorSwatch from "@/components/ColorSwatch"
import type { ProductOptionsProps } from "@/types/product"

export default function ProductOptions({ product, onOptionsChange, initialOptions }: ProductOptionsProps) {
    const [selectedColor, setSelectedColor] = useState<string | null>(
        initialOptions?.color || (product.color && product.color.length > 0 ? product.color[0] : null),
    )

    const [selectedSize, setSelectedSize] = useState<string | null>(
        initialOptions?.size || (product.size && product.size.length > 0 ? product.size[0] : null),
    )

    const [quantity, setQuantity] = useState(initialOptions?.quantity || 1)

    // Update parent component when options change
    useEffect(() => {
        onOptionsChange({
            color: selectedColor,
            size: selectedSize,
            quantity,
        })
    }, [selectedColor, selectedSize, quantity, onOptionsChange])

    const increaseQuantity = useCallback(() => {
        setQuantity((prev) => Math.min(prev + 1, product.countInStock))
    }, [product.countInStock])

    const decreaseQuantity = useCallback(() => {
        setQuantity((prev) => Math.max(prev - 1, 1))
    }, [])

    return (
        <div className="space-y-6">
            {/* Color Selection */}
            {product.color && product.color.length > 0 && (
                <div>
                    <h3 className="text-sm font-medium mb-3">Color</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.color.map((color) => (
                            <ColorSwatch key={color} color={color} selected={selectedColor === color} onClick={() => setSelectedColor(color)} />
                        ))}
                    </div>
                </div>
            )}

            {/* Size Selection */}
            {product.size && product.size.length > 0 && (
                <div>
                    <h3 className="text-sm font-medium mb-3">Size</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.size.map((size) => (
                            <Button key={size} variant={selectedSize === size ? "default" : "outline"} size="sm" onClick={() => setSelectedSize(size)} className="min-w-[3rem]">
                                {size}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {/* Quantity Selection */}
            <div>
                <h3 className="text-sm font-medium mb-3">Quantity</h3>
                <div className="flex items-center">
                    <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1} aria-label="Decrease quantity">
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center" aria-live="polite">
                        {quantity}
                    </span>
                    <Button variant="outline" size="icon" onClick={increaseQuantity} disabled={quantity >= product.countInStock} aria-label="Increase quantity"                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

