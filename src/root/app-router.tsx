import { createBrowserRouter, redirect, RouterProvider } from "react-router"
import { Toaster } from "sonner"

import PageLayout from "@/components/layouts/page-layout"
import { audioAction } from "@/features/audio/audio.action"
import { audioLoader } from "@/features/audio/audio.loader"
import { favoriteAudioLoader } from "@/features/audio/favorite-audio.loader"
import { AudioFiltersProvider } from "@/features/audio-filters/provider/audio-filter-context"
import { AudioPlayerProvider } from "@/features/audio-player/provider/audio-player-provider"
import { authAction } from "@/features/auth/auth.action"
import { playlistAction } from "@/features/playlist/playlist.action"
import { playlistLoader } from "@/features/playlist/playlist.loader"
import { playlistAudiosLoader } from "@/features/playlist/playlist-audio.loader"

import {
  FavoriteAudiosPage,
  HomePage,
  LoginPage,
  RegistrationPage,
  UserPlaylistAudiosPage,
  UserPlaylistsPage,
} from "./../pages"
import { notFountRedirectLoader } from "./not-found-redirect-loader"
import { rootLoader } from "./root-loader"
import { ROUTES } from "./routes"

const router = createBrowserRouter([
  {
    id: "root",
    loader: rootLoader,
    children: [
      {
        index: true,
        loader: () => redirect(ROUTES.HOME),
      },
      {
        element: (
          <AudioPlayerProvider>
            <AudioFiltersProvider>
              <PageLayout />
            </AudioFiltersProvider>
          </AudioPlayerProvider>
        ),
        children: [
          {
            path: ROUTES.HOME,
            element: <HomePage />,
            loader: audioLoader,
            action: audioAction,
          },
          {
            path: ROUTES.FAVORITES,
            element: <FavoriteAudiosPage />,
            loader: favoriteAudioLoader,
            action: audioAction,
          },
          {
            path: ROUTES.USER_PLAYLISTS,
            element: <UserPlaylistsPage />,
            loader: playlistLoader,
            action: playlistAction,
          },
          {
            path: ROUTES.USER_PLAYLIST_AUDIOS,
            element: <UserPlaylistAudiosPage />,
            loader: playlistAudiosLoader,
            action: audioAction,
          },
          {
            path: ROUTES.AUDIO_PLAYLIST_ACTIONS,
            action: audioAction,
          },
        ],
      },
      {
        path: ROUTES.REGISTRATION,
        element: <RegistrationPage />,
        action: authAction,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
        action: authAction,
      },
      {
        path: ROUTES.LOGOUT,
        action: authAction,
      },
      {
        path: "*",
        loader: notFountRedirectLoader,
      },
    ],
  },
])

export const AppRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" richColors />
    </>
  )
}
