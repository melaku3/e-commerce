import { ClerkProvider } from '@clerk/nextjs'
import { AppProvider } from '@/context/AppContext'
import Navbar from '@/components/Navbar'
import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'


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
            <header className='sticky top-0 z-50 bg-white border-b border-gray-400 p-4 sm:px-6 lg:px-8'>
              <Navbar />
            </header>
            <main className='relative w-full mx-auto sm:px-6 lg:px-20 py-8'>
              {children}
            </main>
            <footer>
              <Footer />
            </footer>
          </AppProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}