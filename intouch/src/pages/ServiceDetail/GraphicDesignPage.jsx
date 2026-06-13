import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaArrowRight,
  FaBolt,
  FaBoxOpen,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaCubes,
  FaDraftingCompass,
  FaHeadset,
  FaInfinity,
  FaSearch,
  FaLightbulb,
  FaPalette,
  FaPenNib,
  FaShapes,
  FaShieldAlt,
  FaCheckCircle,
  FaSwatchbook
} from 'react-icons/fa'
import { SiFigma } from 'react-icons/si'
import styles from './GraphicDesignPage.module.css'
import g1 from '../../assets/graphic design/g1.jpg'
import g2 from '../../assets/graphic design/g2.jpg'
import g3 from '../../assets/graphic design/g3.jpg'
import g4 from '../../assets/graphic design/g4.jpg'
import g5 from '../../assets/graphic design/g5.jpg'
import g6 from '../../assets/graphic design/g6.jpg'
import g7 from '../../assets/graphic design/g7.jpg'

const posters = [
  { src: g1, title: 'Event Poster' },
  { src: g2, title: 'Sale Poster' },
  { src: g3, title: 'Brochure Design' },
  { src: g4, title: 'Packaging Design' },
  { src: g5, title: 'Social Media Creative' },
  { src: g6, title: 'Magazine Cover' },
  { src: g7, title: 'Branding Artwork' },
]

const whyChooseItems = [
  { icon: FaSwatchbook, title: '100% Original', text: 'Unique designs crafted' },
  { icon: FaInfinity, title: 'Unlimited Revisions', text: 'We work until you are happy' },
  { icon: FaShieldAlt, title: 'Commercial Use', text: 'Get full rights to designs' },
  { icon: FaHeadset, title: 'Dedicated Support', text: 'We are here to support you' }
]

const workflowSteps = [
  { icon: FaPenNib, title: 'Creative Brief', text: 'Understanding your goals, message and audience.' },
  { icon: FaSearch, title: 'Research', text: 'Exploring ideas, trends and visual references.' },
  { icon: FaLightbulb, title: 'Concept & Ideation', text: 'Brainstorming and crafting visual concepts.' },
  { icon: FaSwatchbook, title: 'Design & Refine', text: 'Designing with precision and refining every detail.' },
  { icon: FaCheckCircle, title: 'Final Delivery', text: 'Delivering high-quality files ready to use.' }
]

const tools = [
  { icon: FaPalette, label: 'Photoshop' },
  { icon: FaPenNib, label: 'Illustrator' },
  { icon: FaShapes, label: 'InDesign' },
  { icon: FaDraftingCompass, label: 'Adobe XD' },
  { icon: SiFigma, label: 'Figma' }
]

const designShowcase = [
  { src: g1, title: 'Poster Design' },
  { src: g2, title: 'Flyer Design' },
  { src: g3, title: 'Brochure Design' },
  { src: g4, title: 'Print Design' },
  { src: g5, title: 'Packaging Design' }
]

function getOffset(index, active, total) {
  const raw = index - active
  const half = Math.floor(total / 2)
  if (raw > half) return raw - total
  if (raw < -half) return raw + total
  return raw
}

function getPose(offset) {
  if (offset === 0) {
    return { x: 0, y: -8, rotateY: 0, rotateZ: 0, scale: 1.2, z: 240, opacity: 1, blur: 0, zIndex: 8 }
  }
  if (offset === -1) {
    return { x: '-38%', y: 20, rotateY: 40, rotateZ: -2, scale: 0.94, z: 90, opacity: 0.9, blur: 0.2, zIndex: 7 }
  }
  if (offset === 1) {
    return { x: '38%', y: 20, rotateY: -40, rotateZ: 2, scale: 0.94, z: 90, opacity: 0.9, blur: 0.2, zIndex: 7 }
  }
  if (offset === -2) {
    return { x: '-62%', y: 58, rotateY: 56, rotateZ: -5, scale: 0.84, z: -40, opacity: 0.68, blur: 1.4, zIndex: 5 }
  }
  if (offset === 2) {
    return { x: '62%', y: 58, rotateY: -56, rotateZ: 5, scale: 0.84, z: -40, opacity: 0.68, blur: 1.4, zIndex: 5 }
  }
  if (offset < 0) {
    return { x: '-76%', y: 96, rotateY: 66, rotateZ: -8, scale: 0.76, z: -140, opacity: 0.45, blur: 2.8, zIndex: 3 }
  }
  return { x: '76%', y: 96, rotateY: -66, rotateZ: 8, scale: 0.76, z: -140, opacity: 0.45, blur: 2.8, zIndex: 3 }
}

