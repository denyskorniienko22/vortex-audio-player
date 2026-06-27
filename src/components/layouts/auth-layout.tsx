import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface IAuthLayoutProps {
  children: ReactNode
}

const AuthLayout = ({ children }: IAuthLayoutProps) => {
  return (
    <div
      className={cn(
        "relative",
        "flex flex-col items-center justify-center",
        "min-h-screen w-full",
        "bg-zinc-950",
        "text-zinc-50",
        "px-4",
        "overflow-hidden",
        "selection:bg-accent/30",
        "xs:h-screen xs:p-0",
        "sm:p-8 sm:h-auto",
      )}
    >
      <figure
        className={cn(
          "absolute top-1/4 left-1/3",
          "size-96 rounded-full",
          "bg-accent/10 blur-3xl",
          "animate-pulse duration-4000",
          "pointer-events-none",
        )}
      />
      <figure
        className={cn(
          "absolute bottom-1/4 right-1/3",
          "size-96 rounded-full",
          "bg-zinc-800/20 blur-3xl",
          "animate-pulse duration-3000",
          "pointer-events-none",
        )}
      />
      {children}
    </div>
  )
}

export default AuthLayout
