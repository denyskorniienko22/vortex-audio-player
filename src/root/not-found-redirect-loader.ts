import { redirect } from "react-router"

import { ROUTES } from "./routes"

export const notFountRedirectLoader = () => redirect(ROUTES.HOME)
