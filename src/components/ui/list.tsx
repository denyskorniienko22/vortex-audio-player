import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { cn } from "@/lib/utils"

interface IListProps<TListItem> extends ComponentPropsWithoutRef<"ul"> {
  items: TListItem[]
  renderItem: (item: TListItem, index: number) => ReactNode
  className?: string
  children?: ReactNode
}

const List = <TListItem,>({
  items,
  renderItem,
  className,
  children,
  ...props
}: IListProps<TListItem>) => {
  if (!items) return null

  return (
    <ul
      className={cn(
        "grid",
        "xs:grid-cols-2",
        "xsm:grid-cols-3",
        "md:grid-cols-4",
        "lg:grid-cols-5",
        "xl:grid-cols-6",
        className,
      )}
      {...props}
    >
      {items.map((item, index) => {
        const key = (item as any).id || index
        return <li key={key}>{renderItem(item, index)}</li>
      })}
      {children && <li>{children}</li>}
    </ul>
  )
}

export default List
