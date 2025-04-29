"use client"

import { useState } from "react"
import { Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { useOrder } from "@/hooks/useOrder"
import { useCart } from "@/hooks/useCart"
import type { OrderResponse } from "@/hooks/useOrder"
import type { Product, Category } from "@/types/api"

interface OrderActionsProps {
  order: OrderResponse
}

export function OrderActions({ order }: OrderActionsProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { cancelOrder, isCancellingOrder } = useOrder()
  const { addToCart } = useCart()

  const canCancel = order.status === "pending" && !order.isDelivered

  const handleCancelOrder = () => {
    setIsProcessing(true)
    cancelOrder(order._id)
    setIsProcessing(false)
  }

  const handleBuyAgain = () => {
    order.orderItems.forEach((item) => {
      // Create a default category object
      const defaultCategory: Category = { _id: "", name: "Default", description: "Default category" }

      // Create a complete product object with all required fields
      const product: Product = { _id: item.productId, name: item.name, slug: item.name.toLowerCase().replace(/\s+/g, "-"), description: "", price: item.price, category: defaultCategory, images: [item.image], countInStock: 99, rating: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      addToCart(product, { quantity: item.quantity })
    })
  }

  return (
    <div className="flex flex-wrap gap-2">
      {canCancel && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" disabled={isProcessing || isCancellingOrder}>
              {isProcessing || isCancellingOrder ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Cancel Order
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Order</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel this order? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction onClick={handleCancelOrder}>Yes, Cancel</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <Button variant="secondary" onClick={handleBuyAgain}>
        Buy Again
      </Button>
    </div>
  )
}
