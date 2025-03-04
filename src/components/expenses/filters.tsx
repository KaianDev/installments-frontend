import { MagnifyingGlass, TrashSimple } from "@phosphor-icons/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MONTHS } from "@/constants"

export const ExpenseFilters = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const getMonth = useCallback(() => {
    const currentDate = new Date()
    if (searchParams.get("month")) {
      return searchParams.get("month")!
    }
    const month = currentDate.getMonth() + 1
    if (month < 10) {
      return `0${month}`
    }
    return month.toString()
  }, [searchParams])

  const getYear = useCallback(() => {
    const currentDate = new Date()
    if (searchParams.get("year")) {
      return searchParams.get("year")!
    }
    return currentDate.getFullYear().toString()
  }, [searchParams])

  const form = useForm({
    defaultValues: {
      search: "",
      month: getMonth(),
      year: getYear(),
    },
  })

  const hasSearch = !!searchParams.get("search")

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 10 }, (_, index) => currentYear - index)
    return years
  }, [])

  const handleSubmit = form.handleSubmit((data) => {
    const params = new URLSearchParams(searchParams)

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    params.set("page", "1")

    router.push(`?${params.toString()}`)
  })

  const handleClearSearch = () => {
    form.setValue("search", "")
    const params = new URLSearchParams(searchParams)
    params.delete("search")
    router.push(`?${params.toString()}`)
  }
  return (
    <div className="flex-1">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full max-w-72">
                <FormControl>
                  <Input
                    placeholder="Pesquise pelo nome do gasto"
                    {...field}
                    type="search"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Selecione o mês" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {MONTHS.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-10 w-24">
                      <SelectValue placeholder="Selecione o ano" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit" size="icon" className="size-10 cursor-pointer">
            <span className="sr-only">Pesquisar</span>
            <MagnifyingGlass className="!size-6" weight="bold" />
          </Button>
          {hasSearch && (
            <Button
              variant="outline"
              className="h-10"
              onClick={handleClearSearch}
            >
              <TrashSimple className="!size-5" weight="bold" />
              Limpar Pesquisa
            </Button>
          )}
        </form>
      </Form>
    </div>
  )
}
