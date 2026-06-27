import { type LoaderFunctionArgs,redirect } from "react-router"

import { mapSupabaseAudio } from "@/helpers/map-supabase-audio"
import { DATABASE_TABLES } from "@/root/database-tables"
import { ROUTES } from "@/root/routes"
import { supabase } from "@/utils/supabase"

import type { AudioType } from "../audio/audio.types"
import type { PlaylistAudiosLoaderResultType } from "./playlist.types"

export const playlistAudiosLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<PlaylistAudiosLoaderResultType | Response> => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return redirect(ROUTES.HOME)

  const { playlist_id } = params

  const { data: playlist } = await supabase
    .from(DATABASE_TABLES.PLAYLISTS)
    .select(
      `
    id,
    title,
    created_at,
    playlist_audios (
      audio:audios (
        id,
        title,
        genre,
        audio_img,
        author_name,
        audio_url,
        is_favorite: favorites(user_id),
        playlists_ids: playlist_audios(playlist_id)
      )
    )
  `,
    )
    .eq("id", playlist_id)
    .eq("user_id", user.id)
    .single()

  if (!playlist) return redirect(ROUTES.USER_PLAYLISTS)

  const audios = playlist?.playlist_audios
    .map((audio: any) => mapSupabaseAudio(audio.audio, user.id))
    .filter(Boolean) as AudioType[]

  const totalCount = audios.length || 0

  return {
    audios,
    playlist: {
      id: playlist?.id,
      title: playlist?.title,
      totalCount,
    },
  }
}
