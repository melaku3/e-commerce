"use client"

import { useClerk, UserButton } from "@clerk/nextjs"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { FaGift, FaHome, FaShoppingBag, FaRegUser, FaUserCog } from "react-icons/fa"
import { ThemeToggle } from "./ThemeToggle"
import CartButton from "./cart/CartButton"
import { useUser } from "@/hooks/useUser"
import { useEffect, useState } from "react"

const Navbar = () => {
  const [hasMounted, setHasMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { isSignedIn, isAdmin } = useUser()
  const { openSignIn } = useClerk()

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-products", label: "Shop" },
    { href: "/about", label: "About us" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="flex items-center justify-between text-foreground">
      <div className="container h-16 max-w-screen-xl flex items-center justify-between px-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <Image src="https://res.cloudinary.com/dtolkvgly/image/upload/v1743677740/logo_yjqqmx.png" className="cursor-pointer dark:brightness-[1.2] dark:contrast-[1.2]" width={175} height={75} alt="Korah-store brand" priority style={{ width: "auto", height: "auto" }} />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`relative py-2 ${pathname === link.href ? "font-medium text-primary" : "hover:text-primary transition-colors duration-200"}`}>
                {link.label}
              </Link>
            </li>
          ))}

          {/* Admin Panel Link - Only shown to admin users */}
          {isAdmin && (
            <li>
              <Link href="/admin" className={`relative py-2 flex items-center gap-1.5 ${pathname.startsWith("/admin") ? "font-medium text-primary" : "hover:text-primary transition-colors duration-200"}`}>
                <span>Admin Panel</span>
              </Link>
            </li>
          )}
        </ul>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <CartButton />

          {isSignedIn ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="Home" labelIcon={<FaHome />} onClick={() => router.push("/")} />
                <UserButton.Action label="Products" labelIcon={<FaGift />} onClick={() => router.push("/all-products")} />
                <UserButton.Action label="My Orders" labelIcon={<FaShoppingBag />} onClick={() => router.push("/my-orders")} />
                {/* Admin Panel option in dropdown for mobile */}
                {isAdmin && (
                  <UserButton.Action label="Admin Panel" labelIcon={<FaUserCog />} onClick={() => router.push("/admin")} />
                )}
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary transition-colors duration-200" onClick={() => openSignIn()} aria-label="Sign in">
              <FaRegUser />
              <span className="hidden sm:inline">Account</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
