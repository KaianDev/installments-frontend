import "./globals.css"

import type { Metadata } from "next"
import { Nunito } from "next/font/google"

const nunitoSans = Nunito({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "FinHub",
  description: "Sistema de gerenciamento financeiro pessoal",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${nunitoSans.variable} antialiased`}>{children}</body>
    </html>
  )
}
