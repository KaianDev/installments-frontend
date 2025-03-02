"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { AUTH, FRONTEND_ROUTES } from "@/constants"

export const logoutAction = async () => {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH.TOKEN)
  redirect(FRONTEND_ROUTES.HOME.href)
}
