// Base response type for API responses
export interface ApiResponse<T> {
  message?: string
  error?: string
  [key: string]: any
}

// User types
export interface User {
  _id: string
  clerkUserId: string
  email: string
  role: "admin" | "user"
  createdAt: string
  updatedAt: string
}


export interface ILoggedUser {
  _id: string
  clerkUserId: string
  email: string
  role: string
}

// Product types
export interface Product {
  _id: string
  name: string
  slug: string
  description: string
  price: number
  category: Category
  images: string[]
  countInStock: number
  rating: number
  brand?: string
  tags?: string[]
  size?: string[]
  color?: string[]
  discountPrice?: number
  discountStartDate?: string
  discountEndDate?: string
  reviews?: Review[] | string[]
  createdAt: string
  updatedAt: string
}

// UpdateProductRequest  types
export interface UpdateProductRequest {
  name?: string
  description?: string
  price?: number
  images?: string[]
  category?: string
  stock?: number
  featured?: boolean
  colors?: string[]
  sizes?: string[]
}

export interface ProductFilters {
  categories: string[]
  brands: string[]
  colors: string[]
  priceRange: number[]
}

export interface AvailableFilters {
  categories: string[]
  brands: string[]
  colors: string[]
  priceRange: {
    min: number
    max: number
  }
}

// Category types
export interface Category {
  _id: string
  name: string
  description: string
  createdAt?: string
  updatedAt?: string
}

// Review types
export interface Review {
  _id: string
  productId: string
  userId: string
  rating: number
  comment?: string
  createdAt: string
  updatedAt: string
}

// ReviewByProductId types
export interface ReviewByProductIdResponse {
  _id: string
  productId: {
    _id: string
    name: string
    slug: string
    price: number
    rating: number
  }
  userId: {
    _id: string
    email: string
  }
  rating: number
  comment?: string
  createdAt: string
  updatedAt: string
}

// Pagination types
export interface PaginatedResponse<T> {
  page: number
  totalPages: number
  totalItems: number
  items: T[]
}

// API request types
export interface CreateReviewRequest {
  productId: string
  userId: string
  rating: number
  comment?: string
}

export interface CreateProductRequest {
  name: string
  slug: string
  description: string
  price: number
  category: string
  countInStock: number
  rating?: number
  brand?: string
  tags?: string[]
  size?: string[]
  color?: string[]
  discountPrice?: number
  discountStartDate?: string
  discountEndDate?: string
}

export interface CreateCategoryRequest {
  name: string
  description: string
}

export interface RegisterUserRequest {
  clerkUserId: string
  email: string
  role?: "admin" | "user"
}

export interface CartItem {
  _id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  color?: string | null
  size?: string | null
  countInStock: number
}

export interface CartSummary {
  subtotal: number
  shipping: number
  tax: number
  total: number
  itemCount: number
}

export interface UseCartReturn {
  // Cart state
  items: CartItem[]
  summary: CartSummary

  // Cart actions
  addToCart: (product: Product, options: { quantity: number; color?: string | null; size?: string | null }) => void
  updateQuantity: (itemId: string, quantity: number) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void

  // Cart state
  isLoading: boolean
  isSyncing: boolean
}

// Order types
export interface OrderItem {
  name: string
  image: string
  price: number
  quantity: number
  productId: string
}

export interface ShippingAddress {
  fullName: string
  street: string
  city: string
  region: string
  postalCode: string
  country: string
}

export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled"

export interface OrderPayload {
  orderItems: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  isPaid?: boolean
  paidAt?: Date
  isDelivered?: boolean
  deliveredAt?: Date
  status?: OrderStatus
}
