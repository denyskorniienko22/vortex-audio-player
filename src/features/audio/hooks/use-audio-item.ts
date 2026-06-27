import { useState } from "react"

import { useAudio } from "@/features/audio-player/provider/audio-player-provider"

interface IUseAudioItemProps {
  audioId: number
}

export const useAudioItem = ({ audioId }: IUseAudioItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const { currentAudio, isPlaying } = useAudio()

  const isCurrentAudio = currentAudio?.id === audioId
  const isCurrentAudioPlaying = isCurrentAudio && isPlaying

  return {
    isMenuOpen,
    isCurrentAudio,
    isCurrentAudioPlaying,
    setIsMenuOpen,
  }
}
