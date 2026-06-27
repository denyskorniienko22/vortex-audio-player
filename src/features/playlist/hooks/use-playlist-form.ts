import { zodResolver } from "@hookform/resolvers/zod"
import { type FieldValues,useForm } from "react-hook-form"
import { useNavigation } from "react-router"
import type { ZodType } from "zod"

interface IUsePlaylistFormProps<TFieldValues extends FieldValues> {
  intent: string
  schema: ZodType<TFieldValues, any, any>
}

export const usePlaylistForm = <TFieldValues extends FieldValues>({
  intent,
  schema,
}: IUsePlaylistFormProps<TFieldValues>) => {
  const navigation = useNavigation()

  const isSubmitting =
    navigation.formData?.get("intent") === intent && navigation.state !== "idle"

  const form = useForm<TFieldValues>({
    mode: "onChange",
    resolver: zodResolver(schema),
  })

  return {
    isSubmitting,
    ...form,
  }
}
