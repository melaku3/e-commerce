import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import type { OrderItem } from "@/types/api"

interface OrderItemsListProps {
  items: OrderItem[]
}

export function OrderItemsList({ items }: OrderItemsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex gap-4 py-3">
              <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} width={80} height={80} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium">{item.name}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.quantity} × {formatCurrency(item.price)}
                </p>
              </div>
              <div className="text-sm font-medium text-right">{formatCurrency(item.quantity * item.price)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
