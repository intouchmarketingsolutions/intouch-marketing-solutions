import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion'
import { FiPenTool, FiLayers, FiType, FiSquare, FiCircle } from 'react-icons/fi'
import { BiPalette } from 'react-icons/bi'
import { MdOutlineDesignServices } from 'react-icons/md'
import styles from './GraphicDesignPage.module.css'
import g1 from '../../assets/graphic design/g1.jpg'
import g2 from '../../assets/graphic design/g2.jpg'
import g3 from '../../assets/graphic design/g3.jpg'
import g4 from '../../assets/graphic design/g4.jpg'
import g5 from '../../assets/graphic design/g5.jpg'
import g6 from '../../assets/graphic design/g6.jpg'
import g7 from '../../assets/graphic design/g7.jpeg'

const FLOAT_CARDS = [
  { title: 'Poster Design', subtitle: 'Bold impact layouts for campaigns', image: g1, top: '6%', left: '8%', rotate: -9, scale: 1.04 },
  { title: 'Flyer Design', subtitle: 'Dynamic event and promo stories', image: g2, top: '12%', left: '72%', rotate: 8, scale: 0.96 },
  { title: 'Brochure Design', subtitle: 'Premium editorial experiences', image: g3, top: '54%', left: '5%', rotate: 6, scale: 1.02 },
  { title: 'Packaging Design', subtitle: 'Futuristic shelf-ready systems', image: g4, top: '26%', left: '52%', rotate: -8, scale: 1.0 },
  { title: 'Social Creatives', subtitle: 'Neon-rich campaign visuals', image: g5, top: '68%', left: '72%', rotate: 10, scale: 0.98 },
  { title: 'Brand Assets', subtitle: 'Modular visual systems & tokens', image: g6, top: '46%', left: '86%', rotate: -12, scale: 0.94 },
  { title: 'Print Design', subtitle: 'High-fidelity tactile layouts', image: g7, top: '80%', left: '24%', rotate: 12, scale: 1.05 },
]

const TOOL_ITEMS = [
  { label: 'Type', Icon: FiType },
  { label: 'Palette', Icon: BiPalette },
  { label: 'Vector', Icon: FiPenTool },
  { label: 'Layers', Icon: FiLayers },
  { label: 'Grid', Icon: FiSquare },
  { label: 'Concept', Icon: FiCircle },
]

export default function GraphicDesignPage() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const { scrollYProgress } = useScroll()

  const sceneX = useTransform(mouseX, [-0.5, 0.5], [24, -24])
  const sceneY = useTransform(mouseY, [-0.5, 0.5], [18, -18])
  const sceneRotateX = useTransform(mouseY, [-0.5, 0.5], [16, -16])
  const sceneRotateY = useTransform(mouseX, [-0.5, 0.5], [-20, 20])
  const sceneScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.95])

  const sceneStyle = {
    x: useSpring(sceneX, { damping: 20, stiffness: 130 }),
    y: useSpring(sceneY, { damping: 20, stiffness: 130 }),
    rotateX: useSpring(sceneRotateX, { damping: 20, stiffness: 125 }),
    rotateY: useSpring(sceneRotateY, { damping: 20, stiffness: 125 }),
    scale: useSpring(sceneScale, { damping: 35, stiffness: 95 }),
  }

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const floatingTools = useMemo(
    () => TOOL_ITEMS.map((item, index) => ({ ...item, delay: index * 0.05 })),
    []
  )

  return (
    <div className={styles.page}>
      <section className={styles.hero} onMouseMove={handleMouseMove}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Graphic Design</span>
          <h1>Future-ready visual systems crafted in a neon studio.</h1>
          <p>
            A premium graphic design landing page built for a creative studio.
            Dark navy, glowing purple, cyan reflections, and floating interfaces
            converge in a 3D design workspace.
          </p>
          <div className={styles.ctaActions}>
            <Link to="/start-project?service=10" className={styles.primaryBtn}>
              Start a Design Studio Project
            </Link>
            <Link to="/contact" className={styles.secondaryBtn}>
              Talk to Design Team
            </Link>
          </div>

          <div className={styles.trustGrid}>
            {['Spline-inspired depth', 'Framer Motion glow', 'Ultra-premium UI'].map((label) => (
              <div key={label} className={styles.trustPill}>
                {label}
              </div>
            ))}
          </div>
        </div>

        <motion.div className={styles.heroScene} style={sceneStyle}>
          <div className={styles.sceneGlow} />
          <div className={styles.particles}>
            {[...Array(10)].map((_, index) => (
              <span key={index} className={styles.particle} />
            ))}
          </div>

          <div className={styles.workspaceGrid} />

          <div className={styles.holoCanvas}>
            <div className={styles.holoBar}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.holoHeader}>
              <div>
                <strong>Creative Workspace</strong>
                <span>Holographic design frame</span>
              </div>
              <div className={styles.holoBadge}>PRO</div>
            </div>
            <div className={styles.holoDisplay}>
              <div className={styles.holoPanel} />
              <div className={styles.holoLayerBlock} />
              <div className={styles.holoLayerText}>visual system</div>
              <div className={styles.holoGuides} />
              <div className={styles.holoAccent} />
            </div>
            <div className={styles.holoFooter}>
              <span>Artboard: 1920 x 1080</span>
              <span>RGB / Neon</span>
            </div>
          </div>

          {floatingTools.map((item, index) => (
            <motion.div
              key={item.label}
              className={styles.toolChip}
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: item.delay, duration: 0.8, ease: 'easeOut' }}
              style={{
                top: `${14 + index * 9}%`,
                left: index % 2 === 0 ? '8%' : '76%',
                rotate: index % 2 === 0 ? -6 : 8,
              }}
            >
              <item.Icon />
              <span>{item.label}</span>
            </motion.div>
          ))}

          {FLOAT_CARDS.map((card, index) => (
            <motion.div
              key={card.title}
              className={styles.floatingCard}
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.18 + index * 0.06, duration: 0.9, ease: 'easeOut' }}
              style={{ top: card.top, left: card.left, rotate: card.rotate, scale: card.scale }}
            >
              <div className={styles.cardImage} style={{ backgroundImage: `url(${card.image})` }} />
              <div className={styles.cardBody}>
                <strong>{card.title}</strong>
                <p>{card.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className={styles.detailRow}>
        <div className={styles.detailPanel}>
          <span>Design Offerings</span>
          <h2>Seven creative outcomes for high-end brands.</h2>
          <p>
            Each floating card represents the craft we deliver in a futuristic design studio:
            posters, flyers, brochures, packaging, social creatives, brand assets, and print design.
          </p>
        </div>
        <div className={styles.detailPanelAlt}>
          <ul>
            <li>Neon-infused visual systems with pixel-perfect polish</li>
            <li>3D-inspired layout grids with subtle motion</li>
            <li>Responsive artboards designed for digital and print</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
