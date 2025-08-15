import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import MatrixRain from "@/components/matrix-rain"
import CustomCursor from "@/components/custom-cursor"
import WebSphere from "@/components/web-sphere"
//new changes
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Prajjwal Kandpal - Cybersecurity Specialist",
  description: "Expert cybersecurity solutions - Defending the Digital Frontier",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
html {
  font-family: ${dmSans.style.fontFamily};
  --font-sans: ${dmSans.variable};
  --font-mono: 'Courier New', monospace;
}
        `}</style>
      </head>
      <body className={dmSans.className}>
        <MatrixRain />
        <WebSphere />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
