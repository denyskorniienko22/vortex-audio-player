import { Captions, PencilLine } from "lucide-react"
import { Activity } from "react"
import { Form } from "react-router"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { ROUTES } from "@/root/routes"

import { usePlaylistForm } from "../hooks/use-playlist-form"
import { PLAYLIST_INTENT } from "../playlist.constants"
import { playlistFormSchema } from "../playlist.schema"

interface IChangePlaylistTitleFormProps {
  playlist_id: string | number
  onClose: () => void
}

const ChangePlaylistTitleForm = ({
  playlist_id,
  onClose,
}: IChangePlaylistTitleFormProps) => {
  const {
    isSubmitting,
    register,
    formState: { isValid, errors },
  } = usePlaylistForm({
    intent: PLAYLIST_INTENT.CHANGE_PLAYLIST_TITLE,
    schema: playlistFormSchema,
  })

  return (
    <Form method="post" action={ROUTES.USER_PLAYLISTS} className="grid gap-3.5">
      <input
        type="hidden"
        name="intent"
        value={PLAYLIST_INTENT.CHANGE_PLAYLIST_TITLE}
      />
      <input type="hidden" name="playlist_id" value={playlist_id} />
      <div className="grid gap-2">
        <div className="relative">
          <Captions
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2",
              "size-4",
              "text-zinc-500",
              "transition-colors",
              "group-focus-within:text-zinc-300",
              "cursor-default",
            )}
          />
          <Input
            placeholder="@e. g. Hard_Rock"
            className={cn(
              "w-full h-8 rounded-md",
              "bg-zinc-900",
              "border border-transparent",
              "text-sm text-zinc-200",
              "transition-all duration-200",
              "pl-10 pr-4",
              "placeholder:text-zinc-500",
              "focus:border-zinc-700 focus:bg-zinc-800/80 focus:outline-none",
            )}
            {...register("title")}
          />
        </div>
        <Activity mode={errors.title ? "visible" : "hidden"}>
          <p className="text-red-500 text-sm">
            {errors.title?.message?.toString()}
          </p>
        </Activity>
      </div>

      <div className="grid gap-1">
        <Button
          type="submit"
          className={cn("flex items-center", "w-full", "cursor-pointer")}
          variant="secondary"
          disabled={!isValid}
        >
          {isSubmitting ? (
            <>
              <Spinner />
              Changing...
            </>
          ) : (
            <>
              <PencilLine />
              Change title
            </>
          )}
        </Button>
        <Button
          variant="destructive"
          className={cn("flex items-center", "w-full", "cursor-pointer")}
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </Form>
  )
}

export default ChangePlaylistTitleForm
