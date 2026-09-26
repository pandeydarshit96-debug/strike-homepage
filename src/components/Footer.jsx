export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-white font-black text-2xl">STRIKE</span>
              <span className="text-purple-400 text-xs font-semibold bg-purple-400/10 px-2 py-0.5 rounded-full">Beta</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Empowering developers with cutting-edge tools and resources.
              Powered by Coder Army, Strike is your gateway to endless coding
              with guided lessons and real projects.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '#' },
                { label: 'Practice', href: 'https://strikes.in/practice' },
                { label: 'DSA Sheet', href: 'https://strikes.in/dsa-sheet' },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-gray-500 hover:text-white text-sm transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                { label: 'Contact', href: 'https://strikes.in/contact' },
                { label: 'Terms of Service', href: 'https://strikes.in/terms' },
                { label: 'Privacy Policy', href: 'https://strikes.in/privacy' },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-gray-500 hover:text-white text-sm transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">© 2025 STRIKE. All rights reserved.</p>
          <a href="#" className="text-gray-600 hover:text-white text-sm transition-colors">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
