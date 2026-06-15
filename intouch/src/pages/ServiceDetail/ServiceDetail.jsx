import React from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  FaRocket, FaMobileAlt, FaShieldAlt, FaArrowRight, FaExternalLinkAlt,
  FaCheckCircle, FaAws, FaPalette, FaVideo, FaPenNib, FaCloud, FaTools,
  FaChartLine, FaSearch, FaLinkedin
} from 'react-icons/fa'
import {
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiNodedotjs,
  SiTailwindcss, SiMongodb, SiMysql, SiFlutter,
  SiAndroid, SiApple, SiFigma, SiShopify, SiWoocommerce, SiGoogleads,
  SiGoogleanalytics, SiInstagram, SiFacebook, SiWordpress,
  SiOpenai, SiGithub, SiVercel, SiFirebase, SiMeta, SiCanva, SiRazorpay,
  SiZapier, SiLooker, SiGooglesearchconsole
} from 'react-icons/si'
import { SERVICES } from '../../data/services'
import SEO from '../../components/SEO/SEO'
import styles from './ServiceDetail.module.css'
import useFadeUp from '../../hooks/useFadeUp'
import heroImg from '../../assets/web1.png'
import projectImg from '../../assets/projects/project.png'
import GraphicDesignPage from './GraphicDesignPage'
import VideoEditingPage from "../editing/VideoEditingPage";
import BrandingPage from './BrandingPage'
import SocialMediaPage from './SocialMediaPage'
import AdShotsPage from './AdShotsPage'
import ContentMarketingPage from './ContentMarketingPage'

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
    name: 'SARA CENTRAL',
    type: 'E-commerce Platform',
    desc: 'Responsive e-commerce platform with advanced filtering and smooth UX.',
    tags: ['React', 'Tailwind CSS'],
    color: '#0ea5a4',
    url: 'https://Saracentral.com',
    image: projectImg,
  },
]

