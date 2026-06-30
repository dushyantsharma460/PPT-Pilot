import { useTheme } from '@/providers/theme-provider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

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
      className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm font-semibold text-[var(--sea-ink)] shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5"
    >
      {theme === 'auto' ? 'Auto' : theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
}
