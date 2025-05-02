"use client"

import Link from "next/link"
import { Loader2, ShoppingBag, ArrowLeft, LogIn } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { OrderCard } from "@/components/order/OrderCard"
import { useOrder } from "@/hooks/useOrder"
import { useUser } from "@/hooks/useUser"
import { useClerk } from "@clerk/nextjs"

export default function MyOrdersPage() {
  const { isSignedIn, isLoading: userLoading } = useUser()
  const { orders, isLoadingOrders } = useOrder()
  const { openSignIn } = useClerk()

  // Show loading state while checking authentication
  if (userLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-10">
        <div className="flex items-center justify-center h-[50vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  // If user is not signed in, show sign in UI
  if (!isSignedIn) {
    return (
      <div className="container max-w-4xl mx-auto py-10">
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <LogIn className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Sign in to view your orders</h1>
          <p className="text-muted-foreground mb-6">You need to be signed in to view your order history</p>
          <Button onClick={() => openSignIn({ redirectUrl: "/my-orders" })}>
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  // Show loading state when fetching orders
  if (isLoadingOrders) {
    return (
      <div className="container max-w-4xl mx-auto py-10">
        <div className="flex items-center justify-center h-[50vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  // If no orders found
  if (!orders || orders.length === 0) {
    return (
      <div className="container max-w-4xl mx-auto py-10">
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">No orders found</h1>
          <p className="text-muted-foreground mb-6">You haven&apos;t placed any orders yet</p>
          <Button asChild>
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Show orders list
  return (
    <div className="container max-w-4xl mx-auto py-10">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">View and track your orders</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  )
}
