import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react"

interface IAudioFiltersContext {
  isFiltersOpen: boolean
  handleOpenFilters: () => void
  handleCloseFilters: () => void
}

const AudioFiltersContext = createContext<IAudioFiltersContext | undefined>(
  undefined,
)

export const AudioFiltersProvider = ({ children }: { children: ReactNode }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)

  const handleCloseFilters = () => setIsFiltersOpen(false)
  const handleOpenFilters = () => setIsFiltersOpen(true)

  const value = useMemo(
    () => ({
      isFiltersOpen,
      handleCloseFilters,
      handleOpenFilters,
    }),
    [isFiltersOpen, handleCloseFilters, handleOpenFilters],
  )

  return (
    <AudioFiltersContext.Provider value={value}>
      {children}
    </AudioFiltersContext.Provider>
  )
}

export const useAudioFiltersUI = () => {
  const context = useContext(AudioFiltersContext)

  if (!context) {
    throw new Error(
      "useAudioFiltersUI must be used within a ProductFiltersProvider",
    )
  }

  return context
}
