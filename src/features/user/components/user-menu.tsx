import { Heart, ListMusic, LogOut, User } from "lucide-react"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ROUTES } from "@/root/routes"

import { useUserMenu } from "../hooks/use-user-menu"

const UserMenu = () => {
  const { user, countFavorites, countPlaylists, handleLogout } = useUserMenu()

  if (!user) {
    return (
      <Link to={ROUTES.LOGIN}>
        <Button
          className={cn(
            "rounded-full w-max h-10",
            "bg-zinc-900",
            "text-zinc-200",
            "transition-transform",
            "cursor-pointer",
            "px-6",
            "hover:scale-105",
            "active:scale-95",
          )}
        >
          Sign In
        </Button>
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          size="icon"
          className={cn(
            "size-9 rounded-full",
            "bg-zinc-950",
            "text-zinc-200",
            "border border-zinc-800",
            "transition-transform",
            "cursor-pointer",
            "hover:scale-105",
            "active:scale-95",
          )}
        >
          <User className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          "w-48",
          "bg-zinc-900",
          "border-zinc-800",
          "text-zinc-200",
          "z-50",
        )}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuLabel className="text-white text-sm">
            {user?.email}
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-accent/10" />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <Link to={ROUTES.FAVORITES}>
            <DropdownMenuItem
              className={cn("justify-between", "cursor-pointer")}
            >
              <div className="flex items-center gap-2">
                <Heart className="size-4" />
                Favorites
              </div>
              {countFavorites}
            </DropdownMenuItem>
          </Link>
          <Link to={ROUTES.USER_PLAYLISTS}>
            <DropdownMenuItem
              className={cn("justify-between", "cursor-pointer")}
            >
              <div className="flex items-center gap-2">
                <ListMusic className="size-4" />
                Playlists
              </div>
              {countPlaylists}
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-accent/10" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className={cn("gap-2", "cursor-pointer")}
            variant="destructive"
            onClick={handleLogout}
          >
            <LogOut className="size-4" />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
