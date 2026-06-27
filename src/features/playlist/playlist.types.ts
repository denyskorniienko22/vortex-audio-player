import type { AudioType } from "../audio/audio.types"

export type PlaylistType = {
  id: string | number
  user_id: string
  title: string
}

export type PlaylistsLoaderType = {
  playlists: PlaylistType[]
  totalCount: number
  error?: string
}

export type PlaylistAudiosLoaderResultType = {
  audios: AudioType[]
  playlist: {
    id: string | number
    title: string
    totalCount: number
  }
}
