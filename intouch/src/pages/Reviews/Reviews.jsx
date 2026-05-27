// Reviews.jsx

import React from 'react'
import { FaStar } from 'react-icons/fa'
import useFadeUp from '../../hooks/useFadeUp'
import { REVIEWS } from '../../data/reviews'
import styles from './Reviews.module.css'

function Card({ name, role, initials, text, stars }) {
  return (
    <div className={styles.card}>
      
      {/* Glow Effect */}
      <div className={styles.cardGlow}></div>

      {/* Header */}
      <div className={styles.hdr}>
        <div className={styles.avatar}>{initials}</div>

        <div>
          <h4 className={styles.name}>{name}</h4>
          <span className={styles.role}>{role}</span>
        </div>
      </div>

      {/* Stars */}
      <div className={styles.stars}>
        {Array.from({ length: stars }).map((_, i) => (
          <FaStar key={`${name}-${i}`} />
        ))}
      </div>

      {/* Review */}
      <p className={styles.text}>
        "{text}"
      </p>
    </div>
  )
}

function Track({ items, reverse }) {
  const doubled = [...items, ...items]

  return (
    <div className={styles.trackWrap}>
      <div
        className={`${styles.track} ${
          reverse ? styles.reverse : ''
        }`}
      >
        {doubled.map((r, i) => (
          <Card key={`${r.name}-${i}`} {...r} />
        ))}
      </div>
    </div>
  )
}

export default function Reviews() {
  useFadeUp()

  const half1 = REVIEWS.slice(0, 5)
  const half2 = REVIEWS.slice(5)

  return (
    <div className="page-wrap">

      {/* Hero */}
      <div className="page-hero">
        <h1 className="heading fade-up">
          Our <span>Clients Say</span>
        </h1>

        <p className="sub fade-up">
          Real feedback from real clients who've experienced
          the Intouch difference.
        </p>
      </div>

      {/* Reviews */}
      <section className={styles.section}>
        <Track items={half1} />
        <Track items={half2} reverse />
      </section>

    </div>
  )
}