"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { useOrder } from "@/hooks/useOrder"
import { useCart } from "@/hooks/useCart"
import type { OrderResponse } from "@/hooks/useOrder"

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
      addToCart({ _id: item.productId, name: item.name, price: item.price, images: [item.image], countInStock: 99 } as any, { quantity: item.quantity })
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
