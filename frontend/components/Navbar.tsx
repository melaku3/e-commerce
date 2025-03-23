"use client"

import { useAppContext } from "@/context/AppContext"
import { useClerk, UserButton } from "@clerk/nextjs"
import axios from "@/config/axios"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FaGift, FaHome, FaShoppingBag, FaShoppingCart, FaRegUser } from "react-icons/fa"
import { useCallback, useEffect, useState } from "react"
import { ThemeToggle } from "./ThemeToggle"

type ApiError = { response?: { data?: { message?: string, exists?: boolean } } }

export default function Navbar() {
    const pathname = usePathname()
    const { user, isSignedIn } = useAppContext()
    const { openSignIn } = useClerk()
    const router = useRouter()
    const [isRegistered, setIsRegistered] = useState<boolean>(false)

    // Check if user exists
    const checkUserExists = useCallback(async (clerkUserId: string): Promise<boolean> => {
        try {
            const res = await axios.get(`/auth/check-user/${clerkUserId}`)
            return res.data.exists
        } catch (error) {
            console.error("Error checking user:", (error as ApiError)?.response?.data?.exists)
            return false
        }
    }, [])

    // Register user
    const registerUser = useCallback(async (): Promise<void> => {
        if (!user) return

        try {
            const alreadyRegistered = await checkUserExists(user.id)
            setIsRegistered(alreadyRegistered)
            if (alreadyRegistered) return

            await axios.post("/auth/register", {
                clerkUserId: user.id,
                email: user.emailAddresses[0].emailAddress,
            })
            setIsRegistered(true)
        } catch (error) {
            console.error("Registration failed:", (error as ApiError)?.response?.data?.message)
        }
    }, [user, checkUserExists])

    // Register user on sign in
    useEffect(() => {
        if (isSignedIn && !isRegistered) {
            registerUser()
        }
    }, [isSignedIn, isRegistered, registerUser])

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/all-products", label: "Shop" },
        { href: "/about", label: "About us" },
        { href: "/contact", label: "Contact" },
    ]

    return (
        <nav className="flex items-center justify-between text-foreground">
            {/* Logo Section */}
            <Link href={"/"} className="flex items-center">
                <Image src={"/logo.png"} className="cursor-pointer dark:brightness-[1.2] dark:contrast-[1.2]" width={200} height={100} alt="Korah-store brand" priority />
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex items-center gap-5">
                {navLinks.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className={`relative py-2 ${pathname === link.href ? "font-medium text-primary" : "hover:text-primary transition-colors duration-200"}`}                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
                {/* Theme Toggle */}
                <ThemeToggle />

                {/* User profile */}
                {isSignedIn ? (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label="Home" labelIcon={<FaHome />} onClick={() => router.push("/")} />
                        </UserButton.MenuItems>

                        <UserButton.MenuItems>
                            <UserButton.Action label="Products" labelIcon={<FaGift />} onClick={() => router.push("/all-products")} />
                        </UserButton.MenuItems>

                        <UserButton.MenuItems>
                            <UserButton.Action label="My Orders" labelIcon={<FaShoppingBag />} onClick={() => router.push("/my-orders")} />
                        </UserButton.MenuItems>

                        <UserButton.MenuItems>
                            <UserButton.Action label="Cart" labelIcon={<FaShoppingCart />} onClick={() => router.push("/cart")} />
                        </UserButton.MenuItems>
                    </UserButton>
                ) : (
                    <button className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors duration-200" onClick={() => openSignIn()} aria-label="Sign in" >
                        <FaRegUser />
                        <span className="hidden sm:inline">Account</span>
                    </button>
                )}
            </div>
        </nav>
    )
}

