import { createServerFn } from '@tanstack/react-start'
import { authFnMiddleware } from '#/middleware/auth'
import { prisma } from '#/lib/db'
import { presentationIdInputSchema } from '../types/schema'
import { getOwnedPresentation } from '../lib/get-owned-presentation'

export const listPresentations = createServerFn({ method: 'GET' })
  .middleware([authFnMiddleware])
  .handler(async ({ context }) => {
    const userId = context.session.user.id

    return prisma.presentation.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: {
          select: { slides: true },
        },
      },
    })
  })

export const getPresentation = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => presentationIdInputSchema.parse(data))
  .middleware([authFnMiddleware])
  .handler(async ({ data, context }) => {
    const userId = context.session.user.id

    await getOwnedPresentation(data.id, userId)

    return prisma.presentation.findUniqueOrThrow({
      where: { id: data.id },
      include: {
        slides: {
          orderBy: { order: 'asc' },
        },
      },
    })
  })
