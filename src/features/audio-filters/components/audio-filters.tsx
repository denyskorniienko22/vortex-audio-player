import { X } from "lucide-react"
import { Activity } from "react"

import { Accordion } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import AudioSearch from "@/features/audio-filters/components/audio-search"
import { useAudio } from "@/features/audio-player/provider/audio-player-provider"
import { cn } from "@/lib/utils"

import { audioFiltersValues } from "../audio-filters.constants"
import { useAudioFilters } from "../hooks/use-audio-filters"
import AudioFilterItem from "./ui/audio-filter-item"
import AudioFilterReset from "./ui/audio-filter-reset"

const AudioFilters = () => {
  const {
    searchParams,
    hasFilters,
    searchValue,
    isFiltersOpen,
    handleCloseFilters,
    handleToggleFilter,
    setSearchParams,
  } = useAudioFilters()

  const { currentAudio } = useAudio()

  const filtersContent = (
    <>
      <div
        className={cn(
          "relative",
          "flex justify-between items-center gap-4 shrink-0",
          "px-2 py-4",
        )}
      >
        <SheetTitle
          className={cn(
            "text-lg font-black tracking-tight text-zinc-100",
            "px-4",
          )}
        >
          FILTERS
        </SheetTitle>
      </div>
      <ScrollArea>
        <div
          className={cn(
            "max-h-[calc(100vh-240px)]",
            "xs:max-h-[calc(100vh-80px)]",
            "lg:max-h-[calc(100vh-220px)]",
            !!currentAudio &&
              "sm:max-h-[calc(100vh-170px)] lg:max-h-[calc(100vh-240px)]",
          )}
        >
          <div className={cn("w-full", "px-2 mt-1.5 mb-2.5")}>
            <AudioSearch key={searchValue ? "active" : "empty"} />
          </div>

          <Accordion className={cn("rounded-none", "border-none")} multiple>
            {audioFiltersValues.map((audioFilter) => {
              const activeValues = searchParams.getAll(audioFilter.id)
              return (
                <AudioFilterItem
                  key={audioFilter.id}
                  filterId={audioFilter.id}
                  label={audioFilter.label}
                  options={audioFilter.options}
                  activeValues={activeValues}
                  hasFilters={hasFilters}
                  onToggleFilter={handleToggleFilter}
                />
              )
            })}
          </Accordion>

          {hasFilters && (
            <div className="mt-4 px-4 pb-4">
              <AudioFilterReset onResetFilters={() => setSearchParams({})} />
            </div>
          )}
        </div>
      </ScrollArea>
    </>
  )

  return (
    <>
      {/* 1. МОБИЛЬНАЯ ВЕРСИЯ (до 1024px / lg) — Обернута в шторку Shadcn */}
      <div className="fixed lg:hidden">
        <Sheet open={isFiltersOpen} onOpenChange={handleCloseFilters}>
          <SheetContent
            side="left"
            className="w-full! p-0 bg-zinc-900 border-r border-zinc-800 text-zinc-100 flex flex-col"
          >
            {filtersContent}
          </SheetContent>
        </Sheet>
      </div>

      {/* 2. ДЕСКТОПНАЯ ВЕРСИЯ (от 1024px / lg+) — Статичный сайдбар в сетке */}
      <aside
        className={cn(
          "sticky top-16 z-40",
          "hidden",
          "w-72 rounded-xs",
          "bg-zinc-900",
          "xs:w-full xs:fixed xs:inset-0 xs:z-50 xs:rounded-none",
          "sm:w-72 sm:border-r sm:border-accent/8 sm:z-40",
          "lg:sticky lg:bg-accent/8 lg:rounded-xs lg:top-16 lg:flex lg:flex-col lg:shrink-0",
          hasFilters && "pb-4",
          !isFiltersOpen && "hidden",
        )}
      >
        <div
          className={cn(
            "relative",
            "flex justify-between items-center gap-4 shrink-0",
            "px-2 py-4",
          )}
        >
          <h3 className={cn("text-lg font-black tracking-tight", "px-4")}>
            FILTERS
          </h3>
          <Button
            size="icon-lg"
            variant="ghost"
            onClick={handleCloseFilters}
            className="lg:hidden"
          >
            <X />
          </Button>
        </div>
        <ScrollArea>
          <div
            className={cn(
              "max-h-[calc(100vh-240px)]",
              "xs:max-h-[calc(100vh-80px)]",
              "lg:max-h-[calc(100vh-220px)]",
              !!currentAudio &&
                "sm:max-h-[calc(100vh-170px)] lg:max-h-[calc(100vh-240px)]",
            )}
          >
            <div className={cn("w-full", "px-2", "mt-1.5 mb-2.5")}>
              <AudioSearch key={searchValue ? "active" : "empty"} />
            </div>
            <Accordion className={cn("rounded-none", "border-none")} multiple>
              {audioFiltersValues.map((audioFilter) => {
                const activeValues = searchParams.getAll(audioFilter.id)
                return (
                  <AudioFilterItem
                    key={audioFilter.id}
                    filterId={audioFilter.id}
                    label={audioFilter.label}
                    options={audioFilter.options}
                    activeValues={activeValues}
                    hasFilters={hasFilters}
                    onToggleFilter={handleToggleFilter}
                  />
                )
              })}
            </Accordion>
            <Activity mode={hasFilters ? "visible" : "hidden"}>
              <div className="mt-4 px-4">
                <AudioFilterReset onResetFilters={() => setSearchParams({})} />
              </div>
            </Activity>
          </div>
        </ScrollArea>
      </aside>
    </>
  )
}

export default AudioFilters
