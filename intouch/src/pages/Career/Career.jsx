import React, { useState, useRef, useEffect } from 'react'
import { FaMapMarkerAlt, FaBriefcase, FaCloudUploadAlt } from 'react-icons/fa'
import useFadeUp from '../../hooks/useFadeUp'
import styles from './Career.module.css'

import { supabase } from '../../admin/supabase/client'

const PERKS = [
  { icon:'🚀', title:'Fast Growth',      desc:'Rapid career advancement in a high-growth agency environment.' },
  { icon:'💰', title:'Competitive Pay',  desc:'Industry-leading salaries and performance bonuses.' },
  { icon:'🎓', title:'Learning Culture', desc:'Courses, certifications, and mentorship fully funded.' },
  { icon:'🏠', title:'Flexible Work',    desc:'Hybrid options and flexible schedules that fit your life.' },
]

const BLANK = { name: '', email: '', phone: '', experience: '', message: '' }

export default function Career() {
  const formRef  = useRef(null)
  const fileRef  = useRef(null)

  const [jobs,        setJobs]        = useState([])
  const [jobsLoading, setJobsLoading] = useState(true)

  useFadeUp(jobs)
  const [position,    setPosition]    = useState('')
  const [resumeFile,  setResumeFile]  = useState(null)
  const [fileName,    setFileName]    = useState('')
  const [submitted,   setSubmitted]   = useState(false)
  const [submitting,  setSubmitting]  = useState(false)
  const [progress,    setProgress]    = useState(0)
  const [error,       setError]       = useState('')
  const [form,        setForm]        = useState(BLANK)

  useEffect(() => {
    const SUPABASE_URL = 'https://egmtwupmzeqijntbkknq.supabase.co'
    const ANON_KEY     = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnbXR3dXBtemVxaWpudGJra25xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNTQzNjQsImV4cCI6MjA5NDgzMDM2NH0.aLknX6AsNhZarcG109DLF8v0skAzYWWJuJdMBraBA1k'

    async function loadJobs() {
      try {
        const res  = await fetch(`${SUPABASE_URL}/rest/v1/jobs?select=*&order=created_at.desc`, {
          headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
        })
        const data = await res.json()
        if (Array.isArray(data)) setJobs(data)
      } catch {}
      finally { setJobsLoading(false) }
    }
    loadJobs()
  }, [])

  const handleApply = (title) => {
    setPosition(title)
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setResumeFile(file)
    setFileName(file.name)
  }

  const uploadResume = async (file) => {
    const ext  = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`
    setProgress(10)
    const { error } = await supabase.storage.from('resumes').upload(path, file, { upsert: false })
    if (error) throw error
    setProgress(90)
    const { data: { publicUrl } } = supabase.storage.from('resumes').getPublicUrl(path)
    setProgress(100)
    return { url: publicUrl, path }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !position) {
      setError('Please fill in all required fields and select a position.')
      return
    }
    setSubmitting(true)
    try {
      let resume_url = null, resume_path = null
      if (resumeFile) {
        const result = await uploadResume(resumeFile)
        resume_url  = result.url
        resume_path = result.path
      }
      const { error } = await supabase.from('applications').insert({
        name:        form.name,
        email:       form.email,
        phone:       form.phone,
        experience:  form.experience,
        message:     form.message,
        position,
        resume_url,
        resume_path,
      })
      if (error) throw error
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
      setProgress(0)
    }
  }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="page-wrap">
    

      <section className={styles.perks}>
        <div className="center">
          <h2 className="heading fade-up">Why Work <span>With Us?</span></h2>
        </div>
        <div className={styles.perksGrid}>
          {PERKS.map((p, i) => (
            <div key={p.title} className={`${styles.perk} fade-up`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className={styles.perkIcon}>{p.icon}</span>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.jobs}>
        <div className="center">

          <h2 className="heading fade-up">Current <span>Job Openings</span></h2>
        </div>
        {jobsLoading ? (
          <p style={{ textAlign: 'center', color: 'var(--text2)', padding: '2rem' }}>
            Loading positions…
          </p>
        ) : jobs.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '3rem 1rem',
            background: 'rgba(255,255,255,0.03)',
            border: '1px dashed rgba(255,255,255,0.12)',
            borderRadius: '16px', maxWidth: 480, margin: '0 auto',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>No Open Positions Found</h3>
            <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
              We don't have any openings right now, but we're always growing.<br />
              Send your CV to <a href="mailto:intouchmarketingsolution01@gmail.com" style={{ color: 'var(--primary)' }}>intouchmarketingsolution01@gmail.com</a>
            </p>
          </div>
        ) : (
          <div className={styles.jobsGrid}>
            {jobs.map((j, i) => (
              <div key={j.id ?? j.title} className={`${styles.jobCard} fade-up`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={styles.jobTop}>
                  <h3>{j.title}</h3>
                  <span className={styles.badge}>{j.type}</span>
                </div>
                <div className={styles.jobMeta}>
                  <span><FaMapMarkerAlt /> {j.location}</span>
                  <span><FaBriefcase /> {j.experience}</span>
                </div>
                <p className={styles.jobDesc}>{j.description ?? j.desc}</p>
                {j.salary && (
                  <p style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600, margin: '0.4rem 0' }}>
                        {j.salary}
                  </p>
                )}
                <button className="btn btn-primary" onClick={() => handleApply(j.title)}>
                  Apply Now →
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={styles.apply} ref={formRef}>
        <div className="center">
          <span className="tag fade-up">Apply Now</span>
          <h2 className="heading fade-up">Send Your <span>Application</span></h2>
        </div>

        <div className={`${styles.formWrap} fade-up`}>
          {submitted ? (
            <div className="success-box">
              <span style={{ fontSize: '3rem' }}>✅</span>
              <h3>Application Submitted!</h3>
              <p>Thank you, {form.name}! We'll review your application and respond within 3 business days.</p>
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

              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input className="form-control" placeholder="Your full name"
                    value={form.name} onChange={e => set('name', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" className="form-control" placeholder="you@email.com"
                    value={form.email} onChange={e => set('email', e.target.value)} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" className="form-control" placeholder="+91 XXXXX XXXXX"
                    value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Position Applied For *</label>
                  <select className="form-control" value={position}
                    onChange={e => setPosition(e.target.value)} required>
                    <option value="">Select a position</option>
                    {jobs.map(j => <option key={j.id ?? j.title} value={j.title}>{j.title}</option>)}
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Years of Experience</label>
                <input className="form-control" placeholder="e.g. 2 years, Fresher"
                  value={form.experience} onChange={e => set('experience', e.target.value)} />
              </div>

              <div className="form-group">
                <label>Upload Resume (PDF)</label>
                <label className={styles.fileLabel} htmlFor="resume">
                  <FaCloudUploadAlt />
                  <span>{fileName || 'Click to upload resume (PDF, DOC)'}</span>
                </label>
                <input id="resume" type="file" accept=".pdf,.doc,.docx"
                  ref={fileRef} style={{ display: 'none' }} onChange={handleFile} />
                {submitting && resumeFile && (
                  <div style={{ marginTop: 6 }}>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text2)', marginBottom: 4 }}>
                      Uploading… {progress}%
                    </div>
                    <div style={{ height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${progress}%`, borderRadius: 4,
                        background: 'var(--primary)', transition: 'width 0.2s',
                      }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Cover Message</label>
                <textarea className="form-control" rows={4}
                  placeholder="Tell us why you'd be a great fit..."
                  value={form.message} onChange={e => set('message', e.target.value)} />
              </div>

              <button type="submit" className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={submitting}>
                {submitting ? '⏳ Submitting...' : '📨 Submit Application'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
