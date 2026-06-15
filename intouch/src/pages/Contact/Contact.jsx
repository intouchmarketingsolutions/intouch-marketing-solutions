import React, { useState } from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaWhatsapp } from 'react-icons/fa'
import useFadeUp from '../../hooks/useFadeUp'
import SEO from '../../components/SEO/SEO'
import styles from './Contact.module.css'
import { validateEmail, validatePhone } from '../../utils/validation'

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '917483649426'

const INFO = [
  { icon:<FaMapMarkerAlt/>, title:'Address',       content:'Udupi, Karnataka 576101, India' },
  { icon:<FaPhoneAlt/>,     title:'Phone',          content:'+91 74836 49426' },
  { icon:<FaEnvelope/>,     title:'Email',          content:'intouchmarketingsolution01@gmail.com' },
  { icon:<FaClock/>,        title:'Working Hours',  content:'Mon – Sat: 9:00 AM – 6:00 PM' },
]

export default function Contact() {
  useFadeUp()
  const [form, setForm] = useState({ name:'', phone:'', email:'', message:'' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim()) {
      setError('Please enter your name.')
      return
    }

    if (!form.phone.trim()) {
      setError('Please enter your phone number.')
      return
    }

    if (!validatePhone(form.phone)) {
      setError('Please enter a valid phone number.')
      return
    }

    if (form.email && !validateEmail(form.email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!form.message.trim()) {
      setError('Please enter a message.')
      return
    }

    const text = encodeURIComponent(
      `Hi Intouch Marketing Solutions!\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )
    setSent(true)
    setTimeout(() => window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank'), 600)
  }

  return (
    <div className="page-wrap">
      <SEO
        title="Contact Us | Intouch Marketing Solutions - Udupi, Karnataka"
        description="Get in touch with Intouch Marketing Solutions for digital marketing, SEO, web development and design services in Udupi, Karnataka. Call, email or visit us today."
        path="/contact"
      />

      <section className={styles.section}>
        <div className={styles.grid}>
          {/* Info */}
          <div className={`${styles.info} fade-up`}>
            <h3>Contact Details</h3>
            <p>Reach us through any of the channels below. We respond within 24 hours.</p>
            <div className={styles.infoList}>
              {INFO.map(it => (
                <div key={it.title} className={styles.infoItem}>
                  <div className={styles.infoIcon}>{it.icon}</div>
                  <div>
                    <h4>{it.title}</h4>
                    <p>{it.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.map}>
              <iframe
                title="Intouch Location"
                src="https://www.google.com/maps?q=Intouch+Marketing+Solutions+Udupi&output=embed"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '10px' }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Form */}
          <div className={`${styles.formWrap} fade-up d2`}>
            <h3>Send Us a Message</h3>
            <p>Your message will open directly in WhatsApp.</p>
            <div className={styles.waBadge}><FaWhatsapp /> Message opens in WhatsApp</div>

            {sent ? (
              <div className="success-box">
                <span style={{fontSize:'3rem'}}>✅</span>
                <h3>Message Sent!</h3>
                <p>Opening WhatsApp... We'll respond shortly!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div style={{
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                    color: '#f87171', borderRadius: 8, padding: '0.65rem 1rem',
                    fontSize: '0.84rem', marginBottom: '1rem',
                  }}>
                    ⚠ {error}
                  </div>
                )}
                <div className="form-group">
                  <label>Full Name *</label>
                  <input className="form-control" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone *</label>
                    <input type="tel" className="form-control" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="you@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea className="form-control" rows={5} placeholder="Tell us about your project..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required />
                </div>
                <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center',fontSize:'1rem'}}>
                  <FaWhatsapp /> Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
