export function ProductSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="aspect-square bg-gray-200 animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4 mt-2" />
      </div>
    </div>
  )
}

