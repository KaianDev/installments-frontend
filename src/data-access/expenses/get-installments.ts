import "server-only"

import { ENDPOINTS } from "@/constants"
import { apiClient } from "@/lib/api"
import type { Installment, InstallmentsSearchParams } from "@/types/expenses"

interface GetInstallmentsResponse {
  content: Installment[]
  page: {
    size: number
    number: number
    totalElements: number
    totalPages: number
  }
}

export const getInstallments = async ({
  page = 1,
  pageSize = 10,
  ...params
}: InstallmentsSearchParams) => {
  try {
    const currentDate = new Date()
    const year = params.year || currentDate.getFullYear()
    const getMonth = () => {
      if (params.month) {
        return params.month
      }

      if (currentDate.getDate() < 10) {
        return `0${currentDate.getMonth() + 1}`
      }

      return currentDate.getMonth() + 1
    }
    const month = getMonth()

    const response = await apiClient<GetInstallmentsResponse>({
      endpoint: ENDPOINTS.EXPENSE.GET_INSTALLMENTS,
      params: {
        ...params,
        "page-size": pageSize.toString(),
        page: (page - 1).toString(),
        month: month.toString(),
        year: year.toString(),
      },
      withToken: true,
      next: {
        tags: ["installments"],
      },
    })

    if (!response.success) {
      throw new Error("Erro ao buscar parcelas")
    }

    return response.data as GetInstallmentsResponse
  } catch (error) {
    console.error(error)
    return {
      content: [],
      page: {
        size: 0,
        number: 0,
        totalElements: 0,
        totalPages: 0,
      },
    } as GetInstallmentsResponse
  }
}
