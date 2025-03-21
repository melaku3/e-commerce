import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

export default function Footer() {
    return (
        <div className='text-gray-500'>
            {/* Top Section */}
            <div className='flex flex-col sm:flex-row justify-between mx-auto gap-5 p-4 sm:px-6 lg:px-20 py-8'>
                {/* Top Left */}
                <div className='flex flex-col gap-3'>
                    <Link href='/'>
                        <Image src="/logo.png" alt="logo" width={150} height={50} />
                    </Link>
                    <p className='w-full sm:max-w-lg'>Korah-store is your one-stop shop for the latest trends and quality products. Shop with confidence and style!</p>
                </div>

                {/* Top Center */}
                <div className='flex flex-col gap-3'>
                    <h3 className='text-gray-950 text-lg sm:text-xl'>Company</h3>
                    <div className='flex flex-col gap-1'>
                        <Link href="/about" className='hover:text-gray-950 ease-in-out duration-300'>About Us</Link>
                        <Link href="/contact" className='hover:text-gray-950 ease-in-out duration-300'>Contact</Link>
                        <Link href="/faq" className='hover:text-gray-950 ease-in-out duration-300'>FAQ</Link>
                    </div>
                </div>

                {/* Top Right */}
                <div className='flex flex-col gap-3'>
                    <h3 className='text-gray-950 text-lg sm:text-xl'>Get in touch</h3>
                    <div className='flex flex-col gap-1'>
                        <Link href={'tel:+251952327974'} className='flex items-center gap-2 hover:text-gray-950 ease-in-out duration-300'><FaPhoneAlt /> +251952327974</Link>
                        <Link href={'mailto:emelaku63@gmail.com'} className='flex items-center gap-2 hover:text-gray-950 ease-in-out duration-300'><MdMailOutline /> emelaku63@gmail.com</Link>
                    </div>
                </div>
            </div>
            {/* Bottom Section */}
            <div className="text-center py-4 border-t border-gray-300">
                <p>Copyright 2025 &copy; Korah-store All right reserved.</p>
            </div>
        </div>
    )
}
