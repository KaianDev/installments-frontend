import Image from "next/image"
import Link from "next/link"

import { FRONTEND_ROUTES } from "@/constants"

import { AuthUserDropdown } from "./auth-user-dropdown"
import { NavLinks } from "./nav-links"

export const DashboardHeader = () => {
  return (
    <header className="border-b py-6">
      <div className="max-w-app mx-auto flex items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <div>
            <Link href={FRONTEND_ROUTES.DASHBOARD.href}>
              <Image
                src="/assets/images/logo.png"
                alt="Logo FinHub"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <NavLinks />
        </div>
        <AuthUserDropdown />
      </div>
    </header>
  )
}
