"use client"

import { memo } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import type { AvailableFilters, ProductFilters } from "@/types/api"

interface ProductFiltersProps {
  filters: ProductFilters
  availableFilters: AvailableFilters
  updateFilter: (filterType: keyof ProductFilters, value: string | number[] | string[]) => void
  resetFilters: () => void
}

const ProductFilters = memo(function ProductFiltersComponent({ filters, availableFilters, updateFilter, resetFilters, }: ProductFiltersProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, }).format(price)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="text-sm text-muted-foreground">
          Reset all
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price", "brands", "colors"]}>
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {availableFilters.categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category}`} checked={filters.categories.includes(category)} onCheckedChange={() => updateFilter("categories", category)} />
                  <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider defaultValue={[availableFilters.priceRange.min, availableFilters.priceRange.max]} min={availableFilters.priceRange.min} max={availableFilters.priceRange.max} step={1} value={filters.priceRange} onValueChange={(value) => updateFilter("priceRange", value)} />
              <div className="flex items-center justify-between">
                <span className="text-sm">{formatPrice(filters.priceRange[0])}</span>
                <span className="text-sm">{formatPrice(filters.priceRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {availableFilters.brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox id={`brand-${brand}`} checked={filters.brands.includes(brand)} onCheckedChange={() => updateFilter("brands", brand)} />
                  <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="colors">
          <AccordionTrigger>Colors</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {availableFilters.colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox id={`color-${color}`} checked={filters.colors.includes(color)} onCheckedChange={() => updateFilter("colors", color)} />
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: color.toLowerCase() }} />
                    <Label htmlFor={`color-${color}`} className="text-sm font-normal cursor-pointer">
                      {color}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
})

export { ProductFilters }

