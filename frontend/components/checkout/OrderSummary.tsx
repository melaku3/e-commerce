"use client"

import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckoutItemCard } from "./CheckoutItemCard"
import { usePlaceOrder } from "@/hooks/usePlaceOrder"
import { useUser } from "@/hooks/useUser"
import { useCart } from "@/hooks/useCart"
import { toast } from "sonner"
import type { CartItem, CartSummary, OrderPayload } from "@/types/api"

interface OrderSummaryProps {
  items: CartItem[]
  summary: CartSummary
  shippingMethod: string
  formData: { firstName: string, lastName: string, email: string, address: string, city: string, state: string, zipCode: string, country: string }
  paymentMethod: string
  errors: Record<string, string>
  setErrors: (errors: Record<string, string>) => void
  touched: Record<string, boolean>
  setAllTouched: () => void
}

export function OrderSummary({ items, summary, shippingMethod, formData, paymentMethod, setErrors, setAllTouched }: OrderSummaryProps) {
  const { loggedUser: user } = useUser()
  const { clearCart } = useCart()
  const shippingCost = shippingMethod === "express" ? summary.shipping + 10 : summary.shipping
  const totalCost = shippingMethod === "express" ? summary.total + 10 : summary.total

  const { mutate: placeOrder, isPending } = usePlaceOrder({
    onSuccess: () => {
      // Clear the cart after successful order placement
      clearCart()
    },
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate customer information
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    // Validate shipping address
    if (!formData.address.trim()) {
      newErrors.address = "Street address is required"
    } else if (formData.address.length < 5) {
      newErrors.address = "Please enter a valid street address"
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }

    if (!formData.state.trim()) {
      newErrors.state = "State/Province is required"
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP/Postal code is required"
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePlaceOrder = () => {
    if (!user?._id) {
      toast.error("You must be logged in to place an order")
      return
    }

    // Mark all fields as touched to show all validation errors
    setAllTouched()

    // Validate the form
    const isValid = validateForm()

    if (!isValid) {
      toast.error("Please fix the errors in the form")
      return
    }

    // Validate cart items
    if (items.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    // Convert cart items to order items format
    const orderItems = items.map((item) => ({ name: item.name, image: item.image || "https://placeholder.com/product.jpg", price: item.price, quantity: item.quantity, productId: item.productId }))

    // Create full name from first and last name
    const fullName = `${formData.firstName} ${formData.lastName}`.trim()

    // Create order payload
    const orderPayload: OrderPayload = {
      orderItems,
      shippingAddress: { fullName, street: formData.address, city: formData.city, region: formData.state, postalCode: formData.zipCode, country: formData.country },
      userId: user._id,
      paymentMethod: paymentMethod || "Credit Card",
      itemsPrice: summary.subtotal,
      shippingPrice: shippingCost,
      taxPrice: summary.tax,
      totalPrice: totalCost,
      isPaid: false,
      isDelivered: false,
      status: "pending",
    }

    placeOrder(orderPayload)
  }

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
        <Button onClick={handlePlaceOrder} className="w-full" size="lg" disabled={isPending || !user?._id}>
          {isPending ? (
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
