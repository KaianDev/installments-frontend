"use server"

import { cookies } from "next/headers"

import { AUTH, ENDPOINTS } from "@/constants"
import { MOCK } from "@/constants/mock"
import type { LoginWithCredentialsSchemaProps } from "@/schemas/auth"

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
    console.log(cookieStore.get(AUTH.TOKEN))

    const data = (await response.json()) as {
      accessToken: string
    }

    console.log(JSON.stringify(data))

    cookieStore.set(AUTH.TOKEN, data.accessToken)

    return {
      user: MOCK.USER,
      success: true,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
    }
  }
}
