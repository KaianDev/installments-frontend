"use client"

import { DataTable } from "@/components/ui/data-table"
import { ViewTableColumns } from "@/components/ui/view-table-columns"
import { useInstallmentTable } from "@/hooks/expenses/use-installment-table"
import type { Installment } from "@/types/expenses"

import { InstallmentColumns } from "./columns"

interface ExpenseTableProps {
  installments: Installment[]
}

export const ExpenseTable = ({ installments }: ExpenseTableProps) => {
  const { table } = useInstallmentTable(installments)

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <ViewTableColumns table={table} />
      </div>
      <DataTable table={table} columns={InstallmentColumns} />
    </div>
  )
}
