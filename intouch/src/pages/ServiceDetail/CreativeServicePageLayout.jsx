import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaLayerGroup,
  FaRocket,
  FaShareAlt,
} from 'react-icons/fa'
import useFadeUp from '../../hooks/useFadeUp'
import styles from './CreativeServicePageLayout.module.css'

const HIGHLIGHTS = [
  { Icon: FaClock, title: 'Fast Turnaround', text: 'Clear timelines, review cycles, and organized delivery.' },
  { Icon: FaLayerGroup, title: 'Multi-format Output', text: 'Assets prepared for social, ads, web, and print.' },
  { Icon: FaRocket, title: 'Growth Focused', text: 'Creative decisions are tied to attention, trust, and conversion.' },
]

export default function CreativeServicePageLayout({ service, content }) {
  useFadeUp()

  if (!service || !content) {
    return null
  }

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
