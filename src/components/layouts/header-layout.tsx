import { TextAlignJustify } from "lucide-react"
import { Link, useLocation } from "react-router"

import { useAudioFilters } from "@/features/audio-filters/hooks/use-audio-filters"
import UserMenu from "@/features/user/components/user-menu"
import { cn } from "@/lib/utils"
import { ROUTES } from "@/root/routes"

import { Button } from "../ui/button"

const HeaderLayout = () => {
  const { handleOpenFilters } = useAudioFilters()

  const location = useLocation()
  const isHomePage = location.pathname === ROUTES.HOME

  return (
    <header
      className={cn(
        "sticky top-0 z-40",
        "w-full",
        "bg-foreground/80 backdrop-blur-md",
        "border-b border-accent/10",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-4",
          "h-16",
          "px-4",
          "2xl:container 2xl:mx-auto",
        )}
      >
        <Link
          to={ROUTES.HOME}
          className={cn(
            "text-2xl font-black tracking-tight uppercase hidden lg:block",
            !isHomePage && "xs:block",
          )}
        >
          VORTEX AUDIO
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleOpenFilters}
          className={cn(
            "hidden",
            "lg:hidden",
            isHomePage && "flex items-center justify-center",
          )}
        >
          <TextAlignJustify />
        </Button>
        <UserMenu />
      </div>
    </header>
  )
}

export default HeaderLayout
