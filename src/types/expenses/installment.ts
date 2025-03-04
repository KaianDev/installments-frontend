import type { Expense } from "./expense"

export interface Installment {
  id: string
  currentMonth: string
  installmentNumber: number
  installmentValue: number
  quantityInstallments: number
  isPaid: boolean
  initialDate: string
  expense: Expense
}
