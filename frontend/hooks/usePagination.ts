"use client"

import { useState, useCallback } from "react"

interface PaginationOptions {
  initialPage?: number
  initialLimit?: number
}

export function usePagination({ initialPage = 1, initialLimit = 10 }: PaginationOptions = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [itemsPerPage, setItemsPerPage] = useState(initialLimit)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const updatePaginationData = useCallback(
    (data: {
      totalPages?: number
      totalItems?: number
      currentPage?: number
    }) => {
      if (data.totalPages !== undefined) setTotalPages(data.totalPages)
      if (data.totalItems !== undefined) setTotalItems(data.totalItems)
      if (data.currentPage !== undefined) setCurrentPage(data.currentPage)
    },
    [],
  )

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1) page = 1
      if (page > totalPages) page = totalPages
      setCurrentPage(page)
    },
    [totalPages],
  )

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
  }, [currentPage, totalPages])

  const prevPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1)
  }, [currentPage])

  return {
    // State
    currentPage, itemsPerPage, totalPages, totalItems,
    // Setters
    setCurrentPage, setItemsPerPage, updatePaginationData,
    // Navigation helpers
    goToPage, nextPage, prevPage,
    // Computed properties
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
  }
}

