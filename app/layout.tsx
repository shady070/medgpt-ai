import "./globals.css"
import { Poppins as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { Metadata } from "next"
import NavBar from "@/components/NavBar"

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "700", "200", "100", "300", "500", "600",],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "MedGpt",
  description: "Created By Hassan Malik",
};

export default function RootLayout({ children }: { children:ReactNode } ) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased bg-gradient-to-l from-[#0E0E10] to-[#5f5c5c]",
          fontSans.variable
        )}
      >
        <NavBar />
        {children}
      </body>
    </html>
  )
}
