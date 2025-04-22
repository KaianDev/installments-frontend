import type { Metadata } from "next"

import { FRONTEND_ROUTES } from "@/constants"

export const metadata: Metadata = {
  title: FRONTEND_ROUTES.DASHBOARD.title,
}

const DashboardPage = () => {
  return <div>...</div>
}

export default DashboardPage
