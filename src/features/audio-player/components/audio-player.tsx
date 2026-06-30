import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

import { useAudioPlayer } from "../hooks/use-audio-player"
import {
  AudioPlayerControls,
  AudioPlayerTimeline,
  AudioPlayerVolume,
  MobileFullPlayer,
} from "./ui"

const AudioPlayer = () => {
  const {
    audioRef,
    currentAudio,
    isExpanded,
    handleClickToMiniPlayer,
    handleLoadedAudioMetadata,
    handlePlayNextAudio,
    handleTimeUpdate,
    setIsExpanded,
  } = useAudioPlayer()

  if (!currentAudio) return

  return (
    <>
      <div
        onClick={handleClickToMiniPlayer}
        className={cn(
          "flex items-center justify-between",
          "w-full",
          "bg-zinc-900 backdrop-blur-md",
          "border-t border-accent/8",
          "p-3",
          "select-none",
          "md:grid md:grid-cols-3 md:justify-between md:gap-3",
        )}
      >
        <section className={cn("flex items-center gap-3")}>
          <div
            className={cn(
              "shrink-0",
              "size-14 rounded-md",
              "bg-zinc-800 shadow-md",
              "overflow-hidden",
            )}
          >
            <img
              src={currentAudio.audio_img}
              alt={`${currentAudio.title} cover`}
              className="size-full object-cover"
            />
          </div>
          <div>
            <h4
              className={cn(
                "text-base font-semibold text-zinc-100",
                "truncate",
              )}
            >
              {currentAudio.title}
            </h4>
            <p className={cn("text-xs text-zinc-400", "truncate")}>
              {currentAudio.author_name}
            </p>
          </div>
        </section>

        <section
          className={cn(
            "flex flex-1 flex-col items-center gap-2",
            "xs:items-end",
            "md:items-center",
          )}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AudioPlayerControls isExpanded={isExpanded} />
          </div>
          <AudioPlayerTimeline
            className={cn("max-w-lg", "xs:hidden", "md:flex")}
          />
        </section>
        <AudioPlayerVolume isExpanded={isExpanded} />
      </div>

      <Drawer open={isExpanded} onOpenChange={setIsExpanded}>
        <DrawerContent
          className={cn(
            "flex flex-col",
            "h-screen rounded-none",
            "border-none",
            "bg-accent-foreground",
            "p-0",
          )}
        >
          <div className="pt-4">
            <MobileFullPlayer
              audio_img={currentAudio.audio_img}
              title={currentAudio.title}
              author_name={currentAudio.author_name}
            />
          </div>
        </DrawerContent>
      </Drawer>

      <audio
        ref={audioRef}
        src={currentAudio.audio_url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedAudioMetadata}
        onEnded={handlePlayNextAudio}
        preload="none"
        autoPlay
      />
    </>
  )
}

export default AudioPlayer
