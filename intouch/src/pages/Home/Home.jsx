import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowDown, FaUsers, FaBriefcase, FaUserTie, FaChartLine, FaGlobe, FaPaintBrush, FaBullhorn, FaChevronLeft, FaChevronRight, FaLightbulb, FaRocket, FaDollarSign } from 'react-icons/fa'
import useFadeUp from '../../hooks/useFadeUp'
import styles from './Home.module.css'

import bgVideo from '../../assets/WEBSITE VIDEO .mp4'
import showcaseVideo from '../../assets/Intouch-css.mp4'
import cardWeb    from '../../assets/web-development.jpg'
import cardDesign from '../../assets/Graphic-Design.png'
import cardSocial from '../../assets/social-media.png'

import g1 from '../../assets/Untitled design_20251124_110506_0000.png'
import g2 from '../../assets/20251117_144505_0000.png'
import g3 from '../../assets/20251117_140021_0000.png'
import g4 from '../../assets/Service.png'
import g5 from '../../assets/web-development.jpg'
import g6 from '../../assets/digital-marketing.png'
import g7 from '../../assets/social-media.png'

const GALLERY = [g1, g2, g3, g4, g5, g6, g7]

const BENEFITS = [
  { Icon: FaLightbulb, title: 'Creative Strategies',   desc: 'We craft innovative, brand-specific campaigns that cut through the noise and make your business impossible to ignore.' },
  { Icon: FaRocket,    title: 'Speed & Reliability',   desc: 'Fast turnarounds without compromising quality — our team is always ready to deliver on time, every time.' },
  { Icon: FaDollarSign, title: 'Measurable ROI',       desc: 'Every campaign is backed by data. We track what works and optimise continuously so your marketing budget goes further.' },
]

const STATS = [
  { value: 120, suffix: '+', label: 'Happy Clients',       Icon: FaUsers },
  { value: 25,  suffix: '+', label: 'Projects Delivered',  Icon: FaBriefcase },
  { value: 20,  suffix: '+', label: 'Team Members',        Icon: FaUserTie },
  { value: 3,   suffix: 'x', label: 'Avg. ROI Growth',     Icon: FaChartLine },
]

const PREVIEW = [
  { Icon: FaGlobe,      title: 'Web Development',       desc: 'Custom websites that convert visitors into loyal, paying customers.',  id: 1,  cardImg: cardWeb    },
  { Icon: FaPaintBrush, title: 'Graphic Design',         desc: 'Brand identities and visuals that make you impossible to ignore.',      id: 10, cardImg: cardDesign },
  { Icon: FaBullhorn,   title: 'Social Media Marketing', desc: 'Platform-native campaigns that build audiences and drive revenue.',     id: 6,  cardImg: cardSocial },
]

function useCountUp(end, duration = 2200) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration])
  return count
}

function StatItem({ value, suffix = '', label, Icon }) {
  const count = useCountUp(value)
  return (
    <div className={`${styles.statItem} fade-up`}>
      <div className={styles.statIcon}><Icon size={22} /></div>
      <div>
        <div className={styles.statNum}>{count}{suffix}</div>
        <div className={styles.statLabel}>{label}</div>
      </div>
    </div>
  )
}

export default function Home() {
  useFadeUp()

  return (
    <div className={styles.page}>

      {/* ================= HERO ================= */}
      <section className={styles.hero}>
        <video className={styles.video} autoPlay muted loop playsInline>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className={styles.overlay} />

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            We Grow Your<br />
            <span>Brand</span><br />
            <span className={styles.heroTitleBlue}>Online</span>
          </h1>

          <p className={styles.heroSub}>
            We help businesses grow their brand, reach the right audience, and
            achieve real results through creative marketing solutions.
          </p>

          
        </div>

        <div className={styles.scrollHint}>
          <FaArrowDown size={14} />
          Scroll
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className={styles.statsBar}>
        <div className={styles.statsGrid}>
          {STATS.map(item => (
            <StatItem key={item.label} {...item} />
          ))}
        </div>
      </section>

      {/* ================= SERVICES PREVIEW ================= */}
      <section className={styles.preview}>
        <span className={styles.orb1} />
        <span className={styles.orb2} />
        <span className={styles.orb3} />
        <span className={styles.cube1} />
        <span className={styles.cube2} />
        <span className={styles.cube3} />

        <div className={styles.previewHeader}>

          <h2 className="heading fade-up">
            Services That <span>Drive Results</span>
          </h2>
          <p className="sub fade-up">
            From branding to performance marketing — we cover every dimension of your digital growth.
          </p>
        </div>

        <div className={styles.previewGrid}>
          {PREVIEW.map((item, i) => (
            <Link
              key={item.title}
              to={`/services/${item.id}`}
              className={`${styles.prevCard} fade-up`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className={styles.prevIcon}><item.Icon size={30} /></div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className={styles.learnMore}>Learn More →</span>
            </Link>
          ))}
        </div>

        <div className={styles.previewBtn}>
          <Link to="/services" className="btn btn-outline fade-up">
            View All →
          </Link>
        </div>

        {/* BENEFITS */}
        <div className={styles.benefitsWrap}>
          <div className={styles.benefitsCard}>
            <h2 className={`${styles.benefitsTitle} fade-up`}>BENEFITS OF WORKING WITH US</h2>
            <div className={styles.benefitsGrid}>
              {BENEFITS.map((b, i) => (
                <div key={b.title} className={`${styles.benefitItem} fade-up`} style={{ transitionDelay: `${i * 0.12}s` }}>
                  <div className={styles.benefitIcon}><b.Icon size={22} /></div>
                  <h3 className={styles.benefitName}>{b.title}</h3>
                  <p className={styles.benefitDesc}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= GALLERY + CTA ================= */}
      <section className={styles.videoCtaSection}>

        <div className={styles.galleryHeader}>
          <h2 className={`${styles.videoHeading} fade-up`}>
            See Intouch <span>In Action</span>
          </h2>
          <p className={`${styles.gallerySub} fade-up`}>
            Real projects. Real results. Real impact.
          </p>
        </div>

        <div className={styles.galleryVideoWrap}>
          <video className={styles.galleryVideo} autoPlay muted loop playsInline>
            <source src={showcaseVideo} type="video/mp4" />
          </video>
        </div>

        <div className={`${styles.ctaBox} fade-up`}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaHeading}>
              Ready to <span>Level Up?</span>
            </h2>
            <p className={styles.ctaSub}>
              Let's grow your business together — a free consultation is just one click away.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Start Your Project →
            </Link>
          </div>
        </div>

      </section>

    </div>
  )
}
