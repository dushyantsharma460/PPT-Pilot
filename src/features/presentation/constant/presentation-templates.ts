import type { SlideLayout, SlideStyle, SlideTone } from './presentation-options'

export type PresentationTemplate = {
  id: string
  label: string
  content: string
  slides: number
  style: SlideStyle
  tone: SlideTone
  layout: SlideLayout
}

export const PRESENTATION_TEMPLATES: PresentationTemplate[] = [
  {
    id: 'startup-pitch',
    label: 'Startup Pitch',
    content:
      'Problem: teams waste hours building slides manually.\n\nSolution: PPTPilot turns notes into polished decks in minutes.\n\nMarket: knowledge workers and students.\n\nTraction: early beta users and strong retention.\n\nAsk: partnership and feedback.',
    slides: 10,
    style: 'professional',
    tone: 'persuasive',
    layout: 'balanced',
  },
  {
    id: 'product-update',
    label: 'Product Update',
    content:
      'Release highlights:\n- Faster generation\n- Better layouts\n- Improved export quality\n\nWhat changed for users and why it matters.',
    slides: 8,
    style: 'minimal',
    tone: 'informative',
    layout: 'bullet-points',
  },
  {
    id: 'team-onboarding',
    label: 'Team Onboarding',
    content:
      'Welcome to the team.\n\nHow we work, our tools, and expectations for your first 30 days.',
    slides: 12,
    style: 'creative',
    tone: 'casual',
    layout: 'visual',
  },
]
