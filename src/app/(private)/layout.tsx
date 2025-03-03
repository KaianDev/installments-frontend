import type { PropsWithChildren } from "react"

import { DashboardHeader } from "@/components/layout/header"

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <DashboardHeader />
      {children}
    </div>
  )
}

export default DashboardLayout
