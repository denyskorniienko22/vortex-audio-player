import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface IAudiosViewLayoutProps {
  children: ReactNode
  title: string
  totalCount: number
}

const AudiosViewLayout = ({
  children,
  title,
  totalCount,
}: IAudiosViewLayoutProps) => {
  return (
    <section className={cn("grid gap-3 flex-1")}>
      <div
        className={cn(
          "flex items-center gap-3",
          "xs:flex-col xs:gap-1.5 xs:items-start",
          "xsm:flex-row xsm:gap-3 xsm:items-center",
        )}
      >
        <h1 className={cn("text-2xl font-black tracking-tight uppercase")}>
          {title}
        </h1>
        <span
          className={cn(
            "rounded",
            "bg-accent/8",
            "text-sm font-mono font-medium text-muted-foreground",
            "px-2 py-0.5",
            "transition-opacity",
          )}
        >
          [{totalCount} units deployed]
        </span>
      </div>
      {children}
    </section>
  )
}

export default AudiosViewLayout
