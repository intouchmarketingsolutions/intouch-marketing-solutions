import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { SERVICES } from '../../data/services'
import styles from './ServiceDetail.module.css'
import useFadeUp from '../../hooks/useFadeUp'

const FEATURE_LABELS = [
  'Customised strategy built around your business goals',
  'Data-driven decision making and performance tracking',
  'Creative, modern execution that captures attention',
  'Scalable and future-ready solutions',
  'Dedicated expert support at every stage',
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

      {/* HERO */}
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${service.img})` }}
      >
        <div className={styles.overlay} />
        <div className={styles.heroContent}>
          <h1>{service.title}</h1>
          <p>{service.desc}</p>
          <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            Start Your Project →
          </Link>
        </div>
      </section>

      {/* ABOUT + IMAGE */}
      <section className={styles.container}>
        <div className={`${styles.grid} fade-up`}>
          <div className={styles.imageBox}>
            <img src={service.img} alt={service.title} />
          </div>

          <div className={styles.text}>
            <h2>About This Service</h2>
            <p>
              At <strong>Intouch Marketing Solutions</strong>, we specialise in delivering
              high-quality <strong>{service.title.toLowerCase()}</strong> services that help
              businesses grow, scale, and succeed in today's digital landscape.
            </p>
            <p>
              Our approach blends <strong>strategy, creativity, and cutting-edge technology</strong>
              to ensure your brand stands out while achieving measurable, lasting results.
            </p>
            <p>
              Whether you're a startup finding your footing or an established enterprise aiming
              to expand, we tailor every solution to your unique goals.
            </p>

            <div className={styles.features}>
              {FEATURE_LABELS.map((f, i) => (
                <div key={i} className={styles.featureItem}>{f}</div>
              ))}
            </div>
          </div>
        </div>

        {/* TAGS */}
        <div className={`${styles.tagsSection} fade-up`}>
          <h3>Technologies &amp; Expertise</h3>
          <div className={styles.tags}>
            {service.tags.map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className={`${styles.ctaBox} fade-up`} style={{ margin: '0 5% 6rem', maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div>
          <h3>Ready to grow your business?</h3>
          <p>Let's build something remarkable together — free consultation, no commitment.</p>
        </div>
        <Link to="/contact" className="btn btn-primary">
          Contact Us →
        </Link>
      </div>

    </div>
  )
}
