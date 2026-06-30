import * as React from "react"

import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default"
}

function NativeSelect({
  className,
  size = "default",
  ...props
}: NativeSelectProps) {
  return (
    <div
      className={cn(
        "tw:group/native-select tw:relative tw:w-fit tw:has-[select:disabled]:opacity-50",
        className
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className="tw:h-9 tw:w-full tw:min-w-0 tw:appearance-none tw:rounded-3xl tw:border tw:border-transparent tw:bg-input/50 tw:py-1 tw:pr-8 tw:pl-3 tw:text-sm tw:transition-[color,box-shadow,background-color] tw:outline-none tw:select-none tw:selection:bg-primary tw:selection:text-primary-foreground tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/30 tw:disabled:pointer-events-none tw:disabled:cursor-not-allowed tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-[size=sm]:h-8 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40"
        {...props}
      />
      <ChevronDownIcon className="tw:pointer-events-none tw:absolute tw:top-1/2 tw:right-2.5 tw:size-4 tw:-translate-y-1/2 tw:text-muted-foreground tw:select-none" aria-hidden="true" data-slot="native-select-icon" />
    </div>
  )
}

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("tw:bg-[Canvas] tw:text-[CanvasText]", className)}
      {...props}
    />
  )
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("tw:bg-[Canvas] tw:text-[CanvasText]", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
