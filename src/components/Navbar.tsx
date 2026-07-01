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
  'rounded-xl px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5'

const loginButtonClass =
  'inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5'

const primaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-lime-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90'

const iconButtonClass =
  'h-10 w-10 rounded-xl text-zinc-300 hover:bg-white/5 hover:text-white'

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
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 font-medium text-white ${className}`}
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
    <header className="sticky top-0 z-50 h-20 border-b border-white/5 bg-[#0f0d0b]">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-500">
            <Presentation className="h-5 w-5 text-white" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            PPT<span className="text-lime-400">Pilot</span>
          </h1>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            activeProps={{ className: "bg-white/5 !text-white" }}
            className={`${navLinkClass} !text-white hover:!text-white visited:!text-white`}
          >
            Home
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 text-white no-underline hover:text-white visited:text-white"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="text-white">Dashboard</span>
          </Link>

          <Link
            to="/"
            className={`${primaryButtonClass} !text-white hover:!text-white visited:!text-white`}
          >
            <Plus className="h-4 w-4" />
            Create PPT
          </Link>
        </nav>

        <div className="flex items-center gap-5">
          <ThemeToggle />

          {!session?.user ? (
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                to="/login"
                className={`${loginButtonClass} !text-white hover:!text-white visited:!text-white`}
              >
                Login
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Open account menu"
                  className={profileButtonClass}
                >
                  <UserAvatar user={session.user} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-72 rounded-xl border border-white/10 bg-[#1a1816] p-2 text-white"
              >
                <DropdownMenuLabel className="pb-3 text-white">
                  <div className="flex items-center gap-3">
                    <UserAvatar user={session.user} />
                    <div className="space-y-1">
                      <h4 className="font-medium leading-none text-white">
                        {session.user.name}
                      </h4>
                      <p className="text-xs text-zinc-400">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-white/10" />

                <DropdownMenuItem
                  disabled
                  className="rounded-xl text-zinc-400 focus:bg-white/5 focus:text-white"
                >
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="rounded-xl text-red-400 focus:bg-white/5 focus:text-red-400"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              className="w-full max-w-xs border-white/10 bg-[#0f0d0b] text-white"
            >
              <SheetHeader>
                <SheetTitle className="text-white">Menu</SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-2 px-4">
                <SheetClose asChild>
                  <Link to="/" className={navLinkClass}>
                    Home
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link to="/" className={`flex items-center gap-2 ${navLinkClass}`}>
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link to="/" className={primaryButtonClass}>
                    <Plus className="h-4 w-4" />
                    Create PPT
                  </Link>
                </SheetClose>

                {!session?.user ? (
                  <>
                    <SheetClose asChild>
                      <Link to="/login" className={loginButtonClass}>
                        Login
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/login" className={primaryButtonClass}>
                        Get Started
                      </Link>
                    </SheetClose>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    className="justify-start rounded-xl text-red-400 hover:bg-white/5 hover:text-red-400"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
