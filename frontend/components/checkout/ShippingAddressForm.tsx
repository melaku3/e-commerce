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
  errors: Record<string, string>
  touched: Record<string, boolean>
  setTouched?: (field: string) => void
}

export function ShippingAddressForm({ formData, handleInputChange, errors, touched, setTouched }: ShippingAddressFormProps) {
  const handleBlur = (field: string) => {
    if (setTouched) {
      setTouched(field)
    }
  }

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
          <Label htmlFor="address" className={errors.address && touched.address ? "text-destructive" : ""}>
            Street Address
          </Label>
          <Input id="address" name="address" value={formData.address} onChange={handleInputChange} onBlur={() => handleBlur("address")} className={errors.address && touched.address ? "border-destructive focus-visible:ring-destructive" : ""} required />
          {errors.address && touched.address && (
            <p className="text-sm font-medium text-destructive mt-1">{errors.address}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className={errors.city && touched.city ? "text-destructive" : ""}>
              City
            </Label>
            <Input id="city" name="city" value={formData.city} onChange={handleInputChange} onBlur={() => handleBlur("city")} className={errors.city && touched.city ? "border-destructive focus-visible:ring-destructive" : ""} required />
            {errors.city && touched.city && <p className="text-sm font-medium text-destructive mt-1">{errors.city}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state" className={errors.state && touched.state ? "text-destructive" : ""}>
              State / Province
            </Label>
            <Input id="state" name="state" value={formData.state} onChange={handleInputChange} onBlur={() => handleBlur("state")} className={errors.state && touched.state ? "border-destructive focus-visible:ring-destructive" : ""} required />
            {errors.state && touched.state && (
              <p className="text-sm font-medium text-destructive mt-1">{errors.state}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zipCode" className={errors.zipCode && touched.zipCode ? "text-destructive" : ""}>
              ZIP / Postal Code
            </Label>
            <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} onBlur={() => handleBlur("zipCode")} className={errors.zipCode && touched.zipCode ? "border-destructive focus-visible:ring-destructive" : ""} required />
            {errors.zipCode && touched.zipCode && (
              <p className="text-sm font-medium text-destructive mt-1">{errors.zipCode}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="country" className={errors.country && touched.country ? "text-destructive" : ""}>
              Country
            </Label>
            <Input id="country" name="country" value={formData.country} onChange={handleInputChange} onBlur={() => handleBlur("country")} className={errors.country && touched.country ? "border-destructive focus-visible:ring-destructive" : ""} required />
            {errors.country && touched.country && (
              <p className="text-sm font-medium text-destructive mt-1">{errors.country}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
