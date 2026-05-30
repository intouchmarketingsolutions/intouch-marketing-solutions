import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaArrowRight, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaRupeeSign, FaUserTie, FaWhatsapp } from 'react-icons/fa'
import { SERVICES } from '../../data/services'
import useFadeUp from '../../hooks/useFadeUp'
import styles from './StartProject.module.css'

const WA_NUMBER = '917483649426'
const EMAIL_TO = 'intouchmarketingsolution01@gmail.com'

const BLANK = {
  projectName: '',
  ownerName: '',
  mobile: '',
  address: '',
  category: '',
  description: '',
  requirements: '',
  price: '',
}

function buildMessage(form) {
  return [
    'New Project Inquiry',
    '',
    `Project Name: ${form.projectName}`,
    `Owner Name: ${form.ownerName}`,
    `Mobile Number: ${form.mobile}`,
    `Address: ${form.address}`,
    `Project Category: ${form.category}`,
    `Fixed Price / Budget: ${form.price}`,
    '',
    'Project Description:',
    form.description,
    '',
    'Requirements:',
    form.requirements,
  ].join('\n')
}

export default function StartProject() {
  useFadeUp()
  const [searchParams] = useSearchParams()
  const serviceId = Number(searchParams.get('service'))
  const projectName = searchParams.get('project') ?? ''
  const selectedService = SERVICES.find(service => service.id === serviceId)

  const initialForm = useMemo(() => ({
    ...BLANK,
    projectName,
    category: selectedService?.title ?? '',
  }), [projectName, selectedService])

  const [form, setForm] = useState(initialForm)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const set = (key, value) => setForm(current => ({ ...current, [key]: value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    const required = ['projectName', 'ownerName', 'mobile', 'address', 'category', 'description', 'requirements', 'price']
    if (required.some(key => !String(form[key]).trim())) {
      setError('Please fill in all project details before submitting.')
      return
    }

    const message = buildMessage(form)
    const subject = `Project Inquiry - ${form.projectName}`
    const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL_TO)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`

    setSent(true)
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    setTimeout(() => window.open(gmailUrl, '_blank', 'noopener,noreferrer'), 350)
  }

  return (
    <div className="page-wrap">
      <section className={styles.page}>
        <div className={`${styles.intro} fade-up`}>
          <span className="tag">Start Your Project</span>
          <h1>Tell Us What You Want To Build</h1>
          <p>
            Share the project details once. We will receive the inquiry through WhatsApp
            and Gmail so the team can respond quickly.
          </p>

          <div className={styles.infoGrid}>
            <div>
              <FaWhatsapp />
              <span>WhatsApp inquiry</span>
            </div>
            <div>
              <FaEnvelope />
              <span>Gmail draft</span>
            </div>
            <div>
              <FaUserTie />
              <span>Owner details</span>
            </div>
          </div>
        </div>

        <div className={`${styles.formCard} fade-up d2`}>
          {sent ? (
            <div className="success-box">
              <span style={{ fontSize: '3rem' }}>Done</span>
              <h3>Project Inquiry Ready</h3>
              <p>WhatsApp and Gmail should open with your project details filled in.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div className={styles.error}>{error}</div>}

              <div className="form-row">
                <div className="form-group">
                  <label>Project Name *</label>
                  <input
                    className="form-control"
                    value={form.projectName}
                    onChange={event => set('projectName', event.target.value)}
                    placeholder="e.g. Restaurant website"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Owner Name *</label>
                  <input
                    className="form-control"
                    value={form.ownerName}
                    onChange={event => set('ownerName', event.target.value)}
                    placeholder="Business owner name"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Mobile Number *</label>
                  <div className={styles.inputIcon}>
                    <FaPhoneAlt />
                    <input
                      className="form-control"
                      type="tel"
                      value={form.mobile}
                      onChange={event => set('mobile', event.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Fixed Price / Budget *</label>
                  <div className={styles.inputIcon}>
                    <FaRupeeSign />
                    <input
                      className="form-control"
                      value={form.price}
                      onChange={event => set('price', event.target.value)}
                      placeholder="e.g. 25000 or 25k-50k"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Address *</label>
                <div className={styles.inputIcon}>
                  <FaMapMarkerAlt />
                  <input
                    className="form-control"
                    value={form.address}
                    onChange={event => set('address', event.target.value)}
                    placeholder="Business address / location"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Project Category *</label>
                <select
                  className="form-control"
                  value={form.category}
                  onChange={event => set('category', event.target.value)}
                  required
                >
                  <option value="">Select project type</option>
                  {SERVICES.map(service => (
                    <option key={service.id} value={service.title}>{service.title}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Project Description *</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={form.description}
                  onChange={event => set('description', event.target.value)}
                  placeholder="Describe your business and project idea..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Requirements *</label>
                <textarea
                  className="form-control"
                  rows={5}
                  value={form.requirements}
                  onChange={event => set('requirements', event.target.value)}
                  placeholder="List pages, features, design needs, deadlines, integrations, etc."
                  required
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Submit Project <FaArrowRight size={13} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
