import { z } from "zod"

export const createExpenseSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  totalValue: z
    .string()
    .min(1, "O valor total é obrigatório")
    .superRefine((value, ctx) => {
      if (value && Number(value) <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "O valor total deve ser maior que zero",
        })
      }
    }),

  quantityInstallments: z.coerce
    .number()
    .min(1, "A quantidade de parcelas é obrigatória"),
  initialDate: z.date({ message: "A data inicial é obrigatória" }),
  categoryId: z.string().optional(),
})

export type CreateExpenseSchemaProps = z.infer<typeof createExpenseSchema>
