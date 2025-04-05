import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertTriangle className="h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold tracking-tight mb-2">Page Not Found</h1>
            <p className="text-muted-foreground mb-6 max-w-md">
                The page you&apos;re looking for doesn&apos;t exist or has been moved. Please check the URL or return to the homepage.
            </p>
            <Link href="/">
                <Button>Return to Home</Button>
            </Link>
        </div>
    )
}
