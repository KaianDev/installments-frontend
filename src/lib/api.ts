import { cookies } from "next/headers"

import { AUTH } from "@/constants"

export const buildURL = (endpoint: string, params?: Record<string, string>) => {
  if (params) {
    const url = new URL(`${endpoint}?${new URLSearchParams(params)}`)
    return url
  }

  const url = new URL(`${endpoint}`)
  return url
}

type ApiClientProps<B> = RequestInit & {
  endpoint: string
  method?: "GET" | "POST" | "PUT" | "DELETE"
  params?: Record<string, string>
  data?: B
  withToken?: boolean
  withOutResponse?: boolean
}

type ApiClientResponse<T> = {
  data: T
  success: boolean
}

export const apiClient = async <B, T>({
  endpoint,
  params,
  method = "GET",
  headers = {
    "Content-Type": "application/json",
  },
  data,
  withToken = false,
  withOutResponse = false,
  ...props
}: ApiClientProps<B>): Promise<ApiClientResponse<T>> => {
  const url = buildURL(endpoint, params)
  const options: RequestInit = {
    headers,
    method,
    ...props,
  }

  if (withToken) {
    const token = (await cookies()).get(AUTH.TOKEN)
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token?.value}`,
    }
  }

  if (method !== "GET" && data) {
    options.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(url.toString(), options)
    const dataJson = withOutResponse ? undefined : await response.json()
    console.log(response.status, response.headers)
    if (!response.ok) {
      throw new FetchError("Fetch failed", response)
    }

    if (response.status === 401) {
      throw new FetchError("Unauthorized", response)
    }

    return {
      data: dataJson as T,
      success: response.ok,
    }
  } catch (error) {
    if (error instanceof FetchError) {
      console.error(error.response)
    }
    throw new Error("Erro ao fazer a requisição")
  }
}

export class FetchError extends Error {
  response: Response
  // You can specify a more precise type if the response data has a known structure

  constructor(message: string, response: Response) {
    super(message)
    this.name = "FetchError"
    this.response = response
  }
}
