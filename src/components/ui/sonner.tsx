import { useTheme } from "@/providers/theme-provider"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme()
  const sonnerTheme: ToasterProps['theme'] =
    theme === 'auto' ? 'system' : theme

  return (
    <Sonner
      theme={sonnerTheme}
      className="tw:toaster tw:group"
      icons={{
        success: (
          <CircleCheckIcon className="tw:size-4" />
        ),
        info: (
          <InfoIcon className="tw:size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="tw:size-4" />
        ),
        error: (
          <OctagonXIcon className="tw:size-4" />
        ),
        loading: (
          <Loader2Icon className="tw:size-4 tw:animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
