import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isHackathonsPage = location.pathname === '/hackathons'

  const goHome = () => {
    if (location.pathname !== '/') navigate('/')
    else window.scrollTo({ top: 0, behavior: 'smooth' })
    setOpen(false)
  }

  const goSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    setOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button onClick={goHome} className="flex items-center gap-2 cursor-pointer">
            <span className="text-white font-black text-2xl tracking-tight">STRIKE</span>
            <span className="text-purple-400 text-xs font-semibold bg-purple-400/10 px-2 py-0.5 rounded-full">Beta</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={goHome} className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Home
            </button>
            <button onClick={() => goSection('courses')} className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Courses
            </button>
            <button onClick={() => goSection('mentors')} className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Mentors
            </button>
            {/* Hackathons — scrolls to #hackathon on homepage, does nothing on /hackathons page */}
            <button
              onClick={() => !isHackathonsPage && goSection('hackathon')}
              className={`text-sm font-medium transition-colors ${
                isHackathonsPage
                  ? 'text-gray-600 cursor-default'
                  : 'text-gray-300 hover:text-white cursor-pointer'
              }`}
            >
              Hackathons
            </button>
            <a href="https://strikes.in/practice" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Practice
            </a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="https://strikes.in" className="text-sm text-gray-300 hover:text-white font-medium transition-colors">Login</a>
            <a
              href="https://strikes.in"
              className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Join Us
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-white">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          <button onClick={goHome} className="text-gray-300 text-sm font-medium text-left">Home</button>
          <button onClick={() => goSection('courses')} className="text-gray-300 text-sm font-medium text-left">Courses</button>
          <button onClick={() => goSection('mentors')} className="text-gray-300 text-sm font-medium text-left">Mentors</button>
          {!isHackathonsPage && (
            <button onClick={() => goSection('hackathon')} className="text-gray-300 text-sm font-medium text-left">Hackathons</button>
          )}
          <a href="https://strikes.in" className="bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center">Join Us</a>
        </div>
      )}
    </nav>
  )
}
