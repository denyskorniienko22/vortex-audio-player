import { handleErrorAction } from "@/helpers/handle-error-action"
import { DATABASE_TABLES } from "@/root/database-tables"
import { supabase } from "@/utils/supabase"

export const toggleFavoriteAction = async (
  user_id: string,
  audio_id: string,
  is_favorite: boolean,
) => {
  if (is_favorite) {
    const { error } = await supabase
      .from(DATABASE_TABLES.FAVORITES)
      .delete()
      .eq("user_id", user_id)
      .eq("audio_id", Number(audio_id))

    return handleErrorAction(error, "Failed to change to unfavorite audio")
  }

  const { error } = await supabase
    .from(DATABASE_TABLES.FAVORITES)
    .insert({ user_id: user_id, audio_id: audio_id })

  return handleErrorAction(error, "Failed to change to favorite audio")
}

export const addToPlaylistAction = async (
  playlist_id: string | number,
  audio_id: string,
) => {
  const { data: existingItem } = await supabase
    .from(DATABASE_TABLES.PLAYLIST_AUDIOS)
    .select("playlist_id, audio_id")
    .eq("playlist_id", playlist_id)
    .eq("audio_id", audio_id)
    .maybeSingle()

  if (existingItem) {
    return {
      success: true,
      error: "Audio is already in this playlist",
    }
  }

  const { error } = await supabase
    .from(DATABASE_TABLES.PLAYLIST_AUDIOS)
    .insert({ playlist_id, audio_id: Number(audio_id) })

  return handleErrorAction(error, "Failed to adding to your playlist")
}

export const removeFromPlaylistAction = async (
  playlist_id: string | number,
  audio_id: string,
) => {
  const { error } = await supabase
    .from(DATABASE_TABLES.PLAYLIST_AUDIOS)
    .delete()
    .eq("playlist_id", playlist_id)
    .eq("audio_id", audio_id)

  return handleErrorAction(error, "Failed to remove from audio from playlist")
}
