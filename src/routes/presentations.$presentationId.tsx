import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '#/components/ui/alert-dialog';
import { Button } from '#/components/ui/button';
import { Label } from '#/components/ui/label';
import { Select, SelectContent, SelectItem, SelectValue } from '#/components/ui/select';
import { Textarea } from '#/components/ui/textarea';
import { GenerationStatus } from '#/features/presentation/components/generation-status';
import { LAYOUT_OPTIONS, SLIDE_STYLES, TONE_OPTIONS } from '#/features/presentation/constant/presentation-options';
import { usePresentationDetail } from '#/features/presentation/hooks/usePresentation-detail';
import { presentationThumbnailUrl } from '#/features/presentation/utils';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Link } from "@tanstack/react-router"
import { ChevronLeft, ChevronRight, Home, Download, Maximize, Play, RefreshCw, Save, Trash2, Settings } from 'lucide-react';
import { useState } from 'react';
import { SlideCard } from '#/features/presentation/components/slide-card'
import { SlidePreview } from '#/features/presentation/components/slide-preview'
import { SlideshowModal } from '#/features/presentation/components/slideshow-model'

import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronsUpDown } from 'lucide-react'
import { cn } from '#/lib/utils'
import type { ComponentProps } from 'react'
import { useFullscreen } from '#/features/presentation/hooks/use-fullscreen';

export const SLIDE_MIN = 3
export const SLIDE_MAX = 20

export const fieldSelectClass =
    'h-11 w-full rounded-xl border border-border/50 bg-background/50 px-3'

