import { handleErrorAction } from "@/helpers/handle-error-action"
import { ROUTES } from "@/root/routes"
import { supabase } from "@/utils/supabase"

export const loginAction = async (email: string, password: string) => {
  return supabase.auth
    .signInWithPassword({
      email,
      password,
    })
    .then(({ error }) => {
      if (error) {
        const isNetwork =
          error.message?.toLowerCase().includes("fetch") ||
          error.message?.toLowerCase().includes("network") ||
          !navigator.onLine

        if (isNetwork) {
          return {
            success: false,
            error:
              "Connection interrupted. Please check your internet connection.",
          }
        }
      }

      return handleErrorAction(
        error,
        "Failed to log in to your account",
        ROUTES.HOME,
      )
    })
    .catch((criticalError) => {
      console.error(criticalError)
      return {
        success: false,
        error: "Critical application error.",
      }
    })
}

export const registrationAction = async (email: string, password: string) => {
  return supabase.auth
    .signUp({ email, password })
    .then(({ error }) => {
      if (error) {
        const isNetwork =
          error.message?.toLowerCase().includes("fetch") ||
          error.message?.toLowerCase().includes("network") ||
          !navigator.onLine

        if (isNetwork) {
          return {
            success: false,
            error: "Network error. Please check your internet connection.",
          }
        }

        return handleErrorAction(
          error,
          "Failed to register account",
          ROUTES.HOME,
        )
      }
    })
    .catch((criticalError) => {
      console.error(criticalError)
      return {
        success: false,
        error: "Critical application error.",
      }
    })
}

export const logoutAction = async () => {
  return supabase.auth
    .signOut()
    .then(({ error }) => {
      if (error) {
        const isNetwork =
          error.message?.toLowerCase().includes("fetch") ||
          error.message?.toLowerCase().includes("network") ||
          !navigator.onLine

        if (isNetwork) {
          return {
            success: false,
            error: "Network error. Please check your internet connection.",
          }
        }

        return handleErrorAction(error, "Failed to log out from your account")
      }
    })
    .catch((criticalError) => {
      console.error(criticalError)
      return {
        success: false,
        error: "Critical application error.",
      }
    })
}
