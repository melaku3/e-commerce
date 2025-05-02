import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { EyeIcon } from "lucide-react"

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    status: "processing",
    date: "2023-05-15",
    total: "$129.99",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    status: "shipped",
    date: "2023-05-14",
    total: "$79.95",
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    status: "delivered",
    date: "2023-05-13",
    total: "$249.50",
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    status: "cancelled",
    date: "2023-05-12",
    total: "$59.99",
  },
  {
    id: "ORD-005",
    customer: "Michael Wilson",
    status: "processing",
    date: "2023-05-11",
    total: "$189.00",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "processing":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
    case "shipped":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
    case "delivered":
      return "bg-green-100 text-green-800 hover:bg-green-100/80"
    case "cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-100/80"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
  }
}

export default function RecentOrdersTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest 5 orders from your store</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="text-right">{order.total}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
