import type { Metadata } from "next"

import { CreateExpense, InstallmentArea } from "@/components/expenses"
import { FRONTEND_ROUTES } from "@/constants"

export const metadata: Metadata = {
  title: FRONTEND_ROUTES.EXPENSES.title,
}

interface ExpensePageProps {
  searchParams?: Promise<{
    month?: string
    year?: string
    search?: string
  }>
}

const ExpensePage = async (props: ExpensePageProps) => {
  const searchParams = await props.searchParams

  return (
    <div className="max-w-app mx-auto space-y-6 p-8">
      <header className="flex items-center justify-between">
        <h1 className="title">Despensas</h1>
        <CreateExpense />
      </header>
      <InstallmentArea searchParams={searchParams} />
    </div>
  )
}

export default ExpensePage
