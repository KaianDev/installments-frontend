import { EyeIcon, EyeOffIcon } from "lucide-react"
import { forwardRef, useState } from "react"

import { cn } from "@/lib/utils"

import { Button } from "./button"
import { Input } from "./input"

export type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleTogglePassword = () => {
      setShowPassword((prev) => !prev)
    }

    return (
      <div className="relative space-y-2">
        <Input
          type={showPassword ? "text" : "password"}
          {...props}
          ref={ref}
          className={cn("pr-9", className)}
        />
        <Button
          variant="ghost"
          type="button"
          size="icon"
          className="absolute right-1.5 bottom-1.5 size-7"
          onClick={handleTogglePassword}
        >
          {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
          <span className="sr-only">Toggle password visibility</span>
        </Button>
      </div>
    )
  },
)

PasswordInput.displayName = "PasswordInput"
