import { prisma } from '#/lib/db'

export async function getOwnedPresentation(id: string, userId: string) {
  const presentation = await prisma.presentation.findFirst({
    where: { id, userId },
  })

  if (!presentation) {
    throw new Error('Presentation not found')
  }

  return presentation
}
