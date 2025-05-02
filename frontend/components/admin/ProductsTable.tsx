"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, MoreHorizontal, Search, Trash2 } from "lucide-react"
import ProductFormModal from "./ProductFormModal"
import type { Product } from "@/types/admin"

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    image: "/placeholder.svg?height=50&width=50",
    price: "$99.99",
    category: "Electronics",
    stock: 45,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Smart Watch",
    image: "/placeholder.svg?height=50&width=50",
    price: "$199.99",
    category: "Electronics",
    stock: 28,
    status: "In Stock",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    image: "/placeholder.svg?height=50&width=50",
    price: "$79.99",
    category: "Electronics",
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Laptop Sleeve",
    image: "/placeholder.svg?height=50&width=50",
    price: "$29.99",
    category: "Accessories",
    stock: 12,
    status: "Low Stock",
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    image: "/placeholder.svg?height=50&width=50",
    price: "$149.99",
    category: "Electronics",
    stock: 34,
    status: "In Stock",
  },
  {
    id: 6,
    name: "Ergonomic Mouse",
    image: "/placeholder.svg?height=50&width=50",
    price: "$59.99",
    category: "Accessories",
    stock: 23,
    status: "In Stock",
  },
  {
    id: 7,
    name: "USB-C Hub",
    image: "/placeholder.svg?height=50&width=50",
    price: "$49.99",
    category: "Accessories",
    stock: 8,
    status: "Low Stock",
  },
  {
    id: 8,
    name: "Wireless Charger",
    image: "/placeholder.svg?height=50&width=50",
    price: "$39.99",
    category: "Electronics",
    stock: 0,
    status: "Out of Stock",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Stock":
      return "bg-green-100 text-green-800 hover:bg-green-100/80"
    case "Low Stock":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
    case "Out of Stock":
      return "bg-red-100 text-red-800 hover:bg-red-100/80"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
  }
}

export default function ProductsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your product inventory</CardDescription>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="pl-8 w-full sm:w-[200px] md:w-[300px]" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-md">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="font-medium">{product.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(product.status)}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setEditingProduct(product)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {editingProduct && <ProductFormModal product={editingProduct} onClose={() => setEditingProduct(null)} />}
    </Card>
  )
}
