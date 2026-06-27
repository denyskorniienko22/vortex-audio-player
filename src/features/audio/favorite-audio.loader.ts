import { redirect } from "react-router"

import { mapSupabaseAudio } from "@/helpers/map-supabase-audio"
import { DATABASE_TABLES } from "@/root/database-tables"
import { ROUTES } from "@/root/routes"
import { supabase } from "@/utils/supabase"

import type { AudioType } from "./audio.types"

export const favoriteAudioLoader = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return redirect(ROUTES.HOME)

  const { data } = await supabase
    .from(DATABASE_TABLES.FAVORITES)
    .select(
      `
        id,
        audio:audios (
          id,
          title,
          genre,
          audio_img,
          author_name,
          audio_url,
          playlists_ids: playlist_audios(playlist_id)
        )
      `,
    )
    .eq("user_id", user.id)

  const favoriteAudios = data
    ?.map((audio: any) => {
      const mapped = mapSupabaseAudio(audio.audio, user.id)
      if (!mapped) return null

      return {
        ...mapped,
        is_favorite: true,
      }
    })
    .filter(Boolean) as AudioType[]

  const totalCount = favoriteAudios.length || 0

  return {
    totalCount,
    audios: favoriteAudios,
  }
}
