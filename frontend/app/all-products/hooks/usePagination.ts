"use client"

import { useState, useMemo } from "react"
import type { IProduct } from "@/config/types"

interface UsePaginationProps {
  items: IProduct[]
  itemsPerPage: number
  initialPage?: number
}

export function usePagination({ items, itemsPerPage, initialPage = 1 }: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage)
  }, [items.length, itemsPerPage])

  // Get current items for the page
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }, [items, currentPage, itemsPerPage])

  // Reset to page 1 when items change significantly
  // This prevents showing an empty page if filters reduce the item count
  useMemo(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [totalPages, currentPage])

  // Navigation functions
  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(pageNumber)
  }

  const goToNextPage = () => goToPage(currentPage + 1)

  const goToPreviousPage = () => goToPage(currentPage - 1)

  return { currentPage, totalPages, currentItems, goToPage, goToNextPage, goToPreviousPage }
}

