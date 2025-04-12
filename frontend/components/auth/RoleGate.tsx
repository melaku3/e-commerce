"use client"

import type { ReactNode } from "react"
import { useUser } from "@/hooks/useUser"

interface RoleGateProps {
  children: ReactNode
  allowedRoles?: Array<"admin" | "user">
  fallback?: ReactNode
}

export function RoleGate({ children, allowedRoles = ["admin", "user"], fallback = null }: RoleGateProps) {
  const { loggedUser: user, isLoading } = useUser()

  // Show nothing while loading
  if (isLoading) {
    return null
  }

  // If user doesn't exist or role is not in allowed roles, show fallback
  if (!user || !allowedRoles.includes(user.role as "admin" | "user")) {
    return <>{fallback}</>
  }

  // User has allowed role, show children
  return <>{children}</>
}

