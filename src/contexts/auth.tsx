import type { PropsWithChildren } from "react"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import { loginWithCredentials } from "@/actions/auth"
import { AUTH } from "@/constants"
import type { LoginWithCredentialsSchemaProps } from "@/schemas/auth"

interface IUser {
  name: string
  email: string
}

interface IAuthContext {
  user: IUser | null
  login: (
    credentials: LoginWithCredentialsSchemaProps,
  ) => Promise<{ success: boolean }>
}

export const authContext = createContext({} as IAuthContext)

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const setTimeoutIsLoading = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    if (user) return
    setIsLoading(true)
    const userFromStorage = localStorage.getItem(AUTH.USER)
    if (!userFromStorage) return
    setUser(JSON.parse(userFromStorage))
    setTimeoutIsLoading()
  }, [isLoading, setTimeoutIsLoading, user])

  const login = async (credentials: LoginWithCredentialsSchemaProps) => {
    const response = await loginWithCredentials(credentials)
    if (response) {
      setUser(response.user)
      localStorage.setItem(AUTH.USER, JSON.stringify(response.user))
      return { success: true }
    }
    return { success: false }
  }

  if (isLoading)
    return (
      <div className="bg-background fixed inset-0 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )

  return (
    <authContext.Provider value={{ user, login }}>
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
