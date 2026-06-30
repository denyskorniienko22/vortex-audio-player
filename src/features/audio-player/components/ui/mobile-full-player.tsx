import { cn } from "@/lib/utils"

import { AudioPlayerControls, AudioPlayerTimeline, AudioPlayerVolume } from "./"
import CurrentAudioImage from "./current-audio-image"
import CurrentAudioMeta from "./current-audio-meta"

interface IMobileFullPlayerProps {
  audio_img: string
  title: string
  author_name: string
}

const MobileFullPlayer = ({
  audio_img,
  author_name,
  title,
}: IMobileFullPlayerProps) => {
  return (
    <div className={cn("flex flex-col gap-6", "p-3")}>
      <section className="flex flex-col items-start gap-6">
        <CurrentAudioImage
          audio_img={audio_img}
          alt={`${title} cover`}
          isExpanded
        />
        <CurrentAudioMeta title={title} author_name={author_name} isExpanded />
      </section>

      <section
        className={cn(
          "flex flex-1 flex-col items-center gap-y-6",
          "xs:items-end",
          "xsm:items-center",
        )}
      >
        <AudioPlayerTimeline />
        <AudioPlayerControls isExpanded />
        <AudioPlayerVolume isExpanded />
      </section>
    </div>
  )
}

export default MobileFullPlayer
