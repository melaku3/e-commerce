"use client"

import { useState } from "react"
import { CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

interface PaymentMethodFormProps {
  onPaymentMethodChange?: (method: string) => void
}

export function PaymentMethodForm({ onPaymentMethodChange }: PaymentMethodFormProps) {
  const [activeTab, setActiveTab] = useState("card")

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (onPaymentMethodChange) {
      onPaymentMethodChange(value === "card" ? "Credit Card" : "PayPal")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          Payment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="card" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="card">Credit Card</TabsTrigger>
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
          </TabsList>
          <TabsContent value="card" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input id="expiryDate" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nameOnCard">Name on Card</Label>
              <Input id="nameOnCard" placeholder="John Doe" />
            </div>
          </TabsContent>
          <TabsContent value="paypal" className="pt-4">
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                You will be redirected to PayPal to complete your purchase securely.
              </p>
              <Button variant="outline" className="w-full">
                Continue with PayPal
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
