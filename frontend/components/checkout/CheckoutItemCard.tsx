import Image from "next/image"
import type { CartItem } from "@/types/api"

interface CheckoutItemCardProps {
  item: CartItem
}

export function CheckoutItemCard({ item }: CheckoutItemCardProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-16 w-16 overflow-hidden rounded-md border bg-muted">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} width={64} height={64} className="h-full w-full object-cover" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex justify-between">
          <h4 className="font-medium leading-none">{item.name}</h4>
          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <p>Qty: {item.quantity}</p>
          {item.color && (
            <>
              <span className="mx-1">•</span>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full border" style={{ backgroundColor: item.color }} />
                <span>{item.color}</span>
              </div>
            </>
          )}
          {item.size && (
            <>
              <span className="mx-1">•</span>
              <span>Size: {item.size}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
