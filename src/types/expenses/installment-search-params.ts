import type { monthEnum } from "@/enums/months"

export interface InstallmentsSearchParams {
  page?: number
  pageSize?: number
  month?: monthEnum
  year?: number
  search?: string
  category?: string
}
