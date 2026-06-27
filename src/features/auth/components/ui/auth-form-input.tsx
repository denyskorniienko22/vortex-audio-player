import type { FieldPath, FieldValues, UseFormRegister } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface IAuthFormInputProps<TFieldValue extends FieldValues> {
  id: FieldPath<TFieldValue>
  register: UseFormRegister<TFieldValue>
  type?: string
  placeholder?: string
}

const AuthFormInput = <TFieldValue extends FieldValues>({
  id,
  register,
  type = "text",
  placeholder,
}: IAuthFormInputProps<TFieldValue>) => {
  return (
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      className={cn(
        "h-11 rounded-lg",
        "bg-zinc-950/50",
        "text-zinc-100",
        "border-zinc-800",
        "transition-all",
        "pl-10",
        "placeholder:text-zinc-600",
        "focus-visible:border-accent/50",
        "focus-visible:ring-1 focus-visible:ring-accent/50",
      )}
      {...register(id)}
    />
  )
}

export default AuthFormInput
