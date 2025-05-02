"use client"

import { useRouter } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Bell, LayoutDashboard, ShoppingCart, Settings, Home } from "lucide-react"
export default function AdminHeader() {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">

      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              {[1, 2, 3].map((i) => (
                <DropdownMenuItem key={i} className="cursor-pointer py-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">New order received #{1000 + i}</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Dropdown */}
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Action label="home" labelIcon={<Home />} onClick={() => router.push("/")} />
            <UserButton.Action label="Settings" labelIcon={<Settings />} onClick={() => router.push("/admin/settings")} />
            <UserButton.Action label="Dashboard" labelIcon={<LayoutDashboard />} onClick={() => router.push("/admin")} />
            <UserButton.Action label="Orders" labelIcon={<ShoppingCart />} onClick={() => router.push("/admin/orders")} />
          </UserButton.MenuItems>
        </UserButton>
      </div>
    </header>
  )
}
