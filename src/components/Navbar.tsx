import { authClient } from '#/lib/auth-client'
import { Link, useRouter, useRouterState } from '@tanstack/react-router'
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Presentation,
  User,
} from 'lucide-react'

import ThemeToggle from './ThemeToggle'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

const navLinkClass =
  'rounded-xl px-4 py-2 text-sm font-medium text-[var(--nav-text)] transition hover:bg-[var(--nav-hover)]'

const mobileNavLinkClass =
  'flex w-full items-center rounded-xl px-4 py-3 text-base font-medium text-[var(--nav-text)] no-underline transition hover:bg-[var(--nav-hover)]'

const loginButtonClass =
  'inline-flex items-center justify-center rounded-xl border border-[var(--nav-border)] px-4 py-2 text-sm font-medium text-[var(--nav-text)] transition hover:bg-[var(--nav-hover)]'

const primaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-lime-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90'

const iconButtonClass =
  'h-9 w-9 shrink-0 rounded-xl text-[var(--nav-muted)] hover:bg-[var(--nav-hover)] hover:text-[var(--nav-text)] sm:h-10 sm:w-10'

const profileButtonClass =
  'rounded-full transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/40'

function getUserInitials(name?: string | null, email?: string | null) {
  const source = name?.trim() || email?.trim() || ''
  return source.charAt(0).toUpperCase() || 'U'
}

