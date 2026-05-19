import React, { useState, useRef, useEffect } from 'react'
import { FaCommentDots, FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa'
import styles from './ChatBot.module.css'

const BOT = {
  service:  'We offer Web Development, Graphic Design, Social Media Marketing, SEO, Video Editing, Ads, Content Writing & Ads Shoots. Which interests you? 🚀',
  price:    'Our pricing is tailored to your scope and budget. Contact us for a free consultation and quote!',
  contact:  '📞 +91 98765 43210\n📧 hello@intouchmarketing.in\n📍 Udupi, Karnataka\n🕒 Mon–Sat, 9AM–6PM',
  seo:      'Our SEO covers technical audits, on-page optimisation, link building and monthly reporting.',
  social:   'We manage Instagram, Facebook, LinkedIn & more — content creation, scheduling, and paid campaigns.',
  web:      'We build custom websites with React, WordPress & Shopify — fast, responsive, conversion-optimised.',
  design:   'Our team handles brand identity, social creatives, print materials, and more.',
  video:    'We produce & edit reels, YouTube videos, ads, and brand films with cinematic quality.',
  career:   'We\'re hiring! Visit our Career page for roles in Social Media, Design, Development & Video Editing.',
  hello:    'Hello! 👋 Welcome to Intouch Marketing Solutions. How can I help you today?',
  hi:       'Hi there! 😊 Ask me about our services, pricing, or career opportunities!',
  thanks:   'You\'re welcome! Feel free to ask anything else. 😊',
  default:  'Great question! Our team would love to help. Reach us at hello@intouchmarketing.in or call +91 98765 43210.',
}
const QUICK = ['Our Services', 'Pricing', 'Contact Info', 'Career']

function reply(text) {
  const t = text.toLowerCase()
  for (const [k, v] of Object.entries(BOT)) {
    if (k !== 'default' && t.includes(k)) return v
  }
  return BOT.default
}

export default function ChatBot() {
  const [open, setOpen]     = useState(false)
  const [msgs, setMsgs]     = useState([])
  const [input, setInput]   = useState('')
  const [typing, setTyping] = useState(false)
  const [quick, setQuick]   = useState(true)
  const endRef              = useRef(null)

  useEffect(() => {
    if (open && msgs.length === 0) setTimeout(() => addBot('Hi! 👋 Welcome to Intouch Marketing Solutions! How can I help you today?'), 400)
  }, [open])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, typing])

  const addBot = (text) => {
    setTyping(true)
    setTimeout(() => { setTyping(false); setMsgs(p => [...p, { from:'bot', text }]) }, 900)
  }

  const send = (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput(''); setQuick(false)
    setMsgs(p => [...p, { from:'user', text: msg }])
    setTimeout(() => addBot(reply(msg)), 150)
  }

  return (
    <>
      <button className={`${styles.fab} ${open ? styles.fabOpen : ''}`} onClick={() => setOpen(v => !v)} aria-label="Chat">
        {open ? <FaTimes /> : <FaCommentDots />}
        {!open && <span className={styles.pulse} />}
      </button>

      <div className={`${styles.win} ${open ? styles.winOpen : ''}`}>
        <div className={styles.hdr}>
          <div className={styles.avatar}><FaRobot /></div>
          <div className={styles.hdrInfo}>
            <h4>Intouch Assistant</h4>
            <span><em className={styles.dot} />Online now</span>
          </div>
          <button className={styles.close} onClick={() => setOpen(false)}><FaTimes /></button>
        </div>

        <div className={styles.msgs}>
          {msgs.map((m, i) => (
            <div key={i} className={`${styles.msg} ${m.from === 'bot' ? styles.bot : styles.user}`}>
              {m.text.split('\n').map((l, j) => <span key={j}>{l}<br /></span>)}
            </div>
          ))}
          {typing && <div className={styles.typing}><span /><span /><span /></div>}
          <div ref={endRef} />
        </div>

        {quick && msgs.length > 0 && (
          <div className={styles.quick}>
            {QUICK.map(q => <button key={q} className={styles.qbtn} onClick={() => send(q)}>{q}</button>)}
          </div>
        )}

        <div className={styles.inputRow}>
          <input className={styles.inp} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type a message..." />
          <button className={styles.send} onClick={() => send()}><FaPaperPlane /></button>
        </div>
      </div>
    </>
  )
}
