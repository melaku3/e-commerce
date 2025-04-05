"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface UseLazyLoadProps {
  threshold?: number
  rootMargin?: string
}

export function useLazyLoad({ threshold = 0.1, rootMargin = "0px" }: UseLazyLoadProps = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    if (entry.isIntersecting) setIsVisible(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold, rootMargin })
    const currentElement = elementRef.current

    if (currentElement) observer.observe(currentElement)

    return () => {
      if (currentElement) observer.unobserve(currentElement)
    }
  }, [handleObserver, rootMargin, threshold])

  return { elementRef, isVisible }
}

