import Image from "next/image"
import Link from "next/link"

import { LoginForm, LoginWithGoogle } from "@/components/auth"
import { FRONTEND_ROUTES } from "@/constants"

const Home = () => {
  return (
    <div className="grid h-full min-h-screen gap-8 p-8 lg:grid-cols-2">
      <main className="flex flex-col items-center justify-evenly gap-12">
        <header className="flex">
          <Link href={FRONTEND_ROUTES.HOME.href}>
            <Image
              src="/assets/images/logo.png"
              alt=""
              width={200}
              height={200}
            />
          </Link>
        </header>
        <div className="flex flex-col gap-4 lg:max-w-md">
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-semibold lg:text-[2.5rem]">
              Bem vindo de volta 👋
            </p>
          </div>
          <div className="text-muted-foreground text-sm leading-5 sm:text-base lg:text-lg">
            <p>
              Seu futuro financeiro começa aqui. Transforme números em decisões.
            </p>
          </div>
          <LoginForm />
          <div className="flex items-center gap-4">
            <div className="bg-muted h-px flex-1" />
            <p>ou</p>
            <div className="bg-muted h-px flex-1" />
          </div>
          <LoginWithGoogle />
          <p className="text-center text-sm sm:text-base">
            Ainda não possui uma conta?{" "}
            <Link href={FRONTEND_ROUTES.REGISTER.href} className="link">
              Registre-se já
            </Link>
            .
          </p>
        </div>
        <footer className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} - Todos os direitos reservados
        </footer>
      </main>
      <section className="relative hidden h-full items-center justify-center overflow-hidden rounded-3xl p-2 lg:flex">
        <Image
          src="/assets/images/bg-login.jpg"
          alt=""
          fill
          className="object-cover"
          quality={80}
        />
      </section>
    </div>
  )
}

export default Home
