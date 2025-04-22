import { jwtDecode } from "jwt-decode"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { AUTH, FRONTEND_ROUTES } from "./constants"

const publicRoutes = [
  {
    path: FRONTEND_ROUTES.HOME.href,
    whenLogged: "redirect",
  },
  {
    path: FRONTEND_ROUTES.REGISTER.href,
    whenLogged: "redirect",
  },
  {
    path: FRONTEND_ROUTES.PLANS.href,
    whenLogged: "next",
  },
] as const
const REDIRECT_WHEN_NOT_LOGGED_ROUTE = FRONTEND_ROUTES.HOME.href

export const middleware = (request: NextRequest) => {
  // console.log("Middleware")
  // const userIsLogged = request.cookies.has(AUTH.TOKEN)
  // const { pathname } = request.nextUrl

  // if (!userIsLogged && !authRoutes.includes(pathname)) {
  //   console.log("Not logged")
  //   return NextResponse.redirect(
  //     new URL(REDIRECT_WHEN_NOT_LOGGED_ROUTE, request.url),
  //   )
  // }

  // if (userIsLogged && authRoutes.includes(pathname)) {
  //   console.log("User logged")
  //   return NextResponse.redirect(
  //     new URL(FRONTEND_ROUTES.DASHBOARD.href, request.url),
  //   )
  // }
  // console.log("No redirect")
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find((route) => route.path === path)

  const userIsLogged = request.cookies.has(AUTH.TOKEN)

  if (!userIsLogged && publicRoute) {
    return NextResponse.next()
  }

  if (!userIsLogged && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_LOGGED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }

  if (userIsLogged && publicRoute && publicRoute.whenLogged === "redirect") {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = FRONTEND_ROUTES.DASHBOARD.href
    return NextResponse.redirect(redirectUrl)
  }

  if (userIsLogged && !publicRoute) {
    const token = request.cookies.get(AUTH.TOKEN)

    if (token) {
      const decodedToken = jwtDecode(token.value) as { exp: number }
      const isExpired = decodedToken.exp < Date.now() / 1000
      if (isExpired) {
        request.cookies.delete(AUTH.TOKEN)
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = REDIRECT_WHEN_NOT_LOGGED_ROUTE
        return NextResponse.redirect(redirectUrl)
      }
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets/images/*).*)",
  ],
}
