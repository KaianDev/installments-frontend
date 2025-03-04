"use client"

import { getCoreRowModel, useReactTable } from "@tanstack/react-table"

import type { Installment } from "@/types/expenses"

import { DataTable } from "../ui/data-table"
import { InstallmentColumns } from "./columns"

interface ExpenseTableProps {
  installments: Installment[]
}

export const ExpenseTable = ({ installments }: ExpenseTableProps) => {
  const table = useReactTable({
    data: installments,
    columns: InstallmentColumns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  })

  return (
    <div>
      <DataTable table={table} columns={InstallmentColumns} />
    </div>
  )
}
