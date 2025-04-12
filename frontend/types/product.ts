import type { Product, Review } from "./api"

// Product options selected by the user
export interface ProductOptions {
  color: string | null
  size: string | null
  quantity: number
}

// Review form data
export interface ReviewFormData {
  rating: number
  comment: string
  name?: string
  email?: string
}

// Props for product components
export interface ProductImagesProps {
  images: string[]
  productName: string
}

export interface ProductInfoProps {
  product: Product
}

export interface ProductOptionsProps {
  product: Product
  onOptionsChange: (options: ProductOptions) => void
  initialOptions?: Partial<ProductOptions>
}

export interface ProductDescriptionProps {
  product: Product
}

export interface ProductAvailabilityProps {
  countInStock: number
  estimatedDelivery?: string
}

export interface ProductReviewsProps {
  productId: string
  onReviewAdded?: () => void
}

export interface ReviewItemProps {
  review: Review
}

