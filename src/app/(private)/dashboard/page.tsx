"use client"

import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/contexts/auth"

const DashboardPage = () => {
  const { user, logout } = useAuthContext()
  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <Button onClick={logout}>Logout</Button>
    </div>
  )
}

export default DashboardPage
