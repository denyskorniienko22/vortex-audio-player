import { Pause, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { getAudioPlayerControlButtons } from "../../constants/audio-player.constasts"
import { useAudio } from "../../provider/audio-player-provider"

interface IAudioPlayerControlsProps {
  isExpanded: boolean
}

const AudioPlayerControls = ({ isExpanded }: IAudioPlayerControlsProps) => {
  const audio = useAudio()

  const audioPlayerControlButtons = getAudioPlayerControlButtons(audio)

  const mainIconSize = isExpanded ? "size-8" : "size-5"
  const secondaryIconSize = isExpanded ? "size-6" : "size-4"

  const renderButton = (
    buttonConfig: ReturnType<typeof getAudioPlayerControlButtons>[number],
  ) => {
    const {
      id,
      icon: Icon,
      onClick,
      isActive,
      isSecondary,
      isFilled,
      hideOnMobileClass,
    } = buttonConfig

    return (
      <Button
        key={id}
        size="icon"
        variant="ghost"
        onClick={onClick}
        className={cn(
          "cursor-pointer transition-colors",
          isSecondary
            ? isActive
              ? "text-green-500 hover:text-green-400"
              : "text-zinc-400 hover:text-foreground hover:bg-accent"
            : "text-zinc-400 hover:text-foreground hover:bg-accent",
          !isExpanded && hideOnMobileClass,
        )}
      >
        <Icon
          className={cn(
            isSecondary ? secondaryIconSize : mainIconSize,
            isFilled && "fill-current",
          )}
        />
      </Button>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center shrink-0",
        "w-full",
        isExpanded ? "gap-5 xsm:gap-10" : "gap-4",
      )}
    >
      {audioPlayerControlButtons.slice(0, 2).map(renderButton)}
      <Button
        size="icon"
        onClick={audio.handleTogglePlayAudio}
        className={cn(
          "rounded-full",
          "bg-accent",
          "text-foreground",
          "transition-transform",
          "cursor-pointer",
          "active:scale-95",
          isExpanded ? "size-16" : "size-10 hover:scale-105 hover:bg-zinc-200",
        )}
      >
        {audio.isPlaying ? (
          <Pause
            className={
              isExpanded ? "size-8 fill-current" : "size-5 fill-current"
            }
          />
        ) : (
          <Play
            className={
              isExpanded ? "size-8 fill-current" : "size-5 fill-current"
            }
          />
        )}
      </Button>
      {audioPlayerControlButtons.slice(2, 4).map(renderButton)}
    </div>
  )
}

export default AudioPlayerControls
