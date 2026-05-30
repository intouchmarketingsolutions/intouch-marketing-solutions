import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaArrowRight, FaBullhorn, FaCameraRetro, FaCheckCircle, FaClock,
  FaFilm, FaGem, FaInstagram, FaLayerGroup, FaPaintBrush, FaPenFancy,
  FaRocket, FaShareAlt, FaStar
} from 'react-icons/fa'
import useFadeUp from '../../hooks/useFadeUp'
import styles from './CreativeServiceDetail.module.css'

const CONTENT = {
  6: {
    eyebrow: 'Social Growth Studio',
    headline: 'Social Media That Builds Trust And Demand',
    summary: 'We plan, design, write, schedule, and optimize content for Instagram, Facebook, LinkedIn, and more.',
    Icon: FaInstagram,
    deliverables: ['Monthly content calendar', 'Reels and post creatives', 'Caption and hashtag strategy', 'Community engagement', 'Performance reports', 'Campaign optimization'],
    process: ['Brand audit', 'Content planning', 'Creative production', 'Publishing', 'Growth reporting'],
    formats: ['Reels', 'Carousels', 'Stories', 'Static posts', 'Campaign creatives', 'Profile optimization'],
  },
  8: {
    eyebrow: 'Content Strategy Lab',
    headline: 'Content Marketing That Explains, Persuades, And Converts',
    summary: 'We create useful content systems for websites, blogs, campaigns, ads, and brand communication.',
    Icon: FaPenFancy,
    deliverables: ['Blog strategy', 'Website copy', 'Campaign copy', 'Content calendars', 'SEO content briefs', 'Brand messaging'],
    process: ['Research', 'Message planning', 'Drafting', 'Editing', 'Publishing support'],
    formats: ['Blogs', 'Landing pages', 'Ad copy', 'Email content', 'Social captions', 'Brochures'],
  },
  10: {
    eyebrow: 'Design Studio',
    headline: 'Graphic Design That Makes Your Brand Instantly Recognizable',
    summary: 'We design social creatives, posters, brochures, ads, pitch assets, and campaign visuals with a premium brand feel.',
    Icon: FaPaintBrush,
    deliverables: ['Social media creatives', 'Posters and flyers', 'Brochures', 'Ad banners', 'Business collateral', 'Campaign design systems'],
    process: ['Creative brief', 'Moodboard', 'Design direction', 'Production', 'Final export'],
    formats: ['Instagram posts', 'Print assets', 'Digital ads', 'Presentation graphics', 'Event creatives', 'Brand templates'],
  },
  11: {
    eyebrow: 'Video Editing Suite',
    headline: 'Video Editing That Turns Attention Into Action',
    summary: 'We edit reels, ads, YouTube videos, product videos, and brand stories with strong pacing and clean motion.',
    Icon: FaFilm,
    deliverables: ['Reel editing', 'Ad videos', 'Motion graphics', 'Captions and subtitles', 'Color correction', 'Format resizing'],
    process: ['Footage review', 'Edit structure', 'Sound and motion', 'Review', 'Final delivery'],
    formats: ['Reels', 'YouTube edits', 'Product videos', 'Event cuts', 'Brand films', 'Short ads'],
  },
  12: {
    eyebrow: 'Brand Identity Studio',
    headline: 'Branding That Gives Your Business A Clear Voice',
    summary: 'We build visual identity, logo systems, color palettes, typography, and brand rules that keep your business consistent.',
    Icon: FaGem,
    deliverables: ['Logo design', 'Brand guidelines', 'Color palette', 'Typography system', 'Brand voice', 'Launch assets'],
    process: ['Discovery', 'Positioning', 'Identity design', 'Refinement', 'Brand kit'],
    formats: ['Logo kit', 'Brand book', 'Stationery', 'Social templates', 'Packaging direction', 'Pitch deck style'],
  },
  13: {
    eyebrow: 'Ad Creative Studio',
    headline: 'Ad Shots And Creatives Built For Campaign Performance',
    summary: 'We plan and produce high-converting visual assets for paid campaigns, product launches, and performance marketing.',
    Icon: FaCameraRetro,
    deliverables: ['Product ad creatives', 'Ad shoot planning', 'Campaign visuals', 'Hook variations', 'Static and video ads', 'A/B test concepts'],
    process: ['Offer research', 'Concepts', 'Shot planning', 'Production', 'Creative testing'],
    formats: ['Meta ads', 'Google display ads', 'Product shots', 'UGC-style creatives', 'Short ad videos', 'Launch creatives'],
  },
}

const HIGHLIGHTS = [
  { Icon: FaClock, title: 'Fast Turnaround', text: 'Clear timelines, review cycles, and organized delivery.' },
  { Icon: FaLayerGroup, title: 'Multi-format Output', text: 'Assets prepared for social, ads, web, and print.' },
  { Icon: FaRocket, title: 'Growth Focused', text: 'Creative decisions are tied to attention, trust, and conversion.' },
]

export default function CreativeServiceDetail({ service }) {
  useFadeUp()
  const content = CONTENT[service.id] ?? CONTENT[10]
  const HeroIcon = content.Icon

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={`${styles.heroCopy} fade-up`}>
          <span className={styles.eyebrow}>{content.eyebrow}</span>
          <h1>{content.headline}</h1>
          <p>{content.summary}</p>
          <div className={styles.heroActions}>
            <Link to={`/start-project?service=${service.id}`} className={styles.primaryBtn}>
              Start This Project <FaArrowRight size={13} />
            </Link>
            <Link to="/contact" className={styles.secondaryBtn}>Talk To Team</Link>
          </div>
        </div>

        <div className={`${styles.heroVisual} fade-up d2`}>
          <img src={service.img} alt={service.title} />
          <div className={styles.visualBadge}>
            <HeroIcon />
            <span>{service.title}</span>
          </div>
        </div>
      </section>

      <section className={styles.highlights}>
        {HIGHLIGHTS.map((item, index) => (
          <div key={item.title} className={`${styles.highlightCard} fade-up`} style={{ transitionDelay: `${index * 0.08}s` }}>
            <item.Icon />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </section>

      <section className={styles.details}>
        <div className={`${styles.panel} fade-up`}>
          <span className={styles.sectionLabel}>What We Deliver</span>
          <h2>Everything needed to make {service.title.toLowerCase()} look professional.</h2>
          <div className={styles.deliverables}>
            {content.deliverables.map(item => (
              <div key={item}>
                <FaCheckCircle />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.panel} ${styles.darkPanel} fade-up d2`}>
          <span className={styles.sectionLabel}>Creative Formats</span>
          <div className={styles.formatGrid}>
            {content.formats.map(item => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.process}>
        <div className={styles.processHeader}>
          <span className={styles.sectionLabel}>Process</span>
          <h2>Simple workflow, polished output.</h2>
        </div>
        <div className={styles.processSteps}>
          {content.process.map((step, index) => (
            <div key={step} className="fade-up" style={{ transitionDelay: `${index * 0.08}s` }}>
              <strong>{String(index + 1).padStart(2, '0')}</strong>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div>
          <FaShareAlt />
          <h2>Ready to create better {service.title.toLowerCase()}?</h2>
          <p>Send your requirements and we will respond with the right plan, timeline, and price.</p>
        </div>
        <Link to={`/start-project?service=${service.id}`} className={styles.primaryBtn}>
          Request Pricing <FaArrowRight size={13} />
        </Link>
      </section>
    </div>
  )
}
