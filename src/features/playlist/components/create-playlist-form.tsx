import { Captions, ListPlus } from "lucide-react"
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

const CreatePlaylistForm = () => {
  const {
    isSubmitting,
    register,
    formState: { isValid, errors },
  } = usePlaylistForm({
    intent: PLAYLIST_INTENT.CREATE_PLAYLIST,
    schema: playlistFormSchema,
  })

  return (
    <Form method="post" action={ROUTES.USER_PLAYLISTS} className="grid gap-3.5">
      <input
        type="hidden"
        name="intent"
        value={PLAYLIST_INTENT.CREATE_PLAYLIST}
      />
      <div className={cn("grid gap-2")}>
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
            placeholder="e.g. Hard_Rock"
            disabled={isSubmitting}
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

      <Button
        type="submit"
        className={cn("flex items-center", "w-full", "cursor-pointer")}
        variant="secondary"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Spinner />
            <span>Creating...</span>
          </>
        ) : (
          <>
            <ListPlus />
            <span className={cn("text-sm", "xs:text-xs", "xsm:text-sm")}>
              Create playlist
            </span>
          </>
        )}
      </Button>
    </Form>
  )
}

export default CreatePlaylistForm
