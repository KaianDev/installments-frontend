import { CreateExpense, InstallmentArea } from "@/components/expenses"

const ExpensePage = () => {
  return (
    <div className="max-w-app mx-auto p-8">
      <header className="flex items-center justify-between">
        <h1 className="title">Despensas</h1>
        <CreateExpense />
      </header>

      <InstallmentArea />
    </div>
  )
}

export default ExpensePage