const TECHNOLOGY_META = {
  React: { Icon: SiReact, color: '#61dafb' },
  'Next.js': { Icon: SiNextdotjs, color: '#ffffff' },
  JavaScript: { Icon: SiJavascript, color: '#f7df1e' },
  TypeScript: { Icon: SiTypescript, color: '#3178c6' },
  'Node.js': { Icon: SiNodedotjs, color: '#5fa04e' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#38bdf8' },
  MongoDB: { Icon: SiMongodb, color: '#47a248' },
  SQL: { Icon: SiMysql, color: '#4479a1' },
  AWS: { Icon: FaAws, color: '#ff9900' },
  Android: { Icon: SiAndroid, color: '#3ddc84' },
  iOS: { Icon: SiApple, color: '#ffffff' },
  Flutter: { Icon: SiFlutter, color: '#02569b' },
  Figma: { Icon: SiFigma, color: '#a259ff' },
  UX: { Icon: SiFigma, color: '#f24e1e' },
  Wireframes: { Icon: SiFigma, color: '#0acf83' },
  Shopify: { Icon: SiShopify, color: '#95bf47' },
  WooCommerce: { Icon: SiWoocommerce, color: '#96588a' },
  WordPress: { Icon: SiWordpress, color: '#21759b' },
  SEO: { Icon: SiGoogleanalytics, color: '#f9ab00' },
  Ads: { Icon: SiGoogleads, color: '#4285f4' },
  PPC: { Icon: SiGoogleads, color: '#34a853' },
  Analytics: { Icon: SiGoogleanalytics, color: '#f9ab00' },
  Instagram: { Icon: SiInstagram, color: '#e4405f' },
  Facebook: { Icon: SiFacebook, color: '#1877f2' },
  LinkedIn: { Icon: FaLinkedin, color: '#0a66c2' },
  Blogs: { Icon: SiWordpress, color: '#21759b' },
  Copywriting: { Icon: FaPenNib, color: '#ff6b6b' },
  'On-Page': { Icon: SiGoogleanalytics, color: '#34a853' },
  'Off-Page': { Icon: SiGoogleanalytics, color: '#4285f4' },
  Branding: { Icon: FaPalette, color: '#ff9a00' },
  Design: { Icon: FaPalette, color: '#31a8ff' },
  Reels: { Icon: FaVideo, color: '#9999ff' },
  YouTube: { Icon: FaVideo, color: '#ff0000' },
  Logo: { Icon: FaPalette, color: '#ff9a00' },
  Identity: { Icon: FaPenNib, color: '#ff6b6b' },
  Tools: { Icon: FaTools, color: '#0ea5a4' },
  Automation: { Icon: FaRocket, color: '#a855f7' },
  Data: { Icon: SiGoogleanalytics, color: '#f9ab00' },
  Tracking: { Icon: SiGoogleanalytics, color: '#34a853' },
  AI: { Icon: SiOpenai, color: '#10a37f' },
  Cloud: { Icon: FaCloud, color: '#38bdf8' },
  GitHub: { Icon: SiGithub, color: '#ffffff' },
  Vercel: { Icon: SiVercel, color: '#ffffff' },
  Firebase: { Icon: SiFirebase, color: '#ffca28' },
  'React Native': { Icon: SiReact, color: '#61dafb' },
  'Play Store': { Icon: SiAndroid, color: '#3ddc84' },
  'Adobe XD': { Icon: SiFigma, color: '#ff61f6' },
  Prototyping: { Icon: SiFigma, color: '#0acf83' },
  'Design Systems': { Icon: FaPalette, color: '#a855f7' },
  'Payment Gateway': { Icon: SiRazorpay, color: '#2b84ea' },
  Razorpay: { Icon: SiRazorpay, color: '#2b84ea' },
  Inventory: { Icon: FaTools, color: '#0ea5a4' },
  'Meta Ads': { Icon: SiMeta, color: '#0668e1' },
  'Google Analytics': { Icon: SiGoogleanalytics, color: '#f9ab00' },
  CRM: { Icon: FaChartLine, color: '#10b981' },
  Canva: { Icon: SiCanva, color: '#00c4cc' },
  'Content Calendar': { Icon: FaPenNib, color: '#f97316' },
  'Email Marketing': { Icon: FaPenNib, color: '#06b6d4' },
  'Google Search Console': { Icon: SiGooglesearchconsole, color: '#458cf5' },
  'Keyword Research': { Icon: FaSearch, color: '#22c55e' },
  'Technical SEO': { Icon: FaTools, color: '#38bdf8' },
  Photoshop: { Icon: FaPalette, color: '#31a8ff' },
  Illustrator: { Icon: FaPalette, color: '#ff9a00' },
  'After Effects': { Icon: FaVideo, color: '#9999ff' },
  'Premiere Pro': { Icon: FaVideo, color: '#ea77ff' },
  'Motion Graphics': { Icon: FaVideo, color: '#ec4899' },
  'Brand Strategy': { Icon: FaPenNib, color: '#a855f7' },
  Typography: { Icon: FaPenNib, color: '#f97316' },
  'Color Systems': { Icon: FaPalette, color: '#22d3ee' },
  'A/B Testing': { Icon: FaChartLine, color: '#10b981' },
  Zapier: { Icon: SiZapier, color: '#ff4f00' },
  Workflow: { Icon: FaTools, color: '#0ea5a4' },
  'Looker Studio': { Icon: SiLooker, color: '#4285f4' },
  Dashboards: { Icon: FaChartLine, color: '#f59e0b' },
  OpenAI: { Icon: SiOpenai, color: '#10a37f' },
  Chatbots: { Icon: SiOpenai, color: '#10a37f' },
  'Prompt Design': { Icon: FaPenNib, color: '#a855f7' },
  Hosting: { Icon: FaCloud, color: '#38bdf8' },
  Security: { Icon: FaShieldAlt, color: '#22c55e' },
}

const EXTRA_TECH_BY_SERVICE = {
  1: ['GitHub', 'Vercel', 'WordPress'],
  2: ['Firebase', 'React Native', 'Play Store'],
  3: ['Adobe XD', 'Prototyping', 'Design Systems'],
  4: ['Payment Gateway', 'Razorpay', 'Inventory'],
  5: ['Meta Ads', 'Google Analytics', 'CRM'],
  6: ['LinkedIn', 'Meta Ads', 'Canva'],
  7: ['Google Analytics', 'Landing Pages', 'Conversion Tracking'],
  8: ['WordPress', 'Content Calendar', 'Email Marketing'],
  9: ['Google Search Console', 'Keyword Research', 'Technical SEO'],
  10: ['Photoshop', 'Illustrator', 'Canva'],
  11: ['After Effects', 'Premiere Pro', 'Motion Graphics'],
  12: ['Brand Strategy', 'Typography', 'Color Systems'],
  13: ['Meta Ads', 'Google Ads', 'A/B Testing'],
  14: ['Zapier', 'CRM', 'Workflow'],
  15: ['Google Analytics', 'Looker Studio', 'Dashboards'],
  16: ['OpenAI', 'Chatbots', 'Prompt Design'],
  17: ['AWS', 'Hosting', 'Security'],
}

function getTechnologyItems(service) {
  return [...new Set([...(service.tags ?? []), ...(EXTRA_TECH_BY_SERVICE[service.id] ?? [])])]
}

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

  if (service.id === 6) return <SocialMediaPage />
  if (service.id === 8) return <ContentMarketingPage />
  if (service.id === 10) return <GraphicDesignPage />
  if (service.id === 11) return <VideoEditingPage />
  if (service.id === 12) return <BrandingPage />
  if (service.id === 13) return <AdShotsPage />

  const technologyItems = getTechnologyItems(service)

  return (
    <div className={styles.page}>
      <SEO
        title={`${service.title} | Intouch Marketing Solutions - Udupi, Karnataka`}
        description={service.desc}
        path={`/services/${service.id}`}
      />

      {/* =================== HERO =================== */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />

        <div className={styles.heroLeft}>
          <span className={styles.heroAccent}>{service.desc}</span>

          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleStatic}>Smart, Scalable &amp;<br />High&#8209;Performance</span>
            <span className={styles.heroTitleService}>{service.title}</span>
          </h1>

          <p className={styles.heroDesc}>
            We build modern, fast, and high-performance {service.title.toLowerCase()} solutions
            that drive results and help your business grow online.
          </p>

          <div className={styles.heroBtns}>
            <Link to={`/start-project?service=${service.id}`} className={styles.heroBtnPrimary}>
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
          <div className={styles.techMarquee}>
            <div className={styles.tags}>
              {[...technologyItems, ...technologyItems, ...technologyItems].map((tag, index) => {
                const meta = TECHNOLOGY_META[tag]
                const Icon = meta?.Icon ?? FaCheckCircle
                return (
                  <span
                    key={`${tag}-${index}`}
                    className={styles.techPill}
                    aria-hidden={index >= technologyItems.length ? 'true' : undefined}
                    style={{
                      '--tech-color': meta?.color ?? '#c084fc',
                      '--motion-delay': `${index * 0.12}s`,
                    }}
                  >
                    <Icon />
                    {tag}
                  </span>
                )
              })}
            </div>
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
          {PROJECTS.map(p => {
            const cardContent = (
              <>
                <div className={styles.projectThumb} style={{ '--pc': p.color }}>
                  {p.image ? (
                    <img src={p.image} alt={p.name} className={styles.projectImage} />
                  ) : (
                    <span className={styles.projectInitial}>{p.name[0]}</span>
                  )}
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
              </>
            )

            return p.url ? (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectCard}
              >
                {cardContent}
              </a>
            ) : (
              <Link
                key={p.name}
                to={`/start-project?service=${service.id}&project=${encodeURIComponent(p.name)}`}
                className={styles.projectCard}
              >
                {cardContent}
              </Link>
            )
          })}
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
