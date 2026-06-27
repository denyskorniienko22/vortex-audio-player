import { type ActionFunctionArgs } from "react-router"

import type { ActionResponseType } from "@/types/action-response"

import { loginAction, logoutAction, registrationAction } from "./auth.api"
import { AUTH_INTENTS } from "./auth.constants"

export const authAction = async ({
  request,
}: ActionFunctionArgs): Promise<ActionResponseType | Response | undefined> => {
  const formData = await request.formData()

  const intent = formData.get("intent")

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  switch (intent) {
    case AUTH_INTENTS.LOGIN:
      return loginAction(email, password)
    case AUTH_INTENTS.REGISTRATION:
      return registrationAction(email, password)
    case AUTH_INTENTS.LOGOUT:
      return logoutAction()
  }
}
