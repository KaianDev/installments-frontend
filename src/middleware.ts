import { type NextRequest, NextResponse } from "next/server"

import { AUTH, FRONTEND_ROUTES } from "./constants"

export const middleware = (request: NextRequest) => {
  const loginRoute = request.nextUrl.pathname === FRONTEND_ROUTES.HOME.href
  const userIsLogged = request.cookies.has(AUTH.TOKEN)

  if (!userIsLogged) {
    return NextResponse.redirect(
      new URL(FRONTEND_ROUTES.HOME.href, request.url),
    )
  }

  if (loginRoute && userIsLogged) {
    return NextResponse.redirect(
      new URL(FRONTEND_ROUTES.DASHBOARD.href, request.url),
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
