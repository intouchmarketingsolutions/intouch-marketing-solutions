import React from 'react'
import { FaInstagram } from 'react-icons/fa'
import { SERVICES } from '../../data/services'
import CreativeServicePageLayout from './CreativeServicePageLayout'

const content = {
  eyebrow: 'Social Growth Studio',
  headline: 'Social Media That Builds Trust And Demand',
  summary: 'We plan, design, write, schedule, and optimize content for Instagram, Facebook, LinkedIn, and more.',
  Icon: FaInstagram,
  deliverables: ['Monthly content calendar', 'Reels and post creatives', 'Caption and hashtag strategy', 'Community engagement', 'Performance reports', 'Campaign optimization'],
  process: ['Brand audit', 'Content planning', 'Creative production', 'Publishing', 'Growth reporting'],
  formats: ['Reels', 'Carousels', 'Stories', 'Static posts', 'Campaign creatives', 'Profile optimization'],
}

export default function SocialMediaPage() {
  return <CreativeServicePageLayout service={SERVICES.find(s => s.id === 6)} content={content} />
}
