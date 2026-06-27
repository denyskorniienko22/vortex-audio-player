import AudiosViewLayout from "@/components/layouts/audios-view-layout"
import { Button } from "@/components/ui/button"
import List from "@/components/ui/list"
import Message from "@/components/ui/message"
import CreatePlaylistForm from "@/features/playlist/components/create-playlist-form"
import PlaylistItem from "@/features/playlist/components/playlist-item"
import { usePlaylistsPage } from "@/features/playlist/hooks/use-playlists-page"
import { cn } from "@/lib/utils"

const UserPlaylistsPage = () => {
  const { playlists, totalCount, error } = usePlaylistsPage()

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
    <AudiosViewLayout title="Playlists" totalCount={totalCount}>
      <List
        className={cn("gap-2")}
        items={playlists}
        renderItem={(playlistItem) => (
          <PlaylistItem
            playlist_id={playlistItem.id}
            playlist_title={playlistItem.title}
          />
        )}
      >
        <div
          className={cn(
            "grid items-center",
            "aspect-square rounded-xl",
            "bg-accent/10",
            "text-accent",
            "border border-accent/5",
            "px-2",
          )}
        >
          <CreatePlaylistForm />
        </div>
      </List>
    </AudiosViewLayout>
  )
}

export default UserPlaylistsPage
