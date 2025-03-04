import { getInstallments } from "@/data-access/expenses"

import { ExpenseTable } from "./table"

export const InstallmentArea = async () => {
  const installments = await getInstallments({})

  return (
    <div>
      <ExpenseTable installments={installments.content} />
    </div>
  )
}
