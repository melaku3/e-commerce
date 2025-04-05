"use client"

import { memo } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductSortProps {
  sortOption: string
  onSortChange: (value: string) => void
}

export const ProductSort = memo(function ProductSort({ sortOption, onSortChange }: ProductSortProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Sort by:</span>
      <Select value={sortOption} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="price-low-high">Price: Low to High</SelectItem>
          <SelectItem value="price-high-low">Price: High to Low</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="rating">Highest Rated</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
})

