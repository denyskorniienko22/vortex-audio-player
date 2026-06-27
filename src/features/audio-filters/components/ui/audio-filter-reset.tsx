import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface IAudioFilterResetProps {
  onResetFilters: () => void
}

const AudioFilterReset = ({ onResetFilters }: IAudioFilterResetProps) => {
  return (
    <Button
      variant="secondary"
      className={cn("w-full", "cursor-pointer")}
      onClick={onResetFilters}
    >
      Reset Filters
    </Button>
  )
}

export default AudioFilterReset
