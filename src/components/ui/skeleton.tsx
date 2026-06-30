import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("tw:animate-pulse tw:rounded-2xl tw:bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
