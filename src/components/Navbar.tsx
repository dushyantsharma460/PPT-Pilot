import { authClient } from '#/lib/auth-client'
import { Link, useRouter, useRouterState } from '@tanstack/react-router'
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Presentation,
  Sparkles,
  User,
} from 'lucide-react'

import ThemeToggle from './ThemeToggle'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
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
  'rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-background/80 hover:text-foreground'

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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* LEFT */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/40">
            <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <Presentation className="relative z-10 h-5 w-5" />
          </div>

          <div className="hidden sm:block">
            <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-xl font-black tracking-tight text-transparent">
              PPTPilot
            </h1>
            <p className="text-xs font-medium text-muted-foreground">
              AI Presentation Generator
            </p>
          </div>
        </Link>

        {/* CENTER NAV */}
        <nav className="hidden items-center gap-3 rounded-full border border-border/50 bg-muted/40 px-3 py-2 backdrop-blur md:flex">
          <Link
            to="/"
            activeProps={{
              className: 'bg-background text-foreground shadow-sm',
            }}
            className={navLinkClass}
          >
            Home
          </Link>

          <Link
            to="/"
            className={`flex items-center gap-2 ${navLinkClass}`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-full bg-primary/90 px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:scale-[1.03] hover:bg-primary"
          >
            <Plus className="h-4 w-4" />
            Create PPT
          </Link>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* AI Badge */}
          <div className="hidden items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 md:flex">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="text-xs font-semibold text-purple-500">
              AI Powered
            </span>
          </div>

          <ThemeToggle />

          {!session?.user ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild className="rounded-full">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="rounded-full px-5 shadow-lg">
                <Link to="/login">Get Started</Link>
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-11 w-11 rounded-full p-0 transition-transform hover:scale-105"
                >
                  <Avatar className="h-11 w-11 border-2 border-primary/20 shadow-md">
                    <AvatarImage
                      src={session.user.image || ''}
                      alt={session.user.name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 font-bold text-white">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-green-500" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-72 rounded-2xl border border-border/50 bg-background/95 p-2 shadow-2xl backdrop-blur-xl"
              >
                <DropdownMenuLabel className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={session.user.image || ''} />
                      <AvatarFallback>
                        {session.user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="font-semibold leading-none">
                        {session.user.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  disabled
                  className="mt-1 cursor-pointer rounded-xl p-3"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="mt-1 cursor-pointer rounded-xl p-3 text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full max-w-xs">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
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
                  <Link
                    to="/"
                    className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    <Plus className="h-4 w-4" />
                    Create PPT
                  </Link>
                </SheetClose>
                {!session?.user ? (
                  <>
                    <SheetClose asChild>
                      <Link to="/login" className={navLinkClass}>
                        Login
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        to="/login"
                        className="flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                      >
                        Get Started
                      </Link>
                    </SheetClose>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    className="justify-start text-red-500"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
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
