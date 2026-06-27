import { useCallback, useEffect, useState } from "react"
import { useFetcher } from "react-router"
import { toast } from "sonner"

import { ROUTES } from "@/root/routes"

import type { playlistAction } from "../playlist.action"
import { PLAYLIST_INTENT } from "../playlist.constants"

export const usePlaylistItem = () => {
  const [isPlaylistMenuOpen, setIsPlaylistMenuOpen] = useState<boolean>(false)
  const [isChangeTitleFormOpen, setIsChangeTitleFormOpen] =
    useState<boolean>(false)

  const fetcher = useFetcher<typeof playlistAction>()

  const isDeletingPlaylist =
    fetcher.formData?.get("intent") === PLAYLIST_INTENT.DELETE_PLAYLIST &&
    fetcher.state !== "idle"

  const handleDeletePlaylist = useCallback(
    (playlist_id: string | number) => {
      fetcher.submit(
        {
          playlist_id,
          intent: PLAYLIST_INTENT.DELETE_PLAYLIST,
        },
        { method: "post", action: ROUTES.USER_PLAYLISTS },
      )
    },
    [fetcher],
  )

  const handleToggleChangeTitleForm = useCallback(
    (state: boolean) => setIsChangeTitleFormOpen(state),
    [],
  )

  useEffect(() => {
    if (!fetcher.data) return

    if (fetcher.data.error) {
      toast.error(fetcher.data.error || "Something went wrong")
      return
    }

    const isDeletePlaylistIntent =
      fetcher.formData?.get("intent") === PLAYLIST_INTENT.DELETE_PLAYLIST

    if (isDeletePlaylistIntent) {
      toast.success("Successfully deleted playlist")
      return
    }
  }, [fetcher.data, fetcher.formData])

  return {
    isPlaylistMenuOpen,
    isChangeTitleFormOpen,
    isDeletingPlaylist,
    setIsPlaylistMenuOpen,
    handleDeletePlaylist,
    handleToggleChangeTitleForm,
  }
}
