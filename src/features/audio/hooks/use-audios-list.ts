import { type MouseEvent,useCallback } from "react"
import { useLocation, useNavigation } from "react-router"

import { useAudio } from "@/features/audio-player/provider/audio-player-provider"
import { ROUTES } from "@/root/routes"

import type { AudioType } from "../audio.types"

interface UseAudiosListProps {
  audios: AudioType[]
}

export const useAudiosList = ({ audios }: UseAudiosListProps) => {
  const { handlePlayAudio } = useAudio()

  const navigation = useNavigation()
  const location = useLocation()

  const isSearching =
    (navigation.state === "loading" &&
      navigation.location.search.includes("?search")) ||
    navigation.location?.search.includes("&search")

  const isSearchEmpty =
    location?.search.includes("?") &&
    location.pathname === ROUTES.HOME &&
    !audios.length

  const handleListClick = useCallback(
    (event: MouseEvent<HTMLUListElement>) => {
      const target = event.target as HTMLElement

      if (target.closest('[data-exclude-click="true"]')) return

      const card = target.closest("[data-audio-id]") as HTMLElement | null

      if (card?.dataset.audioId) {
        const audioId = Number(card.dataset.audioId)
        const selected = audios?.find((audio) => audio.id === audioId)

        if (selected) handlePlayAudio(selected, audios)
      }
    },
    [audios, handlePlayAudio],
  )

  return {
    isSearching,
    isSearchEmpty,
    handleListClick,
  }
}
