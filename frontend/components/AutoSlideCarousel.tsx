"use client"

import type React from "react"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"
import { FaLongArrowAltRight, FaPause, FaPlay } from "react-icons/fa"
import { cn } from "@/lib/utils"
import ProductDetailDrawer from "@/components/ProductDetailDrawer"
import type { Product } from "@/types/api"

interface AutoSlideCarouselProps {
  products: Product[]
  count?: number
}

export default function AutoSlideCarousel({ products, count = 5 }: AutoSlideCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showDrawer, setShowDrawer] = useState(false)

  const slides = useMemo(() => {
    if (!products || products.length === 0) return []

    const shuffled = [...products].sort(() => 0.5 - Math.random()).slice(0, Math.min(count, products.length))

    return shuffled.map((product) => ({
      id: product._id,
      text: product.name,
      image: product.images[0] || "https://res.cloudinary.com/dtolkvgly/image/upload/v1743674356/Placeholder-_-Glossary_dt50gb.svg",
      link: `/all-products/${product._id}`,
      description: product.description,
      price: product.price,
    }))
  }, [products, count])

  const totalSlides = useMemo(() => slides?.length || 0, [slides])

  useEffect(() => {
    if (isPaused || totalSlides === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused, totalSlides])

  const goToSlide = useCallback((index: number): void => {
    setCurrentIndex(index)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent): void => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % totalSlides)
      } else if (e.key === "Space") {
        setIsPaused((prev) => !prev)
      }
    },
    [totalSlides]
  )

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev)
  }, [])

  const carouselStyle = useMemo(
    () => ({
      transform: `translateX(-${currentIndex * 100}%)`,
      transition: "transform 0.7s ease-in-out",
    }),
    [currentIndex]
  )

  if (totalSlides === 0) {
    return <div className="w-full h-64 bg-muted flex items-center justify-center rounded-lg">No products available</div>
  }

  return (
    <div className="relative outline-none" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onKeyDown={handleKeyDown} tabIndex={0} role="region" aria-label="Product carousel" aria-roledescription="carousel">
      <Carousel className="w-full overflow-hidden bg-muted dark:bg-muted/20 rounded-lg shadow-md">
        <CarouselContent style={carouselStyle} className="flex items-center" aria-live={isPaused ? "polite" : "off"}>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id || index} className="basis-full" role="group" aria-roledescription="slide" aria-label={`Slide ${index + 1} of ${totalSlides}`} aria-hidden={index !== currentIndex}>
              <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-12 gap-8">
                <div className="text-center md:text-left max-w-md">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                    Featured Product
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">{slide.text}</h2>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{slide.description}</p>
                  <p className="text-xl font-bold mb-4">${slide.price.toFixed(2)}</p>
                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                    <button
                      onClick={() => {
                        const product = products.find(p => p._id === slide.id)
                        if (product) {
                          setSelectedProduct(product)
                          setShowDrawer(true)
                        }
                      }}
                      className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-3 font-medium transition-colors" aria-label={`Open details for ${slide.text}`}>
                      Shop Now
                    </button>

                    <Link href="/all-products" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Explore more products">
                      Explore More
                      <FaLongArrowAltRight aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto max-w-md" style={{ height: "300px" }}>
                  <Image src={slide.image} alt={`Product: ${slide.text}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain rounded-lg" priority={index === 0} />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {selectedProduct && (
        <ProductDetailDrawer product={selectedProduct} open={showDrawer} onOpenChange={setShowDrawer} />
      )}

      <div className="absolute bottom-4 right-4 z-10">
        <button onClick={togglePause} className="bg-white/80 hover:bg-white text-primary p-2 rounded-full transition-colors" aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}>
          {isPaused ? <FaPlay size={14} /> : <FaPause size={14} />}
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Carousel navigation">
        {slides.map((slide, index) => (
          <button key={slide.id || index} onClick={() => goToSlide(index)} className={cn("w-3 h-3 rounded-full transition-all", index === currentIndex ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50")} aria-label={`Go to slide ${index + 1}`} aria-selected={index === currentIndex} role="tab" tabIndex={index === currentIndex ? 0 : -1} />
        ))}
      </div>
    </div>
  )
}
