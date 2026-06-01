import React from 'react'
import { FaPenFancy } from 'react-icons/fa'
import { SERVICES } from '../../data/services'
import CreativeServicePageLayout from './CreativeServicePageLayout'

const content = {
  eyebrow: 'Content Strategy Lab',
  headline: 'Content Marketing That Explains, Persuades, And Converts',
  summary: 'We create useful content systems for websites, blogs, campaigns, ads, and brand communication.',
  Icon: FaPenFancy,
  deliverables: ['Blog strategy', 'Website copy', 'Campaign copy', 'Content calendars', 'SEO content briefs', 'Brand messaging'],
  process: ['Research', 'Message planning', 'Drafting', 'Editing', 'Publishing support'],
  formats: ['Blogs', 'Landing pages', 'Ad copy', 'Email content', 'Social captions', 'Brochures'],
}

export default function ContentMarketingPage() {
  return <CreativeServicePageLayout service={SERVICES.find(s => s.id === 8)} content={content} />
}
