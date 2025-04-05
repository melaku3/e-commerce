import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold tracking-tight mb-2">Products Not Found</h1>
            <p className="text-muted-foreground mb-6 max-w-md">
                We couldn&apos;t find the products you&apos;re looking for. Please check back later or explore our other collections.
            </p>
            <Link href="/">
                <Button>Return to Home</Button>
            </Link>
        </div>
    )
}

