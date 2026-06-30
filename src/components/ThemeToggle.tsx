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
      className="rounded-xl border border-white/10 px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
    >
      {theme === 'auto' ? 'Auto' : theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
}
