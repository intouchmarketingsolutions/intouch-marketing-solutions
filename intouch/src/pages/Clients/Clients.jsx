import React, { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { Link } from 'react-router-dom'
import { FaStar, FaArrowRight, FaCheckCircle, FaFire, FaGlobe, FaUtensils, FaIndustry, FaHotel, FaShoppingBag, FaRocket, FaUsers, FaBriefcase, FaUserTie, FaChartLine } from 'react-icons/fa'
import useFadeUp from '../../hooks/useFadeUp'
import styles from './Clients.module.css'

/* ── gallery images (service work samples) ── */
import img1 from '../../assets/graphic design/g1.jpg'
import img2 from '../../assets/Graphic-Design.png'
import img3 from '../../assets/social-media.png'
import img4 from '../../assets/digital-marketing.png'
import img5 from '../../assets/video-editing.png'
import img6 from '../../assets/seo.png'
import img7 from '../../assets/branding.png'
import img8 from '../../assets/uiux.png'
import img9 from '../../assets/ecommerce.png'

import img11 from '../../assets/content-writing.png'
import img12 from '../../assets/google-ads.png'
import img13 from '../../assets/graphic design/g2.jpg'
import img14 from '../../assets/graphic design/g3.jpg'
import img15 from '../../assets/graphic design/g4.jpg'
import img16 from '../../assets/graphic design/g5.jpg'
import img17 from '../../assets/graphic design/g6.jpg'
import img18 from '../../assets/graphic design/g7.jpeg'

/* ── real client logos ── */
import lBallas  from '../../assets/ballas.png'
import lTimora  from '../../assets/timora.png'
import lKoppas  from '../../assets/koppas final logo.png'
import lSwadesh from '../../assets/swadesh.png'
import lHero    from '../../assets/Heromotor.png'
import lVidya   from '../../assets/Vidyalakshmi group.png'
import lDream   from '../../assets/Dream.png'
import lShenoy  from '../../assets/Shenoy.png'
import lSun     from '../../assets/Sun.png'
import lAadi    from '../../assets/AAdi yoga.png'
import lBmr     from '../../assets/BMR sloution.png'
import lKanark  from '../../assets/Kanark car GAs.png'
import lNovelty from '../../assets/novelty logo27.png'
import lSagar   from '../../assets/sagar logo27.png'
import lAnand   from '../../assets/Anand logo27.png'
import lNeo     from '../../assets/neo  logo27.png'
import lMec     from '../../assets/MEC.png'
import lMsdc    from '../../assets/MSDC  logo27.png'
import lBm      from  '../../assets/BM.png'
import lParvaa  from  '../../assets/Parvaa concepts luxe interiors CMYK.png'
import lbrown   from  '../../assets/Untitled design (5).png'
import lsara    from  '../../assets/Sara_logo.png'

const LOGOS = [lBallas, lTimora, lKoppas, lSwadesh, lHero, lVidya, lDream, lShenoy, lSun, lAadi, lBmr, lKanark, lNovelty, lSagar, lAnand, lNeo, lMec, lMsdc, lBm, lParvaa, lbrown, lsara]

const RATINGS = [
  { name: 'Google',     score: '5.0' },
  { name: 'Clutch',     score: '5.0' },
  { name: 'Meta',       score: '5.0' },
  { name: 'Trustpilot', score: '5.0' },
]

const ROW1 = [img1, img2, img3, img4, img5, img6, img13, img14, img15]
const ROW2 = [img7, img8, img9, img11, img12, img16, img17, img18]

const CATEGORIES = ['All', 'Technology', 'Food & Retail', 'Hospitality', 'Industrial', 'Media']
const CATEGORY_ICONS = {
  'Technology': <FaGlobe />, 'Food & Retail': <FaUtensils />,
  'Industrial': <FaIndustry />, 'Hospitality': <FaHotel />, 'Media': <FaShoppingBag />,
}

const CLIENTS = [
  { name: 'Nova Corp',          initials: 'NC', category: 'Technology',    color: '#6366f1', growth: '+300%' },
  { name: 'Pixel Studio',       initials: 'PS', category: 'Media',         color: '#0ea5a4', growth: '+180%' },
  { name: 'Kiran Foods',        initials: 'KF', category: 'Food & Retail', color: '#f59e0b', growth: '+220%' },
  { name: 'Mangalore Steel',    initials: 'MS', category: 'Industrial',    color: '#64748b', growth: '+95%'  },
  { name: 'Udupi Spices',       initials: 'US', category: 'Food & Retail', color: '#10b981', growth: '+150%' },
  { name: 'TechWave',           initials: 'TW', category: 'Technology',    color: '#6366f1', growth: '+410%' },
  { name: 'BlueSky Retail',     initials: 'BR', category: 'Food & Retail', color: '#3b82f6', growth: '+270%' },
  { name: 'Coastal Travels',    initials: 'CT', category: 'Hospitality',   color: '#0ea5a4', growth: '+190%' },
  { name: 'SunRise Hotels',     initials: 'SH', category: 'Hospitality',   color: '#f59e0b', growth: '+500%' },
  { name: 'Elite Motors',       initials: 'EM', category: 'Industrial',    color: '#ef4444', growth: '+130%' },
  { name: 'GreenLeaf Organics', initials: 'GL', category: 'Food & Retail', color: '#10b981', growth: '+340%' },
  { name: 'Spark Digital',      initials: 'SD', category: 'Technology',    color: '#6366f1', growth: '+260%' },
  { name: 'Horizon Media',      initials: 'HM', category: 'Media',         color: '#8b5cf6', growth: '+380%' },
  { name: 'PrimeCraft',         initials: 'PC', category: 'Industrial',    color: '#64748b', growth: '+110%' },
]

const TESTIMONIALS = [
  { quote: 'Website traffic tripled in 4 months. The campaigns Intouch ran were laser-focused and high-converting.', author: 'Ravi Kumar', role: 'CEO, Nova Corp', growth: '+300% traffic', color: '#6366f1' },
  { quote: 'The most creative and results-driven team we have ever worked with. Highly recommended.', author: 'Priya Shetty', role: 'Director, Kiran Foods', growth: '+220% leads', color: '#0ea5a4' },
  { quote: 'Our social following grew 5x completely organically. Intouch knows digital marketing inside out.', author: 'Arun Nair', role: 'MD, SunRise Hotels', growth: '+500% reach', color: '#ec4899' },
]

/* ── Three.js orbital vortex — orb on right, text on left.
   Clockwise plasma swirl: cyan arcs arch over the orb top (L→R),
   pink arcs arch under the bottom (R→L). UnrealBloom post-processing.
*/
function OrbCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    // Skip on mobile — too heavy, causes hang
    if (window.innerWidth < 768) return

    // Check WebGL support before starting
    try {
      const test = document.createElement('canvas')
      const gl = test.getContext('webgl') || test.getContext('experimental-webgl')
      if (!gl) return
    } catch { return }

    const W = el.clientWidth  || 800
    const H = el.clientHeight || 700

    let renderer, composer, raf
    let cleanup = () => {}

    try {

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    el.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 200)
    // Camera centred — orb sits at upper-centre of canvas, text fills lower half
    camera.position.set(0, 0, 8.0)
    camera.lookAt(0, 0.8, 0)

    // ── Icosahedron (upper centre) ──
    const R      = 1.9
    const OX     = 0      // horizontally centred
    const OY     = 2.0    // upper portion of canvas
    const icoGeo = new THREE.IcosahedronGeometry(R, 2)

    const icoMesh = new THREE.Mesh(icoGeo, new THREE.MeshBasicMaterial({
      color: 0x020813, transparent: true, opacity: 0.80,
    }))
    icoMesh.position.set(OX, OY, 0)
    scene.add(icoMesh)

    // Glowing edges — cyan top → purple mid → magenta bottom
    const edgeGeo  = new THREE.EdgesGeometry(icoGeo, 1)
    const posAttr  = edgeGeo.getAttribute('position')
    const colorArr = new Float32Array(posAttr.count * 3)
    const cTop = new THREE.Color(0x06b6d4)
    const cMid = new THREE.Color(0x7c3aed)
    const cBot = new THREE.Color(0xe040fb)

    for (let i = 0; i < posAttr.count; i++) {
      const t   = THREE.MathUtils.clamp((posAttr.getY(i) / R + 1) * 0.5, 0, 1)
      const col = t > 0.5 ? cMid.clone().lerp(cTop, (t - 0.5) * 2)
                           : cBot.clone().lerp(cMid, t * 2)
      colorArr[i * 3]     = col.r
      colorArr[i * 3 + 1] = col.g
      colorArr[i * 3 + 2] = col.b
    }
    edgeGeo.setAttribute('color', new THREE.BufferAttribute(colorArr, 3))

    const edgeLines = new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.95,
      blending: THREE.AdditiveBlending,
    }))
    edgeLines.position.set(OX, OY, 0)
    scene.add(edgeLines)

    // ── Plasma arc helper ──
    const makeArc = (pts, col, opacity) => {
      const geo = new THREE.BufferGeometry().setFromPoints(
        new THREE.CatmullRomCurve3(pts).getPoints(280)
      )
      const mat = new THREE.LineDashedMaterial({
        color: new THREE.Color(col), transparent: true, opacity,
        dashSize: 1.2, gapSize: 1.8,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })
      const line = new THREE.Line(geo, mat)
      line.computeLineDistances()
      return line
    }

    const arcGroup = new THREE.Group()
    const lerp = (a, b, t) => a + (b - a) * t

    const ARC_PARAMS = [
      { op: 0.95, spd: 0.030 }, { op: 0.82, spd: 0.025 },
      { op: 0.66, spd: 0.020 }, { op: 0.50, spd: 0.015 },
      { op: 0.35, spd: 0.010 }, { op: 0.22, spd: 0.007 },
      { op: 0.13, spd: 0.005 }, { op: 0.07, spd: 0.003 },
    ]

    // Cyan arcs — upper half, wide left fan → converge above orb → moderate right spread (L→R)
    ARC_PARAMS.forEach(({ op, spd }, i) => {
      const sy   = OY + 0.5  + i * 0.85   // 2.5 … 8.45  (upper-left fan)
      const peak = OY + 0.22 + i * 0.38   // 2.22 … 4.88 (just above orb, converging)
      const ey   = OY - 0.25 + i * 0.28   // 1.75 … 3.71 (right side, less spread)
      const z    = Math.sin(i * 1.1) * 0.35
      const arc  = makeArc([
        new THREE.Vector3(-10,   sy,                        z),
        new THREE.Vector3(OX-4,  lerp(sy, peak, 0.68),     z * 0.6),
        new THREE.Vector3(OX,    peak,                      0),
        new THREE.Vector3(OX+4,  lerp(peak, ey, 0.32),    -z * 0.6),
        new THREE.Vector3(12,    ey,                       -z),
      ], '#22d3ee', op)
      arc.userData.spd = spd
      arcGroup.add(arc)
    })

    // Pink arcs — lower half, mirror of cyan, wide left fan → converge below orb → right (L→R)
    ARC_PARAMS.forEach(({ op, spd }, i) => {
      const sy     = OY - 0.5  - i * 0.85
      const trough = OY - 0.22 - i * 0.38
      const ey     = OY + 0.25 - i * 0.28
      const z      = Math.sin(i * 1.1 + 0.6) * 0.35
      const arc    = makeArc([
        new THREE.Vector3(-10,   sy,                          z),
        new THREE.Vector3(OX-4,  lerp(sy, trough, 0.68),     z * 0.6),
        new THREE.Vector3(OX,    trough,                      0),
        new THREE.Vector3(OX+4,  lerp(trough, ey, 0.32),    -z * 0.6),
        new THREE.Vector3(12,    ey,                         -z),
      ], '#e040fb', op)
      arc.userData.spd = spd
      arcGroup.add(arc)
    })

    // Accent arcs — 2 cyan + 2 pink hugging the orb surface
    const accentC = makeArc([
      new THREE.Vector3(-10, OY + 0.3, 0.18),
      new THREE.Vector3(OX-4, OY + 0.22, 0.1),
      new THREE.Vector3(OX,   OY + 0.18, 0),
      new THREE.Vector3(OX+4, OY + 0.1, -0.1),
      new THREE.Vector3(12,   OY - 0.3, -0.18),
    ], '#67e8f9', 1.0)
    accentC.userData.spd = 0.036
    arcGroup.add(accentC)

    const accentC2 = makeArc([
      new THREE.Vector3(-10, OY + 1.4, 0.14),
      new THREE.Vector3(OX-4, OY + 0.9, 0.08),
      new THREE.Vector3(OX,   OY + 0.55, 0),
      new THREE.Vector3(OX+4, OY + 0.4, -0.08),
      new THREE.Vector3(12,   OY + 0.55, -0.14),
    ], '#06b6d4', 0.88)
    accentC2.userData.spd = 0.031
    arcGroup.add(accentC2)

    const accentP = makeArc([
      new THREE.Vector3(-10, OY - 0.3, 0.18),
      new THREE.Vector3(OX-4, OY - 0.22, 0.1),
      new THREE.Vector3(OX,   OY - 0.18, 0),
      new THREE.Vector3(OX+4, OY - 0.1, -0.1),
      new THREE.Vector3(12,   OY + 0.3, -0.18),
    ], '#f0abfc', 1.0)
    accentP.userData.spd = 0.036
    arcGroup.add(accentP)

    const accentP2 = makeArc([
      new THREE.Vector3(-10, OY - 1.4, 0.14),
      new THREE.Vector3(OX-4, OY - 0.9, 0.08),
      new THREE.Vector3(OX,   OY - 0.55, 0),
      new THREE.Vector3(OX+4, OY - 0.4, -0.08),
      new THREE.Vector3(12,   OY - 0.55, -0.14),
    ], '#c026d3', 0.88)
    accentP2.userData.spd = 0.031
    arcGroup.add(accentP2)

    scene.add(arcGroup)

    // ── Star field ──
    const COUNT = 200
    const pPos  = new Float32Array(COUNT * 3)
    const pCol  = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 24
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 14
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 8
      if (Math.random() > 0.45) { pCol[i*3]=0.13; pCol[i*3+1]=0.72; pCol[i*3+2]=0.85 }
      else                       { pCol[i*3]=0.88; pCol[i*3+1]=0.25; pCol[i*3+2]=0.98 }
    }
    const ptGeo = new THREE.BufferGeometry()
    ptGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    ptGeo.setAttribute('color',    new THREE.BufferAttribute(pCol, 3))
    const stars = new THREE.Points(ptGeo, new THREE.PointsMaterial({
      size: 0.065, vertexColors: true,
      transparent: true, opacity: 0.80,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }))
    scene.add(stars)

    // ── Bloom post-processing ──
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(W, H), 1.9, 0.45, 0.0))

    let raf
    const clock = new THREE.Clock()

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()

      icoMesh.rotation.y   = t * 0.18
      icoMesh.rotation.z   = Math.sin(t * 0.12) * 0.04
      icoMesh.position.z   = Math.sin(t * 0.28) * 0.08
      edgeLines.rotation.y = t * 0.18
      edgeLines.rotation.z = Math.sin(t * 0.12) * 0.04
      edgeLines.position.z = Math.sin(t * 0.28) * 0.08

      arcGroup.children.forEach(line => {
        line.material.dashOffset -= line.userData.spd || 0.015
      })
      stars.rotation.y = t * 0.018
      stars.rotation.z = t * 0.009

      composer.render()
    }
    tick()

    const onResize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      composer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    cleanup = () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      icoGeo.dispose(); edgeGeo.dispose(); ptGeo.dispose()
      arcGroup.children.forEach(l => { l.geometry.dispose(); l.material.dispose() })
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }

    } catch (err) {
      console.warn('Three.js canvas failed:', err)
    }

    return () => cleanup()
  }, [])

  return <div ref={mountRef} className={styles.orbCanvas} />
}

