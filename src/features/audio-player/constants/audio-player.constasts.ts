import { Repeat, Shuffle, SkipBack, SkipForward } from "lucide-react"
import type { ComponentType } from "react"

interface IAudioPlayerControlButton {
  id: string
  icon: ComponentType<{ className?: string }>
  isActive: boolean
  isSecondary: boolean
  isFilled?: boolean
  hideOnMobileClass: string
  onClick: () => void
}

export const getAudioPlayerControlButtons = (
  audio: any,
): IAudioPlayerControlButton[] => [
  {
    id: "shuffle",
    icon: Shuffle,
    onClick: audio.handleToggleShuffleAudio,
    isActive: audio.isShuffled,
    isSecondary: true,
    hideOnMobileClass: "xs:hidden md:inline-flex",
  },
  {
    id: "prev",
    icon: SkipBack,
    onClick: audio.handlePlayPrevAudio,
    isActive: false,
    isSecondary: false,
    isFilled: true,
    hideOnMobileClass: "xs:hidden xsm:inline-flex",
  },
  {
    id: "next",
    icon: SkipForward,
    onClick: audio.handlePlayNextAudio,
    isActive: false,
    isSecondary: false,
    isFilled: true,
    hideOnMobileClass: "xs:hidden xsm:inline-flex",
  },
  {
    id: "loop",
    icon: Repeat,
    onClick: audio.handleToggleLoopAudio,
    isActive: audio.isLoop,
    isSecondary: true,
    hideOnMobileClass: "xs:hidden md:inline-flex",
  },
]
