import { Activity } from "react"
import { Link, useLoaderData } from "react-router"

import AudiosViewLayout from "@/components/layouts/audios-view-layout"
import { Button } from "@/components/ui/button"
import Message from "@/components/ui/message"
import { Spinner } from "@/components/ui/spinner"
import AudiosList from "@/features/audio/components/audios-list"
import type { favoriteAudioLoader } from "@/features/audio/favorite-audio.loader"
import { useRedirection } from "@/hooks/use-redirection"
import { ROUTES } from "@/root/routes"

const FavoriteAudiosPage = () => {
  const { audios, totalCount } = useLoaderData<typeof favoriteAudioLoader>()
  const { isRedirecting } = useRedirection({})

  return (
    <AudiosViewLayout title="Favorites" totalCount={totalCount}>
      <AudiosList audios={audios} className="2xl:grid-cols-7" />
      <Activity mode={!audios.length ? "visible" : "hidden"}>
        <div className="absolute top-1/2 left-1/2 -translate-1/2">
          <Message
            title="No favorite tracks yet"
            description="Tap the heart icon on any song while exploring to save your absolute favorites here."
          >
            <Link to={ROUTES.HOME}>
              <Button
                className="w-full mt-2 cursor-pointer"
                variant="secondary"
              >
                {isRedirecting && <Spinner />} Return to home
              </Button>
            </Link>
          </Message>
        </div>
      </Activity>
    </AudiosViewLayout>
  )
}

export default FavoriteAudiosPage
