"use client"

import { Truck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ShippingMethodSelectorProps {
    shippingMethod: string
    setShippingMethod: (value: string) => void
    shippingCost: number
}

export function ShippingMethodSelector({ shippingMethod, setShippingMethod, shippingCost }: ShippingMethodSelectorProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Truck className="mr-2 h-5 w-5" />
                    Shipping Method
                </CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup defaultValue="standard" value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
                    <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex flex-1 justify-between cursor-pointer">
                            <div>
                                <p className="font-medium">Standard Shipping</p>
                                <p className="text-sm text-muted-foreground">Delivery in 3-5 business days</p>
                            </div>
                            <p className="font-medium">${shippingCost.toFixed(2)}</p>
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex flex-1 justify-between cursor-pointer">
                            <div>
                                <p className="font-medium">Express Shipping</p>
                                <p className="text-sm text-muted-foreground">Delivery in 1-2 business days</p>
                            </div>
                            <p className="font-medium">${(shippingCost + 10).toFixed(2)}</p>
                        </Label>
                    </div>
                </RadioGroup>
            </CardContent>
        </Card>
    )
}
