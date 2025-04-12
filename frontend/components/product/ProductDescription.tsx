"use client"

import { useMemo } from "react"
import { Package, Truck, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { ProductDescriptionProps } from "@/types/product"

export default function ProductDescription({ product }: ProductDescriptionProps) {
  // Safely get category name
  const categoryName = useMemo(() => {
    if (product?.category && typeof product.category === "object" && product.category.name) {
      return product.category.name
    }
    return "Uncategorized"
  }, [product?.category])

  return (
    <Tabs defaultValue="description" className="mt-8">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="shipping">Shipping</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-4 text-sm">
        <div className="prose prose-sm max-w-none">
          <p>{product?.description || "No description available."}</p>
        </div>
      </TabsContent>

      <TabsContent value="details" className="mt-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Product Details</h4>
            <ul className="text-sm space-y-1">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Brand</span>
                <span>{product?.brand || "Unknown"}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span>{categoryName}</span>
              </li>
            </ul>
          </div>
        </div>

        {product?.tags && product.tags.length > 0 && (
          <div className="pt-2">
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
      </TabsContent>

      <TabsContent value="shipping" className="mt-4 space-y-4">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium">Delivery</h4>
              <p className="text-sm text-muted-foreground">Free standard shipping on orders over $100</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium">Returns</h4>
              <p className="text-sm text-muted-foreground">Free 30-day returns for unworn items</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RefreshCw className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium">Warranty</h4>
              <p className="text-sm text-muted-foreground">1 year limited warranty included</p>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

