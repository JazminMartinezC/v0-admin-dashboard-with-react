import React from "react"
import type { Metadata, Viewport } from "next"
import { Nunito } from "next/font/google"

import "./globals.css"

const _nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Soporte Tecnico",
  description: "Panel de administracion de soporte tecnico y mesa de ayuda",
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${_nunito.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
