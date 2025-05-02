import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    image: "/placeholder.svg?height=50&width=50",
    sales: 124,
    revenue: "$12,400",
  },
  {
    id: 2,
    name: "Smart Watch",
    image: "/placeholder.svg?height=50&width=50",
    sales: 98,
    revenue: "$9,800",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    image: "/placeholder.svg?height=50&width=50",
    sales: 85,
    revenue: "$8,500",
  },
  {
    id: 4,
    name: "Laptop Sleeve",
    image: "/placeholder.svg?height=50&width=50",
    sales: 72,
    revenue: "$2,160",
  },
]

export default function TopProductsList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Top Products</CardTitle>
          <CardDescription>Best selling products this month</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-md">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                </div>
              </div>
              <div className="text-sm font-medium">{product.revenue}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
