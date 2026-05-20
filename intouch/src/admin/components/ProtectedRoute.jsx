import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth()
  if (!currentUser) {
    return <Navigate to="/secure-admin-panel-x92/login" replace />
  }
  return children
}
