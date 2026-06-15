import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/admin.css'

export default function AdminLogin() {
  const { login, resetPassword } = useAuth()
  const navigate  = useNavigate()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const [forgotMode,    setForgotMode]    = useState(false)
  const [forgotEmail,   setForgotEmail]   = useState('')
  const [forgotMsg,     setForgotMsg]     = useState('')
  const [forgotError,   setForgotError]   = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/secure-admin-panel-x92/dashboard')
    } catch (err) {
      const msg = err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found'
        ? 'Invalid email or password.'
        : err.code === 'auth/too-many-requests'
        ? 'Too many failed attempts. Please try again later.'
        : 'Login failed. Please check your credentials.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const openForgot = () => {
    setForgotEmail(email)
    setForgotMsg('')
    setForgotError('')
    setForgotMode(true)
  }

  const handleForgotSubmit = async (e) => {
    e.preventDefault()
    setForgotError('')
    setForgotMsg('')
    setForgotLoading(true)
    try {
      await resetPassword(forgotEmail)
      setForgotMsg('If an account exists for that email, a password reset link has been sent. Check your inbox.')
    } catch (err) {
      setForgotError('Failed to send reset email. Please try again later.')
    } finally {
      setForgotLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      {/* Background glow */}
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

        {!forgotMode ? (
          <>
            <h2 className="admin-login-heading">Sign In</h2>
            <p className="admin-login-sub">Enter your admin credentials to continue.</p>

            {error && <div className="admin-login-error">⚠ {error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div className="a-form-group">
                <label>Email Address</label>
                <input
                  className="a-input"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="a-form-group">
                <label>Password</label>
                <input
                  className="a-input"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="a-btn a-btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginTop: '0.5rem' }}
                disabled={loading}
              >
                {loading ? '⏳ Signing in...' : '🔐 Sign In'}
              </button>
            </form>

            <p style={{ marginTop: '1rem', textAlign: 'center' }}>
              <button
                type="button"
                onClick={openForgot}
                className="a-btn a-btn-ghost a-btn-sm"
                style={{ background: 'none', border: 'none', color: 'var(--a-text2)', textDecoration: 'underline', cursor: 'pointer' }}
              >
                Forgot password?
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="admin-login-heading">Reset Password</h2>
            <p className="admin-login-sub">Enter your admin email and we'll send you a link to reset your password.</p>

            {forgotError && <div className="admin-login-error">⚠ {forgotError}</div>}
            {forgotMsg && (
              <div className="admin-login-error" style={{ background: 'rgba(14,165,164,0.1)', borderColor: 'rgba(14,165,164,0.3)', color: 'var(--a-teal, #0ea5a4)' }}>
                ✅ {forgotMsg}
              </div>
            )}

            <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div className="a-form-group">
                <label>Email Address</label>
                <input
                  className="a-input"
                  type="email"
                  placeholder="admin@example.com"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="a-btn a-btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginTop: '0.5rem' }}
                disabled={forgotLoading}
              >
                {forgotLoading ? '⏳ Sending...' : '📧 Send Reset Link'}
              </button>
            </form>

            <p style={{ marginTop: '1rem', textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => setForgotMode(false)}
                className="a-btn a-btn-ghost a-btn-sm"
                style={{ background: 'none', border: 'none', color: 'var(--a-text2)', textDecoration: 'underline', cursor: 'pointer' }}
              >
                ← Back to Sign In
              </button>
            </p>
          </>
        )}

        <p style={{ marginTop: '1.5rem', fontSize: '0.72rem', color: 'var(--a-text3)', textAlign: 'center' }}>
          This is a restricted area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  )
}
