"use client"

import { useState, useCallback, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ProductImagesProps } from "@/types/product"
import Image from "next/image"

export default function ProductImages({ images, productName }: ProductImagesProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Safely handle images array
  const safeImages = useMemo(() => {
    if (!images || !Array.isArray(images) || images.length === 0) {
      return ["https://res.cloudinary.com/dtolkvgly/image/upload/v1743674356/Placeholder-_-Glossary_dt50gb.svg"]
    }
    return images
  }, [images])

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % safeImages.length)
  }, [safeImages.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length)
  }, [safeImages.length])

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image src={safeImages[currentImageIndex]} alt={`${productName} - Image ${currentImageIndex + 1}`} className="object-cover object-center" fill sizes="(max-width: 768px) 100vw, 50vw" priority={currentImageIndex === 0} />
        {safeImages.length > 1 && (
          <>
            <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2bg-white/80 hover:bg-white/90 rounded-full" onClick={prevImage} aria-label="Previous image">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full" onClick={nextImage} aria-label="Next image">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {safeImages.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-1">
          {safeImages.map((image, index) => (
            <button key={index} className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md ${currentImageIndex === index ? "ring-2 ring-primary" : "ring-1 ring-gray-200"}`} onClick={() => setCurrentImageIndex(index)} aria-label={`View image ${index + 1}`}>
              <Image src={image} alt={`${productName} thumbnail ${index + 1}`} fill sizes="64px" className="object-cover object-center" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
