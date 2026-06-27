import { useLoaderData } from "react-router"

import AudiosViewLayout from "@/components/layouts/audios-view-layout"
import { Button } from "@/components/ui/button"
import Message from "@/components/ui/message"
import { Spinner } from "@/components/ui/spinner"
import type { audioLoader } from "@/features/audio/audio.loader"
import AudiosList from "@/features/audio/components/audios-list"
import AudioFilters from "@/features/audio-filters/components/audio-filters"
import { useAudioFilters } from "@/features/audio-filters/hooks/use-audio-filters"

const HomePage = () => {
  const { audios, totalCount, error } = useLoaderData<typeof audioLoader>()
  const { isFiltering } = useAudioFilters()

  if (error) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2">
        <Message
          title={error}
          description="Please check your internet connection."
          variant="error"
        >
          <Button
            className="w-full mt-2 font-medium"
            variant="secondary"
            onClick={() => window.location.reload()}
          >
            Reset page
          </Button>
        </Message>
      </div>
    )
  }

  return (
    <AudiosViewLayout title="Audios" totalCount={totalCount}>
      <div className="flex items-start gap-3">
        <AudioFilters />
        {isFiltering ? (
          <Spinner className="size-16 absolute top-1/2 left-1/2 -translate-1/2" />
        ) : (
          <AudiosList
            audios={audios}
            className="sm:grid-cols-4 md:grid-cols-5"
          />
        )}
      </div>
    </AudiosViewLayout>
  )
}

export default HomePage
