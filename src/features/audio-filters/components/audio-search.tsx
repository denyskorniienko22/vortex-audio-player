import { Search } from "lucide-react"
import { Form } from "react-router"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ROUTES } from "@/root/routes"

import { useAudioFilters } from "../hooks/use-audio-filters"

const AudioSearch = () => {
  const { searchValue, handleSearch } = useAudioFilters()

  return (
    <Form
      method="get"
      action={ROUTES.HOME}
      className={cn("relative", "w-full")}
    >
      <Search
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2",
          "size-4",
          "text-zinc-400",
          "pointer-events-none",
        )}
      />
      <Input
        type="text"
        name="search"
        placeholder="Find audios by title..."
        defaultValue={searchValue || ""}
        onChange={handleSearch}
        className={cn(
          "h-11 rounded-lg",
          "bg-zinc-950/50",
          "text-zinc-100",
          "border-zinc-800",
          "transition-all",
          "pl-10",
          "placeholder:text-zinc-600",
          "focus-visible:border-accent/50",
          "focus-visible:ring-1 focus-visible:ring-accent/50",
        )}
      />
    </Form>
  )
}

export default AudioSearch
