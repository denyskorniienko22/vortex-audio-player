import { useAudio } from "@/features/audio-player/provider/audio-player-provider"
import { cn } from "@/lib/utils"

const FooterLayout = () => {
  const { currentAudio } = useAudio()

  return (
    <footer
      className={cn(
        "w-full",
        "border-t border-accent/10",
        "bg-zinc-950",
        "text-xs text-zinc-500",
        "py-6",
        currentAudio && "pb-28",
      )}
    >
      <div
        className={cn(
          "container mx-auto",
          "flex flex-row items-center justify-center gap-4",
          "px-4",
        )}
      >
        <span className="text-sm font-semibold">@pan_korniyenko</span>
      </div>
    </footer>
  )
}

export default FooterLayout
