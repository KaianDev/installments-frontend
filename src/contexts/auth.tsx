import { useRouter } from "next/navigation"
import type { PropsWithChildren } from "react"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import { loginWithCredentials } from "@/actions/auth"
import { logoutAction } from "@/actions/auth/logout"
import { AUTH } from "@/constants"
import type { LoginWithCredentialsSchemaProps } from "@/schemas/auth"
import type { AuthUser } from "@/types/auth-user"

interface IAuthContext {
  user: AuthUser | null
  login: (
    credentials: LoginWithCredentialsSchemaProps,
  ) => Promise<{ success: boolean }>
  logout: () => Promise<void>
}

export const authContext = createContext({} as IAuthContext)

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const setTimeoutIsLoading = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (isLoading) {
      const userFromStorage = localStorage.getItem(AUTH.USER)
      if (userFromStorage && !user) {
        setUser(JSON.parse(userFromStorage))
      }
      setTimeoutIsLoading()
    }
  }, [isLoading, setTimeoutIsLoading, user, router])

  const login = async (credentials: LoginWithCredentialsSchemaProps) => {
    const response = await loginWithCredentials(credentials)
    if (response && response.user) {
      setUser(response.user)
      localStorage.setItem(AUTH.USER, JSON.stringify(response.user))
      return { success: true }
    }
    return { success: false }
  }

  const logout = async () => {
    setUser(null)
    localStorage.removeItem(AUTH.USER)
    await logoutAction()
  }

  if (isLoading)
    return (
      <div className="bg-background fixed inset-0 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )

  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = authContext
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider")
  }
  return useContext(context)
}
