import { authClient } from '#/lib/auth-client'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  authClient.useSession()

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-foreground">Welcome to PPTPilot</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Generate AI-powered presentations in minutes.
      </p>
    </div>
  )
}
