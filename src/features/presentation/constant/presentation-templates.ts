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
    id: 'company-profile',
    label: 'Company Profile',
    content:
      'Company: NovaTech Solutions\n\nAbout Us:\nWe develop AI-powered software solutions for businesses worldwide.\n\nServices:\n• Web Development\n• AI Solutions\n• Cloud Computing\n• Mobile Applications\n\nAchievements:\n• 100+ Clients\n• 50+ Projects Delivered\n• 98% Customer Satisfaction\n\nVision:\nBecome a trusted global technology partner.',
    slides: 9,
    style: 'professional',
    tone: 'formal',
    layout: 'balanced',
  },
  {
    id: 'education-lesson',
    label: 'Educational Lesson',
    content:
      'Topic: Introduction to Machine Learning\n\nAgenda:\n• What is Machine Learning?\n• Types of Machine Learning\n• Real-world Applications\n• Popular Algorithms\n• Career Opportunities\n\nSummary:\nMachine Learning allows computers to learn from data and make predictions without being explicitly programmed.',
    slides: 10,
    style: 'minimal',
    tone: 'informative',
    layout: 'visual',
  },
  {
    id: 'product-roadmap',
    label: 'Product Roadmap',
    content:
      'Vision:\nCreate the leading AI presentation platform.\n\nQuarter 1:\n• Improve AI content generation\n• Add new presentation templates\n\nQuarter 2:\n• Team collaboration\n• Cloud synchronization\n\nQuarter 3:\n• Mobile application\n• AI image generation\n\nQuarter 4:\n• Enterprise features\n• Global launch strategy',
    slides: 8,
    style: 'bold',
    tone: 'persuasive',
    layout: 'bullet-points',
  },
]
