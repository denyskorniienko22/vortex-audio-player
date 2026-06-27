import { Pause, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface IAudioItemPlayButtonProps {
  isPlaying: boolean
}

const AudioItemPlayButton = ({ isPlaying }: IAudioItemPlayButtonProps) => {
  return (
    <Button
      size="icon"
      variant="secondary"
      className={cn(
        "size-12 rounded-full",
        "bg-white shadow-lg",
        "text-foreground",
        "transition-transform",
        "cursor-pointer",
        "hover:bg-accent/90",
      )}
    >
      {isPlaying ? (
        <Pause className={cn("size-5", "fill-current")} />
      ) : (
        <Play className={cn("size-5", "fill-current")} />
      )}
    </Button>
  )
}

export default AudioItemPlayButton
