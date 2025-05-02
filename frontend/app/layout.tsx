import type { ReactNode } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/ThemeProvider"
import QueryProvider from "@/providers/QueryProvider"
import "./globals.css"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html className="light" style={{ colorScheme: "light" }}>
          <body className="min-h-screen antialiased bg-background text-foreground">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  )
}
