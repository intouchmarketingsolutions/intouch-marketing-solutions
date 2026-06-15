import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaArrowRight,
  FaBriefcase,
  FaChartLine,
  FaCompass,
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaRocket,
  FaPenNib,
  FaPalette,
  FaCube,
  FaDesktop,
  FaBoxOpen,
  FaShieldAlt,
  FaUsers,
  FaSearch,
  FaBullseye,
  FaCheckCircle,
  FaSlidersH,
} from 'react-icons/fa'
import { SERVICES as SERVICE_LIST } from '../../data/services'
import SEO from '../../components/SEO/SEO'
import styles from './BrandingPage.module.css'

import koppasLogo from '../../assets/Branding/koppas final logo.png'
import saraLogo from '../../assets/Branding/SARA LOGO 18  PNG.png'
import viyanaLogo from '../../assets/Branding/viyana logo png.png'

const service =
  SERVICE_LIST.find(s => s.id === 12) ||
  SERVICE_LIST.find(s => /brand/i.test(s.title || '')) ||
  SERVICE_LIST[0] ||
  { id: 12, title: 'Branding' }

const SERVICES = [
  {
    title: 'Logo & Identity',
    text: 'Standout logos and complete identity systems that leave a lasting impression.',
    Icon: FaPenNib,
  },
  {
    title: 'Brand Style Guide',
    text: 'Color, typography, and visual rules that keep your brand consistent everywhere.',
    Icon: FaPalette,
  },
  {
    title: 'Brand Collateral',
    text: 'Business cards, letterheads, proposals, and more designed to elevate your professional image.',
    Icon: FaCube,
  },
  {
    title: 'Digital Branding',
    text: 'Consistent digital presence across social media, web, presentations, and marketplaces.',
    Icon: FaDesktop,
  },
  {
    title: 'Packaging Design',
    text: 'Creative packaging that protects your product and strengthens your shelf appeal.',
    Icon: FaBoxOpen,
  },
]

const BENEFITS = [
  {
    title: 'Identity With Structure',
    text: 'We create a visual system that feels intentional and scales across every channel.',
    Icon: FaShieldAlt,
  },
  {
    title: 'Consistency That Builds Trust',
    text: 'Your team gets a clear brand language that stays consistent from launch to growth.',
    Icon: FaShieldAlt,
  },
  {
    title: 'Launch-Ready Asset Sets',
    text: 'Everything is prepared so your brand can move from concept to market without friction.',
    Icon: FaRocket,
  },
]

const PROCESS = [
  { num: '01', title: 'Discovery & Brand Audit', Icon: FaSearch },
  { num: '02', title: 'Positioning & Story Mapping', Icon: FaBullseye },
  { num: '03', title: 'Logo & Identity Exploration', Icon: FaPenNib },
  { num: '04', title: 'Refinement & Direction Lock', Icon: FaSlidersH },
  { num: '05', title: 'Final Brand Kit Delivery', Icon: FaCheckCircle },
]

const LOGOS = [
  { src: koppasLogo, label: 'Koppas' },
  { src: saraLogo, label: 'SARA' },
  { src: viyanaLogo, label: 'Viyana' },
]

const BOARD_CARDS = [
  { title: 'Brand Book', subtitle: 'Identity guidelines', accent: 'gold' },
  { title: 'Palette', subtitle: 'Color system', accent: 'violet' },
  { title: 'Typography', subtitle: 'Font pairings', accent: 'blue' },
  { title: 'Launch Assets', subtitle: 'Social + print', accent: 'pink' },
]

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className={styles.sectionTitle}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}

