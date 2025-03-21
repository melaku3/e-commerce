"use client";
import { useAppContext } from '@/context/AppContext';
import { useClerk, UserButton } from '@clerk/nextjs';
import axios from "@/config/axios";
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import { FaGift, FaHome, FaShoppingBag, FaShoppingCart, FaRegUser } from "react-icons/fa";
import { useEffect, useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const { user, isSignedIn } = useAppContext();
    const { openSignIn } = useClerk();
    const router = useRouter();
    const [isRegistered, setIsRegistered] = useState(false);

    // Check if user exists
    const checkUserExists = async (clerkUserId: string) => {
        try {
            const res = await axios.get(`/auth/check-user/${clerkUserId}`);
            return res.data.exists;
        } catch (error) {
            console.error("Error checking user:", (error as unknown as { response: { data: { exists: boolean } } })?.response.data.exists);
            return false;
        }
    };

    // Register user
    const registerUser = async () => {
        if (!user) return;
        const alreadyRegistered = await checkUserExists(user.id);
        setIsRegistered(alreadyRegistered);
        if (alreadyRegistered) return;

        try {
            await axios.post('/auth/register', {
                clerkUserId: user.id,
                email: user.emailAddresses[0].emailAddress
            });
            setIsRegistered(true);
        } catch (error) {
            console.error("Registration failed:", (error as unknown as { response: { data: { message: string } } })?.response.data.message);
        }
    };

    // Register user on sign in
    useEffect(() => {
        if (isSignedIn && !isRegistered) {
            registerUser();
        }
    }, [isSignedIn, isRegistered]);

    return (
        <nav className='flex items-center justify-between text-gray-500'>
            {/* Logo Section */}
            <Link href={'/'}>
                <Image src={'/logo.png'} className='cursor-pointer' width={'200'} height={100} alt='Korah-store brand' priority />
            </Link>

            {/* Navigation Links */}
            <ul className='hidden md:flex items-center gap-5'>
                <li>
                    <Link href={'/'} className={`${pathname === '/' ? 'text-gray-950' : ''} hover:text-gray-950 ease-in-out duration-300`}>Home</Link>
                </li>
                <li>
                    <Link href={'/all-products'} className={`${pathname === '/all-products' ? 'text-gray-950' : ''} hover:text-gray-950 ease-in-out duration-300`}>Shop</Link>
                </li>
                <li>
                    <Link href={'/about'} className={`${pathname === '/about' ? 'text-gray-950' : ''} hover:text-gray-950 ease-in-out duration-300`}>About us</Link>
                </li>
                <li>
                    <Link href={'/contact'} className={`${pathname === '/contact' ? 'text-gray-950' : ''} hover:text-gray-950 ease-in-out duration-300`}>Contact</Link>
                </li>
            </ul>

            {/* User profile */}
            {isSignedIn ? (
                <UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action label='Home' labelIcon={<FaHome />} onClick={() => router.push('/')} />
                    </UserButton.MenuItems>

                    <UserButton.MenuItems>
                        <UserButton.Action label='Products' labelIcon={<FaGift />} onClick={() => router.push('/all-products')} />
                    </UserButton.MenuItems>

                    <UserButton.MenuItems>
                        <UserButton.Action label='My Orders' labelIcon={<FaShoppingBag />} onClick={() => router.push('/my-orders')} />
                    </UserButton.MenuItems>

                    <UserButton.MenuItems>
                        <UserButton.Action label='Cart' labelIcon={<FaShoppingCart />} onClick={() => router.push('/cart')} />
                    </UserButton.MenuItems>
                </UserButton>
            ) : (
                <button
                    className='flex items-center gap-2 cursor-pointer hover:text-gray-950 ease-in-out duration-300'
                    onClick={() => openSignIn()} >
                    <FaRegUser />
                    Account
                </button>
            )}
        </nav>
    );
}
