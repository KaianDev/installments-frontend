"use server"

import { cookies } from "next/headers"

import { AUTH, ENDPOINTS } from "@/constants"
import type { LoginWithCredentialsSchemaProps } from "@/schemas/auth"
import type { AuthUser } from "@/types/auth-user"

export const loginWithCredentials = async (
  credentials: LoginWithCredentialsSchemaProps,
) => {
  try {
    const response = await fetch(ENDPOINTS.AUTH.LOGIN_WITH_CREDENTIALS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      throw new Error("Erro ao fazer login")
    }
    const cookieStore = await cookies()

    const data = (await response.json()) as AuthUser
    cookieStore.set(AUTH.TOKEN, data.accessToken)

    return {
      user: {
        ...data,
      },
      success: true,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
    }
  }
}
