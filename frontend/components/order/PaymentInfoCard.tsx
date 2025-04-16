import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PaymentInfoCardProps {
  paymentMethod: string
  isPaid: boolean
}

export function PaymentInfoCard({ paymentMethod, isPaid }: PaymentInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{paymentMethod}</p>
        <div className="mt-4">
          <p className="text-sm font-medium">Payment Status</p>
          <p className="text-sm">
            {isPaid ? <span className="text-green-600">Paid</span> : <span className="text-amber-600">Not Paid</span>}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
