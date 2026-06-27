import type { ReactNode } from "react"
import { Link } from "react-router"

import { cn } from "@/lib/utils"

interface IAuthFormContainerProps {
  title: string
  description: string
  footerText: string
  footerLinkTo: string
  footerLinkText: string
  children: ReactNode
}

const AuthFormContainer = ({
  title,
  description,
  footerText,
  footerLinkTo,
  footerLinkText,
  children,
}: IAuthFormContainerProps) => {
  return (
    <div className={cn("xs:size-full sm:max-w-96 sm:h-auto")}>
      <div
        className={cn(
          "flex items-center",
          "rounded-2xl w-full",
          "bg-zinc-900/40 backdrop-blur-xl shadow-2xl",
          "border border-zinc-800/80",
          "p-8",
          "xs:size-full xs:rounded-none xs:px-4",
          "sm:h-auto sm:rounded-2xl",
        )}
      >
        <div className="flex flex-col gap-7 w-full">
          <div
            className={cn("flex flex-col items-center gap-1.5", "text-left")}
          >
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-zinc-400">{description}</p>
          </div>
          {children}
          <p className="text-zinc-400 text-center">
            {footerText}{" "}
            <Link to={footerLinkTo} className="font-semibold hover:underline">
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthFormContainer
