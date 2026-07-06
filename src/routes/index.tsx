import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { authClient } from '#/lib/auth-client'
import { getSession } from '#/lib/auth.function'
import {
  LAYOUT_OPTIONS,
  SLIDE_STYLES,
  TONE_OPTIONS,
  type SlideLayout,
  type SlideStyle,
  type SlideTone,
} from '#/features/presentation/constant/presentation-options'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Select as SelectPrimitive } from 'radix-ui'
import { ChevronsUpDown, Sparkles, Wand2 } from 'lucide-react'
import { useState, type CSSProperties, type ComponentProps } from 'react'
import { PRESENTATION_TEMPLATES } from '#/features/presentation/constant/presentation-templates'
import { createPresentation } from '#/features/presentation/actions'

type HomeFormState = {
  content: string
  slideCount: number
  style: SlideStyle
  tone: SlideTone
  layout: SlideLayout
}

const SLIDE_MIN = 3
const SLIDE_MAX = 20

export const Route = createFileRoute('/')({
  beforeLoad: async ({ location }) => {
    const session = await getSession()

    if (!session) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }

    return {
      user: session.user,
    }
  },

  component: App,
})

const fieldSelectClass =
  'flex h-10 w-full items-center justify-between rounded-full border border-[var(--control-border)] bg-[var(--control-bg)] px-4 text-sm text-[var(--control-text)] shadow-none hover:bg-[var(--nav-hover)] focus-visible:border-lime-500/40 focus-visible:ring-lime-500/20 dark:focus-visible:border-lime-400/30 dark:focus-visible:ring-lime-400/20'

function PptSelectTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(fieldSelectClass, className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronsUpDown className="size-4 shrink-0 text-[var(--control-muted)]" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function slideProgress(value: number) {
  return `${((value - SLIDE_MIN) / (SLIDE_MAX - SLIDE_MIN)) * 100}%`
}

function App() {
  const { data: session } = authClient.useSession()
  const [form, setForm] = useState<HomeFormState>({
    content: '',
    slideCount: 8,
    style: 'minimal',
    tone: 'formal',
    layout: 'balanced',
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!form.content.trim() || isGenerating) return

    setIsGenerating(true)
    try {
      await createPresentation({
        data: {
          prompt: form.content.trim(),
          slideCount: form.slideCount,
          style: form.style,
          tone: form.tone,
          layout: form.layout,
        },
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const sliderStyle = {
    '--slide-progress': slideProgress(form.slideCount),
  } as CSSProperties

  return (
    <main className="min-h-[calc(100dvh-3.5rem)] px-4 pb-12 pt-8 sm:min-h-[calc(100dvh-4rem)] sm:pt-10 md:min-h-[calc(100dvh-5rem)]">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="mb-3 text-2xl font-bold leading-tight text-foreground md:text-3xl">
            Hello, {session?.user?.name ?? 'World'}!
            <span className="mt-1 block sm:mt-0 sm:inline sm:ml-1">
              What do you want to{' '}
              <span className="text-gradient-peach">create?</span>
            </span>
          </h1>

          <p className="text-base text-muted-foreground sm:text-lg">
            Enter your content and we&apos;ll generate a beautiful presentation
          </p>
        </div>

        <div className="glass w-full rounded-3xl p-4 sm:p-6 md:p-8">
          <Textarea
            placeholder="Describe your presentation topic, paste your notes, or outline your key points..."
            value={form.content}
            onChange={(e) =>
              setForm((current) => ({
                ...current,
                content: e.target.value,
              }))
            }
            className="min-h-[200px] w-full resize-none rounded-2xl border border-[var(--control-border)] bg-[var(--control-bg)] px-4 py-3 text-base leading-7 text-[var(--control-text)] shadow-none backdrop-blur-sm placeholder:text-[var(--control-muted)] focus-visible:border-lime-500/40 focus-visible:ring-lime-500/20 dark:focus-visible:border-lime-400/30 dark:focus-visible:ring-lime-400/20"
          />

          <div className="mt-4 flex items-center justify-between px-1 text-xs text-muted-foreground">
            <span>{form.content.length.toLocaleString()} characters</span>
            <span>Markdown supported</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium text-muted-foreground">
                Slides:{' '}
                <span className="font-semibold text-foreground">{form.slideCount}</span>
              </Label>

              <div className="flex h-10 items-center px-1">
                <input
                  type="range"
                  min={SLIDE_MIN}
                  max={SLIDE_MAX}
                  step={1}
                  value={form.slideCount}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      slideCount: Number(e.target.value),
                    }))
                  }
                  style={sliderStyle}
                  className="ppt-slide-range w-full"
                  aria-label="Number of slides"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium text-muted-foreground">Style</Label>
              <Select
                value={form.style}
                onValueChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    style: value as SlideStyle,
                  }))
                }
              >
                <PptSelectTrigger>
                  <SelectValue />
                </PptSelectTrigger>
                <SelectContent position="popper" className="ppt-dropdown">
                  {SLIDE_STYLES.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium text-muted-foreground">Tone</Label>
              <Select
                value={form.tone}
                onValueChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    tone: value as SlideTone,
                  }))
                }
              >
                <PptSelectTrigger>
                  <SelectValue />
                </PptSelectTrigger>
                <SelectContent position="popper" className="ppt-dropdown">
                  {TONE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium text-muted-foreground">Layout</Label>
              <Select
                value={form.layout}
                onValueChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    layout: value as SlideLayout,
                  }))
                }
              >
                <PptSelectTrigger>
                  <SelectValue />
                </PptSelectTrigger>
                <SelectContent position="popper" className="ppt-dropdown">
                  {LAYOUT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={isGenerating || !form.content.trim()}
              className="flex items-center justify-center gap-2 rounded-xl bg-lime-500 py-3 px-7 font-semibold text-white hover:bg-lime-400"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="size-5 animate-pulse" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Wand2 className="size-5" />
                  <span>Generate PPT</span>
                </>
              )}
            </Button>
          </div>

        </div>

        <div className='mt-8'>
          <p className="text-center text-sm text-muted-foreground mb-3">
            Try a template
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {PRESENTATION_TEMPLATES.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => {
                  setForm({
                    content: template.content,
                    slideCount: template.slides,
                    style: template.style,
                    tone: template.tone,
                    layout: template.layout,
                  })
                }}
                className="px-4 py-2 text-sm rounded-full border border-border/50 bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                {template.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
