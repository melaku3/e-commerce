"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EyeIcon, Search } from "lucide-react"
import type { Order, OrderItem } from "@/types/admin"

const orders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john.doe@example.com",
    status: "processing",
    date: "2023-05-15",
    total: "$129.99",
    items: [
      { name: "Wireless Headphones", quantity: 1, price: "$99.99" },
      { name: "USB-C Cable", quantity: 1, price: "$19.99" },
      { name: "Extended Warranty", quantity: 1, price: "$10.00" },
    ],
    address: "123 Main St, Anytown, CA 12345",
    payment: "Credit Card",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane.smith@example.com",
    status: "shipped",
    date: "2023-05-14",
    total: "$79.95",
    items: [{ name: "Bluetooth Speaker", quantity: 1, price: "$79.95" }],
    address: "456 Oak Ave, Somewhere, NY 67890",
    payment: "PayPal",
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    email: "robert.johnson@example.com",
    status: "delivered",
    date: "2023-05-13",
    total: "$249.50",
    items: [
      { name: "Smart Watch", quantity: 1, price: "$199.99" },
      { name: "Watch Band", quantity: 1, price: "$29.99" },
      { name: "Screen Protector", quantity: 1, price: "$19.99" },
    ],
    address: "789 Pine Ln, Elsewhere, TX 54321",
    payment: "Credit Card",
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    email: "emily.davis@example.com",
    status: "cancelled",
    date: "2023-05-12",
    total: "$59.99",
    items: [
      { name: "Phone Case", quantity: 1, price: "$29.99" },
      { name: "Wireless Charger", quantity: 1, price: "$29.99" },
    ],
    address: "321 Elm St, Nowhere, FL 13579",
    payment: "Credit Card",
  },
  {
    id: "ORD-005",
    customer: "Michael Wilson",
    email: "michael.wilson@example.com",
    status: "processing",
    date: "2023-05-11",
    total: "$189.00",
    items: [
      { name: "Mechanical Keyboard", quantity: 1, price: "$149.99" },
      { name: "Mouse Pad", quantity: 1, price: "$19.99" },
      { name: "USB Hub", quantity: 1, price: "$19.99" },
    ],
    address: "654 Maple Dr, Anywhere, WA 97531",
    payment: "PayPal",
  },
  {
    id: "ORD-006",
    customer: "Sarah Brown",
    email: "sarah.brown@example.com",
    status: "shipped",
    date: "2023-05-10",
    total: "$49.99",
    items: [{ name: "Wireless Mouse", quantity: 1, price: "$49.99" }],
    address: "987 Cedar Ct, Someplace, IL 24680",
    payment: "Credit Card",
  },
  {
    id: "ORD-007",
    customer: "David Miller",
    email: "david.miller@example.com",
    status: "delivered",
    date: "2023-05-09",
    total: "$299.99",
    items: [{ name: "Tablet", quantity: 1, price: "$299.99" }],
    address: "135 Birch Blvd, Othertown, GA 86420",
    payment: "Credit Card",
  },
  {
    id: "ORD-008",
    customer: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    status: "processing",
    date: "2023-05-08",
    total: "$89.97",
    items: [
      { name: "Wireless Earbuds", quantity: 1, price: "$69.99" },
      { name: "Carrying Case", quantity: 1, price: "$19.98" },
    ],
    address: "246 Spruce St, Anotherplace, MI 75319",
    payment: "PayPal",
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

export default function OrdersTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setDialogOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Orders</CardTitle>
              <CardDescription>View and manage customer orders</CardDescription>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search orders..." className="pl-8 w-full sm:w-[200px] md:w-[300px]" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{order.total}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order)}>
                          <EyeIcon className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>Complete information about order {selectedOrder?.id}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Customer Information</h3>
                  <p className="mt-1">{selectedOrder.customer}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Order Information</h3>
                  <p className="mt-1">
                    <Badge variant="outline" className={getStatusColor(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                  </p>
                  <p className="text-sm text-muted-foreground">Date: {selectedOrder.date}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Items</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item: OrderItem, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">{item.price}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={2} className="text-right font-medium">
                          Total
                        </TableCell>
                        <TableCell className="text-right font-medium">{selectedOrder.total}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Shipping Address</h3>
                  <p className="mt-1 text-sm">{selectedOrder.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
                  <p className="mt-1 text-sm">{selectedOrder.payment}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <Select defaultValue={selectedOrder.status}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Update Order</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
