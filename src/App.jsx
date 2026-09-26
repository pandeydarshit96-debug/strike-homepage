import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Membership from './components/Membership'
import Courses from './components/Courses'
import WhyUs from './components/WhyUs'
import HackathonProof from './components/HackathonProof'
import Mentors from './components/Mentors'
import Reviews from './components/Reviews'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import DiwaliSale from './components/DiwaliSale'
import HackathonsPage from './pages/HackathonsPage'

function HomePage() {
  const [saleOpen, setSaleOpen] = useState(false)
  const openSale  = useCallback(() => setSaleOpen(true),  [])
  const closeSale = useCallback(() => setSaleOpen(false), [])
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Membership />
      <Courses />
      <WhyUs />
      <HackathonProof />
      <Mentors />
      <Reviews />
      <FAQ />
      <Footer />
      <Chatbot onRevealSale={openSale} />
      <DiwaliSale show={saleOpen} onClose={closeSale} />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hackathons" element={<HackathonsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
