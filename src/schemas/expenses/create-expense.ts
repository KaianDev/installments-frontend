import { z } from "zod"

export const createExpenseSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  totalValue: z.string().min(1, "O valor total é obrigatório"),
  quantityInstallments: z.coerce
    .number()
    .min(1, "A quantidade de parcelas é obrigatória"),
  initialDate: z.coerce.date(),
  categoryId: z.string().optional(),
})

export type CreateExpenseSchemaProps = z.infer<typeof createExpenseSchema>
