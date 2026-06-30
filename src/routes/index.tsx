import { authClient } from '#/lib/auth-client'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const { data } = authClient.useSession()
  console.log(data)
  return (
    <div>
      Main Page of the Website
    </div>
  )
}
