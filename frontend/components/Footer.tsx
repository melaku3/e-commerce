import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <div className='flex items-center justify-between p-4 sm:px-6 lg:px-8 text-gray-500'>
            <div className='flex items-center space-x-2'>
                <Link href={'/'}>
                    <Image src="/logo.png" alt="logo" width={100} height={100} />
                </Link>
                <p>&copy; 2025 Korah-store. All rights reserved.</p>
            </div>
            <ul className='flex items-center space-x-4'>
                <li>
                    <Link href="/" className='hover:text-gray-950 transition ease-in-out duration-300'>Privacy Policy</Link>
                </li>
                <li>
                    <Link href="/" className='hover:text-gray-950 transition ease-in-out duration-300'>Terms of Service</Link>
                </li>
                <li>
                    <Link href="/contact" className='hover:text-gray-950 transition ease-in-out duration-300'>Contact</Link>
                </li>
            </ul>
        </div>
    )
}