export default function GraphicDesignPage() {
  const [active, setActive] = useState(0)
  const wheelLock = useRef(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [designActive, setDesignActive] = useState(0)
  const total = posters.length

  const handleDesignScroll = useCallback((event) => {
    const el = event.currentTarget
    const cardWidth = el.scrollWidth / designShowcase.length
    const idx = Math.round(el.scrollLeft / cardWidth)
    setDesignActive(Math.min(designShowcase.length - 1, Math.max(0, idx)))
  }, [])

  const navigate = useCallback((step) => {
    setActive((current) => (current + step + total) % total)
  }, [total])

  const handleWheel = useCallback((event) => {
    event.preventDefault()
    if (wheelLock.current) return
    wheelLock.current = true
    navigate(event.deltaY > 0 ? 1 : -1)
    window.setTimeout(() => {
      wheelLock.current = false
    }, 560)
  }, [navigate])

  const arranged = useMemo(
    () => posters.map((poster, index) => ({ ...poster, offset: getOffset(index, active, total), index })),
    [active, total]
  )

  return (
    <div className={styles.page}>
      <section className={styles.hero} onWheel={handleWheel}>
        <div className={styles.bgLayer} />
        <div className={styles.gridLayer} />

        <div className={styles.copy}>
          
          <h1>Futuristic Visuals For High-Impact Brand Stories.</h1>
          <p>
            Ultra-premium poster systems, campaign creatives, brochure kits and brand artwork with immersive motion and
            cinematic polish.
          </p>
          <div className={styles.actions}>
            <Link to="/start-project?service=10" className={styles.primaryBtn}>Start Design Project <FaArrowRight size={12} /></Link>
            <button type="button" className={styles.secondaryBtn} onClick={() => navigate(1)}>Explore Gallery</button>
          </div>
        </div>

        <div
          className={styles.visualStage}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect()
            const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
            const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
            setMouse({ x, y })
          }}
          onMouseLeave={() => setMouse({ x: 0, y: 0 })}
        >
          <motion.div
            className={styles.laptop}
            animate={{ rotateX: -mouse.y * 4, rotateY: mouse.x * 6, y: -mouse.y * 8 }}
            transition={{ type: 'spring', stiffness: 110, damping: 16 }}
          >
            <div className={styles.laptopTop}>
              <div className={styles.badges}><FaSwatchbook /><FaPenNib /><SiFigma /></div>
              <div className={styles.screenPreview}><img src={arranged[active].src} alt={arranged[active].title} /></div>
            </div>
            <div className={styles.laptopBase} />
          </motion.div>

          <div className={styles.orbitRing} />
          <div className={styles.orbitRingTwo} />

          <div className={styles.carousel}>
            {arranged.map((poster) => {
              const pose = getPose(poster.offset)
              const isActive = poster.offset === 0
              return (
                <motion.article
                  key={poster.title}
                  className={`${styles.card} ${isActive ? styles.activeCard : ''}`}
                  animate={{
                    x: pose.x,
                    y: pose.y,
                    z: pose.z,
                    rotateY: pose.rotateY + mouse.x * 4,
                    rotateZ: pose.rotateZ,
                    scale: pose.scale,
                    opacity: pose.opacity,
                    filter: `blur(${pose.blur}px)`,
                  }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.86 }}
                  style={{ zIndex: pose.zIndex }}
                >
                  <img src={poster.src} alt={poster.title} />
                  <div className={styles.overlay}><span>{poster.title}</span></div>
                </motion.article>
              )
            })}
          </div>

          <button className={`${styles.nav} ${styles.left}`} type="button" onClick={() => navigate(-1)} aria-label="Previous poster"><FaChevronLeft /></button>
          <button className={`${styles.nav} ${styles.right}`} type="button" onClick={() => navigate(1)} aria-label="Next poster"><FaChevronRight /></button>
        </div>
      </section>

      <section className={styles.premiumPanel}>
        <div className={styles.panelBlock}>
          <p className={styles.blockLabel}>OUR GRAPHIC DESIGN PROCESS</p>
          <div className={styles.processRow}>
            {workflowSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.article
                  key={step.title}
                  className={styles.processCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <div className={styles.stepTop}>
                    <div className={styles.stepBubble}><Icon /></div>
                    {index < workflowSteps.length - 1 ? <i className={styles.stepConnector} /> : null}
                  </div>
                  <span className={styles.stepNumber}>{`0${index + 1}`}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </motion.article>
              )
            })}
          </div>
        </div>

        <div className={styles.panelBlock}>
          <p className={styles.blockLabel}>TOOLS WE USE</p>
          <div className={styles.toolsRow}>
            {tools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <motion.article
                  key={tool.label}
                  className={styles.toolMiniCard}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                >
                  <div className={styles.toolIconShell}><Icon /></div>
                  <span>{tool.label}</span>
                </motion.article>
              )
            })}
          </div>
        </div>

        <div className={styles.panelBlock}>
          <p className={styles.blockLabel}>WHAT WE DESIGN</p>
          <div className={styles.designRow} onScroll={handleDesignScroll}>
            {designShowcase.map((item, index) => (
              <motion.article
                key={item.title}
                className={styles.designCard}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <img src={item.src} alt={item.title} />
                <h4>{item.title}</h4>
              </motion.article>
            ))}
          </div>
          <div className={styles.dots}>
            {designShowcase.map((item, index) => (
              <span key={item.title} className={index === designActive ? styles.dotActive : undefined} />
            ))}
          </div>
        </div>

        <div className={styles.benefitsRow}>
          {whyChooseItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.title}
                className={styles.benefitCard}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className={styles.benefitIcon}><Icon /></div>
                <div>
                  <h5>{item.title}</h5>
                  <p>{item.text}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
