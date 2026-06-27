import type { AudioType } from "@/features/audio/audio.types"

export const mapSupabaseAudio = (
  audio: AudioType,
  currentUserId?: string,
): AudioType | null => {
  if (!audio) return null

  let isFavorite = false

  if (Array.isArray(audio.is_favorite)) {
    isFavorite = currentUserId
      ? audio.is_favorite.some(
          (favorite: any) => favorite.user_id === currentUserId,
        )
      : audio.is_favorite.length > 0
  } else {
    isFavorite = !!audio.is_favorite
  }

  const playlistsIds = Array.isArray(audio.playlists_ids)
    ? audio.playlists_ids.map((p: any) => p.playlist_id).filter(Boolean)
    : []

  return {
    id: audio.id,
    title: audio.title,
    genre: audio.genre,
    audio_img: audio.audio_img,
    author_name: audio.author_name,
    audio_url: audio.audio_url,
    is_favorite: isFavorite,
    playlists_ids: playlistsIds,
  }
}
