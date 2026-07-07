import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/presentations/$presentationId')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <h1 className="text-2xl font-bold">Presentation Page</h1>
        </div>
    )
}