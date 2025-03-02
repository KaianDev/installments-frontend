"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"

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

export const LoginForm = () => {
  const form = useForm()

  return (
    <div>
      <Form {...form}>
        <form action="" className="space-y-4">
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

          <Button type="submit" size="lg" className="w-full cursor-pointer">
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  )
}
