"use server"

import { format } from "date-fns"

import { ENDPOINTS } from "@/constants"
import { apiClient } from "@/lib/api"
import type { CreateExpenseSchemaProps } from "@/schemas/expenses"

export const createExpense = async (expense: CreateExpenseSchemaProps) => {
  const formattedExpense = {
    ...expense,
    initialDate: format(expense.initialDate, "yyyy-MM-dd"),
  }

  if (expense.categoryId === "") {
    delete formattedExpense.categoryId
  }

  console.log(JSON.stringify(formattedExpense))

  try {
    await apiClient({
      endpoint: ENDPOINTS.EXPENSE.CREATE_EXPENSE,
      method: "POST",
      data: formattedExpense,
      withOutResponse: true,
      withToken: true,
    })

    return { success: true }
  } catch (error) {
    console.log(error)
    return { success: false }
  }
}
