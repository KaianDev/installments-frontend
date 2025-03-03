import { type NextRequest, NextResponse } from "next/server"

import { AUTH, FRONTEND_ROUTES } from "./constants"

const authRoutes = [FRONTEND_ROUTES.HOME.href, FRONTEND_ROUTES.REGISTER.href]

export const middleware = (request: NextRequest) => {
  console.log("Middleware")
  const userIsLogged = request.cookies.has(AUTH.TOKEN)
  const { pathname } = request.nextUrl

  if (!userIsLogged && !authRoutes.includes(pathname)) {
    console.log("Not logged")
    return NextResponse.redirect(
      new URL(FRONTEND_ROUTES.HOME.href, request.url),
    )
  }

  if (userIsLogged && authRoutes.includes(pathname)) {
    return NextResponse.redirect(
      new URL(FRONTEND_ROUTES.DASHBOARD.href, request.url),
    )
  }

  return NextResponse.next()
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
