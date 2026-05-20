import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import AdminLayout from '../components/AdminLayout'

export default function Dashboard() {
  const [stats, setStats]   = useState({ jobs: 0, clients: 0, applications: 0 })
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          { count: jobsCount },
          { count: clientsCount },
          { data: apps },
        ] = await Promise.all([
          supabase.from('jobs').select('*', { count: 'exact', head: true }),
          supabase.from('clients').select('*', { count: 'exact', head: true }),
          supabase.from('applications').select('*').order('created_at', { ascending: false }).limit(6),
        ])

        setStats({
          jobs:         jobsCount ?? 0,
          clients:      clientsCount ?? 0,
          applications: apps ? (await supabase.from('applications').select('*', { count: 'exact', head: true })).count ?? 0 : 0,
        })
        setRecent(apps ?? [])
      } catch (err) {
        console.error('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const STAT_CARDS = [
    { label: 'Total Jobs',    num: stats.jobs,         icon: '💼', color: 'linear-gradient(135deg, rgba(14,165,164,0.2), rgba(14,165,164,0.08))',  border: 'rgba(14,165,164,0.3)'  },
    { label: 'Total Clients', num: stats.clients,      icon: '🏢', color: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.08))',  border: 'rgba(99,102,241,0.3)'  },
    { label: 'Applications',  num: stats.applications, icon: '📋', color: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(168,85,247,0.08))', border: 'rgba(168,85,247,0.3)' },
  ]

  const fmt = (iso) => iso
    ? new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—'

  return (
    <AdminLayout page="dashboard">
      <div style={{
        marginBottom: '1.5rem',
        padding: '1.25rem 1.5rem',
        background: 'linear-gradient(135deg, rgba(14,165,164,0.08), rgba(99,102,241,0.08))',
        border: '1px solid rgba(14,165,164,0.2)',
        borderRadius: '16px',
      }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '0.25rem' }}>
          Welcome back! 👋
        </h2>
        <p style={{ fontSize: '0.84rem', color: 'var(--a-text2)' }}>
          Here's an overview of your Intouch Marketing Solutions admin panel.
        </p>
      </div>

      <div className="a-stats-grid">
        {STAT_CARDS.map(c => (
          <div key={c.label} className="a-stat-card" style={{ background: c.color, borderColor: c.border }}>
            <div className="a-stat-icon" style={{ background: 'rgba(255,255,255,0.07)', fontSize: '1.4rem' }}>
              {c.icon}
            </div>
            <div className="a-stat-body">
              <div className="a-stat-num">{loading ? '—' : c.num}</div>
              <div className="a-stat-label">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="a-card">
        <div className="a-section-header">
          <h3 className="a-section-title">Recent Applications</h3>
          <a href="/secure-admin-panel-x92/applications" className="a-btn a-btn-ghost a-btn-sm" style={{ textDecoration: 'none' }}>
            View All →
          </a>
        </div>

        {loading ? (
          <div className="a-spinner" />
        ) : recent.length === 0 ? (
          <div className="a-empty">
            <div className="a-empty-icon">📋</div>
            <h3>No applications yet</h3>
            <p>Applications submitted through the Career page will appear here.</p>
          </div>
        ) : (
          <div className="a-table-wrap">
            <table className="a-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Position</th>
                  <th>Experience</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recent.map(app => (
                  <tr key={app.id}>
                    <td style={{ fontWeight: 600 }}>{app.name}</td>
                    <td style={{ color: 'var(--a-text2)' }}>{app.email}</td>
                    <td><span className="a-badge a-badge-teal">{app.position || '—'}</span></td>
                    <td style={{ color: 'var(--a-text2)' }}>{app.experience || '—'}</td>
                    <td style={{ color: 'var(--a-text2)', fontSize: '0.78rem' }}>{fmt(app.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
