import React from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  FaRocket, FaMobileAlt, FaShieldAlt, FaArrowRight, FaExternalLinkAlt,
  FaCheckCircle
} from 'react-icons/fa'
import { SERVICES } from '../../data/services'
import styles from './ServiceDetail.module.css'
import useFadeUp from '../../hooks/useFadeUp'
import heroImg from '../../assets/web1.png'

const TRUST_BADGES = [
  { Icon: FaRocket,    label: 'Performance Optimized' },
  { Icon: FaMobileAlt, label: 'Mobile Responsive'     },
  { Icon: FaShieldAlt, label: 'Secure & Reliable'     },
]

const FEATURE_LABELS = [
  'Customised strategy built around your business goals',
  'Data-driven decision making and performance tracking',
  'Creative, modern execution that captures attention',
  'Scalable and future-ready solutions',
  'Dedicated expert support at every stage',
  'Transparent reporting and clear communication',
]

const PROJECTS = [
  {
    name: 'EcoGreen Solutions',
    type: 'Corporate Website',
    desc: 'A modern corporate website for a sustainable energy company.',
    tags: ['React', 'Tailwind CSS'],
    color: '#0ea5a4',
  },
  {
    name: 'StyleCart',
    type: 'E-commerce Platform',
    desc: 'Responsive e-commerce platform with advanced filtering and smooth UX.',
    tags: ['Next.js', 'MongoDB'],
    color: '#a855f7',
  },
  {
    name: 'TaskFlow Pro',
    type: 'Project Management App',
    desc: 'A powerful project management tool for teams and organizations.',
    tags: ['React', 'Node.js'],
    color: '#6366f1',
  },
  {
    name: 'DreamHomes',
    type: 'Real Estate Website',
    desc: 'A real estate platform with property listings and inquiry system.',
    tags: ['Next.js', 'Tailwind CSS'],
    color: '#ec4899',
  },
]

export default function ServiceDetail() {
  useFadeUp()
  const { id } = useParams()
  const service = SERVICES.find(s => s.id === Number(id))

  if (!service) {
    return (
      <div className="page-wrap">
        <h2 className={styles.notFound}>Service not found.</h2>
      </div>
    )
  }

  return (
    <div className={styles.page}>

      {/* =================== HERO =================== */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />

        <div className={styles.heroLeft}>
          <span className={styles.heroAccent}>{service.desc}</span>

          <h1 className={styles.heroTitle}>
            <span>{service.title}</span>
          </h1>

          <p className={styles.heroDesc}>
            We build modern, fast, and high-performance {service.title.toLowerCase()} solutions
            that drive results and help your business grow online.
          </p>

          <div className={styles.heroBtns}>
            <Link to="/contact" className={styles.heroBtnPrimary}>
              Start Your Project <FaArrowRight size={12} />
            </Link>
            <Link to="/services" className={styles.heroBtnOutline}>
              Explore Services
            </Link>
          </div>

          <div className={styles.trustRow}>
            {TRUST_BADGES.map(b => (
              <div key={b.label} className={styles.trustBadge}>
                <b.Icon size={13} />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.heroRight}>
          <img src={heroImg} alt={service.title} className={styles.heroImg} />
        </div>
      </section>

      {/* =================== ABOUT =================== */}
      <section className={styles.about}>
        <div className={`${styles.aboutInner} fade-up`}>

          {/* Left column */}
          <div className={styles.aboutLeft}>
            <span className={styles.aboutLabel}>About This Service</span>
            <h2 className={styles.aboutTitle}>
              Digital Solutions That Drive <span>Real Growth</span>
            </h2>
            <div className={styles.aboutImgWrap}>
              <img src={service.img} alt={service.title} />
            </div>
          </div>

          {/* Right column */}
          <div className={styles.aboutRight}>
            <p>
              At <strong>Intouch Marketing Solutions</strong>, we specialise in delivering
              high-quality <strong>{service.title.toLowerCase()}</strong> services that help
              businesses grow, scale, and succeed in today's digital landscape.
            </p>
            <p>
              Our approach blends <strong>strategy, creativity, and cutting-edge
              technology</strong> to ensure your brand stands out while achieving
              measurable, lasting results.
            </p>
            <p>
              Whether you're a startup finding your footing or an established enterprise
              aiming to expand, we tailor every solution to your unique goals.
            </p>

            <div className={styles.featuresGrid}>
              {FEATURE_LABELS.map((f, i) => (
                <div key={i} className={styles.featureItem}>
                  <FaCheckCircle className={styles.featureIcon} size={13} />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className={`${styles.techSection} fade-up`}>
          <h3>Technologies &amp; Expertise</h3>
          <div className={styles.tags}>
            {service.tags.map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* =================== RECENT PROJECTS =================== */}
      <section className={`${styles.projects} fade-up`}>
        <div className={styles.projectsHeader}>
          <h3>Our Recent Projects</h3>
          <Link to="/clients" className={styles.viewAll}>
            View All Projects <FaArrowRight size={11} />
          </Link>
        </div>

        <div className={styles.projectsGrid}>
          {PROJECTS.map(p => (
            <div key={p.name} className={styles.projectCard}>
              <div className={styles.projectThumb} style={{ '--pc': p.color }}>
                <span className={styles.projectInitial}>{p.name[0]}</span>
              </div>
              <div className={styles.projectBody}>
                <h4>{p.name}</h4>
                <span className={styles.projectType}>{p.type}</span>
                <p>{p.desc}</p>
                <div className={styles.projectTags}>
                  {p.tags.map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
              <span className={styles.projectLink}>
                <FaExternalLinkAlt size={11} />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* =================== CTA =================== */}
      <div className={`${styles.ctaWrap} fade-up`}>
        <div className={styles.ctaBox}>
          <div>
            <h3>Ready to grow your business?</h3>
            <p>Let's build something remarkable together — free consultation, no commitment.</p>
          </div>
          <Link to="/contact" className="btn btn-primary">
            Contact Us →
          </Link>
        </div>
      </div>

    </div>
  )
}
