"use client"

import { useMemo } from "react"
import { Clock } from "lucide-react"
import type { ProductAvailabilityProps } from "@/types/product"

export default function ProductAvailability({ countInStock, estimatedDelivery = "3-5 business days" }: ProductAvailabilityProps) {
  const stockStatus = useMemo(() => {
    if (countInStock === 0) return { text: "Out of Stock", color: "text-red-500" }

    if (countInStock < 5) {
      return { text: `Low Stock: ${countInStock} left`, color: "text-amber-500" }
    }
    return { text: "In Stock", color: "text-green-500" }
  }, [countInStock])

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Availability</h3>
        <p className={`text-sm font-medium ${stockStatus.color}`}>{stockStatus.text}</p>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>Estimated delivery: {estimatedDelivery}</span>
      </div>
    </div>
  )
}

