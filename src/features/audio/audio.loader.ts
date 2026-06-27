import type { ActionFunctionArgs } from "react-router"

import { mapSupabaseAudio } from "@/helpers/map-supabase-audio"
import { DATABASE_TABLES } from "@/root/database-tables"
import type { AudioLoaderResponse } from "@/types/audio-loader-response"
import { supabase } from "@/utils/supabase"

import type { AudioType } from "./audio.types"

export const audioLoader = async ({
  request,
}: ActionFunctionArgs): Promise<AudioLoaderResponse> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const url = new URL(request.url)

    const searchTerm = url.searchParams.get("search")

    const genresTerm = url.searchParams.getAll("genre")
    const authorsTerm = url.searchParams.getAll("author")

    const statusesTerm = url.searchParams.getAll("status")
    const is_favorite = statusesTerm.find((favorite) => favorite === "Favorite")
    const is_unassigned = statusesTerm.find(
      (unassign) => unassign === "Not added to any playlist",
    )

    let query = supabase
      .from(DATABASE_TABLES.AUDIOS)
      .select(
        `*,
      is_favorite: favorites(user_id),
      playlists_ids: playlist_audios(playlist_id)
      `,
      )
      .eq(
        "favorites.user_id",
        user?.id || "00000000-0000-0000-0000-000000000000",
      )

    if (searchTerm) query = query.ilike("title", `%${searchTerm}%`)
    if (genresTerm.length > 0) query = query.in("genre", genresTerm)
    if (authorsTerm.length > 0) query = query.in("author_name", authorsTerm)

    const { data, error } = await query

    if (error) {
      const isNetwork =
        error.message?.toLowerCase().includes("fetch") ||
        error.message?.toLowerCase().includes("network") ||
        !navigator.onLine

      return {
        audios: [],
        totalCount: 0,
        error: isNetwork
          ? "Network error."
          : "Failed to load tracks. Please try again later or refresh the page.",
      }
    }

    let audios = data
      ?.map((audio: AudioType) => mapSupabaseAudio(audio, user?.id))
      .filter(Boolean) as AudioType[]

    if (is_favorite)
      audios = audios = audios.filter((audio) => audio.is_favorite === true)

    if (is_unassigned)
      audios = audios.filter(
        (audio) => !audio.playlists_ids || audio.playlists_ids.length === 0,
      )

    const totalCount = audios.length || 0

    return { audios, totalCount }
  } catch (networkError) {
    return {
      audios: [],
      totalCount: 0,
      error: "Network Error.",
    }
  }
}