export function PptSelectTrigger({
    className,
    children,
    ...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) {
    return (
        <SelectPrimitive.Trigger
            className={cn(
                "flex h-11 w-full items-center justify-between rounded-xl border border-border/50 bg-background/50 px-3 py-2 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary/30",
                "[&>span]:line-clamp-1 [&>span]:text-left",
                className,
            )}
            {...props}
        >
            {children}

            <SelectPrimitive.Icon asChild>
                <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-60" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    )
}

export function slideProgress(value: number) {
    return `${((value - SLIDE_MIN) / (SLIDE_MAX - SLIDE_MIN)) * 100}%`
}


export const Route = createFileRoute('/presentations/$presentationId')({
    component: RouteComponent,
})

function RouteComponent() {
    const { presentationId } = Route.useParams();
    const navigate = useNavigate();
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [showSettings, setShowSettings] = useState(false);
    const [showSlideShow, setShowSlideShow] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const {isFullscreen, toggleFullscreen} = useFullscreen(
        "slide-preview-container"
    )

    const {
        query,
        form,
        setForm,
        updateMut,
        regenerateMut,
        deleteMut,
        slides,
        isGenerating
    } = usePresentationDetail(presentationId, {
        onDelete: () => navigate({ to: '/' }),
    })

    if (query.isPending) {
        return (
            <main className="min-h-screen pt-24 pb-12 px-4">
                <div className="max-w-6xl mx-auto text-muted-foreground text-center">
                    Loading presentation...
                </div>
            </main>
        )
    }

    if (query.isError) {
        return (
            <main className="min-h-screen pt-24 pb-12 px-4">
                <div className="max-w-6xl mx-auto text-muted-foreground text-center">
                    Error loading presentation: {query.error.message}
                </div>
                <Button asChild variant='outline' className='rounded-xl'>
                    <a href='/'>Back to home</a>
                </Button>
            </main>
        )
    }

    const data = query.data;
    const thumb = presentationThumbnailUrl(data.id);
    const activeSlide = slides.at(activeSlideIndex);
    const sliderStyle = {
        backgroundSize: `${slideProgress(form.slideCount)} 100%`,
    }

    return (
        <main className="min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Button asChild variant="ghost" size="icon" className="rounded-xl">
                            <Link to="/">
                                <Home className="h-5 w-5" />
                            </Link>
                        </Button>

                        <GenerationStatus status={data.status} />

                    </div>

                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                        <div className="glass rounded-2xl p-4 flex items-center gap-4">
                            <img
                                src={thumb}
                                alt=""
                                width={56}
                                height={56}
                                className="rounded-xl border border-border/50 bg-background/30"
                            />
                            <div className="flex-1 min-w-0">
                                <h1 className="font-semibold truncate">{data.title}</h1>
                                <p className="text-sm text-muted-foreground">
                                    {slides.length} slides
                                </p>
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                {slides.length > 0 && (
                                    <>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="rounded-xl"
                                            onClick={() => setShowSlideShow(true)}
                                            title="Slideshow"
                                        >
                                            <Play className="size-4" />
                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="rounded-xl"
                                            onClick={() => { }}
                                            disabled={isExporting}
                                            title={isExporting ? "Exporting..." : "Export"}
                                        >
                                            <Download className="size-4" />
                                        </Button>
                                    </>
                                )}

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-xl"
                                    disabled={regenerateMut.isPending || isGenerating}
                                    onClick={() => regenerateMut.mutate()}
                                    title={isGenerating ? "Generating..." : "Regenerate"}
                                >
                                    <RefreshCw
                                        className={`size-4 ${isGenerating ? "animate-spin" : ""}`}
                                    />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-xl gap-2"
                                    onClick={() => setShowSettings(!showSettings)}
                                >
                                    {/* <Settings className="size-4" /> */}
                                    <span className="hidden sm:inline">
                                        {showSettings ? "Hide Settings" : "Edit Settings"}
                                    </span>
                                </Button>

                            </div>

                        </div>

                        {showSettings && (
                            <div className="glass rounded-2xl p-6 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="pres-title" className="text-sm font-medium">
                                        Title
                                    </Label>
                                    <input
                                        id="pres-title"
                                        value={form.title}
                                        onChange={(e) =>
                                            setForm((s) => ({
                                                ...s,
                                                title: e.target.value,
                                            }))
                                        }
                                        className="flex h-10 w-full rounded-xl border border-border/50 bg-background/50 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                                    />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Prompt
                                    </Label>

                                    <Textarea
                                        value={form.prompt}
                                        onChange={(e) =>
                                            setForm((current) => ({
                                                ...current,
                                                prompt: e.target.value,
                                            }))
                                        }
                                        placeholder="Describe the presentation you want to create..."
                                        className="min-h-[180px] resize-none rounded-2xl border-border/50 bg-background/50 px-4 py-3 text-base leading-7 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/40"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                    {/* Slides */}
                                    <div className="flex flex-col gap-3">
                                        <Label className="text-sm font-medium text-muted-foreground">
                                            Slides:{' '}
                                            <span className="font-semibold text-foreground">
                                                {form.slideCount}
                                            </span>
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
                                            />
                                        </div>
                                    </div>

                                    {/* Style */}
                                    <div className="flex flex-col gap-3">
                                        <Label className="text-sm font-medium text-muted-foreground">
                                            Style
                                        </Label>

                                        <Select
                                            value={form.style}
                                            onValueChange={(value) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    style: value as (typeof SLIDE_STYLES)[number]['value'],
                                                }))
                                            }
                                        >
                                            <PptSelectTrigger>
                                                <SelectValue />
                                            </PptSelectTrigger>

                                            <SelectContent
                                                position="popper"
                                                className="ppt-dropdown"
                                            >
                                                {SLIDE_STYLES.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Tone */}
                                    <div className="flex flex-col gap-3">
                                        <Label className="text-sm font-medium text-muted-foreground">
                                            Tone
                                        </Label>

                                        <Select
                                            value={form.tone}
                                            onValueChange={(value) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    tone: value as (typeof TONE_OPTIONS)[number]['value'],
                                                }))
                                            }
                                        >
                                            <PptSelectTrigger>
                                                <SelectValue />
                                            </PptSelectTrigger>

                                            <SelectContent
                                                position="popper"
                                                className="ppt-dropdown"
                                            >
                                                {TONE_OPTIONS.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Layout */}
                                    <div className="flex flex-col gap-3">
                                        <Label className="text-sm font-medium text-muted-foreground">
                                            Layout
                                        </Label>

                                        <Select
                                            value={form.layout}
                                            onValueChange={(value) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    layout: value as (typeof LAYOUT_OPTIONS)[number]['value'],
                                                }))
                                            }
                                        >
                                            <PptSelectTrigger>
                                                <SelectValue />
                                            </PptSelectTrigger>

                                            <SelectContent
                                                position="popper"
                                                className="ppt-dropdown"
                                            >
                                                {LAYOUT_OPTIONS.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-between gap-3 pt-2">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="rounded-xl gap-2"
                                                disabled={deleteMut.isPending}
                                            >
                                                <Trash2 className="size-4" />
                                                Delete
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="glass">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete presentation?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently
                                                    delete your presentation and all its slides.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="rounded-xl">
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                    onClick={() => deleteMut.mutate()}
                                                >
                                                    {deleteMut.isPending ? 'Deleting…' : 'Delete'}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <Button
                                        type="button"
                                        size="sm"
                                        className="rounded-xl gap-2"
                                        disabled={
                                            updateMut.isPending ||
                                            !form.title.trim() ||
                                            !form.prompt.trim()
                                        }
                                        onClick={() => updateMut.mutate()}
                                    >
                                        <Save className="size-4" />
                                        {updateMut.isPending ? 'Saving…' : 'Save changes'}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeSlide && (
                            <div className="space-y-3">
                                <div id="slide-preview-container" className="relative group">
                                    <SlidePreview slide={activeSlide} isFullscreen={isFullscreen} />
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className={`absolute top-3 right-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${isFullscreen ? 'opacity-100' : ''
                                            }`}
                                        onClick={ toggleFullscreen }
                                    >
                                        <Maximize className="size-4" />
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-xl gap-1"
                                        disabled={activeSlideIndex === 0}
                                        onClick={() =>
                                            setActiveSlideIndex((i) => Math.max(0, i - 1))
                                        }
                                    >
                                        <ChevronLeft className="size-4" />
                                        Previous
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                        {activeSlideIndex + 1} / {slides.length}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-xl gap-1"
                                        disabled={activeSlideIndex >= slides.length - 1}
                                        onClick={() =>
                                            setActiveSlideIndex((i) =>
                                                Math.min(slides.length - 1, i + 1),
                                            )
                                        }
                                    >
                                        Next
                                        <ChevronRight className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {slides.length === 0 && !isGenerating && (
                            <div className="glass rounded-2xl p-12 text-center">
                                <p className="text-muted-foreground mb-4">
                                    No slides yet. Click "Regenerate" to create slides from your
                                    prompt.
                                </p>
                                <Button
                                    className="rounded-xl gap-2"
                                    onClick={() => regenerateMut.mutate()}
                                    disabled={regenerateMut.isPending}
                                >
                                    <RefreshCw className="size-4" />
                                    Generate slides
                                </Button>
                            </div>
                        )}

                        {slides.length === 0 && isGenerating && (
                            <div className="glass rounded-2xl p-12 text-center">
                                <RefreshCw className="size-8 animate-spin mx-auto mb-4 text-primary" />
                                <p className="text-muted-foreground">
                                    Generating your presentation…
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    This may take a minute
                                </p>
                            </div>
                        )}
                    </div>

                    {slides.length > 0 && (
                        <aside className="lg:w-80 xl:w-96 flex flex-col">
                            <h2 className="font-medium text-sm px-2 pb-3 text-muted-foreground">
                                Slides
                            </h2>
                            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent pr-2 -mr-2 space-y-4 max-h-[calc(100vh-14rem)]">
                                {slides.map((slide, i) => (
                                    <SlideCard
                                        key={slide.id}
                                        slide={slide}
                                        isActive={i === activeSlideIndex}
                                        onClick={() => setActiveSlideIndex(i)}
                                    />
                                ))}
                            </div>
                        </aside>
                    )}
                </div>
            </div>

            {showSlideShow && (
                <SlideshowModal
                    slides={slides}
                    initialIndex={activeSlideIndex}
                    onClose={() => setShowSlideShow(false)}
                />
            )}

        </main >
    )
}