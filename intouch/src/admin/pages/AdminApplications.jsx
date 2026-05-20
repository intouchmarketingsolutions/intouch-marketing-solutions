import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import AdminLayout from '../components/AdminLayout'

export default function AdminApplications() {
  const [apps,     setApps]     = useState([])
  const [loading,  setLoading]  = useState(true)
  const [selected, setSelected] = useState(null)
  const [confirm,  setConfirm]  = useState(null)

  const fetchApps = async () => {
    setLoading(true)
    const { data } = await supabase.from('applications').select('*').order('created_at', { ascending: false })
    setApps(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchApps() }, [])

  const handleDelete = async () => {
    if (!confirm) return
    await supabase.from('applications').delete().eq('id', confirm)
    setConfirm(null)
    if (selected?.id === confirm) setSelected(null)
    fetchApps()
  }

  const fmt = (iso) => iso
    ? new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—'

  return (
    <AdminLayout page="applications">

      <div className="a-section-header">
        <h3 className="a-section-title">All Applications ({apps.length})</h3>
      </div>

      {loading ? (
        <div className="a-spinner" />
      ) : apps.length === 0 ? (
        <div className="a-empty">
          <div className="a-empty-icon">📋</div>
          <h3>No applications yet</h3>
          <p>Applications submitted via the Career page will appear here.</p>
        </div>
      ) : (
        <div className="a-table-wrap">
          <table className="a-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Experience</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {apps.map(app => (
                <tr key={app.id}>
                  <td style={{ fontWeight: 600 }}>{app.name}</td>
                  <td style={{ color: 'var(--a-text2)' }}>{app.email}</td>
                  <td style={{ color: 'var(--a-text2)' }}>{app.phone || '—'}</td>
                  <td><span className="a-badge a-badge-teal">{app.position || '—'}</span></td>
                  <td style={{ color: 'var(--a-text2)' }}>{app.experience || '—'}</td>
                  <td style={{ color: 'var(--a-text2)', fontSize: '0.78rem' }}>{fmt(app.created_at)}</td>
                  <td>
                    <div className="actions">
                      <button className="a-btn a-btn-ghost a-btn-sm" onClick={() => setSelected(app)}>👁 View</button>
                      <button className="a-btn a-btn-danger a-btn-sm" onClick={() => setConfirm(app.id)}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="a-modal-overlay" onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div className="a-modal a-modal-lg">
            <div className="a-modal-header">
              <span className="a-modal-title">📋 Application — {selected.name}</span>
              <button className="a-modal-close" onClick={() => setSelected(null)}>×</button>
            </div>

            <div className="a-modal-body">
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1rem 1.25rem',
                background: 'linear-gradient(135deg, rgba(14,165,164,0.08), rgba(99,102,241,0.08))',
                border: '1px solid rgba(14,165,164,0.18)',
                borderRadius: 12,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0ea5a4, #6366f1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, color: '#fff', fontSize: '1.1rem', flexShrink: 0,
                }}>
                  {selected.name?.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{selected.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--a-text2)' }}>{selected.email}</div>
                </div>
                <span className="a-badge a-badge-teal" style={{ marginLeft: 'auto' }}>{selected.position}</span>
              </div>

              <div className="a-app-detail-grid">
                <div className="a-app-detail-item"><label>Phone</label><span>{selected.phone || '—'}</span></div>
                <div className="a-app-detail-item"><label>Experience</label><span>{selected.experience || '—'}</span></div>
                <div className="a-app-detail-item"><label>Applied For</label><span>{selected.position || '—'}</span></div>
                <div className="a-app-detail-item"><label>Date Applied</label><span>{fmt(selected.created_at)}</span></div>
              </div>

              {selected.message && (
                <div className="a-form-group">
                  <label>Cover Message</label>
                  <div style={{
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--a-border)',
                    borderRadius: 8,
                    fontSize: '0.86rem',
                    color: 'var(--a-text)',
                    lineHeight: 1.65,
                    whiteSpace: 'pre-wrap',
                  }}>
                    {selected.message}
                  </div>
                </div>
              )}

              <div className="a-form-group">
                <label>Resume</label>
                {selected.resume_url ? (
                  <a href={selected.resume_url} target="_blank" rel="noreferrer" className="a-resume-link">
                    📄 Download / View Resume
                  </a>
                ) : (
                  <span style={{ color: 'var(--a-text3)', fontSize: '0.84rem' }}>No resume uploaded.</span>
                )}
              </div>
            </div>

            <div className="a-modal-footer">
              <button className="a-btn a-btn-danger" onClick={() => { setConfirm(selected.id); setSelected(null) }}>
                🗑 Delete Application
              </button>
              <button className="a-btn a-btn-ghost" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {confirm && (
        <div className="a-modal-overlay" onClick={e => e.target === e.currentTarget && setConfirm(null)}>
          <div className="a-modal a-confirm">
            <div className="a-modal-header">
              <span className="a-modal-title">Delete Application</span>
              <button className="a-modal-close" onClick={() => setConfirm(null)}>×</button>
            </div>
            <div className="a-confirm-body">
              <div className="a-confirm-icon">⚠️</div>
              <h3>Delete this application?</h3>
              <p>This cannot be undone. The applicant's data will be permanently removed.</p>
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
