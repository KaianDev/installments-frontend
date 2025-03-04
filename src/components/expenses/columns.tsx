import { ArrowSquareOut, CheckCircle, XCircle } from "@phosphor-icons/react"
import type { ColumnDef } from "@tanstack/react-table"
import { addHours, format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/format-currency"
import type { Installment } from "@/types/expenses"

export const InstallmentColumns: ColumnDef<Installment>[] = [
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ row }) => {
      const title = row.original.expense.title
      return title
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: () => (
      <Badge
        variant="outline"
        className="border-table-border text-destructive w-fit items-center rounded-full border text-xs font-bold"
      >
        <div className="bg-destructive size-2 rounded-full" />
        Despesa
      </Badge>
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => {
      const category = row.original.expense.category
      return category || "-"
    },
  },
  {
    accessorKey: "installment",
    header: "Parcela",
    cell: ({ row }) => {
      const number = row.original.installmentNumber
      const quantity = row.original.quantityInstallments
      return `${number} / ${quantity}`
    },
    size: 40,
  },
  {
    accessorKey: "installmentValue",
    header: "Valor",
    cell: ({ row }) => {
      return formatCurrency(row.original.installmentValue)
    },
  },
  {
    accessorKey: "initialDate",
    header: "Data Inicial",
    cell: ({ row }) => {
      const date = row.original.initialDate
      return format(addHours(date, 3), "PPP", { locale: ptBR })
    },
  },
  {
    accessorKey: "isPaid",
    header: () => {
      return (
        <div className="flex w-full items-center justify-center">Pago?</div>
      )
    },
    cell: ({ row }) => {
      const isPaid = row.original.isPaid
      return isPaid ? (
        <CheckCircle weight="bold" size={24} className="text-primary" />
      ) : (
        <XCircle weight="bold" size={24} className="text-destructive" />
      )
    },
    size: 20,
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () => {
      return (
        <div className="flex justify-center">
          <Button
            className="hover:bg-background cursor-pointer"
            variant="ghost"
            size="icon"
          >
            <ArrowSquareOut size={24} weight="bold" />
          </Button>
        </div>
      )
    },
    enableHiding: false,
    enableResizing: false,
    enablePinning: false,
    size: 20,
  },
]
