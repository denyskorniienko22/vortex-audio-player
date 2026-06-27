import { Activity, useState } from "react"

import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

interface IAudioItemCoverProps {
  audio_image_url: string
  altText: string
}

const AudioItemCover = ({ audio_image_url, altText }: IAudioItemCoverProps) => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true)

  return (
    <div className={cn("relative", "aspect-square")}>
      <img
        src={audio_image_url}
        alt={`${altText} cover`}
        loading="lazy"
        onLoad={() => setIsImageLoading(false)}
        className={cn("size-full object-cover")}
      />
      <Activity mode={isImageLoading ? "visible" : "hidden"}>
        <div className="absolute top-1/2 left-1/2 -translate-1/2">
          <Spinner className="size-8" color="white" />
        </div>
      </Activity>
    </div>
  )
}

export default AudioItemCover
