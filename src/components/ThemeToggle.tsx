import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/providers/theme-provider'

export default function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme()

  const label =
    resolvedTheme === 'dark'
      ? 'Switch to light mode'
      : 'Switch to dark mode'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] p-2 text-[var(--sea-ink)] shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  )
}
