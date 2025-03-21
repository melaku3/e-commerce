import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Subscription() {
    return (
        <div className='flex flex-col items-center p-8 space-y-8'>
            <div className='flex flex-col space-y-2 text-center'>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-semibold'>Subscribe to our newsletter</h1>
                <p className='text-gray-500'>Stay updated with the latest news and offers.</p>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Email" />
                <Button type="submit">Subscribe</Button>
            </div>
        </div>
    )
}
