import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import SEO from '../../components/SEO/SEO'
import styles from './Login.module.css'

const FRIENDLY_ERRORS = {
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/email-already-in-use': 'An account already exists with this email.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/missing-password': 'Please enter a password.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
}

function friendlyError(err) {
  return FRIENDLY_ERRORS[err?.code] || 'Something went wrong. Please try again.'
}

export default function Login() {
  const initialLocation = useLocation()
  const [mode, setMode] = useState(
    initialLocation.pathname === '/register' ? 'signup' : 'signin'
  ) // 'signin' | 'signup'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn, signUp, signInWithGoogle, resetPassword, logout } = useAuth()
  const navigate = useNavigate()

  const redirectTo = initialLocation.state?.from?.pathname || '/services'

  const switchMode = (next) => {
    setMode(next)
    setError('')
    setInfo('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setInfo('')

    if (mode === 'signup') {
      if (!name.trim()) return setError('Please enter your name.')
      if (password.length < 6) return setError('Password should be at least 6 characters.')
      if (password !== confirmPassword) return setError('Passwords do not match.')
    }

    setLoading(true)
    try {
      if (mode === 'signup') {
        await signUp(name.trim(), email.trim(), password)
        await logout()
        setName('')
        setPassword('')
        setConfirmPassword('')
        setInfo('Account created! Please sign in to continue.')
        setMode('signin')
      } else {
        await signIn(email.trim(), password)
        navigate(redirectTo, { replace: true })
      }
    } catch (err) {
      setError(friendlyError(err))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setInfo('')
    setLoading(true)
    try {
      await signInWithGoogle()
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(friendlyError(err))
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    setError('')
    setInfo('')
    if (!email.trim()) {
      setError('Enter your email above first, then click "Forgot password".')
      return
    }
    try {
      await resetPassword(email.trim())
      setInfo('Password reset email sent. Please check your inbox.')
    } catch (err) {
      setError(friendlyError(err))
    }
  }

  return (
    <div className={styles.page}>
      <SEO
        title={mode === 'signin' ? 'Sign In | Intouch Marketing Solutions' : 'Sign Up | Intouch Marketing Solutions'}
        description="Sign in or create an account to access Intouch Marketing Solutions' services and manage your projects."
        path={mode === 'signin' ? '/login' : '/register'}
        noindex
      />
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {mode === 'signin' ? 'Welcome Back' : 'Create Your Account'}
          </h1>
          <p className={styles.sub}>
            {mode === 'signin'
              ? 'Sign in to access our services and your account.'
              : 'Sign up to unlock all Intouch services.'}
          </p>
        </div>

        <div className={styles.toggle}>
          <button
            type="button"
            className={`${styles.toggleBtn} ${mode === 'signin' ? styles.toggleActive : ''}`}
            onClick={() => switchMode('signin')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`${styles.toggleBtn} ${mode === 'signup' ? styles.toggleActive : ''}`}
            onClick={() => switchMode('signup')}
          >
            Sign Up
          </button>
        </div>

        {error && <div className={styles.alertError}>{error}</div>}
        {info && <div className={styles.alertInfo}>{info}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className={styles.field}>
              <FaUser className={styles.fieldIcon} />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>
          )}

          <div className={styles.field}>
            <FaEnvelope className={styles.fieldIcon} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.field}>
            <FaLock className={styles.fieldIcon} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              required
            />
            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPassword((s) => !s)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {mode === 'signup' && (
            <div className={styles.field}>
              <FaLock className={styles.fieldIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
          )}

          {mode === 'signin' && (
            <button type="button" className={styles.forgotBtn} onClick={handleForgotPassword}>
              Forgot password?
            </button>
          )}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <button type="button" className={styles.googleBtn} onClick={handleGoogle} disabled={loading}>
          <FaGoogle /> Continue with Google
        </button>

        <p className={styles.switchText}>
          {mode === 'signin' ? (
            <>Don't have an account? <button type="button" onClick={() => switchMode('signup')}>Sign Up</button></>
          ) : (
            <>Already have an account? <button type="button" onClick={() => switchMode('signin')}>Sign In</button></>
          )}
        </p>

        <Link to="/" className={styles.backHome}>← Back to Home</Link>
      </div>
    </div>
  )
}
