// File: hooks/useProducts.ts
"use client"

import { useEffect, useCallback } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiClient, apiRequest } from "@/lib/apiClient"
import { usePagination } from "@/hooks/usePagination"
import { useLoading } from "@/hooks/useLoading"
import { useUser } from "@/hooks/useUser"
import { toast } from "sonner"
import type { Product, PaginatedResponse, ApiResponse, CreateProductRequest, UpdateProductRequest } from "@/types/api"

export type SortOption = 'newest' | 'oldest' | 'price-low' | 'price-high' | 'name-asc' | 'name-desc'
export type FilterOptions = {
  category?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  search?: string
  [key: string]: any
}

export interface ProductsOptions {
  sort?: SortOption
  filters?: FilterOptions
}

export function useProducts(options: ProductsOptions = {}) {
  const apiClient = useApiClient()
  const queryClient = useQueryClient()
  const { isAdmin } = useUser()
  const pagination = usePagination()
  const loading = useLoading()

  const { currentPage, itemsPerPage, updatePaginationData, setCurrentPage, setItemsPerPage } = pagination
  const { isLoading: isAppLoading, setIsLoading } = loading
  const { sort = 'newest', filters = {} } = options

  const buildQueryParams = useCallback(() => {
    const params = new URLSearchParams({
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
      sort
    })
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString())
      }
    })
    return params.toString()
  }, [currentPage, itemsPerPage, sort, filters])

  const { data, isLoading, error, refetch } = useQuery<PaginatedResponse<Product>>({
    queryKey: ['products', currentPage, itemsPerPage, sort, filters],
    queryFn: async () => {
      const queryParams = buildQueryParams()
      const response = await apiRequest<ApiResponse<{
        products: Product[]
        page: number
        totalPages: number
        totalProducts: number
      }>>(apiClient, { url: `/products?${queryParams}`, method: 'GET' })

      return {
        items: response.products || [],
        page: response.page || 1,
        totalPages: response.totalPages || 1,
        totalItems: response.totalProducts || 0
      }
    }
  })

  useEffect(() => {
    if (data) {
      updatePaginationData({
        totalPages: data.totalPages,
        totalItems: data.totalItems,
        currentPage: data.page
      })
    }
  }, [data])

  const { mutate: createProduct, isPending: isCreating } = useMutation({
    mutationFn: async (productData: CreateProductRequest) => {
      if (!isAdmin) throw new Error('Unauthorized')
      return apiRequest<ApiResponse<{ product: Product }>>(apiClient, {
        url: '/products',
        method: 'POST',
        data: productData
      })
    },
    onSuccess: (data) => {
      toast.success('Product created')
      queryClient.invalidateQueries({ queryKey: ['products'] })
      if (data.product?.category) {
        queryClient.invalidateQueries({ queryKey: ['categories'] })
      }
    },
    onError: (error: any) => {
      toast.error('Create failed', {
        description: error.response?.data?.message || error.message
      })
    }
  })

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: UpdateProductRequest }) => {
      if (!isAdmin) throw new Error('Unauthorized')
      return apiRequest<ApiResponse<{ product: Product }>>(apiClient, {
        url: `/products/${id}`,
        method: 'PUT',
        data
      })
    },
    onSuccess: (data) => {
      toast.success('Product updated')
      queryClient.invalidateQueries({ queryKey: ['product', data.product?._id] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
      if (data.product?.category) {
        queryClient.invalidateQueries({ queryKey: ['categories'] })
      }
    },
    onError: (error: any) => {
      toast.error('Update failed', {
        description: error.response?.data?.message || error.message
      })
    }
  })

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: async (productId: string) => {
      if (!isAdmin) throw new Error('Unauthorized')
      return apiRequest<ApiResponse<{ message: string }>>(apiClient, {
        url: `/products/${productId}`,
        method: 'DELETE'
      })
    },
    onSuccess: () => {
      toast.success('Product deleted')
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error: any) => {
      toast.error('Delete failed', {
        description: error.response?.data?.message || error.message
      })
    }
  })

  const refreshProducts = useCallback((page?: number, limit?: number) => {
    if (page) setCurrentPage(page)
    if (limit) setItemsPerPage(limit)
    return refetch()
  }, [refetch])

  return {
    products: data?.items || [],
    isLoading: isLoading || isAppLoading,
    error,
    refreshProducts,
    createProduct: isAdmin ? createProduct : undefined,
    updateProduct: isAdmin ? updateProduct : undefined,
    deleteProduct: isAdmin ? deleteProduct : undefined,
    isCreating, isUpdating, isDeleting, setLoading: setIsLoading,
    pagination: {
      currentPage,
      totalPages: data?.totalPages || 1,
      totalProducts: data?.totalItems || 0,
      productsPerPage: itemsPerPage,
      setCurrentPage,
      setProductsPerPage: setItemsPerPage
    }
  }
}
