import React from 'react'
import { FaCameraRetro } from 'react-icons/fa'
import { SERVICES } from '../../data/services'
import CreativeServicePageLayout from './CreativeServicePageLayout'

const content = {
  eyebrow: 'Ad Creative Studio',
  headline: 'Ad Shots And Creatives Built For Campaign Performance',
  summary: 'We plan and produce high-converting visual assets for paid campaigns, product launches, and performance marketing.',
  Icon: FaCameraRetro,
  deliverables: ['Product ad creatives', 'Ad shoot planning', 'Campaign visuals', 'Hook variations', 'Static and video ads', 'A/B test concepts'],
  process: ['Offer research', 'Concepts', 'Shot planning', 'Production', 'Creative testing'],
  formats: ['Meta ads', 'Google display ads', 'Product shots', 'UGC-style creatives', 'Short ad videos', 'Launch creatives'],
}

export default function AdShotsPage() {
  return <CreativeServicePageLayout service={SERVICES.find(s => s.id === 13)} content={content} />
}
