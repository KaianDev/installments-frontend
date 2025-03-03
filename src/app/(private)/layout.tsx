import type { PropsWithChildren } from "react"

import { DashboardHeader } from "@/components/layout/header"

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <DashboardHeader />
      <main>{children}</main>
    </div>
  )
}

export default DashboardLayout
