"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { NAV_LINKS } from "@/constants"

export const NavLinks = () => {
  const pathname = usePathname()

  return (
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
  )
}
