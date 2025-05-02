"use client";

import { useState, useMemo, useCallback } from "react";
import { ProductGrid } from "./components/ProductGrid";
import { ProductFilters } from "./components/ProductFilters";
import { ProductSort } from "./components/ProductSort";
import { ProductsHeader } from "./components/ProductsHeader";
import { Pagination } from "./components/Pagination";
import useProductFilters from "../../../hooks/useProductFilters";
import { filterProducts, sortProducts } from "./utils/productUtils";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useProducts } from "@/hooks/useProducts";

export default function AllProductsPage() {
  const { products, isLoading, pagination, refreshProducts } = useProducts();
  const { currentPage, totalPages, totalProducts, productsPerPage, setCurrentPage, setProductsPerPage } = pagination;

  const [sortOption, setSortOption] = useState<string>("featured");
  const { filters, availableFilters, updateFilter, resetFilters } = useProductFilters(products);

  // Apply filters and sorting
  const processedProducts = useMemo(() => {
    if (!products.length) return [];

    // First apply filters
    const filtered = filterProducts(products, filters.categories, filters.brands, filters.colors, filters.priceRange);

    // Then sort the filtered results
    return sortProducts(filtered, sortOption);
  }, [products, filters, sortOption]);

  const handleSortChange = useCallback((value: string) => {
    setSortOption(value);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setCurrentPage]);

  const handleItemsPerPageChange = useCallback((value: string) => {
    const newLimit = parseInt(value, 10);
    setProductsPerPage(newLimit);
    setCurrentPage(1);
    refreshProducts(1, newLimit);
  }, [setProductsPerPage, setCurrentPage, refreshProducts]);

  return (
    <div className="flex flex-col space-y-8">
      <ProductsHeader totalProducts={totalProducts} isLoading={isLoading} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProductFilters filters={filters} availableFilters={availableFilters} updateFilter={updateFilter} resetFilters={resetFilters} />
        </div>

        <div className="md:col-span-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {products.length} of {totalProducts} products
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
              <div className="flex items-center gap-2">
                <Label htmlFor="items-per-page" className="text-sm whitespace-nowrap">Items per page:</Label>
                <Select value={productsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                  <SelectTrigger id="items-per-page" className="w-[80px]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ProductSort sortOption={sortOption} onSortChange={handleSortChange} />
            </div>
          </div>

          <Separator className="mb-6" />

          <ProductGrid products={processedProducts} isLoading={isLoading} />

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
}
