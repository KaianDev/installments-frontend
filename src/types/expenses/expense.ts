export interface Expense {
  id: string
  title: string
  totalValue: number
  quantityInstallments: number
  initialDate: string
  category: string | null
}
