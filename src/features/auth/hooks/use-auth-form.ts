import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from "react"
import { type FieldValues,useForm } from "react-hook-form"
import { useActionData, useNavigation } from "react-router"
import { toast } from "sonner"
import type z from "zod"

import type { authAction } from "../auth.action"
import type { AuthIntentsType } from "../auth.constants"

interface IUseAuthFormProps<TFieldValues extends FieldValues> {
  intent: AuthIntentsType
  schema: z.ZodType<TFieldValues, any, any>
}

export const useAuthForm = <TFieldValues extends FieldValues>({
  intent,
  schema,
}: IUseAuthFormProps<TFieldValues>) => {
  const [isPasswordView, setIsPasswordView] = useState<boolean>(false)

  const navigation = useNavigation()
  const actionData = useActionData<typeof authAction>()

  const form = useForm<TFieldValues>({
    mode: "onChange",
    resolver: zodResolver(schema),
  })

  const handleTogglePasswordView = useCallback(
    () => setIsPasswordView((prevState) => !prevState),
    [],
  )

  const isSubmitting =
    navigation.formData?.get("intent") === intent && navigation.state !== "idle"

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error)
    }
  }, [actionData])

  return {
    isPasswordView,
    isSubmitting,
    handleTogglePasswordView,
    ...form,
  }
}
