import { authClient } from "#/lib/auth-client"
import { Button } from "@base-ui/react"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"

export default function LoginForm({redirectTo}: {redirectTo?: string}) {
  const navigate = useNavigate()

  const [isSubmitting, setIsSubmitting] = useState<"github" | "google" | null>(null)

  const handleSocialLogin = async (provider: "github" | "google") => {
    try {
      setIsSubmitting(provider)

      await authClient.signIn.social({
        provider,

        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged in successfully")

            navigate({
              to: redirectTo || "/",
            })
          },

          onError: ({ error }) => {
            toast.error(error.message || "Something went wrong")

            setIsSubmitting(null)
          },
        },
      })
    } catch (error) {
      console.error(error)

      toast.error("Something went wrong")

      setIsSubmitting(null)
    }
  }

  return (
    <div className="space-y-4">

      {/* Google Login */}
      <Button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-xl border bg-background px-4 py-3 font-medium transition hover:bg-muted"
        onClick={() => handleSocialLogin("google")}
        disabled={isSubmitting !== null}
      >
        {/* Google SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="size-5"
        >
          <path
            fill="#FFC107"
            d="M43.611 20.083H42V20H24v8h11.303C33.659 32.657 29.243 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
          />
          <path
            fill="#FF3D00"
            d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.146 35.091 26.715 36 24 36c-5.222 0-9.627-3.329-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.611 20.083H42V20H24v8h11.303c-1.058 3.097-3.418 5.548-6.493 6.87l6.19 5.238C38.169 37.189 44 31.091 44 24c0-1.341-.138-2.65-.389-3.917z"
          />
        </svg>

        {isSubmitting === "google"
          ? "Redirecting..."
          : "Continue with Google"}
      </Button>

      {/* GitHub Login */}
      <Button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-xl border bg-background px-4 py-3 font-medium transition hover:bg-muted"
        onClick={() => handleSocialLogin("github")}
        disabled={isSubmitting !== null}
      >
        {/* GitHub SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-5 fill-current"
        >
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.082-.729.082-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.49 11.49 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.242 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.813 1.102.813 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.373-12-12-12z" />
        </svg>

        {isSubmitting === "github"
          ? "Redirecting..."
          : "Continue with GitHub"}
      </Button>
    </div>
  )
}