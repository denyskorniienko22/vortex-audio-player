import type { PlaylistType } from "@/features/playlist/playlist.types"
import { supabase } from "@/utils/supabase"

export const rootLoader = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const { data } = await supabase
      .from("playlists")
      .select("*")
      .eq("user_id", user.id)

    const { count: countFavorites } = await supabase
      .from("favorites")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)

    const user_playlists = data as PlaylistType[]

    return {
      user,
      user_playlists,
      countPlaylists: user_playlists.length || 0,
      countFavorites,
    }
  } catch (networkError) {
    return {
      user: null,
      user_playlists: [],
      countPlaylists: 0,
      countFavorites: 0,
    }
  }
}
