"use client"

import Link from "next/link"
import { CheckCircle2, Home, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto  max-w-md py-16">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <CheckCircle2 className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
          <CardDescription>Thank you for your purchase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>We&apos;ve sent a confirmation email with your order details and tracking information.</p>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              Order #:{" "}
              <span className="font-medium text-foreground">ORD-{Math.floor(100000 + Math.random() * 900000)}</span>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/my-orders">
              <ShoppingBag className="mr-2 h-4 w-4" />
              View My Orders
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
