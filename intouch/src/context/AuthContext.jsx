import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'

const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  async function signUp(name, email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (name) {
      await updateProfile(cred.user, { displayName: name })
    }
    return cred.user
  }

  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function signInWithGoogle() {
    return signInWithPopup(auth, googleProvider)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function logout() {
    return signOut(auth)
  }

  const value = {
    currentUser,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    resetPassword,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
