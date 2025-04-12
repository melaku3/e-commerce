"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import ProductImages from "@/components/product/ProductImages"
import ProductInfo from "@/components/product/ProductInfo"
import ProductOptions from "@/components/product/ProductOptions"
import ProductDescription from "@/components/product/ProductDescription"
import ProductAvailability from "@/components/product/ProductAvailability"
import ProductReviews from "@/components/product/ProductReviews"
import { RoleGate } from "@/components/auth/RoleGate"
import type { Product } from "@/types/api"
import type { ProductOptions as ProductOptionsType } from "@/types/product"

interface ProductDetailDrawerProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddToCart?: (product: Product, options: ProductOptionsType) => void
}

export default function ProductDetailDrawer({ product, open, onOpenChange, onAddToCart }: ProductDetailDrawerProps) {
  const [selectedOptions, setSelectedOptions] = useState<ProductOptionsType>({
    color: product.color && Array.isArray(product.color) && product.color.length > 0 ? product.color[0] : null,
    size: product.size && Array.isArray(product.size) && product.size.length > 0 ? product.size[0] : null,
    quantity: 1,
  })

  const handleOptionsChange = useCallback((options: ProductOptionsType) => {
    setSelectedOptions(options)
  }, [])

  const handleAddToCart = useCallback(() => {
    if (onAddToCart) {
      onAddToCart(product, selectedOptions)
    } else {
      // Default implementation if no onAddToCart provided
      toast.success("Added to cart", {
        description: `${product.name} (${selectedOptions.quantity}) added to your cart`,
      })
    }

    // Close the drawer after adding to cart
    onOpenChange(false)
  }, [product, selectedOptions, onAddToCart, onOpenChange])

  const handleReviewAdded = useCallback(() => {
    toast.success("Review submitted", { description: "Thank you for your feedback!" })
  }, [])

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh] max-h-[85vh]">
        <DrawerHeader className="px-4 pt-4 pb-0 md:px-6">
          <DrawerTitle className="sr-only">{product.name} Details</DrawerTitle>
        </DrawerHeader>

        <ScrollArea className="flex-1 h-[calc(85vh-140px)] overflow-y-auto px-4 md:px-6">
          <div className="mx-auto w-full max-w-4xl pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Images */}
              <ProductImages images={product.images} productName={product.name} />

              {/* Product Info and Options */}
              <div className="space-y-6">
                <ProductInfo product={product} />
                <ProductAvailability countInStock={product.countInStock} />
                <ProductOptions
                  product={product}
                  onOptionsChange={handleOptionsChange}
                  initialOptions={selectedOptions}
                />
              </div>
            </div>

            {/* Product Description Tabs */}
            <ProductDescription product={product} />

            {/* Separator */}
            <Separator className="my-8" />

            {/* Product Reviews - Now passing the actual reviews array */}
            <ProductReviews productId={product._id} onReviewAdded={handleReviewAdded} />

            {/* Admin-only section */}
            <RoleGate allowedRoles={["admin"]}>
              <div className="mt-8 p-4 border rounded-lg bg-amber-50">
                <h3 className="text-lg font-medium mb-2">Admin Controls</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit Product
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete Product
                  </Button>
                </div>
              </div>
            </RoleGate>

            {/* Related Products Placeholder - Hidden on smaller screens */}
            <div className="mt-8 hidden sm:block">
              <h3 className="text-lg font-medium mb-4">You Might Also Like</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Placeholder for related products */}
                <div className="aspect-square bg-gray-100 rounded-lg"></div>
                <div className="aspect-square bg-gray-100 rounded-lg"></div>
                <div className="aspect-square bg-gray-100 rounded-lg hidden md:block"></div>
                <div className="aspect-square bg-gray-100 rounded-lg hidden md:block"></div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DrawerFooter className="border-t px-4 py-4 md:px-6">
          <div className="mx-auto w-full max-w-4xl">
            <Button
              disabled={product.countInStock === 0}
              className="w-full"
              size="lg"
              onClick={handleAddToCart}
              aria-label={product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
            >
              {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                Continue Shopping
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
