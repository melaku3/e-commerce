// Common interfaces for admin components
export interface Order {
    id: string
    customer: string
    email: string
    status: "processing" | "shipped" | "delivered" | "cancelled"
    date: string
    total: string
    items: OrderItem[]
    address: string
    payment: string
  }
  
  export interface OrderItem {
    name: string
    quantity: number
    price: string
  }
  
  export interface Product {
    id: number
    name: string
    image: string
    price: string
    category: string
    stock: number
    status: "In Stock" | "Low Stock" | "Out of Stock"
    description?: string
  }
  
  export interface User {
    id: number
    name: string
    email: string
    avatar: string
    status: "active" | "inactive" | "banned"
    role: "admin" | "customer" | "moderator"
    orders: number
    joined: string
    lastActive: string
  }
  