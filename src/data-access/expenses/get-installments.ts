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
    const month = params.month || currentDate.getMonth() + 1

    const response = await apiClient({
      endpoint: ENDPOINTS.EXPENSE.GET_INSTALLMENTS,
      params: {
        "page-size": pageSize.toString(),
        page: (page - 1).toString(),
        month: month.toString(),
        year: year.toString(),
        search: params.search || "",
        category: params.category || "",
      },
      withToken: true,
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
