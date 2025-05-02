"use client";

import { memo } from "react";

interface ProductsHeaderProps {
  totalProducts: number;
  isLoading: boolean;
}

export const ProductsHeader = memo(function ProductsHeader({
  totalProducts,
  isLoading,
}: ProductsHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
      <p className="text-muted-foreground">
        {isLoading
          ? "Loading products..."
          : `Browse our collection of ${totalProducts} products`}
      </p>
    </div>
  );
});
