"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Loader2, CheckCircle, AlertTriangle, ArrowLeft, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { OrderStatusBadge } from "@/components/order/OrderStatusBadge"
import { OrderSummaryCard } from "@/components/order/OrderSummaryCard"
import { OrderItemsList } from "@/components/order/OrderItemsList"
import { ShippingInfoCard } from "@/components/order/ShippingInfoCard"
import { PaymentInfoCard } from "@/components/order/PaymentInfoCard"
import { OrderActions } from "@/components/order/OrderActions"
import { useOrder } from "@/hooks/useOrder"
import { useUser } from "@/hooks/useUser"
import { useClerk } from "@clerk/nextjs"

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.id as string
  const { isSignedIn, isLoading: userLoading } = useUser()
  const { order, isLoadingOrder } = useOrder(orderId)
  const { openSignIn } = useClerk()
  const [isNewOrder, setIsNewOrder] = useState(false)

  // Check if this is a newly created order
  useEffect(() => {
    const newOrderFlag = sessionStorage.getItem("newOrder")
    if (newOrderFlag === orderId) {
      setIsNewOrder(true)
      // Clear the flag after showing the success message
      sessionStorage.removeItem("newOrder")
    }
  }, [orderId])

  // Show loading state while checking authentication
  if (userLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    )
  }

  // If user is not signed in, show sign in UI
  if (!isSignedIn) {
    return (
      <div className="container max-w-4xl mx-auto py-10">
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <LogIn className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Sign in to view order details</h1>
          <p className="text-muted-foreground mb-6">You need to be signed in to view your order details</p>
          <Button onClick={() => openSignIn({ redirectUrl: `/my-orders/${orderId}` })}>Sign In</Button>
        </div>
      </div>
    )
  }

  // Show loading state when fetching order
  if (isLoadingOrder) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading order details...</p>
      </div>
    )
  }

  // If order not found
  if (!order) {
    return (
      <div className="container max-w-4xl mx-auto p-4">
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Order Not Found</AlertTitle>
          <AlertDescription>
            We couldn&apos;t find the order you&apos;re looking for. It may have been removed or the ID is incorrect.
          </AlertDescription>
        </Alert>
        <Button asChild variant="outline">
          <Link href="/my-orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Orders
          </Link>
        </Button>
      </div>
    )
  }

  // Show order details
  return (
    <div className="container max-w-4xl mx-auto p-4">
      {isNewOrder && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertTitle>Order Placed Successfully!</AlertTitle>
          <AlertDescription>Your order #{order._id} has been created and is being processed.</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order #{order._id}</h1>
          <p className="text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
          <div className="mt-2">
            <OrderStatusBadge status={order.status ?? "pending"} />
          </div>
        </div>
        <Button asChild variant="outline" className="mt-4 md:mt-0">
          <Link href="/my-orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Orders
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <ShippingInfoCard shippingAddress={order.shippingAddress} isDelivered={order.isDelivered || false} />

          {/* Payment Method */}
          <PaymentInfoCard paymentMethod={order.paymentMethod} isPaid={order.isPaid || false} />

          {/* Order Items */}
          <OrderItemsList items={order.orderItems} />

          {/* Order Actions */}
          <div className="mt-6">
            <OrderActions order={order} />
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-1">
          <OrderSummaryCard itemsPrice={order.itemsPrice} shippingPrice={order.shippingPrice} taxPrice={order.taxPrice} totalPrice={order.totalPrice} />
        </div>
      </div>
    </div>
  )
}
