import { DollarSign, ShoppingBag, Users, CreditCard } from 'lucide-react'
import StatCard from "@/components/admin/StatCard"
import RecentOrdersTable from "@/components/admin/RecentOrdersTable"
import TopProductsList from "@/components/admin/TopProductsList"

export default function AdminDashboard() {
  const isAdmin = false
  return (
    {isAdmin &&
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your store performance and recent activity
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value="$45,231.89" icon={<DollarSign className="h-4 w-4" />} trend={{ value: 12.5, isPositive: true }} />
        <StatCard title="Orders" value="356" icon={<ShoppingBag className="h-4 w-4" />} trend={{ value: 8.2, isPositive: true }} />
        <StatCard title="Customers" value="2,543" icon={<Users className="h-4 w-4" />} trend={{ value: 5.7, isPositive: true }} />
        <StatCard title="Avg. Order Value" value="$127.00" icon={<CreditCard className="h-4 w-4" />} trend={{ value: 1.3, isPositive: false }} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="md:col-span-2 lg:col-span-4">
          <RecentOrdersTable />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <TopProductsList />
        </div>
      </div>
    </div> : <></>}
  )
}
