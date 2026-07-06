import { createServerFn } from '@tanstack/react-start'
import { generateSlug } from 'random-word-slugs'
import { authFnMiddleware } from '#/middleware/auth'
import { prisma } from '#/lib/db'
import { PresentationStatus } from '#/generated/prisma/enums'
import {
  createPresentationInputSchema,
  presentationIdInputSchema,
  updatePresentationInputSchema,
} from '../types/schema'
import { getOwnedPresentation } from '../lib/get-owned-presentation'

export const createPresentation = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => createPresentationInputSchema.parse(data))
  .middleware([authFnMiddleware])
  .handler(async ({ data, context }) => {
    const userId = context.session.user.id

    const presentation = await prisma.presentation.create({
      data: {
        userId,
        title: generateSlug(3, { format: 'title' }),
        prompt: data.prompt,
        slideCount: data.slideCount,
        style: data.style,
        tone: data.tone,
        layout: data.layout,
        status: PresentationStatus.GENERATING,
      },
    })

    // TODO: inngest background job trigger

    return presentation
  })

export const updatePresentation = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => updatePresentationInputSchema.parse(data))
  .middleware([authFnMiddleware])
  .handler(async ({ data, context }) => {
    const userId = context.session.user.id
    const { id, ...updates } = data

    await getOwnedPresentation(id, userId)

    return prisma.presentation.update({
      where: { id },
      data: updates,
    })
  })

export const deletePresentation = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => presentationIdInputSchema.parse(data))
  .middleware([authFnMiddleware])
  .handler(async ({ data, context }) => {
    const userId = context.session.user.id

    await getOwnedPresentation(data.id, userId)

    await prisma.presentation.delete({
      where: { id: data.id },
    })

    return { success: true, id: data.id }
  })

export const regeneratePresentation = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => presentationIdInputSchema.parse(data))
  .middleware([authFnMiddleware])
  .handler(async ({ data, context }) => {
    const userId = context.session.user.id

    await getOwnedPresentation(data.id, userId)

    const presentation = await prisma.presentation.update({
      where: { id: data.id },
      data: {
        status: PresentationStatus.GENERATING,
      },
    })

    // TODO: Trigger Inngest background job here
    // await inngest.send({
    //   name: "presentation/generate",
    //   data: { presentationId: presentation.id }
    // })

    return presentation
  })