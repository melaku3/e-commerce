"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { ChevronLeft, ShoppingBag } from "lucide-react"
import { useUser } from "@/hooks/useUser"
import Link from "next/link"

import { useCart } from "@/hooks/useCart"
import { Button } from "@/components/ui/button"
import { CustomerInformationForm } from "@/components/checkout/CustomerInformationForm"
import { ShippingAddressForm } from "@/components/checkout/ShippingAddressForm"
import { ShippingMethodSelector } from "@/components/checkout/ShippingMethodSelector"
import { PaymentMethodForm } from "@/components/checkout/PaymentMethodForm"
import { OrderSummary } from "@/components/checkout/OrderSummary"

export default function CheckoutPage() {
  const { user, isSignedIn } = useUser()
  const { items, summary, isLoading } = useCart()
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("Credit Card")

  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Form state
  const [formData, setFormData] = useState({ firstName: user?.firstName || "", lastName: user?.lastName || "", email: user?.emailAddresses[0]?.emailAddress || "", address: "", city: "", state: "", zipCode: "", country: "Ethiopia" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method)
  }

  const handleSetTouched = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  const setAllTouched = useCallback(() => {
    const allFields = { firstName: true, lastName: true, email: true, address: true, city: true, state: true, zipCode: true, country: true }
    setTouched(allFields)
  }, [])

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
          <Link href="/" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">Complete your purchase</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Customer Information and Shipping */}
        <div className="lg:col-span-2 space-y-6">
          <CustomerInformationForm formData={formData} handleInputChange={handleInputChange} isSignedIn={isSignedIn} errors={errors} touched={touched} setTouched={handleSetTouched} />

          <ShippingAddressForm formData={formData} handleInputChange={handleInputChange} errors={errors} touched={touched} setTouched={handleSetTouched} />

          <ShippingMethodSelector shippingMethod={shippingMethod} setShippingMethod={setShippingMethod} shippingCost={summary.shipping} />

          <PaymentMethodForm onPaymentMethodChange={handlePaymentMethodChange} />
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <OrderSummary items={items} summary={summary} shippingMethod={shippingMethod} formData={formData} paymentMethod={paymentMethod} errors={errors} setErrors={setErrors} touched={touched} setAllTouched={setAllTouched} />
        </div>
      </div>
    </div>
  )
}
