import { UserPlus } from "lucide-react"
import type { ReactNode } from "react"
import { Form } from "react-router"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

import type { AuthIntentsType } from "../../auth.constants"

interface IAuthFormProps {
  action: string
  intent: AuthIntentsType
  children: ReactNode
  btnText: string
  isValid: boolean
  isSubmitting: boolean
}

const AuthForm = ({
  action,
  btnText,
  intent,
  children,
  isValid,
  isSubmitting,
}: IAuthFormProps) => {
  return (
    <Form className="flex flex-col gap-5" action={action} method="post">
      <input type="hidden" name="intent" value={intent} />
      {children}
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        className={cn(
          "flex items-center justify-center gap-2",
          "w-full h-11 rounded-lg",
          "bg-zinc-50 shadow-lg shadow-black/20",
          "text-zinc-950 font-medium",
          "transition-all",
          "mt-2",
          "cursor-pointer",
          "hover:bg-zinc-200",
          "active:scale-[0.98]",
        )}
      >
        {isSubmitting ? <Spinner /> : <UserPlus className="size-4" />}
        {btnText}
      </Button>
    </Form>
  )
}

export default AuthForm
