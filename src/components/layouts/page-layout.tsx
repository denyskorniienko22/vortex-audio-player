import { Activity } from "react"
import { Outlet } from "react-router"

import AudioPlayer from "@/features/audio-player/components/audio-player"
import { useAudio } from "@/features/audio-player/provider/audio-player-provider"
import { cn } from "@/lib/utils"

import FooterLayout from "./footer-layout"
import HeaderLayout from "./header-layout"

const PageLayout = () => {
  const { currentAudio } = useAudio()

  return (
    <div
      className={cn(
        "relative",
        "flex flex-col gap-4",
        "min-h-screen",
        "bg-foreground",
        "text-white",
      )}
    >
      <HeaderLayout />
      <main className={cn("px-4 w-full flex-1", "2xl:container 2xl:mx-auto")}>
        <Outlet />
        <Activity mode={currentAudio ? "visible" : "hidden"}>
          <div
            className={cn(
              "fixed bottom-0 inset-x-0 z-40",
              "bg-accent-foreground",
              "border-t border-accent/30",
              "lg:z-50",
            )}
          >
            <div className="xs:mx-auto 2xl:container">
              <AudioPlayer />
            </div>
          </div>
        </Activity>
      </main>
      <FooterLayout />
    </div>
  )
}

export default PageLayout
