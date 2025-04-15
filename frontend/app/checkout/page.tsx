"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/useUser"
import { toast } from "sonner"
import { ChevronLeft, ShoppingBag } from "lucide-react"
import Link from "next/link"

import { useCart } from "@/hooks/useCart"
import { Button } from "@/components/ui/button"
import { CustomerInformationForm } from "@/components/checkout/CustomerInformationForm"
import { ShippingAddressForm } from "@/components/checkout/ShippingAddressForm"
import { ShippingMethodSelector } from "@/components/checkout/ShippingMethodSelector"
import { PaymentMethodForm } from "@/components/checkout/PaymentMethodForm"
import { OrderSummary } from "@/components/checkout/OrderSummary"

export default function CheckoutPage() {
  const router = useRouter()
  const { user, isSignedIn } = useUser()
  const { items, summary, clearCart, isLoading } = useCart()
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({ firstName: user?.firstName || "", lastName: user?.lastName || "", email: user?.emailAddresses[0]?.emailAddress || "", address: "", city: "", state: "", zipCode: "", country: "Ethiopia" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (items.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    // Validate form
    const requiredFields = ["firstName", "lastName", "email", "address", "city", "state", "zipCode"]
    const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData])

    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields", {
        description: `Missing: ${missingFields.join(", ")}`,
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would send the order to your backend here
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call

      // Clear cart after successful order
      clearCart()

      // Show success message
      toast.success("Order placed successfully!", {
        description: "Thank you for your purchase",
      })

      // Redirect to success page
      router.push("/checkout/success")
    } catch (error) {
      console.log("Error placing order:", error)
      toast.error("Failed to place order", {
        description: "Please try again later",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container max-w-6xl py-10">
        <div className="flex items-center justify-center h-[50vh]">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container max-w-6xl py-10">
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add items to your cart before proceeding to checkout</p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/all-products" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">Complete your purchase</p>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Customer Information and Shipping */}
          <div className="lg:col-span-2 space-y-6">
            <CustomerInformationForm formData={formData} handleInputChange={handleInputChange} isSignedIn={isSignedIn} />

            <ShippingAddressForm formData={formData} handleInputChange={handleInputChange} />

            <ShippingMethodSelector shippingMethod={shippingMethod} setShippingMethod={setShippingMethod} shippingCost={summary.shipping} />

            <PaymentMethodForm />
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <OrderSummary items={items} summary={summary} shippingMethod={shippingMethod} isSubmitting={isSubmitting} />
          </div>
        </div>
      </form>
    </div>
  )
}