function ClientCard({ client, index }) {
  return (
    <div className={`${styles.card} fade-up`} style={{ transitionDelay: `${(index % 4) * 0.07}s` }}>
      <div className={styles.cardGlow} style={{ background: client.color }} />
      {index < 3 && <div className={styles.hotBadge}><FaFire size={10}/> Top Client</div>}
      <div className={styles.cardBody}>
        <div className={styles.initialsWrap} style={{ background: `${client.color}1a`, borderColor: `${client.color}40` }}>
          <span className={styles.initials} style={{ color: client.color }}>{client.initials}</span>
        </div>
        <h3 className={styles.clientName}>{client.name}</h3>
        <div className={styles.categoryBadge}>
          <span style={{ color: client.color }}>{CATEGORY_ICONS[client.category]}</span>
          {client.category}
        </div>
        <div className={styles.growthBar}>
          <FaCheckCircle style={{ color: '#10b981', fontSize: '0.75rem' }}/>
          <span className={styles.growthText} style={{ color: client.color }}>{client.growth} growth delivered</span>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <Link to="/contact" className={styles.viewBtn} style={{ '--c': client.color }}>
          Start Project <FaArrowRight size={10}/>
        </Link>
      </div>
    </div>
  )
}

export default function Clients() {
  useFadeUp()
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? CLIENTS : CLIENTS.filter(c => c.category === active)
  
  return (
    <div className={styles.page}>

      {/* ══════════════ HERO ══════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroBgGrid}/>
        <OrbCanvas />

        <div className={styles.heroMain}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>
              <FaRocket size={10}/> Digital Growth Partner
            </span>
            <h1 className={styles.heroTitle}>
              Digital Growth Agency<br/>
              <span>for Bold Brands</span>
            </h1>
            <p className={styles.heroSub}>
              We partner with ambitious brands across India to build powerful
              digital presences that attract, engage, and convert.
            </p>
            <Link to="/contact" className={styles.heroCta}>
              Get a Free Consultation <FaArrowRight size={13}/>
            </Link>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className={styles.heroStats}>
          {[
            { icon: <FaUsers/>,     title: 'Happy Clients',       desc: 'Trusted by brands across India.' },
            { icon: <FaBriefcase/>, title: 'Projects Delivered',  desc: 'Successful projects that drive growth.' },
            { icon: <FaUserTie/>,   title: 'Team Members',        desc: 'Experts dedicated to your success.' },
            { icon: <FaChartLine/>, title: 'Avg. ROI Growth',     desc: 'We focus on results that matter.' },
          ].map((s, i) => (
            <div key={i} className={styles.heroStatItem}>
              <div className={styles.heroStatIcon}>{s.icon}</div>
              <div className={styles.heroStatText}>
                <strong>{s.title}</strong>
                <span>{s.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ TWO-ROW GALLERY ══════════════ */}
      <section className={styles.gallerySection}>
        {/* Row 1 – scroll left */}
        <div className={styles.galleryRow}>
          <div className={styles.galleryTrack}>
            {[...ROW1, ...ROW1].map((src, i) => (
              <div key={i} className={styles.galleryCard}>
                <img src={src} alt="" loading="lazy"/>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 – scroll right */}  
        <div className={`${styles.galleryRow} ${styles.galleryRowReverse}`}>
          <div className={`${styles.galleryTrack} ${styles.galleryTrackReverse}`}>
            {[...ROW2, ...ROW2].map((src, i) => (
              <div key={i} className={styles.galleryCard}>
                <img src={src} alt="" loading="lazy"/>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* ══════════════ PREMIUM TRUST SECTION ══════════════ */}

<section className={styles.trustSection}>

  <div className={styles.trustGlow}></div>

  <div className={styles.trustHeader}>

    <h2 className={styles.trustTitle}>
      <span>50+</span> Brands Across Karnataka
    </h2>

    <p className={styles.trustDesc}>
      We are proud to be the growth partner for ambitious brands and startups
      across diverse industries.
    </p>
  </div>

  {/* ROW 1 */}
  <div className={styles.logoMarquee}>

    <div className={styles.logoTrack}>

      {[...LOGOS, ...LOGOS].map((src, i) => (
        <div key={i} className={styles.logoCard}>
          <img src={src} alt="" />
        </div>
      ))}

    </div>

  </div>

  {/* ROW 2 */}
  <div className={`${styles.logoMarquee} ${styles.reverseRow}`}>

    <div className={`${styles.logoTrack} ${styles.reverseTrack}`}>

      {[...LOGOS.slice().reverse(), ...LOGOS.slice().reverse()].map((src, i) => (
        <div key={i} className={styles.logoCard}>
          <img src={src} alt="" />
        </div>
      ))}

    </div>

  </div>

</section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className={styles.testimonials}>
        <div className={styles.testiHeader}>
          <h2 className={styles.sectionTitle}>Results That <span>Speak Louder</span></h2>
          <p className={styles.testiSub}>Real words from real clients who saw real growth.</p>
        </div>
        <div className={styles.testiGrid}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`${styles.testiCard} fade-up`} style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className={styles.testiGlow} style={{ background: t.color }}/>
              <div className={styles.stars}>{[...Array(5)].map((_, j) => <FaStar key={j}/>)}</div>
              <p className={styles.quote}>"{t.quote}"</p>
              <div className={styles.growthPill} style={{ background: `${t.color}18`, color: t.color, borderColor: `${t.color}40` }}>
                <FaCheckCircle size={11}/> {t.growth}
              </div>
              <div className={styles.testiAuthor}>
                <div className={styles.avatar} style={{ background: `${t.color}25`, color: t.color, border: `1px solid ${t.color}50` }}>
                  {t.author[0]}
                </div>
                <div>
                  <strong>{t.author}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ BOTTOM CTA ══════════════ */}
      <section className={styles.cta}>
        <div className={styles.ctaGlowLeft}/>
        <div className={styles.ctaGlowRight}/>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Become Our <br/><em>Next Success Story</em></h2>
          <p className={styles.ctaSub}>Join 120+ brands that trust Intouch Marketing Solutions to scale their digital presence.</p>
          <Link to="/contact" className={styles.heroCta}>Partner With Us <FaArrowRight size={13}/></Link>
        </div>
      </section>

    </div>
  )
}
