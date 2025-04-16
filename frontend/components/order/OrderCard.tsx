import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderStatusBadge } from "./OrderStatusBadge"
import { formatCurrency } from "@/lib/utils"
import type { OrderResponse } from "@/hooks/useOrder"

interface OrderCardProps {
  order: OrderResponse
}

export function OrderCard({ order }: OrderCardProps) {
  const orderDate = new Date(order.createdAt)
  const timeAgo = formatDistanceToNow(orderDate, { addSuffix: true })
  const itemCount = order.orderItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base">Order #{order._id}</CardTitle>
            <p className="text-sm text-muted-foreground">Placed {timeAgo}</p>
          </div>
          <OrderStatusBadge status={order.status ?? 'pending'} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Items:</span>
            <span>{itemCount} items</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total:</span>
            <span className="font-medium">{formatCurrency(order.totalPrice)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/my-orders/${order._id}`} className="flex items-center justify-center">
            View Order Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
