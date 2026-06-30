"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "tw:relative tw:flex tw:w-full tw:touch-none tw:items-center tw:select-none tw:data-disabled:opacity-50 tw:data-vertical:h-full tw:data-vertical:min-h-40 tw:data-vertical:w-auto tw:data-vertical:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-input/90 tw:data-horizontal:h-2 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-2"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="tw:block tw:h-4 tw:w-6 tw:shrink-0 tw:rounded-full tw:bg-white tw:shadow-md tw:ring-1 tw:ring-black/10 tw:transition-[color,box-shadow,background-color] tw:select-none tw:not-dark:bg-clip-padding tw:hover:ring-4 tw:hover:ring-ring/30 tw:focus-visible:ring-4 tw:focus-visible:ring-ring/30 tw:focus-visible:outline-hidden tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-vertical:h-6 tw:data-vertical:w-4"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
