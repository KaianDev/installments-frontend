"use server"

import { cookies } from "next/headers"

import { AUTH, ENDPOINTS } from "@/constants"
import { apiClient } from "@/lib/api"
import type { LoginWithCredentialsSchemaProps } from "@/schemas/auth"
import type { AuthUser } from "@/types/auth-user"

export const loginWithCredentials = async (
  credentials: LoginWithCredentialsSchemaProps,
) => {
  try {
    const response = await apiClient<LoginWithCredentialsSchemaProps, AuthUser>(
      {
        endpoint: ENDPOINTS.AUTH.LOGIN_WITH_CREDENTIALS,
        method: "POST",
        data: credentials,
      },
    )

    if (!response) {
      throw new Error("Erro ao fazer login")
    }

    const cookieStore = await cookies()
    cookieStore.set({
      name: AUTH.TOKEN,
      value: response.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: response.expiresAt,
    })
    return {
      success: true,
      user: {
        ...response,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
    }
  }
}
