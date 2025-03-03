import { CreateExpense } from "@/components/expenses"

const ExpensePage = () => {
  return (
    <div className="max-w-app mx-auto p-8">
      <div className="flex items-center justify-between">
        <h1 className="title">Despensas</h1>

        <CreateExpense />
      </div>
    </div>
  )
}

export default ExpensePage
