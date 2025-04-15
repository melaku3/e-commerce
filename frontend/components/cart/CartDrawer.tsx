"use client"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/useCart"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, summary, updateQuantity, removeFromCart, isLoading } = useCart()
  const router = useRouter()

  const handleCheckout = () => {
    router.push("/checkout")
    onOpenChange(false)
  }

  if (isLoading) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[85vh] max-h-[85vh]">
          <DrawerHeader className="px-4 pt-4 pb-0 md:px-6">
            <DrawerTitle className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Your Cart
            </DrawerTitle>
          </DrawerHeader>
          <div className="flex items-center justify-center h-[calc(85vh-140px)]">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh] max-h-[85vh]">
        <DrawerHeader className="px-4 pt-4 pb-0 md:px-6">
          <DrawerTitle className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Your Cart ({summary.itemCount} {summary.itemCount === 1 ? "item" : "items"})
          </DrawerTitle>
        </DrawerHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(85vh-140px)]">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mb-6">Add items to your cart to see them here.</p>
            <DrawerClose asChild>
              <Button>Continue Shopping</Button>
            </DrawerClose>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 h-[calc(85vh-280px)] overflow-y-auto px-4 md:px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} width={80} height={80} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium">
                        <h3>{item.name}</h3>
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center mt-2">
                        {item.color && (
                          <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: item.color }} aria-label={`Color: ${item.color}`} />
                        )}
                        {item.size && <span className="ml-2 text-sm text-muted-foreground">Size: {item.size}</span>}
                      </div>
                      <div className="flex items-center justify-between text-sm mt-2">
                        <div className="flex items-center border rounded-md">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none rounded-l-md" onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1} aria-label="Decrease quantity">
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none rounded-r-md" onClick={() => updateQuantity(item._id, item.quantity + 1)} disabled={item.quantity >= item.countInStock} aria-label="Increase quantity">
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item._id)} aria-label="Remove item">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="px-4 md:px-6 py-4 border-t">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span>${summary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Shipping</span>
                  <span>${summary.shipping.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tax</span>
                  <span>${summary.tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>${summary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <DrawerFooter className="px-4 py-4 md:px-6">
              <Button size="lg" onClick={handleCheckout}>
                Checkout
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Continue Shopping</Button>
              </DrawerClose>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}
