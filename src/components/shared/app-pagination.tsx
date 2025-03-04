"use client"

import { useRouter, useSearchParams } from "next/navigation"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface AppPaginationProps {
  pagination: {
    totalElements: number
    totalPages: number
    number: number
  }
}

export const AppPagination = ({ pagination }: AppPaginationProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedSize = parseInt(searchParams.get("pageSize") || "10")

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `?${params.toString()}`
  }

  const isFirstPage = pagination.number === 0
  const isLastPage = pagination.number === pagination.totalPages
  const totalPages = pagination.totalPages + 1

  const handleSelectPageSize = (pageSize: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("pageSize", pageSize)
    params.set("page", "1")
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2 text-sm font-semibold">
        <p>{pagination.number + 1}</p>
        de
        <p>{totalPages}</p>
      </div>
      <Pagination>
        <PaginationContent>
          {!isFirstPage && (
            <PaginationItem>
              <PaginationPrevious
                href={createPageURL(
                  pagination.number === 1 ? 1 : pagination.number - 2,
                )}
                className={cn(
                  "cursor-pointer",
                  isFirstPage && "text-muted-foreground cursor-default",
                )}
              />
            </PaginationItem>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            if (
              page === 1 ||
              page === totalPages ||
              (page >= pagination.number - 1 && page <= pagination.number + 1)
            ) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={createPageURL(page)}
                    isActive={page === pagination.number + 1}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            } else if (
              page === pagination.number - 2 ||
              page === pagination.number + 2
            ) {
              return (
                <PaginationItem key={page}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }
            return null
          })}
          {!isLastPage && (
            <PaginationItem>
              <PaginationNext
                href={createPageURL(pagination.number + 2)}
                className={cn(
                  "cursor-pointer",
                  isLastPage && "text-muted-foreground cursor-default",
                )}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
      <div className="flex flex-1 justify-end">
        <Select
          value={selectedSize.toString()}
          onValueChange={handleSelectPageSize}
          aria-label="Resultados por página"
        >
          <SelectTrigger
            id="results-per-page"
            className="w-fit whitespace-nowrap"
          >
            <SelectValue placeholder="Selecione o número de resultados" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 25, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize} / página
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
