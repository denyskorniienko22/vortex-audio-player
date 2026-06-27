import { cn } from "@/lib/utils"

interface IAudioItemMetaProps {
  audio_title: string
  author_name: string
}

const AudioItemMeta = ({ audio_title, author_name }: IAudioItemMetaProps) => {
  return (
    <footer className={cn("flex flex-col", "min-w-0 w-full", "px-1")}>
      <h3
        className={cn(
          "text-lg font-semibold tracking-tight text-accent",
          "truncate",
        )}
      >
        {audio_title}
      </h3>
      <p className={cn("text-sm text-accent/50", "truncate")}>{author_name}</p>
    </footer>
  )
}

export default AudioItemMeta
