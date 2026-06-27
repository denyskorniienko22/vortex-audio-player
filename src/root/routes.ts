export const ROUTES = {
  HOME: "/audios",
  LOGIN: "/login",
  REGISTRATION: "/registration",
  LOGOUT: "/logout",
  FAVORITES: "/favorites",
  USER_PLAYLISTS: "/playlists",
  USER_PLAYLIST_AUDIOS: "/playlists/:playlist_id",
  AUDIO_PLAYLIST_ACTIONS: "/audio-playlist-actions",
} as const

export type RoutesType = Exclude<
  (typeof ROUTES)[keyof typeof ROUTES],
  "/playlists/:playlist_id" | "/audio-playlist-actions"
>
