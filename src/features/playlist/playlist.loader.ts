import { redirect } from "react-router"

import { DATABASE_TABLES } from "@/root/database-tables"
import { ROUTES } from "@/root/routes"
import { supabase } from "@/utils/supabase"

import type { PlaylistsLoaderType, PlaylistType } from "./playlist.types"

export const playlistLoader = async (): Promise<
  PlaylistsLoaderType | Response
> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return redirect(ROUTES.HOME)

    const { data, error } = await supabase
      .from(DATABASE_TABLES.PLAYLISTS)
      .select("*")
      .eq("user_id", user.id)

    if (error) {
      const isNetwork =
        error.message?.toLowerCase().includes("fetch") ||
        error.message?.toLowerCase().includes("network") ||
        !navigator.onLine

      if (isNetwork) {
        return {
          playlists: [],
          totalCount: 0,
          error: "Network error. Please check your internet connection.",
        }
      }
    }

    const playlists = data as PlaylistType[]
    const totalCount = playlists.length || 0

    return { playlists, totalCount }
  } catch (networkError) {
    return {
      playlists: [],
      totalCount: 0,
      error: "Network error. Please check your internet connection.",
    }
  }
}
