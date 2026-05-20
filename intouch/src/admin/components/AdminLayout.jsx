import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/admin.css'

const BASE = '/secure-admin-panel-x92'

const NAV_ITEMS = [
  { to: `${BASE}/dashboard`,    icon: '📊', label: 'Dashboard'    },
  { to: `${BASE}/jobs`,         icon: '💼', label: 'Jobs'         },
  { to: `${BASE}/clients`,      icon: '🏢', label: 'Clients'      },
  { to: `${BASE}/applications`, icon: '📋', label: 'Applications' },
]

const PAGE_TITLES = {
  dashboard:    'Dashboard',
  jobs:         'Manage Jobs',
  clients:      'Manage Clients',
  applications: 'Applications',
}

export default function AdminLayout({ children, page }) {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate(`${BASE}/login`)
  }

  const emailInitials = currentUser?.email
    ? currentUser.email.slice(0, 2).toUpperCase()
    : 'AD'

  const title = PAGE_TITLES[page] ?? 'Admin'

  return (
    <div className="admin-shell">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-brand">
          <div className="brand-icon">🛡</div>
          <div className="brand-text">
            Intouch Admin
            <span className="brand-sub">Control Panel</span>
          </div>
        </div>

        <nav className="admin-nav">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `admin-nav-item${isActive ? ' active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-row">
            <div className="admin-avatar">{emailInitials}</div>
            <span className="admin-user-email">{currentUser?.email}</span>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              className="admin-ham"
              onClick={() => setSidebarOpen(s => !s)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
            <h1 className="admin-topbar-title">{title}</h1>
          </div>
          <div className="admin-topbar-right">
            <span style={{ fontSize: '0.78rem', color: 'var(--a-text2)' }}>
              {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
        </header>

        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  )
}
