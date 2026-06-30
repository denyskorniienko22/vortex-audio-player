import { cn } from "@/lib/utils"

interface ICurrentAudioMetaProps {
  title: string
  author_name: string
  isExpanded: boolean
}

const CurrentAudioMeta = ({
  title,
  author_name,
  isExpanded,
}: ICurrentAudioMetaProps) => {
  return (
    <div>
      <h4
        className={cn(
          "text-base font-semibold text-zinc-100",
          "truncate",
          isExpanded && "text-xl",
        )}
      >
        {title}
      </h4>
      <p
        className={cn(
          "text-xs text-zinc-400",
          "truncate",
          isExpanded && "text-base",
        )}
      >
        {author_name}
      </p>
    </div>
  )
}

export default CurrentAudioMeta
