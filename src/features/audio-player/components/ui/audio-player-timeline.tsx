import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { formatTime } from "@/helpers/formatTime"
import { cn } from "@/lib/utils"

import { useAudio } from "../../provider/audio-player-provider"

interface IAudioPlayerTimelineProps {
  className?: string
}

const AudioPlayerTimeline = ({ className }: IAudioPlayerTimelineProps) => {
  const { currentTime, duration, handleChangeCurrentTime } = useAudio()

  return (
    <div
      className={cn(
        "flex items-center gap-3",
        "w-full",
        "text-xs text-zinc-400",
        className,
      )}
    >
      <span className={cn("w-9", "text-right")}>{formatTime(currentTime)}</span>
      <Slider
        value={[currentTime]}
        min={0}
        max={duration || 1}
        step={0.01}
        onValueChange={handleChangeCurrentTime}
        className={cn("w-full", "cursor-pointer")}
      />
      <span className={cn("w-9", "text-left")}>
        {!duration ? <Spinner /> : formatTime(duration)}
      </span>
    </div>
  )
}

export default AudioPlayerTimeline
