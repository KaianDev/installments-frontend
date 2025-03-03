"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "@phosphor-icons/react"
import { Calendar as CalendarIcon } from "@phosphor-icons/react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useForm } from "react-hook-form"
import { NumericFormat } from "react-number-format"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import type { CreateExpenseSchemaProps } from "@/schemas/expenses/create-expense"
import { createExpenseSchema } from "@/schemas/expenses/create-expense"

export const CreateExpense = () => {
  const form = useForm<CreateExpenseSchemaProps>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      initialDate: new Date(),
      categoryId: "",
      quantityInstallments: 1,
      title: "",
      totalValue: "",
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data)
  })

  const formIsSubmitting = form.formState.isSubmitting

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus />
          Adicionar
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar nova despesa</SheetTitle>
          <SheetDescription>
            Preencha o formulário abaixo para adicionar uma nova despesa.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="flex h-full flex-col justify-between"
          >
            <div className="space-y-4 px-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Iphone 15"
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
                name="totalValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor total</FormLabel>
                    <FormControl>
                      <NumericFormat
                        thousandSeparator="."
                        decimalSeparator=","
                        fixedDecimalScale
                        decimalScale={2}
                        prefix="R$ "
                        maxLength={17}
                        customInput={Input}
                        placeholder="Valor total"
                        onValueChange={(values) => field.onChange(values.value)}
                        disabled={formIsSubmitting}
                        {...field}
                        onChange={() => {}}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantityInstallments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade de parcelas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        placeholder="Número de parcelas"
                        disabled={formIsSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="initialDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data da despesa</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                            disabled={formIsSubmitting}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={ptBR}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Data de início da despesa</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter className="mt-auto">
              <Button type="submit" disabled={formIsSubmitting}>
                Adicionar
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
