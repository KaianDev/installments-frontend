"use client"

import type { PropsWithChildren } from "react"

import { AuthContextProvider } from "@/contexts/auth"

export const Providers = ({ children }: PropsWithChildren) => {
  return <AuthContextProvider>{children}</AuthContextProvider>
}
