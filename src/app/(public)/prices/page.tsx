import type { Metadata } from "next"

import { FRONTEND_ROUTES } from "@/constants"

export const metadata: Metadata = {
  title: FRONTEND_ROUTES.PLANS.title,
}

const PricePage = () => {
  return <div>Price page</div>
}

export default PricePage
