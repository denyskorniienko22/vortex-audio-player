import { useEffect } from "react"
import { useActionData, useLoaderData, useNavigation } from "react-router"
import { toast } from "sonner"

import type { playlistAction } from "../playlist.action"
import { PLAYLIST_INTENT } from "../playlist.constants"
import type { playlistLoader } from "../playlist.loader"

export const usePlaylistsPage = () => {
  const { playlists, totalCount, error } =
    useLoaderData<typeof playlistLoader>()

  const navigation = useNavigation()
  const actionData = useActionData<typeof playlistAction>()

  useEffect(() => {
    if (!actionData) return

    if (actionData.error) {
      toast.error(actionData.error || "Something went wrong")
      return
    }

    const intent = navigation.formData?.get("intent")

    switch (intent) {
      case PLAYLIST_INTENT.CREATE_PLAYLIST:
        toast.success("Successfully created playlist", {
          id: PLAYLIST_INTENT.CREATE_PLAYLIST,
        })
        break
      case PLAYLIST_INTENT.CHANGE_PLAYLIST_TITLE:
        toast.success("Successfully changed title", {
          id: PLAYLIST_INTENT.CHANGE_PLAYLIST_TITLE,
        })
        break
    }
  }, [actionData, navigation.state, navigation.formData])

  return { playlists, totalCount, error }
}
