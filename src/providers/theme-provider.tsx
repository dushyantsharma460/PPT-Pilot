import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type ThemeMode = 'light' | 'dark' | 'auto'
export type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function getStoredMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'auto'
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored
  }

  return 'auto'
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode !== 'auto') {
    return mode
  }

  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function applyThemeMode(mode: ThemeMode) {
  if (typeof document === 'undefined') {
    return
  }

  const resolved = resolveTheme(mode)
  const root = document.documentElement

  root.classList.remove('light', 'dark')
  root.classList.add(resolved)

  if (mode === 'auto') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', mode)
  }

  root.style.colorScheme = resolved
}

type ThemeContextValue = {
  theme: ThemeMode
  resolvedTheme: ResolvedTheme
  setTheme: (mode: ThemeMode) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: ThemeMode
}

export function ThemeProvider({
  children,
  defaultTheme = 'auto',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(() =>
    typeof window !== 'undefined' ? getStoredMode() : defaultTheme,
  )
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    typeof window !== 'undefined'
      ? resolveTheme(getStoredMode())
      : resolveTheme(defaultTheme),
  )

  useEffect(() => {
    applyThemeMode(theme)
    setResolvedTheme(resolveTheme(theme))
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    if (theme !== 'auto') {
      return
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      applyThemeMode('auto')
      setResolvedTheme(resolveTheme('auto'))
    }

    media.addEventListener('change', onChange)
    return () => {
      media.removeEventListener('change', onChange)
    }
  }, [theme])

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode)
  }

  const toggleTheme = () => {
    const nextMode: ThemeMode =
      theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light'
    setTheme(nextMode)
  }

  return (
    <ThemeContext.Provider
      value={{ theme, resolvedTheme, setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
