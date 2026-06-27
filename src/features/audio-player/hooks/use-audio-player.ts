import { useCallback, useEffect, useState } from "react"

import { useAudio } from "../provider/audio-player-provider"

export const useAudioPlayer = () => {
  const {
    audioRef,
    currentAudio,
    handlePlayNextAudio,
    handleLoadedAudioMetadata,
    handleTimeUpdate,
  } = useAudio()

  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const handleClickToMiniPlayer = useCallback(() => {
    if (window.innerWidth < 768) setIsExpanded(true)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsExpanded(false)
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return {
    audioRef,
    currentAudio,
    isExpanded,
    handleClickToMiniPlayer,
    handlePlayNextAudio,
    handleLoadedAudioMetadata,
    handleTimeUpdate,
    setIsExpanded,
  }
}
