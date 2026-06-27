import { ListMusic } from "lucide-react"
import { Link } from "react-router"

import { cn } from "@/lib/utils"

interface IPlaylistItemPreviewProps {
  playlist_id: string | number
  isChangeTitleFormOpen: boolean
  isDeletingPlaylist: boolean
}

const PlaylistItemPreview = ({
  playlist_id,
  isChangeTitleFormOpen,
  isDeletingPlaylist,
}: IPlaylistItemPreviewProps) => {
  return (
    <Link
      to={`/playlists/${playlist_id}`}
      className={cn(isChangeTitleFormOpen && "pointer-events-none")}
    >
      <div
        className={cn(
          "flex items-center justify-center",
          "rounded-xl aspect-square",
          "bg-accent/10",
          "border border-accent/5",
          "text-accent",
          "cursor-pointer",
        )}
      >
        {isDeletingPlaylist ? (
          <p className="text-red-500 text-xl font-semibold">Deleting...</p>
        ) : (
          !isChangeTitleFormOpen && (
            <ListMusic className="size-18" color="white" />
          )
        )}
      </div>
    </Link>
  )
}

export default PlaylistItemPreview
