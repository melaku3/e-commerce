"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, ChevronLeft, ChevronRight } from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn("flex flex-col border-r bg-card transition-all duration-300", collapsed ? "w-[70px]" : "w-[250px]")}>
      <div className="flex h-14 items-center px-4 border-b">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-bold text-xl">Korah</span>
            <span className="text-muted-foreground">Admin</span>
          </Link>
        )}
        <Button variant="ghost" size="icon" className={cn("ml-auto", collapsed && "mx-auto")} onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 p-2">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", pathname === item.href ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
              <item.icon size={20} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        {!collapsed && <div className="text-xs text-muted-foreground">Korah Store v1.0.0</div>}
      </div>
    </div>
  )
}