function FadeIn({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export default function BrandingPage() {
  return (
    <div className={styles.page}>
      <SEO
        title="Branding | Intouch Marketing Solutions - Udupi, Karnataka"
        description="Build a strong and memorable brand identity with Intouch Marketing Solutions - branding strategy, visual identity and guidelines in Udupi, Karnataka."
        path="/services/12"
      />
      <header className={styles.navBar}>
        <div className={styles.logoWordmark}>
          <span>inTouch</span>
          <small>Marketing Solutions</small>
        </div>
        <nav className={styles.navLinks}>
          <a href="#hero">Home</a>
          <a href="#services">Services</a>
          <a href="#process">Work</a>
          <a href="#contact">Contact</a>
        </nav>
        <Link to="/contact" className={styles.quoteBtn}>
          Get Free Quote <FaArrowRight />
        </Link>
      </header>

      <section id="hero" className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Brand Strategy Studio</span>
          <h1>
            Branding That <br />
            Feels Clear, <br />
            <span>Premium, And</span> <br />
            <span>Instantly Recognizable</span>
          </h1>
          <p>
            We shape visual identity systems that bring your logo, typography, color, and messaging into one polished
            brand experience across every touchpoint.
          </p>
          <div className={styles.heroActions}>
            <Link to={`/start-project?service=${service.id}`} className={styles.primaryBtn}>
              Start Brand Project <FaArrowRight size={13} />
            </Link>
            <Link to="/contact" className={styles.secondaryBtn}>
              Talk To Team
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroGlow} />
          <motion.div
            className={styles.heroPlatform}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className={styles.heroCenterCard}>
              <img src={viyanaLogo} alt="Viyana logo" />
              <span>Brand Identity Guidelines</span>
            </div>

            <div className={`${styles.heroSideCard} ${styles.heroCardLeft}`}>
              <img src={koppasLogo} alt="Koppas logo" />
            </div>
            <div className={`${styles.heroSideCard} ${styles.heroCardRight}`}>
              <img src={saraLogo} alt="SARA logo" />
            </div>

            {BOARD_CARDS.map((card, index) => (
              <div
                key={card.title}
                className={`${styles.miniCard} ${styles[`accent${card.accent}`]} ${styles[`boardCard${index + 1}`]}`}
              >
                <strong>{card.title}</strong>
                <span>{card.subtitle}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="services" className={styles.servicesSection}>
        <div className={styles.servicesHeader}>
          <div className={styles.servicesIntro}>
            <span className={styles.eyebrow}>Our Branding Services</span>
            <h2>Assets that support launch, sales, and everyday brand use.</h2>
          </div>
          <Link to={`/services/${service.id}`} className={styles.inlineLink}>
            View All Services <FaArrowRight size={13} />
          </Link>
        </div>

        <div className={styles.serviceGrid}>
          {SERVICES.map((item, index) => (
            <FadeIn key={item.title} className={styles.serviceCard} delay={index * 0.06}>
              <span className={styles.serviceIcon}>
                <item.Icon />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className={styles.cardArrow}>
                <FaArrowRight />
              </span>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className={styles.benefitsSection}>
        {BENEFITS.map((item, index) => (
          <FadeIn key={item.title} className={styles.benefitCard} delay={index * 0.08}>
            <span className={styles.highlightIcon}>
              <item.Icon />
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </FadeIn>
        ))}
      </section>

      <section id="process" className={styles.processSection}>
        <div className={styles.processHeader}>
          <SectionTitle
            eyebrow="Our Process"
            title="A clean, collaborative workflow."
            text="We keep the project focused so the final identity feels deliberate, not overworked."
          />
          <Link to="/contact" className={styles.secondaryBtn}>
            See Our Process <FaArrowRight size={13} />
          </Link>
        </div>

        <div className={styles.processRow}>
          {PROCESS.map((step, index) => (
            <div key={step.num} className={styles.processItem}>
              <div className={styles.processNode}>
                <step.Icon />
              </div>
              <span className={styles.processNum}>{step.num}</span>
              <strong>{step.title}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection} id="contact">
        <div className={styles.ctaCopy}>
          <h2>Ready to build a brand that feels premium from the first impression?</h2>
          <p>We’ll shape the identity, system, and launch assets your business needs to show up with confidence.</p>
          <Link to="/contact" className={styles.primaryBtn}>
            Request Pricing <FaArrowRight size={13} />
          </Link>
        </div>

        <div className={styles.ctaVisual}>
          <div className={styles.ctaRing} />
          <div className={styles.ctaBook}>
            <strong>BRAND</strong>
            <span>guidelines</span>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <strong>inTouch</strong>
          <small>MARKETING SOLUTIONS</small>
          <p>We help businesses build powerful brands that connect, communicate, and convert.</p>
        </div>

        <div className={styles.footerColumn}>
          <h4>Company</h4>
          <a href="#hero">About Us</a>
          <a href="#services">Our Work</a>
          <a href="#process">Careers</a>
          <a href="#contact">Blog</a>
        </div>

        <div className={styles.footerColumn}>
          <h4>Services</h4>
          <a href="#services">Branding</a>
          <a href="#services">Digital Marketing</a>
          <a href="#services">Web Design</a>
          <a href="#services">Content Creation</a>
        </div>

        <div className={styles.footerColumn}>
          <h4>Resources</h4>
          <a href="#process">Brand Guide</a>
          <a href="#process">Case Studies</a>
          <a href="#process">FAQs</a>
          <a href="#process">Tools</a>
        </div>

        <div className={styles.footerColumn}>
          <h4>Let's Connect</h4>
          <a href="mailto:hello@intouchms.com"><FaEnvelope /> hello@intouchms.com</a>
          <a href="tel:+919786543210"><FaPhoneAlt /> +91 98765 43210</a>
          <a href="/"><FaCompass /> India - USA - UAE</a>
          <div className={styles.socialRow}>
            <a href="/"><FaLinkedin /></a>
            <a href="/"><FaInstagram /></a>
          </div>
        </div>
      </footer>

      <div className={styles.copyRow}>© 2024 Intouch Marketing Solutions. All rights reserved.</div>
    </div>
  )
}
