import type { Metadata } from 'next'
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, } from '@clerk/nextjs'
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
          <header className="absolute flex right-0 items-center p-4 gap-4 h-16 ">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <section className='p-4 sm:px-6 lg:px-8'>
            {children}
          </section>
        </body>
      </html>
    </ClerkProvider>
  )
}