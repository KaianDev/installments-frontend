"use client"
import { GoogleIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"

export const LoginWithGoogle = () => {
  return (
    <Button variant="secondary" size="lg">
      <GoogleIcon />
      Entrar com o google
    </Button>
  )
}
