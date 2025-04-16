import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ShippingAddress } from "@/types/api"

interface ShippingInfoCardProps {
  shippingAddress: ShippingAddress
  isDelivered: boolean
}

export function ShippingInfoCard({ shippingAddress, isDelivered }: ShippingInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="font-medium">{shippingAddress.fullName}</p>
          <p>{shippingAddress.street}</p>
          <p>{shippingAddress.city}, {shippingAddress.region} {shippingAddress.postalCode}</p>
          <p>{shippingAddress.country}</p>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium">Delivery Status</p>
          <p className="text-sm">
            {isDelivered ? (<span className="text-green-600">Delivered</span>) : (<span className="text-amber-600">Not Delivered</span>)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
