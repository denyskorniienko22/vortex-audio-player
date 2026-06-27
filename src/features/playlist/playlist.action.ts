import { type ActionFunctionArgs,redirect } from "react-router"

import { ROUTES } from "@/root/routes"
import { supabase } from "@/utils/supabase"

import {
  changePlaylistTitleAction,
  createPlaylistAction,
  deletePlaylistAction,
} from "./playlist.api"
import { PLAYLIST_INTENT } from "./playlist.constants"

export const playlistAction = async ({ request }: ActionFunctionArgs) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return redirect(ROUTES.HOME)

  const formData = await request.formData()

  const intent = formData.get("intent")

  const playlist_id = formData.get("playlist_id") as string
  const playlist_title = formData.get("title") as string

  switch (intent) {
    case PLAYLIST_INTENT.CREATE_PLAYLIST:
      return createPlaylistAction(playlist_title, user.id)
    case PLAYLIST_INTENT.DELETE_PLAYLIST:
      return deletePlaylistAction(playlist_id, user.id)
    case PLAYLIST_INTENT.CHANGE_PLAYLIST_TITLE:
      return changePlaylistTitleAction(playlist_id, user.id, playlist_title)
  }
}
