import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaArrowRight } from 'react-icons/fa'
import styles from './Footer.module.css'
import logo from '../../assets/intouch.png'

export default function Footer() {
  return (
    <footer className={styles.footer}>

      {/* decorative background layers */}
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />
      <div className={styles.bgGrid} />

      <div className={styles.divider} />

      {/* ── MAIN COLUMNS ── */}
      <div className={styles.top}>

        {/* COL 1 - Brand */}
        <div className={styles.col}>
          <Link to="/" className={styles.logoLink}>
            <img src={logo} alt="Intouch Logo" className={styles.logoImg} />
          </Link>
          <p className={styles.desc}>
            Full-service digital marketing agency delivering results-driven
            strategies for brands that want real, measurable growth.
          </p>

          <ul className={styles.tagList}>
            <li>Strategic Planning</li>
            <li>Market Research</li>
            <li>Brand Consulting</li>
            <li>Performance Analytics</li>
          </ul>

          <div className={styles.social}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className={styles.socialFb}><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className={styles.socialIg}><FaInstagram /></a>
            <a href="https://wa.me/917483649426" target="_blank" rel="noreferrer" aria-label="WhatsApp" className={styles.socialWa}><FaWhatsapp /></a>
          </div>
        </div>

        {/* COL 2 - Company */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Company</h4>
          <ul className={styles.navList}>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/clients">Our Clients</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/career">Career</Link></li>
          </ul>
        </div>

        {/* COL 3 - Services */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Services</h4>
          <ul className={styles.navList}>
            <li><Link to="/services/10">Graphic Design</Link></li>
            <li><Link to="/services/1">Web Development</Link></li>
            <li><Link to="/services/13">Ad Shots</Link></li>
            <li><Link to="/services/5">Digital Marketing</Link></li>
            <li><Link to="/services/9">SEO Optimisation</Link></li>
            <li><Link to="/services/11">Video Editing</Link></li>
          </ul>
        </div>

        {/* COL 4 - Contact */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Contact</h4>
          <ul className={styles.contactList}>
            <li>
              <span className={styles.ciWrap}><FaMapMarkerAlt /></span>
              <span>Udupi, Karnataka 576101, India</span>
            </li>
            <li>
              <span className={styles.ciWrap}><FaPhoneAlt /></span>
              <a href="tel:+917483649426">+91 74836 49426</a>
            </li>
            <li>
              <span className={styles.ciWrap}><FaEnvelope /></span>
              <a href="mailto:intouchmarketingsolution01@gmail.com">intouchmarketingsolution01@gmail.com</a>
            </li>
          </ul>
          <div className={styles.map}>
            <iframe
              title="Intouch Location"
              src="https://www.google.com/maps?q=Intouch+Marketing+Solutions+Udupi&output=embed"
              width="100%"
              height="155"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>

      </div>

      {/* ── BOTTOM BAR ── */}
      <div className={styles.bottom}>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} <span>Intouch Marketing Solutions</span>. All Rights Reserved.
        </p>
        <div className={styles.bottomLinks}>
          <Link to="/about">Privacy Policy</Link>
          <span className={styles.sep} />
          <Link to="/about">Terms of Use</Link>
        </div>
      </div>

    </footer>
  )
}
