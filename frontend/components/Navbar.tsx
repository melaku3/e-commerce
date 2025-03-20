"use client";
import { useAppContext } from '@/context/AppContext';
import { useClerk, UserButton } from '@clerk/nextjs';
import axios from "@/config/axios";
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import { FaGift, FaHome, FaShoppingBag, FaShoppingCart, FaRegUser } from "react-icons/fa";
import { useEffect } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const { user } = useAppContext();
    const { openSignIn } = useClerk();
    const router = useRouter();


    // register a user
    const registerUser = async () => {
        try {
            await axios.post('/auth/register', { clerkUserId: user?.id, email: user?.emailAddresses[0].emailAddress })
                .then(res => console.log(res.data.message));
        } catch (error) {
            console.log((error as any)?.response?.data?.message);
        }
    }

    useEffect(() => {
        if (user && user?.id) {
            registerUser();
        }
    }, [user]);

    return (
        <nav className='flex items-center justify-between text-gray-500'>
            {/* Logo Section */}
            <Link href={'/'}>
                <Image src={'/logo.png'} className='cursor-pointer' width={'200'} height={100} alt='Korah-store brand' priority />
            </Link>

            {/* Navigation Links */}
            <ul className='hidden md:flex items-center gap-5'>
                <li>
                    <Link href={'/'} className={`${pathname === '/' ? 'text-gray-950' : ''} hover:text-gray-950`}>Home</Link>
                </li>
                <li>
                    <Link href={'/all-products'} className={`${pathname === '/all-products' ? 'text-gray-950' : ''} hover:text-gray-950`}>Shop</Link>
                </li>
                <li>
                    <Link href={'/about'} className={`${pathname === '/about' ? 'text-gray-950' : ''} hover:text-gray-950`}>About us</Link>
                </li>
                <li>
                    <Link href={'/contact'} className={`${pathname === '/contact' ? 'text-gray-950' : ''} hover:text-gray-950`}>Contact</Link>
                </li>
            </ul>

            {/* User profile */}
            {user ? (
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
                    className='flex items-center gap-2 cursor-pointer hover:text-gray-950'
                    onClick={() => openSignIn()} >
                    <FaRegUser />
                    Account
                </button>
            )}

        </nav>
    )
}

