"use client"

import type React from "react"

import { MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ShippingAddressFormProps {
  formData: {
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ShippingAddressForm({ formData, handleInputChange }: ShippingAddressFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="address">Street Address</Label>
          <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State / Province</Label>
            <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP / Postal Code</Label>
            <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" value={formData.country} onChange={handleInputChange} required />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
