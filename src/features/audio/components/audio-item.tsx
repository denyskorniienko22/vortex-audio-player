import { Activity } from "react"
import { useRouteLoaderData } from "react-router"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { rootLoader } from "@/root/root-loader"

import type { AudioType } from "../audio.types"
import { useAudioItem } from "../hooks/use-audio-item"
import {
  AudioItemCover,
  AudioItemMenu,
  AudioItemMeta,
  AudioItemPlayButton,
} from "./ui"

interface IAudioItemProps extends AudioType {}

const AudioItem = ({
  audio_img,
  author_name,
  title,
  id,
  is_favorite,
  playlists_ids,
}: IAudioItemProps) => {
  const user = useRouteLoaderData<typeof rootLoader>("root")

  const { isMenuOpen, isCurrentAudio, isCurrentAudioPlaying, setIsMenuOpen } =
    useAudioItem({ audioId: id })

  return (
    <Card
      data-audio-id={id}
      className={cn(
        "relative",
        "rounded-xs",
        "bg-transparent",
        "p-3",
        "transition-all duration-300",
        "group overflow-hidden cursor-pointer",
        "hover:bg-accent/5",
        "xs:p-1.5",
        "xl:p-3",
        (isCurrentAudio || isMenuOpen) && "bg-accent/10 border-accent/50",
      )}
    >
      <div
        className={cn(
          "absolute inset-x-3 right-3 z-10",
          "h-14",
          "transition-all duration-300",
          "pointer-events-none",
          "group-hover:bg-linear-to-b group-hover:from-black/60 group-hover:to-transparent",
        )}
      />
      <CardContent className={cn("grid gap-2", "p-0")}>
        <div className={cn("relative", "bg-accent/8")}>
          <AudioItemCover audio_image_url={audio_img} altText={title} />
          <div
            className={cn(
              "absolute inset-0",
              "flex items-center justify-center",
              "bg-black/40",
              "opacity-0",
              "transition-opacity duration-300",
              "group-hover:opacity-100",
              isCurrentAudio && "opacity-100",
            )}
          >
            <AudioItemPlayButton isPlaying={isCurrentAudioPlaying} />
          </div>
        </div>
        <AudioItemMeta audio_title={title} author_name={author_name} />
        <Activity mode={user?.user ? "visible" : "hidden"}>
          <div
            onClick={(event) => event.stopPropagation()}
            className={cn(
              "absolute right-5 top-5 z-10",
              "xs:right-2.5 xs:top-2.5",
              "xl:right-5 xl:top-5",
              isMenuOpen || isCurrentAudio
                ? `
                    opacity-100
                    pointer-events-auto
                  `
                : `
                    opacity-0
                    pointer-events-none
                    group-hover:opacity-100 group-hover:pointer-events-auto
                  `,
            )}
          >
            <AudioItemMenu
              audioId={id}
              isMenuOpen={isMenuOpen}
              isFavorite={is_favorite}
              setIsMenuOpen={setIsMenuOpen}
              playlists_ids={playlists_ids}
            />
          </div>
        </Activity>
      </CardContent>
    </Card>
  )
}

export default AudioItem
