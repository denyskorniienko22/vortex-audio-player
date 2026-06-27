import type { AudioType } from "@/features/audio/audio.types"

export type AudioLoaderResponse = {
  audios: AudioType[]
  totalCount: number
  error?: string
}
