import { EllipsisVertical, Heart, ListPlus } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

import { useAudioItemMenu } from "../../hooks/use-audio-item-menu"

interface IAudioItemMenuProps {
  audioId: number
  isMenuOpen: boolean
  isFavorite: boolean | undefined
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
  playlists_ids: string[]
}

const AudioItemMenu = ({
  audioId,
  isMenuOpen,
  isFavorite,
  setIsMenuOpen,
  playlists_ids,
}: IAudioItemMenuProps) => {
  const {
    user_playlists,
    isTogglingFavorite,
    handleTogglePlaylist,
    handleToggleFavorite,
  } = useAudioItemMenu({
    audio_id: audioId,
    is_favorite: isFavorite,
    playlists_ids: playlists_ids,
  })

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Button
          size="icon-lg"
          variant="secondary"
          data-exclude-click="true"
          className={cn(
            "rounded-full",
            "bg-accent",
            "cursor-pointer",
            "group-hover:bg-accent",
            isMenuOpen && "flex bg-accent",
          )}
        >
          <EllipsisVertical color="black" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          "z-50",
          "w-48",
          "bg-zinc-900",
          "text-zinc-200",
          "border-zinc-800",
        )}
      >
        <DropdownMenuItem
          onClick={handleToggleFavorite}
          disabled={isTogglingFavorite}
        >
          {isTogglingFavorite ? (
            <>
              <Spinner />
              <span>Changing...</span>
            </>
          ) : (
            <>
              <Heart
                className={cn(
                  "size-4",
                  isFavorite && "text-red-500 fill-red-500",
                )}
              />
              <span>
                {isFavorite ? "Remove from favorite" : "Add to favorite"}
              </span>
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            disabled={user_playlists?.length === 0}
            className={cn(
              "data-disabled:pointer-events-none data-disabled:text-accent/10",
            )}
          >
            <ListPlus />
            Add to playlist
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent
            className={cn(
              "z-50",
              "bg-zinc-900",
              "border-zinc-800",
              "text-zinc-200",
            )}
          >
            {user_playlists?.map((user_playlist) => {
              const isAdded = playlists_ids?.includes(String(user_playlist.id))

              return (
                <DropdownMenuItem
                  key={user_playlist.id}
                  onClick={() => handleTogglePlaylist(String(user_playlist.id))}
                  className={cn(
                    "justify-between",
                    isAdded && "text-emerald-400 focus:text-emerald-300",
                  )}
                >
                  {user_playlist.title}
                  {isAdded && (
                    <span className="text-xs font-semibold">✓ added</span>
                  )}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AudioItemMenu
