import { EllipsisVertical, ListX, PencilLine } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface IPlaylistItemMenu {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  onDeletePlaylist: () => void
  onOpenChangeTitleForm: () => void
}

const PlaylistItemMenu = ({
  open,
  onOpenChange,
  onDeletePlaylist,
  onOpenChangeTitleForm,
}: IPlaylistItemMenu) => {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger>
        <Button
          className={cn("rounded-full", "cursor-pointer", open && "flex")}
          size="icon-lg"
          variant="secondary"
          data-exclude-click="true"
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          "z-50",
          "w-48",
          "bg-zinc-900",
          "border-zinc-800",
          "text-zinc-200",
        )}
      >
        <DropdownMenuItem onClick={onOpenChangeTitleForm}>
          <PencilLine />
          Change title
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={onDeletePlaylist}>
          <ListX />
          Delete playlist
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PlaylistItemMenu
