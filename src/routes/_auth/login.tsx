import LoginForm from "#/components/auth/login-form"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Presentation } from "lucide-react"
import { z } from "zod"

export const Route = createFileRoute("/_auth/login")({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),

  component: LoginPage,
})

function LoginPage() {
  const { redirect } = Route.useSearch()

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        
        <div className="rounded-3xl bg-background/80 p-8 backdrop-blur">
          
          {/* Logo */}
          <div className="mb-6 flex flex-col items-center gap-3">
            <Link to="/" className="no-underline">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary">
                <Presentation className="size-8 text-primary-foreground" />
              </div>
            </Link>

            <div className="text-center">
              <h1 className="text-2xl font-bold">
                Welcome to{" "}
                <span className="text-primary">PPTPilot</span>
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Sign in to create beautiful presentations
              </p>
            </div>
          </div>

          {/* Login Form */}
          <LoginForm redirectTo={redirect} />
        </div>
      </div>
    </div>
  )
}

export default LoginPage