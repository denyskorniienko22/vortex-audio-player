import { cn } from "@/lib/utils"

interface ICurrentAudioImageProps {
  audio_img: string
  alt: string
  isExpanded: boolean
}

const CurrentAudioImage = ({
  audio_img,
  alt,
  isExpanded,
}: ICurrentAudioImageProps) => {
  return (
    <div
      className={cn(
        "shrink-0",
        "size-14 rounded-md",
        "bg-zinc-800 shadow-md",
        "overflow-hidden",
        isExpanded &&
          "size-54 flex self-center shadow-[0_0_15px_rgba(255,255,255,0.20)]",
      )}
    >
      <img src={audio_img} alt={alt} className="size-full object-cover" />
    </div>
  )
}

export default CurrentAudioImage
