export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const ENDPOINTS = {
  AUTH: {
    LOGIN_WITH_CREDENTIALS: `${BASE_URL}/auth/login`,
  },
  EXPENSE: {
    CREATE_EXPENSE: `${BASE_URL}/expenses`,
    GET_INSTALLMENTS: `${BASE_URL}/installments`,
  },
}
