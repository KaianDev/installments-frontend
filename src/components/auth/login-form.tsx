"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FRONTEND_ROUTES } from "@/constants"
import { useAuthContext } from "@/contexts/auth"
import {
  loginWithCredentialsSchema,
  type LoginWithCredentialsSchemaProps,
} from "@/schemas/auth"

export const LoginForm = () => {
  const { login } = useAuthContext()
  const form = useForm<LoginWithCredentialsSchemaProps>({
    resolver: zodResolver(loginWithCredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    const response = await login(data)
    if (response) {
      toast.success("Login efetuado com sucesso")
      console.log(response)
    } else {
      toast.error("Erro ao fazer login")
    }
  })

  const formIsSubmitting = form.formState.isSubmitting

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="example@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Pelo menos 8 caracteres"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href={FRONTEND_ROUTES.FORGOT_PASSWORD.href}
            className="link ml-auto block w-fit text-sm underline"
          >
            Esqueceu a senha?
          </Link>

          <Button
            type="submit"
            size="lg"
            className="w-full cursor-pointer"
            disabled={formIsSubmitting}
          >
            {formIsSubmitting ? "Entrando..." : "Entrar"}
            {/* Entrar */}
          </Button>
        </form>
      </Form>
    </div>
  )
}
