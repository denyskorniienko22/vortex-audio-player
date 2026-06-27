import { AlertCircle, SearchX } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface IMessageProps {
  title: string
  description?: string
  variant?: "empty" | "error"
  children?: ReactNode
}

const Message = ({
  title,
  description,
  variant = "empty",
  children,
}: IMessageProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        "max-w-sm",
        "text-center",
        "mx-auto p-0",
      )}
    >
      <div
        className={cn(
          "rounded-full",
          "bg-zinc-900/50",
          "border border-zinc-800/50",
          "mb-4 p-4",
          variant === "error" ? "text-destructive" : "text-zinc-500",
        )}
      >
        {variant === "error" ? (
          <AlertCircle className="size-10 stroke-[1.5]" />
        ) : (
          <SearchX className="size-10 stroke-[1.5]" />
        )}
      </div>

      <h3
        className={cn(
          "font-semibold text-lg text-zinc-100 tracking-tight",
          "mb-1",
        )}
      >
        {title}
      </h3>

      {description && (
        <p
          className={cn(
            "max-w-70",
            "text-sm text-zinc-400 font-normal leading-relaxed",
            "mb-5",
          )}
        >
          {description}
        </p>
      )}

      {children && (
        <div className={cn("flex justify-center", "w-full", "mt-1")}>
          {children}
        </div>
      )}
    </div>
  )
}

export default Message
