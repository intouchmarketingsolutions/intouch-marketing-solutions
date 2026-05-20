import React, { useEffect, useState } from 'react'
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, orderBy, query,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import AdminLayout from '../components/AdminLayout'

const BLANK = {
  title: '', type: 'Full-Time', location: 'Udupi, Karnataka',
  experience: '', salary: '', description: '', requirements: '',
}

export default function AdminJobs() {
  const [jobs,    setJobs]    = useState([])
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [modal,   setModal]   = useState(false)
  const [confirm, setConfirm] = useState(null) // id to delete
  const [editing, setEditing] = useState(null) // job doc id
  const [form,    setForm]    = useState(BLANK)

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const snap = await getDocs(query(collection(db, 'jobs'), orderBy('createdAt', 'desc')))
      setJobs(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchJobs() }, [])

  const openAdd = () => {
    setEditing(null)
    setForm(BLANK)
    setModal(true)
  }

  const openEdit = (job) => {
    setEditing(job.id)
    setForm({
      title: job.title, type: job.type, location: job.location,
      experience: job.experience, salary: job.salary ?? '',
      description: job.description, requirements: job.requirements ?? '',
    })
    setModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) return
    setSaving(true)
    try {
      if (editing) {
        await updateDoc(doc(db, 'jobs', editing), { ...form, updatedAt: serverTimestamp() })
      } else {
        await addDoc(collection(db, 'jobs'), { ...form, createdAt: serverTimestamp() })
      }
      setModal(false)
      fetchJobs()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm) return
    try {
      await deleteDoc(doc(db, 'jobs', confirm))
      setConfirm(null)
      fetchJobs()
    } catch (err) {
      console.error(err)
    }
  }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const TYPE_COLORS = {
    'Full-Time': 'a-badge-teal',
    'Part-Time': 'a-badge-indigo',
    'Internship': 'a-badge-purple',
    'Freelance':  'a-badge-yellow',
  }

  return (
    <AdminLayout page="jobs">

      <div className="a-section-header">
        <h3 className="a-section-title">All Job Listings ({jobs.length})</h3>
        <button className="a-btn a-btn-primary" onClick={openAdd}>+ Add Job</button>
      </div>

      {loading ? (
        <div className="a-spinner" />
      ) : jobs.length === 0 ? (
        <div className="a-empty">
          <div className="a-empty-icon">💼</div>
          <h3>No jobs yet</h3>
          <p>Click "Add Job" to create your first listing.</p>
        </div>
      ) : (
        <div className="a-table-wrap">
          <table className="a-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Location</th>
                <th>Experience</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id}>
                  <td style={{ fontWeight: 600 }}>{job.title}</td>
                  <td>
                    <span className={`a-badge ${TYPE_COLORS[job.type] ?? 'a-badge-indigo'}`}>
                      {job.type}
                    </span>
                  </td>
                  <td style={{ color: 'var(--a-text2)' }}>{job.location}</td>
                  <td style={{ color: 'var(--a-text2)' }}>{job.experience}</td>
                  <td style={{ color: 'var(--a-text2)' }}>{job.salary || '—'}</td>
                  <td>
                    <div className="actions">
                      <button className="a-btn a-btn-ghost a-btn-sm" onClick={() => openEdit(job)}>
                        ✏️ Edit
                      </button>
                      <button className="a-btn a-btn-danger a-btn-sm" onClick={() => setConfirm(job.id)}>
                        🗑 Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      {modal && (
        <div className="a-modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="a-modal a-modal-lg">
            <div className="a-modal-header">
              <span className="a-modal-title">{editing ? '✏️ Edit Job' : '+ Add New Job'}</span>
              <button className="a-modal-close" onClick={() => setModal(false)}>×</button>
            </div>

            <form onSubmit={handleSave}>
              <div className="a-modal-body">
                <div className="a-form-row">
                  <div className="a-form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Job Title *</label>
                    <input className="a-input" placeholder="e.g. Social Media Manager" value={form.title}
                      onChange={e => set('title', e.target.value)} required />
                  </div>
                </div>

                <div className="a-form-row">
                  <div className="a-form-group">
                    <label>Job Type</label>
                    <select className="a-select" value={form.type} onChange={e => set('type', e.target.value)}>
                      <option>Full-Time</option>
                      <option>Part-Time</option>
                      <option>Internship</option>
                      <option>Freelance</option>
                    </select>
                  </div>
                  <div className="a-form-group">
                    <label>Location</label>
                    <input className="a-input" placeholder="City, State" value={form.location}
                      onChange={e => set('location', e.target.value)} />
                  </div>
                </div>

                <div className="a-form-row">
                  <div className="a-form-group">
                    <label>Experience Required</label>
                    <input className="a-input" placeholder="e.g. 1–3 Years" value={form.experience}
                      onChange={e => set('experience', e.target.value)} />
                  </div>
                  <div className="a-form-group">
                    <label>Salary / Stipend</label>
                    <input className="a-input" placeholder="e.g. ₹3–5 LPA" value={form.salary}
                      onChange={e => set('salary', e.target.value)} />
                  </div>
                </div>

                <div className="a-form-group">
                  <label>Job Description *</label>
                  <textarea className="a-textarea" rows={4}
                    placeholder="Describe the role and responsibilities..."
                    value={form.description}
                    onChange={e => set('description', e.target.value)} required />
                </div>

                <div className="a-form-group">
                  <label>Requirements (one per line)</label>
                  <textarea className="a-textarea" rows={4}
                    placeholder="Strong communication skills&#10;Experience with Meta Ads&#10;etc."
                    value={form.requirements}
                    onChange={e => set('requirements', e.target.value)} />
                </div>
              </div>

              <div className="a-modal-footer">
                <button type="button" className="a-btn a-btn-ghost" onClick={() => setModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="a-btn a-btn-primary" disabled={saving}>
                  {saving ? '⏳ Saving...' : editing ? '✅ Update Job' : '+ Create Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {confirm && (
        <div className="a-modal-overlay" onClick={e => e.target === e.currentTarget && setConfirm(null)}>
          <div className="a-modal a-confirm">
            <div className="a-modal-header">
              <span className="a-modal-title">Confirm Delete</span>
              <button className="a-modal-close" onClick={() => setConfirm(null)}>×</button>
            </div>
            <div className="a-confirm-body">
              <div className="a-confirm-icon">🗑</div>
              <h3>Delete this job?</h3>
              <p>This action cannot be undone. The job listing will be permanently removed.</p>
            </div>
            <div className="a-modal-footer">
              <button className="a-btn a-btn-ghost" onClick={() => setConfirm(null)}>Cancel</button>
              <button className="a-btn a-btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  )
}
