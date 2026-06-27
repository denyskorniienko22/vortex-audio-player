import { useCallback, useEffect } from "react"
import { useFetcher, useRouteLoaderData } from "react-router"
import { toast } from "sonner"

import type { rootLoader } from "@/root/root-loader"
import { ROUTES } from "@/root/routes"

import type { audioAction } from "../audio.action"
import { AUDIO_INTENTS } from "../audio.constants"

interface IUseAudioItemMenuProps {
  audio_id: string | number
  is_favorite: boolean | undefined
  playlists_ids: string[] | undefined
}

export const useAudioItemMenu = ({
  audio_id,
  is_favorite,
  playlists_ids,
}: IUseAudioItemMenuProps) => {
  const rootData = useRouteLoaderData<typeof rootLoader>("root")

  const fetcher = useFetcher<typeof audioAction>()

  const isTogglingFavorite =
    fetcher.formData?.get("intent") === AUDIO_INTENTS.TOGGLE_FAVORITE &&
    fetcher.state !== "idle"

  const handleToggleFavorite = useCallback(() => {
    fetcher.submit(
      {
        intent: AUDIO_INTENTS.TOGGLE_FAVORITE,
        is_favorite: String(is_favorite),
        audio_id: String(audio_id),
      },
      { method: "post", action: ROUTES.FAVORITES },
    )
  }, [fetcher])

  const handleTogglePlaylist = useCallback(
    (playlist_id: string) => {
      const isAlreadyAdded = playlists_ids?.includes(playlist_id)

      fetcher.submit(
        {
          intent: isAlreadyAdded
            ? AUDIO_INTENTS.REMOVE_FROM_PLAYLIST
            : AUDIO_INTENTS.ADD_TO_PLAYLIST,
          playlist_id: playlist_id,
          audio_id: String(audio_id),
        },
        { method: "post", action: ROUTES.AUDIO_PLAYLIST_ACTIONS },
      )
    },
    [fetcher],
  )

  useEffect(() => {
    if (!fetcher.data) return

    if (fetcher.data?.error) {
      toast.error(fetcher.data.error || "Something went wrong")
      return
    }

    const intent = fetcher.formData?.get("intent")

    switch (intent) {
      case AUDIO_INTENTS.TOGGLE_FAVORITE: {
        const message = is_favorite
          ? "Successfully removed from favorites"
          : "Successfully added to favorites"

        toast.success(message, {
          id: `${AUDIO_INTENTS.TOGGLE_FAVORITE}:${message}`,
        })
        return
      }
      case AUDIO_INTENTS.ADD_TO_PLAYLIST: {
        toast.success("Successfully added to playlist", {
          id: AUDIO_INTENTS.ADD_TO_PLAYLIST,
        })
        return
      }
      case AUDIO_INTENTS.REMOVE_FROM_PLAYLIST: {
        toast.success("Successfully removed audio from playlist", {
          id: AUDIO_INTENTS.REMOVE_FROM_PLAYLIST,
        })
        return
      }
    }
  }, [fetcher.data, is_favorite, fetcher.formData])

  return {
    user_playlists: rootData?.user_playlists,
    isTogglingFavorite,
    handleToggleFavorite,
    handleTogglePlaylist,
  }
}
