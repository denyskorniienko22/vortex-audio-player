import { cn } from "@/lib/utils"

import { AudioPlayerControls,AudioPlayerTimeline } from "./"

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
    <div className={cn("flex flex-col gap-4", "p-3")}>
      <section className="flex flex-col items-start gap-3">
        <div
          className={cn(
            "shrink-0 self-center",
            "w-60 rounded-md",
            "bg-zinc-800 shadow-md",
            "border border-accent/1",
            "overflow-hidden",
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
      </section>
    </div>
  )
}

export default MobileFullPlayer
