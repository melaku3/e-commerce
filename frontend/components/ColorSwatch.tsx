"use client"

import type React from "react"

import { useCallback, useMemo } from "react"
import { cn } from "@/lib/utils"
import { COLOR_MAP } from "@/config/constants"

interface ColorSwatchProps {
  color: string
  selected?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

export default function ColorSwatch({ color, selected = false, onClick, className }: ColorSwatchProps) {
  const bgClass = useMemo(() => {
    if (COLOR_MAP[color.toUpperCase()]) {
      return COLOR_MAP[color.toUpperCase()]
    }

    if (color.startsWith("#") || color.startsWith("rgb") || color.startsWith("hsl")) {
      return ""
    }

    return "bg-gray-200"
  }, [color])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(e)
    }, [onClick])

  const buttonClasses = cn("w-6 h-6 rounded-full flex items-center justify-center transition-all", "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2", selected && "ring-2 ring-primary ring-offset-2", bgClass, className)

  const customStyle = useMemo(() => {
    if (color.startsWith("#") || color.startsWith("rgb") || color.startsWith("hsl")) {
      return { backgroundColor: color }
    }
    return {}
  }, [color])

  return (
    <button type="button" onClick={handleClick} className={buttonClasses} title={color} aria-label={`${color} color${selected ? " (selected)" : ""}`} aria-pressed={selected} style={customStyle} />
  )
}

