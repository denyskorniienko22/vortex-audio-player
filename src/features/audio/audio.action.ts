import { type ActionFunctionArgs,redirect } from "react-router"

import { ROUTES } from "@/root/routes"
import type { ActionResponseType } from "@/types/action-response"
import { supabase } from "@/utils/supabase"

import {
  addToPlaylistAction,
  removeFromPlaylistAction,
  toggleFavoriteAction,
} from "./audio.api"
import { AUDIO_INTENTS } from "./audio.constants"

export const audioAction = async ({
  request,
}: ActionFunctionArgs): Promise<ActionResponseType | Response | undefined> => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return redirect(ROUTES.HOME)

  const formData = await request.formData()

  const intent = formData.get("intent")

  const audioId = formData.get("audio_id") as string
  const is_favorite = formData.get("is_favorite") === "true"
  const playlist_id = formData.get("playlist_id") as string

  switch (intent) {
    case AUDIO_INTENTS.TOGGLE_FAVORITE:
      return toggleFavoriteAction(user.id, audioId, is_favorite)
    case AUDIO_INTENTS.ADD_TO_PLAYLIST:
      return addToPlaylistAction(playlist_id, audioId)
    case AUDIO_INTENTS.REMOVE_FROM_PLAYLIST:
      return removeFromPlaylistAction(playlist_id, audioId)
  }
}
