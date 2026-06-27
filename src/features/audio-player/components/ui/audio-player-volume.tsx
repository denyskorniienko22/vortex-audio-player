import { Volume2, VolumeX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

import { useAudio } from "../../provider/audio-player-provider"

const AudioPlayerVolume = () => {
  const { volume, isMuted, handleToggleMuteAudio, handleChangeVolume } =
    useAudio()

  return (
    <div
      className={cn(
        "hidden",
        "w-1/2",
        "md:flex md:items-center md:justify-end md:gap-2 md:justify-self-end",
      )}
    >
      <Button
        size="icon"
        variant="ghost"
        onClick={handleToggleMuteAudio}
        className={cn(
          "size-8",
          "text-zinc-300",
          "group cursor-pointer",
          "hover:text-foreground",
        )}
      >
        {isMuted ? (
          <VolumeX className="size-4 fill-current group-hover:fill-current" />
        ) : (
          <Volume2 className="size-4 fill-current group-hover:fill-current" />
        )}
      </Button>
      <Slider
        value={[isMuted ? 0 : volume]}
        min={0}
        max={1}
        step={0.01}
        onValueChange={handleChangeVolume}
        className={cn("w-24", "cursor-pointer")}
      />
    </div>
  )
}

export default AudioPlayerVolume
