import { Activity } from "react"

import { cn } from "@/lib/utils"

import { usePlaylistItem } from "../hooks/use-playlist-item"
import ChangePlaylistTitleForm from "./change-playlist-title-form"
import PlaylistItemMenu from "./ui/playlist-item-menu"
import PlaylistItemPreview from "./ui/playlist-item-preview"

interface IPlaylistItemProps {
  playlist_id: string | number
  playlist_title: string
}

const PlaylistItem = ({ playlist_id, playlist_title }: IPlaylistItemProps) => {
  const {
    isChangeTitleFormOpen,
    isDeletingPlaylist,
    isPlaylistMenuOpen,
    handleToggleChangeTitleForm,
    handleDeletePlaylist,
    setIsPlaylistMenuOpen,
  } = usePlaylistItem()

  return (
    <div className={cn("relative", "w-full", "group")}>
      <div className="relative">
        <PlaylistItemPreview
          playlist_id={playlist_id}
          isChangeTitleFormOpen={isChangeTitleFormOpen}
          isDeletingPlaylist={isDeletingPlaylist}
        />
        <Activity mode={isChangeTitleFormOpen ? "visible" : "hidden"}>
          <div className={cn("absolute top-5", "px-2")}>
            <ChangePlaylistTitleForm
              playlist_id={playlist_id}
              onClose={() => handleToggleChangeTitleForm(false)}
            />
          </div>
        </Activity>
        <h3 className={cn("font-medium text-lg", "px-1 mt-1.5", "truncate")}>
          {playlist_title}
        </h3>
      </div>
      {!isChangeTitleFormOpen && (
        <div
          onClick={(event) => event.stopPropagation()}
          className={cn(
            "absolute top-2 right-2",
            "transition-opacity duration-200",
            isPlaylistMenuOpen
              ? `
                  opacity-100
                  pointer-events-auto
                `
              : `
                  opacity-0
                  pointer-events-none
                  group-hover:opacity-100 group-hover:pointer-events-auto
                  xs:opacity-100 xs:pointer-events-auto
                  lg:opacity-0 lg:pointer-events-none
                `,
          )}
        >
          <PlaylistItemMenu
            open={isPlaylistMenuOpen}
            onOpenChange={setIsPlaylistMenuOpen}
            onDeletePlaylist={() => handleDeletePlaylist(playlist_id)}
            onOpenChangeTitleForm={() => handleToggleChangeTitleForm(true)}
          />
        </div>
      )}
    </div>
  )
}

export default PlaylistItem
