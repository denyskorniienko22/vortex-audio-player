import { useFetcher, useRouteLoaderData } from "react-router"

import type { authAction } from "@/features/auth/auth.action"
import { AUTH_INTENTS } from "@/features/auth/auth.constants"
import type { rootLoader } from "@/root/root-loader"
import { ROUTES } from "@/root/routes"

export const useUserMenu = () => {
  const rootData = useRouteLoaderData<typeof rootLoader>("root")
  const user = rootData?.user

  const countFavorites = rootData?.countFavorites
  const countPlaylists = rootData?.countPlaylists

  const fetcher = useFetcher<typeof authAction>()

  const handleLogout = () => {
    fetcher.submit(
      {
        intent: AUTH_INTENTS.LOGOUT,
      },
      { method: "post", action: ROUTES.LOGOUT },
    )
  }

  return {
    user,
    countFavorites,
    countPlaylists,
    handleLogout,
  }
}
