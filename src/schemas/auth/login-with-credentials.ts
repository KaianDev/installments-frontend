import { z } from "zod"

export const loginWithCredentialsSchema = z.object({
  email: z.string().email("O e-mail deve ser válido"),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
})

export type LoginWithCredentialsSchemaProps = z.infer<
  typeof loginWithCredentialsSchema
>
