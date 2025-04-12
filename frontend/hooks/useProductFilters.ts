"use client"

import { useState, useMemo, useCallback } from "react"
import type { Product, AvailableFilters, ProductFilters } from "@/types/api"

export default function useProductFilters(products: Product[]) {
    const [filters, setFilters] = useState<ProductFilters>({ categories: [], brands: [], colors: [], priceRange: [0, 1000] })

    // Calculate available filter options based on products
    const availableFilters = useMemo<AvailableFilters>(() => {
        if (!products.length) return { categories: [], brands: [], colors: [], priceRange: { min: 0, max: 1000 }, }

        // Extract unique categories
        const categories = Array.from(new Set(products.map((product) => product.category.name)))

        // Extract unique brands
        const brands = Array.from(new Set(products.map((product) => product.brand))).filter((brand): brand is string => brand !== undefined)

        // Extract unique colors (flatten the color arrays)
        const colors = Array.from(new Set(products.flatMap((product) => product.color))).filter((color): color is string => color !== undefined)

        // Calculate min and max price
        const prices = products.map((product) => product.price)
        const min = Math.floor(Math.min(...prices))
        const max = Math.ceil(Math.max(...prices))

        return { categories, brands, colors, priceRange: { min, max } }
    }, [products])

    // Initialize price range when products load
    useState(() => {
        if (products.length && availableFilters.priceRange) {
            setFilters((prev) => ({
                ...prev,
                priceRange: [availableFilters.priceRange.min, availableFilters.priceRange.max],
            }))
        }
    })

    // Update filter function
    const updateFilter = useCallback((filterType: keyof ProductFilters, value: string | number[] | string[]) => {
        setFilters((prev) => {
            if (filterType === "priceRange" && Array.isArray(value) && value.every((v) => typeof v === "number")) {
                return {
                    ...prev,
                    [filterType]: value as number[],
                }
            }

            if (filterType === "categories" || filterType === "brands" || filterType === "colors") {
                if (typeof value === "string") {
                    const currentValues = prev[filterType] as string[]
                    // Toggle the value
                    if (currentValues.includes(value)) {
                        return {
                            ...prev,
                            [filterType]: currentValues.filter((v) => v !== value),
                        }
                    } else {
                        return {
                            ...prev,
                            [filterType]: [...currentValues, value],
                        }
                    }
                }
            }

            return prev
        })
    }, [])

    // Reset all filters
    const resetFilters = useCallback(() => {
        setFilters({ categories: [], brands: [], colors: [], priceRange: [availableFilters.priceRange.min, availableFilters.priceRange.max] })
    }, [availableFilters.priceRange])

    return { filters, updateFilter, resetFilters, availableFilters }
}