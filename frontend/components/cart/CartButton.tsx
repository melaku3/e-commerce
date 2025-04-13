"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/useCart"
import CartDrawer from "./CartDrawer"
import { Badge } from "@/components/ui/badge"

export default function CartButton() {
  const [open, setOpen] = useState(false)
  const { summary } = useCart()

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)} className="relative" aria-label={`Open cart with ${summary.itemCount} items`}>
        <ShoppingCart className="h-5 w-5" />
        {summary.itemCount > 0 && (
          <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"          >
            {summary.itemCount > 99 ? "99+" : summary.itemCount}
          </Badge>
        )}
      </Button>

      <CartDrawer open={open} onOpenChange={setOpen} />
    </>
  )
}

