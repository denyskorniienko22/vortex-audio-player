import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface IAudioFilterItemProps {
  filterId: string
  label: string
  options: string[]
  activeValues: string[]
  hasFilters: boolean
  onToggleFilter: (id: string, option: string) => void
}

const AudioFilterItem = ({
  filterId,
  label,
  options,
  activeValues,
  hasFilters,
  onToggleFilter,
}: IAudioFilterItemProps) => {
  return (
    <AccordionItem
      value={filterId}
      className={cn(
        "border-b border-accent/8",
        "first:border-t",
        !hasFilters && "last:border-none",
      )}
    >
      <AccordionTrigger
        className={cn(
          "rounded-none",
          "text-sm font-semibold",
          "py-3 px-4",
          "cursor-pointer",
        )}
      >
        {label}
      </AccordionTrigger>
      <AccordionContent className={cn("space-y-3", "pb-4")}>
        {options.map((option) => (
          <div
            key={option}
            className={cn("flex items-center space-x-3", "group", "px-4")}
          >
            <Checkbox
              id={`${filterId}-${option}`}
              className={cn("bg-zinc-800", "border-none")}
              checked={activeValues.includes(option)}
              onCheckedChange={() => onToggleFilter(filterId, option)}
            />
            <Label
              htmlFor={`${filterId}-${option}`}
              className={cn(
                "text-sm font-normal leading-none",
                "cursor-pointer",
                "transition-colors",
                "group-hover:text-accent/50",
              )}
            >
              {option}
            </Label>
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

export default AudioFilterItem
