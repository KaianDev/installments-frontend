"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { PasswordInput } from "@/components/ui/password-input"
import { FRONTEND_ROUTES } from "@/constants"
import { useAuth } from "@/contexts/auth"
import {
  loginWithCredentialsSchema,
  type LoginWithCredentialsSchemaProps,
} from "@/schemas/auth"

export const LoginForm = () => {
  const router = useRouter()
  const { login } = useAuth()
  const form = useForm<LoginWithCredentialsSchemaProps>({
    resolver: zodResolver(loginWithCredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    const response = await login(data)
    if (response.success) {
      toast.success("Login efetuado com sucesso")
      router.replace(FRONTEND_ROUTES.DASHBOARD.href)
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
                  <Input
                    placeholder="example@email.com"
                    {...field}
                    disabled={formIsSubmitting}
                  />
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
                  <PasswordInput
                    placeholder="Pelo menos 8 caracteres"
                    {...field}
                    disabled={formIsSubmitting}
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
          </Button>
        </form>
      </Form>
    </div>
  )
}
