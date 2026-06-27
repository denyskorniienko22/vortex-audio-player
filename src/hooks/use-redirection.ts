import { useNavigation } from "react-router"

import type { RoutesType } from "@/root/routes"

interface IUseRedirectionProps {
  redirectTo?: RoutesType
}

export const useRedirection = ({
  redirectTo = "/audios",
}: IUseRedirectionProps) => {
  const navigation = useNavigation()

  const isRedirecting =
    navigation.location?.pathname === redirectTo && navigation.state !== "idle"

  return {
    isRedirecting,
  }
}
