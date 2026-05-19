import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ChatBot from './components/ChatBot/ChatBot'
import Home     from './pages/Home/Home'
import About    from './pages/About/About'
import Services from './pages/Services/Services'
import ServiceDetail from './pages/ServiceDetail/ServiceDetail'
import Reviews  from './pages/Reviews/Reviews'
import Clients  from './pages/Clients/Clients'
import Career   from './pages/Career/Career'
import Contact  from './pages/Contact/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/about"   element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/career"  element={<Career />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <ChatBot />
    </>
  )
}
