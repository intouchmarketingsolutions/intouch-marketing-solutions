import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/admin.css'

export default function AdminResetPassword() {
  const { updatePassword } = useAuth()
  const navigate = useNavigate()

  const [password,        setPassword]        = useState('')
  const [confirmPassword, setConfirmPassword]  = useState('')
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      await updatePassword(password)
      setSuccess(true)
      setTimeout(() => navigate('/secure-admin-panel-x92/dashboard'), 2000)
    } catch (err) {
      setError('Failed to reset password. The reset link may have expired — request a new one.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(14,165,164,0.08) 0%, transparent 70%)',
      }} />

      <div className="admin-login-box">
        <div className="admin-login-logo">
          <div className="icon">🛡</div>
          <div>
            <div className="title">Intouch Admin</div>
            <div className="sub">Secure Access Portal</div>
          </div>
        </div>

        <h2 className="admin-login-heading">Set New Password</h2>
        <p className="admin-login-sub">Choose a new password for your admin account.</p>

        {error && <div className="admin-login-error">⚠ {error}</div>}
        {success && (
          <div className="admin-login-error" style={{ background: 'rgba(14,165,164,0.1)', borderColor: 'rgba(14,165,164,0.3)', color: 'var(--a-teal, #0ea5a4)' }}>
            ✅ Password updated! Redirecting to dashboard...
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div className="a-form-group">
              <label>New Password</label>
              <input
                className="a-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="a-form-group">
              <label>Confirm New Password</label>
              <input
                className="a-input"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="a-btn a-btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginTop: '0.5rem' }}
              disabled={loading}
            >
              {loading ? '⏳ Updating...' : '🔐 Update Password'}
            </button>
          </form>
        )}

        <p style={{ marginTop: '1.5rem', fontSize: '0.72rem', color: 'var(--a-text3)', textAlign: 'center' }}>
          This is a restricted area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  )
}
