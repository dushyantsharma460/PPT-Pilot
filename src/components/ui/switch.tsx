"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "tw:peer tw:group/switch tw:relative tw:inline-flex tw:shrink-0 tw:items-center tw:rounded-full tw:border-2 tw:transition-all tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/30 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-[size=default]:h-5 tw:data-[size=default]:w-11 tw:data-[size=sm]:h-4 tw:data-[size=sm]:w-7 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-unchecked:border-transparent tw:data-unchecked:bg-input/90 tw:data-disabled:cursor-not-allowed tw:data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:shadow-sm tw:ring-0 tw:transition-transform tw:not-dark:bg-clip-padding tw:group-data-[size=default]/switch:h-4 tw:group-data-[size=default]/switch:w-6 tw:group-data-[size=sm]/switch:h-3 tw:group-data-[size=sm]/switch:w-4 tw:data-checked:translate-x-[calc(100%-8px)] tw:dark:data-checked:bg-primary-foreground tw:data-unchecked:translate-x-0 tw:dark:data-unchecked:bg-foreground"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
