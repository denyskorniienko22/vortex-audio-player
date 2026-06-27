import { Activity } from "react"
import { Link, useLoaderData } from "react-router"

import AudiosViewLayout from "@/components/layouts/audios-view-layout"
import { Button } from "@/components/ui/button"
import Message from "@/components/ui/message"
import { Spinner } from "@/components/ui/spinner"
import AudiosList from "@/features/audio/components/audios-list"
import type { playlistAudiosLoader } from "@/features/playlist/playlist-audio.loader"
import { useRedirection } from "@/hooks/use-redirection"
import { ROUTES } from "@/root/routes"

const UserPlaylistAudiosPage = () => {
  const { audios, playlist } = useLoaderData<typeof playlistAudiosLoader>()
  const { isRedirecting } = useRedirection({})

  return (
    <AudiosViewLayout
      title={`Playlist - "${playlist.title}"`}
      totalCount={playlist.totalCount}
    >
      <Activity mode={!audios.length ? "visible" : "hidden"}>
        <div className="absolute top-1/2 left-1/2 -translate-1/2">
          <Message
            title="You have not added audios to playlist yet."
            description="Explore the home page to discover new tracks and build your personal collection."
            variant="empty"
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
      <AudiosList audios={audios} className="2xl:grid-cols-7" />
    </AudiosViewLayout>
  )
}

export default UserPlaylistAudiosPage
