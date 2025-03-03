import "./globals.css"

import type { Metadata } from "next"
import { Nunito } from "next/font/google"

import { ResponsiveIndicator } from "@/components/shared/responsive-indicator"
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/providers"

const nunitoSans = Nunito({
  subsets: ["latin"],
  weight: ["1000", "200", "300", "400", "600", "700", "800", "900"],
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
      <body className={`${nunitoSans.className} antialiased`}>
        <Providers>{children}</Providers>
        <ResponsiveIndicator />
        <Toaster />
      </body>
    </html>
  )
}
