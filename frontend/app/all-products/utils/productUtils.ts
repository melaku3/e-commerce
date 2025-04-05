import type { IProduct } from "@/config/types"

/**
 * Sorts products based on the provided sort option
 */
export function sortProducts(products: IProduct[], sortOption: string): IProduct[] {
    const sortedProducts = [...products]

    switch (sortOption) {
        case "price-low-high": return sortedProducts.sort((a, b) => a.price - b.price)
        case "price-high-low": return sortedProducts.sort((a, b) => b.price - a.price)
        case "newest": return sortedProducts.sort((a, b) => new Date(b._id).getTime() - new Date(a._id).getTime())
        case "rating": return sortedProducts.sort((a, b) => b.rating - a.rating)
        case "featured": return sortedProducts.sort((a, b) => b.rating - a.rating)
        default: return sortedProducts.sort((a, b) => b.rating - a.rating)
    }
}

/**
 * Filters products based on the provided filters
 */
export function filterProducts(products: IProduct[], categories: string[], brands: string[], colors: string[], priceRange: number[]): IProduct[] {
    return products.filter((product) => {
        // Filter by category
        if (categories.length > 0 && !categories.includes(product.category.name)) return false

        // Filter by brand
        if (brands.length > 0 && !brands.includes(product.brand)) return false

        // Filter by color
        if (colors.length > 0 && !product.color.some((c) => colors.includes(c))) return false


        // Filter by price range
        if (priceRange.length === 2) {
            if (product.price < priceRange[0] || product.price > priceRange[1]) {
                return false
            }
        }

        return true
    })
}

/**
 * Extracts available filter options from products
 */
export function extractAvailableFilters(products: IProduct[]) {
    if (!products.length) return { categories: [], brands: [], colors: [], priceRange: { min: 0, max: 1000 } }

    // Extract unique categories
    const categories = Array.from(new Set(products.map((product) => product.category.name)))

    // Extract unique brands
    const brands = Array.from(new Set(products.map((product) => product.brand)))

    // Extract unique colors (flatten the color arrays)
    const colors = Array.from(new Set(products.flatMap((product) => product.color)))

    // Calculate min and max price
    const prices = products.map((product) => product.price)
    const min = Math.floor(Math.min(...prices))
    const max = Math.ceil(Math.max(...prices))

    return { categories, brands, colors, priceRange: { min, max }, }
}

