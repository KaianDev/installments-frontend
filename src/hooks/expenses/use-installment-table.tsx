import { getCoreRowModel, useReactTable } from "@tanstack/react-table"

import { InstallmentColumns } from "@/components/expenses/columns"
import type { Installment } from "@/types/expenses"

export const useInstallmentTable = (installments: Installment[]) => {
  const table = useReactTable({
    data: installments,
    columns: InstallmentColumns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  })

  return {
    table,
    columns: InstallmentColumns,
  }
}
