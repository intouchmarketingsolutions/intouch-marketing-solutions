import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  FaCode, FaMobileAlt, FaDesktop, FaShoppingCart,
  FaBullhorn, FaInstagram, FaSearch, FaPenFancy,
  FaChartBar, FaPaintBrush, FaFilm, FaStar,
  FaImages, FaRobot, FaAd, FaCog, FaCloud, FaRocket,
  FaUsers, FaBriefcase, FaHeart, FaChartLine, FaFileAlt
} from 'react-icons/fa'

import { SERVICES } from '../../data/services'
import styles from './Services.module.css'
import computerImg from '../../assets/computer.png'

const WHY_STATS = [
  { Icon: FaBriefcase, num: '250+', label: 'Projects Completed' },
  { Icon: FaUsers,     num: '150+', label: 'Happy Clients'       },
  { Icon: FaChartBar,  num: '98%',  label: 'Client Satisfaction' },
  { Icon: FaHeart,     num: '6+',   label: 'Years Experience'    },
]

const PROCESS_STEPS = [
  { num: '01', Icon: FaSearch,   title: 'Discover',         desc: 'We understand your business, goals and requirements.' },
  { num: '02', Icon: FaFileAlt,  title: 'Plan',             desc: 'We create a strategy and plan that aligns with your objectives.' },
  { num: '03', Icon: FaCode,     title: 'Design & Develop', desc: 'Our team builds, designs and develops with precision.' },
  { num: '04', Icon: FaRocket,   title: 'Launch',           desc: 'We test everything thoroughly and launch with confidence.' },
  { num: '05', Icon: FaChartLine,title: 'Grow',             desc: 'We optimize and scale to help your business grow continuously.' },
]

const SERVICE_ICONS = {
  1:  FaCode,        2:  FaMobileAlt,  3:  FaDesktop,   4:  FaShoppingCart,
  5:  FaBullhorn,    6:  FaInstagram,  7:  FaAd,         8:  FaPenFancy,
  9:  FaSearch,      10: FaPaintBrush, 11: FaFilm,       12: FaStar,
  13: FaImages,      14: FaRobot,      15: FaChartBar,   16: FaCog,
  17: FaCloud,
}

