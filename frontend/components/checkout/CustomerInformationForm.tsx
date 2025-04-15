"use client"

import type React from "react"

import Link from "next/link"
import { User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CustomerInformationFormProps {
  formData: { firstName: string, lastName: string, email: string, }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isSignedIn: boolean
}

export function CustomerInformationForm({ formData, handleInputChange, isSignedIn }: CustomerInformationFormProps) {
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
            <Link href="/sign-in" className="text-primary underline">
              Sign in
            </Link>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
        </div>
      </CardContent>
    </Card>
  )
}
