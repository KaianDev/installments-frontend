import { getInstallments } from "@/data-access/expenses"
import type { monthEnum } from "@/enums/months"

import { AppPagination } from "../shared/app-pagination"
import { ExpenseTable } from "./table"

interface InstallmentAreaProps {
  searchParams?: {
    month?: string
    year?: string
    search?: string
    pageSize?: string
  }
}

export const InstallmentArea = async ({
  searchParams,
}: InstallmentAreaProps) => {
  const installments = await getInstallments({
    ...searchParams,
    month: searchParams?.month ? (searchParams.month as monthEnum) : undefined,
    year: searchParams?.year ? parseInt(searchParams.year) : undefined,
    pageSize: searchParams?.pageSize
      ? parseInt(searchParams.pageSize)
      : undefined,
  })

  return (
    <div className="space-y-6">
      <ExpenseTable installments={installments.content} />
      <AppPagination
        pagination={{
          ...installments.page,
        }}
      />
    </div>
  )
}
