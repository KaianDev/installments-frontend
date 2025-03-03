"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FRONTEND_ROUTES, NAV_LINKS } from "@/constants"
import { useAuth } from "@/contexts/auth"

export const DashboardHeader = () => {
  const { user } = useAuth()
  const pathname = usePathname()

  return (
    <header className="border-b p-6">
      <div className="container mx-auto flex items-center justify-between">
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
          <nav>
            <ul className="flex gap-13">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-active={pathname === link.href}
                    className="data-[active=true]:text-primary text-muted-foreground hover:text-primary transition-all hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-bold text-white capitalize">{user?.name}</p>
          <Avatar>
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback className="bg-primary text-white">
              {user?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
