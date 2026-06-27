import List from "@/components/ui/list"
import Message from "@/components/ui/message"
import { Spinner } from "@/components/ui/spinner"

import type { AudioType } from "../audio.types"
import { useAudiosList } from "../hooks/use-audios-list"
import AudioItem from "./audio-item"

interface IAudiosListProps {
  audios: AudioType[]
  className?: string
}

const AudiosList = ({ audios, className }: IAudiosListProps) => {
  const { isSearching, isSearchEmpty, handleListClick } = useAudiosList({
    audios,
  })

  if (isSearching) {
    return (
      <Spinner className="size-14 absolute top-1/2 left-1/2 -translate-1/2" />
    )
  }

  if (isSearchEmpty) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2">
        <Message
          title="No results found."
          description="We couldn't find any matches for your search. Check the spelling or try using different keywords."
          variant="empty"
        />
      </div>
    )
  }

  return (
    <List
      items={audios}
      renderItem={(audio) => <AudioItem {...audio} />}
      onClick={handleListClick}
      className={className}
    />
  )
}

export default AudiosList
