import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import styles from './Navbar.module.css'
import logo from '../../assets/intouch.png'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [mega, setMega] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => {
    setOpen(false)
    setDropdown(false)
    setMega(false)
  }

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>

        {/* LOGO */}
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img src={logo} alt="Intouch Logo" />
        </Link>

        {/* NAV LINKS */}
        <ul className={styles.links}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>

          {/* COMPANY DROPDOWN */}
          <li
            className={styles.dropdown}
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <span className={styles.link}>Company ▾</span>
            <ul className={`${styles.dropdownMenu} ${dropdown ? styles.show : ''}`}>
              <li>
                <NavLink to="/about" className={styles.dropdownItem} onClick={closeMenu}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/clients" className={styles.dropdownItem} onClick={closeMenu}>
                  Our Clients
                </NavLink>
              </li>
            </ul>
          </li>

          {/* MEGA MENU */}
          <li
            className={styles.mega}
            onMouseEnter={() => setMega(true)}
            onMouseLeave={() => setMega(false)}
          >
            <span className={styles.link}>Services ▾</span>
            <div className={`${styles.megaMenu} ${mega ? styles.show : ''}`}>
              <div className={styles.megaCol}>
                <h4>Web Solutions</h4>
                <NavLink to="/services/1" onClick={closeMenu}>Website Development</NavLink>
                <NavLink to="/services/2" onClick={closeMenu}>App Development</NavLink>
                <NavLink to="/services/3" onClick={closeMenu}>UI/UX Design</NavLink>
                <NavLink to="/services/4" onClick={closeMenu}>E-commerce</NavLink>
              </div>
              <div className={styles.megaCol}>
                <h4>Marketing</h4>
                <NavLink to="/services/9" onClick={closeMenu}>SEO Optimization</NavLink>
                <NavLink to="/services/6" onClick={closeMenu}>Social Media</NavLink>
                <NavLink to="/services/7" onClick={closeMenu}>Google Ads</NavLink>
                <NavLink to="/services/8" onClick={closeMenu}>Content Marketing</NavLink>
              </div>
              <div className={styles.megaCol}>
                <h4>Creative</h4>
                <NavLink to="/services/10" onClick={closeMenu}>Graphic Design</NavLink>
                <NavLink to="/services/11" onClick={closeMenu}>Video Editing</NavLink>
                <NavLink to="/services/12" onClick={closeMenu}>Branding</NavLink>
                <NavLink to="/services/13" onClick={closeMenu}>Ad shots</NavLink>
              </div>
              <div className={styles.megaCol}>
                <h4>Technology</h4>
                <NavLink to="/services/14" onClick={closeMenu}>Automation</NavLink>
                <NavLink to="/services/15" onClick={closeMenu}>Analytics</NavLink>
                <NavLink to="/services/16" onClick={closeMenu}>AI Integration</NavLink>
                <NavLink to="/services/17" onClick={closeMenu}>Cloud Services</NavLink>
              </div>
            </div>
          </li>

          <li>
            <NavLink to="/reviews" className={styles.link} onClick={closeMenu}>
              Reviews
            </NavLink>
          </li>

        </ul>

        {/* RIGHT: CTA + HAMBURGER */}
        <div className={styles.navRight}>
          <Link to="/contact" className={styles.ctaBtn} onClick={closeMenu}>
            Get Free Quote <FaArrowRight size={11} />
          </Link>
          <button
            className={`${styles.ham} ${open ? styles.hamOpen : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        <NavLink to="/" className={styles.dlink} onClick={closeMenu}>Home</NavLink>
        <NavLink to="/about" className={styles.dlink} onClick={closeMenu}>About</NavLink>
        <NavLink to="/services" className={styles.dlink} onClick={closeMenu}>Services</NavLink>
        <NavLink to="/reviews" className={styles.dlink} onClick={closeMenu}>Reviews</NavLink>
        <NavLink to="/clients" className={styles.dlink} onClick={closeMenu}>Clients</NavLink>
        <Link to="/contact" className={styles.drawerCta} onClick={closeMenu}>
          Get Free Quote <FaArrowRight size={12} />
        </Link>
      </div>

      {open && <div className={styles.backdrop} onClick={closeMenu} />}
    </>
  )
}
