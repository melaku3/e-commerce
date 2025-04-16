"use client"

import type React from "react"

import { User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useClerk } from "@clerk/nextjs"
import { Button } from "../ui/button"

interface CustomerInformationFormProps {
  formData: { firstName: string, lastName: string, email: string }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isSignedIn: boolean
  errors: Record<string, string>
  touched: Record<string, boolean>
  setTouched?: (field: string) => void
}

export function CustomerInformationForm({ formData, handleInputChange, isSignedIn, errors, touched, setTouched }: CustomerInformationFormProps) {
  const { openSignIn } = useClerk()
  const handleBlur = (field: string) => {
    if (setTouched) {
      setTouched(field)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-2 h-5 w-5" />
          Customer Information
        </CardTitle>
        {!isSignedIn && (
          <CardDescription>
            Already have an account?{" "}
            <Button variant="link" className="p-0 h-auto text-primary underline cursor-pointer" onClick={() => openSignIn({ redirectUrl: '/checkout' })}>Sign In</Button>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className={errors.firstName && touched.firstName ? "text-destructive" : ""}>
              First Name
            </Label>
            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} onBlur={() => handleBlur("firstName")} className={errors.firstName && touched.firstName ? "border-destructive focus-visible:ring-destructive" : ""} required />
            {errors.firstName && touched.firstName && (
              <p className="text-sm font-medium text-destructive mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className={errors.lastName && touched.lastName ? "text-destructive" : ""}>
              Last Name
            </Label>
            <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} onBlur={() => handleBlur("lastName")} className={errors.lastName && touched.lastName ? "border-destructive focus-visible:ring-destructive" : ""} required />
            {errors.lastName && touched.lastName && (
              <p className="text-sm font-medium text-destructive mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className={errors.email && touched.email ? "text-destructive" : ""}>
            Email
          </Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} onBlur={() => handleBlur("email")} className={errors.email && touched.email ? "border-destructive focus-visible:ring-destructive" : ""} required />
          {errors.email && touched.email && <p className="text-sm font-medium text-destructive mt-1">{errors.email}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
