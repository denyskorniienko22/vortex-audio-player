import {
  createContext,
  type ReactNode,
  type RefObject,
  type SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import type { AudioType } from "@/features/audio/audio.types"

interface IAudioPlayerContextProps {
  audioRef: RefObject<HTMLAudioElement | null>
  currentAudio: AudioType | undefined
  currentTime: number
  duration: number
  volume: number
  playlist: AudioType[]

  isPlaying: boolean
  isMuted: boolean
  isLoop: boolean
  isShuffled: boolean

  handlePlayAudio: (audio: AudioType, audiosList: AudioType[]) => void
  handlePlayNextAudio: () => void
  handlePlayPrevAudio: () => void

  handleTogglePlayAudio: () => void
  handleToggleMuteAudio: () => void
  handleToggleLoopAudio: () => void
  handleToggleShuffleAudio: () => void

  handleChangeCurrentTime: (value: number | readonly number[]) => void
  handleChangeVolume: (value: number | readonly number[]) => void

  handleTimeUpdate: () => void
  handleLoadedAudioMetadata: (event: SyntheticEvent<HTMLAudioElement>) => void
}

const AudioPlayerContext = createContext<IAudioPlayerContextProps | undefined>(
  undefined,
)

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [playlist, setPlaylist] = useState<AudioType[]>([])
  const [currentAudio, setCurrentAudio] = useState<AudioType | undefined>(
    undefined,
  )
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [volume, setVolume] = useState<number>(0.7)

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [isLoop, setIsLoop] = useState<boolean>(false)
  const [isShuffled, setIsShuffled] = useState<boolean>(false)

  useEffect(() => {
    setDuration(0)
    setCurrentTime(0)
  }, [currentAudio])

  const handlePlayAudio = (audio: AudioType, newPlaylist: AudioType[]) => {
    if (newPlaylist) setPlaylist(newPlaylist)

    if (currentAudio?.id === audio.id) {
      handleTogglePlayAudio()
      return
    }

    setCurrentAudio(audio)
    setIsPlaying(true)
  }

  const handleTogglePlayAudio = () => {
    if (!audioRef.current || !currentAudio) return

    if (isPlaying) audioRef.current.pause()
    else audioRef.current.play()

    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedAudioMetadata = (event: SyntheticEvent<HTMLAudioElement>) =>
    setDuration(event.currentTarget.duration)

  const handleChangeCurrentTime = (value: number | readonly number[]) => {
    const newTime = Array.isArray(value) ? value[0] : (value as number)

    setCurrentTime(newTime)

    if (audioRef.current) audioRef.current.currentTime = newTime
  }

  const handleChangeVolume = (value: number | readonly number[]) => {
    const newVolume = Array.isArray(value) ? value[0] : (value as number)

    setVolume(newVolume)
    setIsMuted(newVolume === 0)

    if (audioRef.current) {
      audioRef.current.volume = newVolume
      audioRef.current.muted = newVolume === 0
    }
  }

  const handleToggleMuteAudio = () => {
    if (!audioRef.current) return

    const nextMuted = !isMuted
    setIsMuted(nextMuted)

    audioRef.current.muted = nextMuted
  }

  const handleToggleLoopAudio = () => {
    setIsLoop(!isLoop)
    if (audioRef.current) audioRef.current.loop = !isLoop
  }

  const handlePlayNextAudio = () => {
    if (!playlist?.length) return

    if (!currentAudio) {
      setCurrentAudio(playlist[0])
      setIsPlaying(true)
      return
    }

    const currentIndex = playlist.findIndex(
      (audio) => audio.id === currentAudio.id,
    )
    const nextIndex = (currentIndex + 1) % playlist.length

    setCurrentAudio(playlist[nextIndex])
    setIsPlaying(true)
  }

  const handlePlayPrevAudio = () => {
    if (!playlist?.length || !currentAudio) return

    const currentIndex = playlist.findIndex(
      (audio) => audio.id === currentAudio.id,
    )
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length

    setCurrentAudio(playlist[prevIndex])
    setIsPlaying(true)
  }

  const handleToggleShuffleAudio = () =>
    setIsShuffled((prevState) => !prevState)

  useEffect(() => {
    if (currentTime === duration && isShuffled && !isLoop) {
      if (!playlist?.length || !currentAudio) return

      setCurrentAudio((prevCurrentAudio) => {
        let randomIndex

        do {
          randomIndex = Math.floor(Math.random() * playlist.length)
        } while (playlist[randomIndex].id === prevCurrentAudio?.id)

        return playlist[randomIndex]
      })
    }
  }, [currentTime])

  return (
    <AudioPlayerContext.Provider
      value={{
        currentAudio,
        isPlaying,
        currentTime,
        duration,
        volume,
        playlist,
        isMuted,
        isLoop,
        isShuffled,
        audioRef,
        handlePlayAudio,
        handlePlayNextAudio,
        handlePlayPrevAudio,
        handleTogglePlayAudio,
        handleToggleMuteAudio,
        handleToggleLoopAudio,
        handleToggleShuffleAudio,
        handleChangeCurrentTime,
        handleChangeVolume,
        handleTimeUpdate,
        handleLoadedAudioMetadata,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioPlayerContext)
  if (!context)
    throw new Error("useAudio must be used within AudioPlayerProvider")
  return context
}
