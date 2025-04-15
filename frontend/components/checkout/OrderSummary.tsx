import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckoutItemCard } from "./CheckoutItemCard"
import type { CartItem, CartSummary } from "@/types/api"

interface OrderSummaryProps {
  items: CartItem[]
  summary: CartSummary
  shippingMethod: string
  isSubmitting: boolean
}

export function OrderSummary({ items, summary, shippingMethod, isSubmitting }: OrderSummaryProps) {
  const shippingCost = shippingMethod === "express" ? summary.shipping + 10 : summary.shipping
  const totalCost = shippingMethod === "express" ? summary.total + 10 : summary.total

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="mr-2 h-5 w-5" />
          Order Summary
        </CardTitle>
        <CardDescription>
          {summary.itemCount} {summary.itemCount === 1 ? "item" : "items"} in your cart
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-[300px] overflow-auto space-y-3 pr-1">
          {items.map((item) => (
            <CheckoutItemCard key={item._id} item={item} />
          ))}
        </div>
        <Separator />
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${summary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${summary.tax.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${totalCost.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
