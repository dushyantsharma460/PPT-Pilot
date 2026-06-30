import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/providers/theme-provider'

export function ThemeToggle() {
  const { theme, resolvedTheme, toggleTheme } = useTheme()

  const label =
    theme === 'auto'
      ? 'Theme mode: auto (system). Click to switch to light mode.'
      : theme === 'dark'
        ? 'Theme mode: dark. Click to switch to auto mode.'
        : 'Theme mode: light. Click to switch to dark mode.'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center rounded-full border border-border/50 bg-muted/40 p-2 text-foreground transition-all hover:scale-105"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  )
}
