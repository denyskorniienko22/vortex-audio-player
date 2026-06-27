export const AUTH_INTENTS = {
  REGISTRATION: "registration",
  LOGIN: "login",
  LOGOUT: "logout",
} as const

export type AuthIntentsType = (typeof AUTH_INTENTS)[keyof typeof AUTH_INTENTS]
