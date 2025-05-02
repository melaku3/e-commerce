import ProductsTable from "@/components/admin/ProductsTable"
import ProductFormModal from "@/components/admin/ProductFormModal"

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <ProductFormModal />
      </div>
      <ProductsTable />
    </div>
  )
}
