import { Activity, type ElementType, type ReactNode } from "react"
import type { FieldErrors, FieldPath, FieldValues } from "react-hook-form"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface IAuthFormField<TFieldValue extends FieldValues> {
  id: FieldPath<TFieldValue>
  errors: FieldErrors<TFieldValue>
  label: string
  icon: ElementType
  children: ReactNode
}

const AuthFormField = <TFieldValue extends FieldValues>({
  id,
  errors,
  label,
  icon,
  children,
}: IAuthFormField<TFieldValue>) => {
  const FieldIcon = icon

  return (
    <div className="grid gap-2">
      <Label
        htmlFor={id}
        className="text-xs font-medium text-zinc-300 uppercase tracking-wider"
      >
        {label}
      </Label>
      <div className="relative">
        <FieldIcon
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2",
            "size-4",
            "text-zinc-500",
            "transition-colors",
            "group-focus-within:text-zinc-300",
          )}
        />
        {children}
      </div>
      <Activity mode={errors[id] ? "visible" : "hidden"}>
        <p className="text-red-500 font-semibold text-sm">
          {errors[id]?.message?.toString()}
        </p>
      </Activity>
    </div>
  )
}

export default AuthFormField
