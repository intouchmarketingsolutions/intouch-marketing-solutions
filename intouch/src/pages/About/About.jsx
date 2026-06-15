import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaChartLine,
  FaBullseye,
  FaPaintBrush,
  FaBullhorn,
  FaCogs,
  FaChartBar,
  FaHandshake,
  FaRocket
} from 'react-icons/fa'

import useFadeUp from '../../hooks/useFadeUp'
import SEO from '../../components/SEO/SEO'
import styles from './About.module.css'

// ✅ IMPORTANT: no spaces in file names
import aboutVideo from '../../assets/VID-20251117-WA0002.mp4'
import pricingImg from '../../assets/Competitive Pricing.png'
import researchImg from '../../assets/market-research.png'
import teamImg from '../../assets/Expert Team.png'
import solutionImg from '../../assets/Creative Solutions.png'

/* =========================
   TYPEWRITER WORDS
========================= */
const WORDS = [
  "We Build.",
  "We Connect.",
  "We Innovate.",
  "We Capture.",
  "We Edit.",
  "We Handle."
]

/* =========================
   TYPEWRITER COMPONENT
========================= */
function Typewriter() {
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = WORDS[index]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, subIndex + 1))
        setSubIndex(subIndex + 1)

        if (subIndex === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 800)
        }
      } else {
        setText(currentWord.substring(0, subIndex - 1))
        setSubIndex(subIndex - 1)

        if (subIndex === 0) {
          setIsDeleting(false)
          setIndex((prev) => (prev + 1) % WORDS.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [subIndex, isDeleting, index])

  return (
    <h2 className={styles.typewriter}>
      {text}
      <span className={styles.cursor}>|</span>
    </h2>
  )
}

/* =========================
   WHY SECTION
========================= */
  const WHY = [
  {
    icon: <FaChartLine />,
    title: 'Competitive Pricing',
    desc: 'We offer cost-effective digital marketing solutions designed to deliver maximum value without compromising on quality. Our pricing models are transparent, scalable, and tailored to fit businesses of all sizes, ensuring you get the best return on your investment.',
    img: pricingImg
  },
  {
    icon: <FaChartBar />,
    title: 'Market Research',
    desc: 'Our strategies are backed by in-depth market research, competitor analysis, and audience insights. We identify trends, opportunities, and gaps in your industry to position your brand effectively and give you a competitive edge.',
    img: researchImg
  },
  {
    icon: <FaHandshake />,
    title: 'Expert Team',
    desc: 'Our team consists of experienced marketers, designers, and developers who collaborate to deliver high-impact results. With a strong focus on innovation and performance, we ensure every project is executed with precision and expertise.',
    img: teamImg
  },
  {
    icon: <FaPaintBrush />,
    title: 'Creative Solutions',
    desc: 'We craft unique, visually compelling, and strategically aligned creative solutions that help your brand stand out. From branding to campaign execution, we focus on delivering engaging experiences that connect with your audience.',
    img: solutionImg
  }
]

/* =========================
   FEATURES
========================= */
const FEATURES = [
  { icon: <FaChartLine />, title: 'Data-Driven Strategy', desc: 'Insights that drive growth.' },
  { icon: <FaBullseye />, title: 'ROI Focused', desc: 'Maximize your business results.' },
  { icon: <FaPaintBrush />, title: 'Creative Design', desc: 'Designs that convert users.' },
  { icon: <FaBullhorn />, title: 'Marketing', desc: 'Reach across all platforms.' },
  { icon: <FaCogs />, title: 'Automation', desc: 'Smart optimization tools.' },
  { icon: <FaChartBar />, title: 'Analytics', desc: 'Clear performance tracking.' },
  { icon: <FaHandshake />, title: 'Support', desc: 'Long-term partnership.' },
  { icon: <FaRocket />, title: 'Scalability', desc: 'Built for future growth.' }
]

export default function About() {
  useFadeUp()

  return (
    <div className="page-wrap">
      <SEO
        title="About Us | Intouch Marketing Solutions - Digital Marketing Agency Udupi"
        description="Learn about Intouch Marketing Solutions - a passionate team of digital marketers, designers and developers in Udupi, Karnataka helping brands grow with data-driven strategies."
        path="/about"
      />

      {/* INTRO */}
      <section className={styles.intro}>
        <div className={styles.grid}>

          {/* VIDEO */}
          <div className={styles.imgWrap}>
            <div className={styles.videoBox}>
              <video src={aboutVideo} autoPlay muted loop className={styles.video} />
            </div>

            <div className={styles.orbit}>
              <div className={styles.bubble}><FaFacebookF /></div>
              <div className={styles.bubble}><FaInstagram /></div>
              <div className={styles.bubble}><FaLinkedinIn /></div>
              <div className={styles.bubble}><FaTwitter /></div>
            </div>
          </div>

          {/* TEXT */}
          <div className={styles.text}>

            <h2 className={styles.title}>
              We Are <span>Intouch Marketing Solutions</span>
            </h2>

            {/* 🔥 TYPEWRITER */}
            <Typewriter />

            <p className={styles.lead}>
  We are a <strong>results-driven digital marketing agency</strong> focused on helping brands grow, scale, and succeed in today’s competitive digital world.
</p>

<p>
  At <strong>Intouch Marketing Solutions</strong>, we combine <span>data-driven insights</span>, 
  <span> creative thinking</span>, and <span>modern technology</span> to craft strategies that deliver real, measurable results. 
  Our team works closely with clients to understand their business goals and transform them into impactful digital experiences.
</p>

<p>
  From building strong brand identities to executing high-performance marketing campaigns, 
  we ensure every solution is tailored, scalable, and aligned with long-term growth. 
  We believe in transparency, consistency, and delivering value at every stage of the journey.
</p>

<p>
  Whether you're a startup establishing your presence or an established business aiming to expand, 
  we provide the expertise and support needed to elevate your brand and maximize your digital potential.
</p>

            <Link to="/contact" className="btn btn-primary">
              Work With Us →
            </Link>
          </div>

        </div>

        {/* FEATURES */}
        <div className={styles.featuresWrap}>
          {FEATURES.map((f, i) => (
            <div key={i} className={styles.feat}>
              <span className={styles.featIcon}>{f.icon}</span>
              <div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className={styles.why}>
	<div className="center">
          <h2 className="heading fade-up">
            Why Choose <span>Intouch?</span>
          </h2>
        </div>

        <div className={styles.whyList}>
          {WHY.map((w, i) => (
            <div key={i} className={`${styles.whyRow} ${i % 2 ? styles.reverse : ''}`}>
              <div className={styles.whyImg}>
                <img src={w.img} alt="" />
              </div>

              <div className={styles.whyContent}>
                <div className={styles.whyIcon}>{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}