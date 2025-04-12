import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import Navbar from "@/components/Navbar"
import "./globals.css"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"
import QueryProvider from "@/providers/QueryProvider"

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html className="light" style={{ colorScheme: "light" }}>
          <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
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
            </ThemeProvider>
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  )
}

