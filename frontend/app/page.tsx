"use client";
import AutoSlideCarouselProps from '@/components/AutoSlideCarousel';
import ProductCard from '@/components/ProductCard';
import Subscription from '@/components/Subscription';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  const { products, isLoading } = useProducts()
  const topRatedProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 5)

  return (
    <div className="flex flex-col space-y-16">
      <AutoSlideCarouselProps products={products} />
      <div className="container mx-auto py-8 px-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Top Rated Products</h2>
              <Link href="/all-products" className="text-primary hover:underline flex items-center gap-1">
                <span>View all</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
              {topRatedProducts.map((product) => (
                <ProductCard key={product._id} {...product} />
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Link href="/all-products">
                <Button variant="outline" size="lg" className="gap-2 group">
                  See More Products
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Subscription />
    </div>
  )
}

