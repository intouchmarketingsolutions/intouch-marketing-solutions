import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

// Public layout
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ChatBot from './components/ChatBot/ChatBot'

// Public pages
import Home         from './pages/Home/Home'
import About        from './pages/About/About'
import Services     from './pages/Services/Services'
import ServiceDetail from './pages/ServiceDetail/ServiceDetail'
import Reviews      from './pages/Reviews/Reviews'
import Clients      from './pages/Clients/Clients'
import Career       from './pages/Career/Career'
import Contact      from './pages/Contact/Contact'
import StartProject from './pages/StartProject/StartProject'

// Admin — completely isolated
import { AuthProvider }     from './admin/context/AuthContext'
import ProtectedRoute       from './admin/components/ProtectedRoute'
import AdminLogin           from './admin/pages/AdminLogin'
import Dashboard            from './admin/pages/Dashboard'
import AdminJobs            from './admin/pages/AdminJobs'
import AdminClients         from './admin/pages/AdminClients'
import AdminApplications    from './admin/pages/AdminApplications'

const ADMIN_BASE = '/secure-admin-panel-x92'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
  return null
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/about"        element={<About />} />
        <Route path="/services"     element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/reviews"      element={<Reviews />} />
        <Route path="/clients"      element={<Clients />} />
        <Route path="/career"       element={<Career />} />
        <Route path="/contact"      element={<Contact />} />
        <Route path="/start-project" element={<StartProject />} />
        <Route path="*"             element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <ChatBot />
    </>
  )
}

function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login"       element={<AdminLogin />} />
        <Route path="dashboard"   element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="jobs"        element={<ProtectedRoute><AdminJobs /></ProtectedRoute>} />
        <Route path="clients"     element={<ProtectedRoute><AdminClients /></ProtectedRoute>} />
        <Route path="applications" element={<ProtectedRoute><AdminApplications /></ProtectedRoute>} />
        <Route path="*"           element={<Navigate to={`${ADMIN_BASE}/login`} replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default function App() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith(ADMIN_BASE)

  return (
    <>
      <ScrollToTop />
      {isAdmin ? (
        <Routes>
          <Route path={`${ADMIN_BASE}/*`} element={<AdminRoutes />} />
        </Routes>
      ) : (
        <PublicLayout />
      )}
    </>
  )
}
