import { cn } from "@/lib/utils"

import { AudioPlayerControls, AudioPlayerTimeline, AudioPlayerVolume } from "./"

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
        <div
          className={cn(
            "shrink-0 self-center",
            "w-54 rounded-md",
            "bg-zinc-800 shadow-md",
            "border border-accent/1",
            "overflow-hidden",
            "shadow-[0_0_15px_rgba(255,255,255,0.15)]",
          )}
        >
          <img
            src={audio_img}
            alt={`${title} cover`}
            className="size-full object-cover"
          />
        </div>
        <div>
          <h4 className={cn("text-xl font-semibold text-zinc-100", "truncate")}>
            {title}
          </h4>
          <p className={cn("text-base text-zinc-400", "truncate")}>
            {author_name}
          </p>
        </div>
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
