import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"

interface OrderSummaryCardProps {
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
}

export function OrderSummaryCard({ itemsPrice, shippingPrice, taxPrice, totalPrice }: OrderSummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Items Price:</span>
            <span>{formatCurrency(itemsPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping:</span>
            <span>{formatCurrency(shippingPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax:</span>
            <span>{formatCurrency(taxPrice)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