function UserAvatar({
  user,
  className = 'h-10 w-10',
}: {
  user: { name?: string | null; email?: string | null; image?: string | null }
  className?: string
}) {
  const initials = getUserInitials(user.name, user.email)

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--nav-border)] bg-[var(--nav-hover)] font-medium text-[var(--nav-text)] ${className}`}
    >
      {user.image ? (
        <img
          src={user.image}
          alt={user.name ?? 'User profile'}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-sm">{initials}</span>
      )}
    </div>
  )
}

function MobileUserSection({
  user,
  onLogout,
}: {
  user: { name?: string | null; email?: string | null; image?: string | null }
  onLogout: () => void
}) {
  return (
    <div className="mb-4 space-y-3 border-b border-[var(--nav-border)] pb-4">
      <div className="flex items-center gap-3 rounded-xl bg-[var(--nav-hover)] p-3">
        <UserAvatar user={user} />
        <div className="min-w-0 space-y-1">
          <p className="truncate font-medium text-[var(--nav-text)]">{user.name}</p>
          <p className="truncate text-xs text-[var(--nav-muted)]">{user.email}</p>
        </div>
      </div>

      <Button
        variant="ghost"
        className="w-full justify-start rounded-xl text-[var(--nav-muted)] hover:bg-[var(--nav-hover)] hover:text-[var(--nav-text)]"
        disabled
      >
        <User className="h-4 w-4" />
        Profile
      </Button>

      <Button
        variant="ghost"
        className="w-full justify-start rounded-xl text-red-500 hover:bg-[var(--nav-hover)] hover:text-red-500 dark:text-red-400 dark:hover:text-red-400"
        onClick={onLogout}
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </div>
  )
}

export default function Navbar() {
  const router = useRouter()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const { data: session } = authClient.useSession()

  if (pathname.startsWith('/login')) {
    return null
  }

  const handleLogout = async () => {
    await authClient.signOut()
    router.navigate({ to: '/login' })
  }

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-[var(--nav-border)] bg-[var(--nav-bg)] backdrop-blur-md sm:h-16 md:h-20">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-2 px-3 sm:px-4 md:px-6">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2 no-underline sm:gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime-500 sm:h-10 sm:w-10 md:h-11 md:w-11">
            <Presentation className="h-4 w-4 text-white sm:h-5 sm:w-5" />
          </div>

          <h1 className="truncate text-lg font-bold tracking-tight text-[var(--nav-text)] sm:text-2xl md:text-3xl">
            PPT<span className="text-lime-500 dark:text-lime-400">Pilot</span>
          </h1>
        </Link>

        <nav className="hidden items-center gap-4 lg:gap-6 md:flex">
          <Link
            to="/"
            activeProps={{ className: 'bg-[var(--nav-hover)] !text-[var(--nav-text)]' }}
            className={`${navLinkClass} !text-[var(--nav-text)] hover:!text-[var(--nav-text)] visited:!text-[var(--nav-text)]`}
          >
            Home
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-[var(--nav-text)] no-underline transition hover:bg-[var(--nav-hover)] hover:text-[var(--nav-text)] visited:text-[var(--nav-text)]"
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            <span className="hidden lg:inline">Dashboard</span>
            <span className="lg:hidden">Dash</span>
          </Link>

          <Link
            to="/"
            className={`${primaryButtonClass} !text-white hover:!text-white visited:!text-white`}
          >
            <Plus className="h-4 w-4 shrink-0" />
            <span className="hidden lg:inline">Create PPT</span>
            <span className="lg:hidden">Create</span>
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-4">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {!session?.user ? (
            <Link
              to="/login"
              className={`${loginButtonClass} hidden !text-[var(--nav-text)] hover:!text-[var(--nav-text)] visited:!text-[var(--nav-text)] md:inline-flex`}
            >
              Login
            </Link>
          ) : (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    aria-label="Open account menu"
                    className={profileButtonClass}
                  >
                    <UserAvatar user={session.user} className="h-9 w-9 md:h-10 md:w-10" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="z-[9999] w-72 rounded-xl border border-[var(--nav-border)] bg-[var(--nav-surface)] p-2 text-[var(--nav-text)] shadow-lg"
                >
                  <DropdownMenuLabel className="pb-3 text-[var(--nav-text)]">
                    <div className="flex items-center gap-3">
                      <UserAvatar user={session.user} />
                      <div className="min-w-0 space-y-1">
                        <h4 className="truncate font-medium leading-none text-[var(--nav-text)]">
                          {session.user.name}
                        </h4>
                        <p className="truncate text-xs text-[var(--nav-muted)]">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-[var(--nav-border)]" />

                  <DropdownMenuItem
                    disabled
                    className="rounded-xl text-[var(--nav-muted)] focus:bg-[var(--nav-hover)] focus:text-[var(--nav-text)]"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="rounded-xl text-red-500 focus:bg-[var(--nav-hover)] focus:text-red-500 dark:text-red-400 dark:focus:text-red-400"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`${iconButtonClass} md:hidden`}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[min(100vw-2rem,20rem)] border-[var(--nav-border)] bg-[var(--nav-bg)] p-0 text-[var(--nav-text)] sm:max-w-xs"
            >
              <SheetHeader className="border-b border-[var(--nav-border)] px-4 py-4 text-left">
                <SheetTitle className="text-[var(--nav-text)]">Menu</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-4 overflow-y-auto px-4 py-4">
                {session?.user ? (
                  <MobileUserSection user={session.user} onLogout={handleLogout} />
                ) : null}

                <nav className="flex flex-col gap-1">
                  <SheetClose asChild>
                    <Link to="/" className={mobileNavLinkClass}>
                      Home
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link to="/" className={mobileNavLinkClass}>
                      <LayoutDashboard className="mr-2 h-4 w-4 shrink-0" />
                      Dashboard
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link to="/" className={`${mobileNavLinkClass} bg-lime-500 hover:bg-lime-500/90`}>
                      <Plus className="mr-2 h-4 w-4 shrink-0" />
                      Create PPT
                    </Link>
                  </SheetClose>
                </nav>

                {!session?.user ? (
                  <div className="flex flex-col gap-2 border-t border-[var(--nav-border)] pt-4">
                    <SheetClose asChild>
                      <Link to="/login" className={`${mobileNavLinkClass} border border-[var(--nav-border)]`}>
                        Login
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/login" className={`${mobileNavLinkClass} bg-lime-500 hover:bg-lime-500/90`}>
                        Get Started
                      </Link>
                    </SheetClose>
                  </div>
                ) : null}

                <div className="border-t border-[var(--nav-border)] pt-4 md:hidden">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--nav-muted)]">
                    Theme
                  </p>
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
