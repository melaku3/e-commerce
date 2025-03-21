import { ClerkProvider } from '@clerk/nextjs'
import { AppProvider } from '@/context/AppContext'
import Navbar from '@/components/Navbar'
import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'E-Commerce Platform',
  description: 'A modern e-commerce platform built with Next.js and Clerk',
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <AppProvider>
            <header className='sticky top-0 border-b border-gray-400 p-4 sm:px-6 lg:px-8'>
              <Navbar />
            </header>
            <main className='relative w-full -z-50  mx-auto sm:px-6 lg:px-20 py-8'>
              {children}
            </main>
          </AppProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}