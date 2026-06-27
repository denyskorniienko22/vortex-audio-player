import { handleErrorAction } from "@/helpers/handle-error-action"
import { DATABASE_TABLES } from "@/root/database-tables"
import { supabase } from "@/utils/supabase"

export const createPlaylistAction = async (
  playlist_title: string,
  user_id: string,
) => {
  const { error } = await supabase
    .from(DATABASE_TABLES.PLAYLISTS)
    .insert({ title: playlist_title, user_id })

  return handleErrorAction(error, "Failed to create playlist")
}

export const deletePlaylistAction = async (
  playlist_id: string,
  user_id: string,
) => {
  const { error } = await supabase
    .from(DATABASE_TABLES.PLAYLISTS)
    .delete()
    .eq("user_id", user_id)
    .eq("id", playlist_id)

  return handleErrorAction(error, "Failed to delete playlist")
}

export const changePlaylistTitleAction = async (
  playlist_id: string,
  user_id: string,
  new_title: string,
) => {
  const { error } = await supabase
    .from(DATABASE_TABLES.PLAYLISTS)
    .update({ title: new_title })
    .eq("user_id", user_id)
    .eq("id", playlist_id)

  return handleErrorAction(error, "Failed to change title")
}
