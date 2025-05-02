import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function Loading() {
    return (
        <div className="flex flex-col space-y-8">
            <div className="space-y-2">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-4 w-64" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <Skeleton className="h-[500px] w-full" />
                </div>

                <div className="md:col-span-3">
                    <div className="flex justify-between items-center mb-6">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-10 w-32" />
                    </div>

                    <Separator className="mb-6" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="border rounded-lg overflow-hidden">
                                <Skeleton className="aspect-square w-full" />
                                <div className="p-4 space-y-2">
                                    <Skeleton className="h-4 w-2/3" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-6 w-1/4 mt-2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

