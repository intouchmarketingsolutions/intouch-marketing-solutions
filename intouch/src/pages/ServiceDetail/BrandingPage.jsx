import React from 'react'
import { FaGem } from 'react-icons/fa'
import { SERVICES } from '../../data/services'
import CreativeServicePageLayout from './CreativeServicePageLayout'

const content = {
  eyebrow: 'Brand Identity Studio',
  headline: 'Branding That Gives Your Business A Clear Voice',
  summary: 'We build visual identity, logo systems, color palettes, typography, and brand rules that keep your business consistent.',
  Icon: FaGem,
  deliverables: ['Logo design', 'Brand guidelines', 'Color palette', 'Typography system', 'Brand voice', 'Launch assets'],
  process: ['Discovery', 'Positioning', 'Identity design', 'Refinement', 'Brand kit'],
  formats: ['Logo kit', 'Brand book', 'Stationery', 'Social templates', 'Packaging direction', 'Pitch deck style'],
}

export default function BrandingPage() {
  return <CreativeServicePageLayout service={SERVICES.find(s => s.id === 12)} content={content} />
}
