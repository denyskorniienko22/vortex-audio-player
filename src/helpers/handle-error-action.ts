import type { AuthError, PostgrestError } from "@supabase/supabase-js"
import { redirect } from "react-router"

import type { ActionResponseType } from "@/types/action-response"

export const handleErrorAction = (
  error: AuthError | PostgrestError | null,
  errorMessage?: string,
  redirectTo?: string,
): ActionResponseType | Response => {
  if (error) {
    return {
      success: false,
      error: errorMessage ? errorMessage : error.message,
    }
  }

  if (redirectTo) return redirect(redirectTo)

  return { success: true }
}