function useSlideIn() {
  useEffect(() => {
    const els = document.querySelectorAll('.slide-in')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
      { threshold: 0.15 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function Services() {
  useSlideIn()

  return (
    <div className={styles.page}>

      {/* ================= HERO ================= */}
      <section className={styles.hero}>
        <div className={styles.lines} />
        <div className={styles.cubeLeft} />
        <div className={styles.cubeSmall} />
        <div className={styles.ring} />
        <div className={styles.cubeRight} />
        <div className={styles.dot1} />
        <div className={styles.dot2} />
        <div className={styles.dot3} />

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Our <span>Services</span></h1>
          <p className={styles.heroSub}>
            We deliver powerful digital solutions combining strategy,
            creativity, and technology to help your business grow faster.
          </p>
          <div className={styles.heroDots}>
            <span className={styles.dotActive} />
            <span className={styles.dotLine} />
          </div>
        </div>
      </section>

      {/* ================= SERVICES LIST ================= */}
      <section className={styles.listWrap}>
        {SERVICES.map((service, index) => {
          const Icon = SERVICE_ICONS[service.id] || FaCode
          const even = index % 2 === 0
          return (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className={`${styles.row} ${even ? styles.rowNormal : styles.rowReverse}`}
            >
              {/* IMAGE */}
              <div className={`${styles.imgWrap} slide-in ${even ? styles.fromLeft : styles.fromRight}`}>
                <img src={service.img} alt={service.title} loading="lazy" />
                <div className={styles.imgOverlay} />
              </div>

              {/* CONTENT */}
              <div className={`${styles.content} slide-in ${even ? styles.fromRight : styles.fromLeft}`}
                style={{ transitionDelay: '0.12s' }}>
                <div className={styles.iconBadge}><Icon size={20} /></div>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.desc}>{service.desc}</p>
                {service.tags && (
                  <div className={styles.tags}>
                    {service.tags.slice(0, 3).map(tag => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                )}
                <span className={styles.cta}>Learn More →</span>
              </div>
            </Link>
          )
        })}
      </section>

      {/* ================= GLOWING CUBE BANNER ================= */}
      <Link to="/about" className={styles.cubeBanner}>
        <div className={styles.cubeBg} />
        <div className={styles.cubeScene}>
          <div className={styles.world}>
            {/* cube */}
            <div className={styles.cube}>
              <div className={`${styles.face} ${styles.fTop}`} />
              <div className={`${styles.face} ${styles.fFront}`} />
              <div className={`${styles.face} ${styles.fBack}`} />
              <div className={`${styles.face} ${styles.fRight}`} />
              <div className={`${styles.face} ${styles.fLeft}`} />
              <div className={`${styles.face} ${styles.fBottom}`} />
            </div>
            {/* platform slab */}
            <div className={styles.slabBox}>
              <div className={`${styles.slab} ${styles.sTop}`} />
              <div className={`${styles.slab} ${styles.sFront}`} />
              <div className={`${styles.slab} ${styles.sBack}`} />
              <div className={`${styles.slab} ${styles.sRight}`} />
              <div className={`${styles.slab} ${styles.sLeft}`} />
            </div>
          </div>
        </div>
        <div className={styles.floorGlow} />
      </Link>

      {/* ================= WHY CHOOSE US ================= */}
      <section className={styles.whySection}>
        <div className={styles.whyBg} />
        <div className={styles.whyInner}>

          {/* LEFT – image */}
          <div className={styles.whyImgWrap}>
            <div className={styles.whyImgGlow} />
            <img src={computerImg} alt="Digital Strategy" className={styles.whyImg} />
          </div>

          {/* RIGHT – text + stats */}
          <div className={styles.whyContent}>
            <span className={styles.whyLabel}>WHY CHOOSE US</span>
            <h2 className={styles.whyTitle}>
              We Build Strategies<br />
              That <span>Drive Results</span>
            </h2>
            <p className={styles.whySub}>
              We don't just provide services, we build partnerships.
              Your growth is our mission.
            </p>
            <div className={styles.whyStats}>
              {WHY_STATS.map(s => (
                <div key={s.label} className={styles.whyStat}>
                  <div className={styles.whyStatIcon}><s.Icon size={18} /></div>
                  <div className={styles.whyStatNum}>{s.num}</div>
                  <div className={styles.whyStatLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR PROCESS ================= */}
      <section className={styles.procSection}>
        <div className={styles.procBg} />
        <div className={styles.procHeaderRow}>
          <div className={styles.procHLine} />
          <h2 className={styles.procTitle}>Our Process</h2>
          <div className={styles.procHLine} />
        </div>
        <p className={styles.procSub}>A simple and effective process to turn your ideas into reality.</p>

        <div className={styles.procSteps}>

          {/* ROW 1 — all circles + connectors in one shared flex row */}
          <div className={styles.procCirclesRow}>
            {PROCESS_STEPS.map((p, i) => (
              <React.Fragment key={p.num}>
                <div className={styles.procCircleCol}>
                  <div className={`${styles.procCircle} ${i === 2 ? styles.procCircleMid : ''}`}>
                    <p.Icon size={i === 2 ? 26 : 22} />
                  </div>
                </div>
                {i < PROCESS_STEPS.length - 1 && <div className={styles.procConnector} />}
              </React.Fragment>
            ))}
          </div>

          {/* ROW 2 — step numbers (same flex structure as circles row) */}
          <div className={styles.procNumsRow}>
            {PROCESS_STEPS.map((p, i) => (
              <React.Fragment key={p.num}>
                <div className={`${styles.procNum} ${i === 2 ? styles.procNumMid : ''}`}>{p.num}</div>
                {i < PROCESS_STEPS.length - 1 && <div className={styles.procSpacer} />}
              </React.Fragment>
            ))}
          </div>

          {/* ROW 3 — cards (same flex structure) */}
          <div className={styles.procCardsRow}>
            {PROCESS_STEPS.map((p, i) => (
              <React.Fragment key={p.num}>
                <div className={`${styles.procCard} ${i === 2 ? styles.procCardMid : ''}`}>
                  <h3 className={styles.procStepTitle}>{p.title}</h3>
                  <p className={styles.procStepDesc}>{p.desc}</p>
                </div>
                {i < PROCESS_STEPS.length - 1 && <div className={styles.procSpacer} />}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile-only single-row grid layout */}
          <div className={styles.procGridMobile}>
            {PROCESS_STEPS.map((p, i) => (
              <div key={p.num} className={`${styles.procGridItem} ${i === 2 ? styles.procGridItemMid : ''}`}>
                <div className={styles.procGridIcon}>
                  <p.Icon size={16} />
                </div>
                <div className={styles.procGridNum}>{p.num}</div>
                <h3 className={styles.procGridTitle}>{p.title}</h3>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}
