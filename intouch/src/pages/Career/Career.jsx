import React, { useState, useRef } from 'react'
import { FaMapMarkerAlt, FaBriefcase, FaCloudUploadAlt } from 'react-icons/fa'
import useFadeUp from '../../hooks/useFadeUp'
import { JOBS } from '../../data/jobs'
import styles from './Career.module.css'

const PERKS = [
  { icon:'🚀', title:'Fast Growth',        desc:'Rapid career advancement in a high-growth agency environment.' },
  { icon:'💰', title:'Competitive Pay',    desc:'Industry-leading salaries and performance bonuses.' },
  { icon:'🎓', title:'Learning Culture',   desc:'Courses, certifications, and mentorship fully funded.' },
  { icon:'🏠', title:'Flexible Work',      desc:'Hybrid options and flexible schedules that fit your life.' },
]

export default function Career() {
  useFadeUp()
  const formRef = useRef(null)
  const [position, setPosition] = useState('')
  const [fileName, setFileName]  = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' })

  const handleApply = (title) => {
    setPosition(title)
    formRef.current?.scrollIntoView({ behavior:'smooth', block:'start' })
  }

  const handleFile = (e) => {
    setFileName(e.target.files[0]?.name || '')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !position) {
      alert('Please fill in all required fields.')
      return
    }
    setSubmitted(true)
  }

  return (
    <div className="page-wrap">
      <div className="page-hero">
        <span className="tag fade-up">Join Our Team</span>
        <h1 className="heading fade-up">Build Your Career <span>With Us</span></h1>
        <p className="sub fade-up">We're always looking for talented, passionate people to join the Intouch family.</p>
      </div>

      {/* Perks */}
      <section className={styles.perks}>
        <div className="center">
          <h2 className="heading fade-up">Why Work <span>With Us?</span></h2>
        </div>
        <div className={styles.perksGrid}>
          {PERKS.map((p, i) => (
            <div key={p.title} className={`${styles.perk} fade-up`} style={{transitionDelay:`${i*0.1}s`}}>
              <span className={styles.perkIcon}>{p.icon}</span>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Jobs */}
      <section className={styles.jobs}>
        <div className="center">
          <span className="tag fade-up">Open Positions</span>
          <h2 className="heading fade-up">Current <span>Job Openings</span></h2>
        </div>
        <div className={styles.jobsGrid}>
          {JOBS.map((j, i) => (
            <div key={j.title} className={`${styles.jobCard} fade-up`} style={{transitionDelay:`${i*0.1}s`}}>
              <div className={styles.jobTop}>
                <h3>{j.title}</h3>
                <span className={styles.badge}>{j.type}</span>
              </div>
              <div className={styles.jobMeta}>
                <span><FaMapMarkerAlt /> {j.location}</span>
                <span><FaBriefcase /> {j.experience}</span>
              </div>
              <p className={styles.jobDesc}>{j.desc}</p>
              <button className="btn btn-primary" onClick={() => handleApply(j.title)}>Apply Now →</button>
            </div>
          ))}
        </div>
      </section>

      {/* Apply Form */}
      <section className={styles.apply} ref={formRef}>
        <div className="center">
          <span className="tag fade-up">Apply Now</span>
          <h2 className="heading fade-up">Send Your <span>Application</span></h2>
        </div>
        <div className={`${styles.formWrap} fade-up`}>
          {submitted ? (
            <div className="success-box">
              <span style={{fontSize:'3rem'}}>✅</span>
              <h3>Application Submitted!</h3>
              <p>Thank you! We'll review your application and get back to you within 3 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input className="form-control" placeholder="Your full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" className="form-control" placeholder="you@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" className="form-control" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Position Applied For *</label>
                  <select className="form-control" value={position} onChange={e=>setPosition(e.target.value)} required>
                    <option value="">Select a position</option>
                    {JOBS.map(j => <option key={j.title}>{j.title}</option>)}
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Upload Resume</label>
                <label className={styles.fileLabel} htmlFor="resume">
                  <FaCloudUploadAlt />
                  <span>{fileName || 'Click to upload resume (PDF, DOC)'}</span>
                </label>
                <input id="resume" type="file" accept=".pdf,.doc,.docx" style={{display:'none'}} onChange={handleFile} />
              </div>
              <div className="form-group">
                <label>Cover Message</label>
                <textarea className="form-control" rows={4} placeholder="Tell us why you'd be a great fit..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
              </div>
              <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>
                📨 Submit Application
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
