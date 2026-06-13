import React, { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { FaArrowRight, FaUserCircle, FaSignOutAlt, FaUser } from 'react-icons/fa'
import styles from './Navbar.module.css'
import logo from '../../assets/intouch.png'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [mega, setMega] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const megaCloseTimer = useRef(null)
  const accountRef = useRef(null)

  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const closeMenu = () => {
    setOpen(false)
    setDropdown(false)
    setMega(false)
    setAccountOpen(false)
  }

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      closeMenu()
      navigate('/')
    }
  }

  const displayName = currentUser?.displayName || currentUser?.email || 'Account'

  const openMega = () => {
    clearTimeout(megaCloseTimer.current)
    setMega(true)
  }

  const closeMega = () => {
    megaCloseTimer.current = setTimeout(() => setMega(false), 180)
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
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          >
            <span className={styles.link}>Services ▾</span>
            <div
              className={`${styles.megaMenu} ${mega ? styles.show : ''}`}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
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
                <NavLink to="/services/13" onClick={closeMenu}>Ad Shots</NavLink>
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
            <NavLink to="/contact" className={styles.link} onClick={closeMenu}>
              Contact
            </NavLink>
          </li>

        </ul>

        {/* RIGHT: AUTH + CTA + HAMBURGER */}
        <div className={styles.navRight}>
          <Link to="/contact" className={styles.ctaBtn} onClick={closeMenu}>
            Get Free Quote <FaArrowRight size={11} />
          </Link>

          {/* AUTH: desktop */}
          <div className={styles.authArea} ref={accountRef}>
            {currentUser ? (
              <>
                <button
                  className={styles.authIconBtn}
                  onClick={() => setAccountOpen((v) => !v)}
                  aria-label="Account menu"
                >
                  <FaUserCircle size={22} />
                </button>
                <div className={`${styles.accountMenu} ${accountOpen ? styles.show : ''}`}>
                  <div className={styles.accountInfo}>
                    <FaUser size={14} />
                    <span>{displayName}</span>
                  </div>
                  <Link to="/start-project" className={styles.accountItem} onClick={closeMenu}>
                    Profile / Account
                  </Link>
                  <button className={styles.accountItem} onClick={handleLogout}>
                    <FaSignOutAlt size={13} /> Logout
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className={styles.authIconBtn} aria-label="Sign in" onClick={closeMenu}>
                <FaUserCircle size={22} />
              </Link>
            )}
          </div>

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

        {/* AUTH: mobile */}
        {currentUser ? (
          <>
            <div className={styles.drawerAccount}>
              <FaUserCircle size={18} />
              <span>{displayName}</span>
            </div>
            <Link to="/start-project" className={styles.dlink} onClick={closeMenu}>Profile / Account</Link>
            <button className={`${styles.dlink} ${styles.drawerLogout}`} onClick={handleLogout}>
              <FaSignOutAlt size={13} /> Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className={styles.dlink} onClick={closeMenu}>
            <FaUserCircle size={15} /> Sign In
          </NavLink>
        )}

        <Link to="/contact" className={styles.drawerCta} onClick={closeMenu}>
          Get Free Quote <FaArrowRight size={12} />
        </Link>
      </div>

      {open && <div className={styles.backdrop} onClick={closeMenu} />}
    </>
  )
}
