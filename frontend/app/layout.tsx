import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { AppProvider } from "@/context/AppContext"
import Navbar from "@/components/Navbar"
import type { Metadata } from "next"
import "./globals.css"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"

export const metadata: Metadata = {
  title: "Your Modern E-commerce Destination",
  description: "Korah-Store is a modern e-commerce platform offering a seamless shopping experience.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html className="light" style={{ colorScheme: "light" }}>
        <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AppProvider>
              <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
                  <Navbar />
                </div>
              </header>
              <main className="flex-1 w-full">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 max-w-7xl">{children}</div>
              </main>
              <footer className="border-t border-border/40 bg-muted/20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                  <Footer />
                </div>
              </footer>
            </AppProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

