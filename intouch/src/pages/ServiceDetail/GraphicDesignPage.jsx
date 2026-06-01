import React from 'react'
import { FaPaintBrush } from 'react-icons/fa'
import { SERVICES } from '../../data/services'
import CreativeServicePageLayout from './CreativeServicePageLayout'

const content = {
  eyebrow: 'Design Studio',
  headline: 'Graphic Design That Makes Your Brand Instantly Recognizable',
  summary: 'We design social creatives, posters, brochures, ads, pitch assets, and campaign visuals with a premium brand feel.',
  Icon: FaPaintBrush,
  deliverables: ['Social media creatives', 'Posters and flyers', 'Brochures', 'Ad banners', 'Business collateral', 'Campaign design systems'],
  process: ['Creative brief', 'Moodboard', 'Design direction', 'Production', 'Final export'],
  formats: ['Instagram posts', 'Print assets', 'Digital ads', 'Presentation graphics', 'Event creatives', 'Brand templates'],
}

export default function GraphicDesignPage() {
  return <CreativeServicePageLayout service={SERVICES.find(s => s.id === 10)} content={content} />
}
