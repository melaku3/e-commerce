"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"
import { FaLongArrowAltRight } from "react-icons/fa"
import { useAppContext } from "@/context/AppContext"

export interface Slide { id: string, text: string, image: string, link: string }

export default function AutoSlideCarousel() {
  const { slides } = useAppContext()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const totalSlides = slides?.length || 0

  // Handle automatic sliding
  useEffect(() => {
    if (isPaused || totalSlides === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused, totalSlides])

  // Navigate to a specific slide
  const goToSlide = useCallback((index: number): void => {
    setCurrentIndex(index)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent): void => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % totalSlides)
      }
    },
    [totalSlides],
  )

  if (!slides || slides.length === 0) {
    return <div className="w-full h-64 bg-muted flex items-center justify-center">No slides available</div>
  }

  return (
    <div className="relative outline-none" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onKeyDown={handleKeyDown} tabIndex={0} role="region" aria-label="Image carousel"    >
      <Carousel className="w-full overflow-hidden bg-muted dark:bg-muted/20 rounded-lg shadow-md">
        <CarouselContent style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: "transform 0.7s ease-in-out", }} className="flex items-center">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-12 gap-8">
                <div className="text-center md:text-left max-w-md">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                    Limited Offer
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">{slide.text}</h2>
                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                    <Link href={slide.link || "/all-products"} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-3 font-medium transition-colors"                    >
                      Shop Now
                    </Link>
                    <Link href={"/all-products"} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"                    >
                      Explore More
                      <FaLongArrowAltRight />
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

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`} aria-label={`Go to slide ${index + 1}`} aria-current={index === currentIndex ? "true" : "false"} />
        ))}
      </div>
    </div>
  )
}

