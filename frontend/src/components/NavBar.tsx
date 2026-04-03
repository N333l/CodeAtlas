import { Network, ArrowUpRight } from 'lucide-react'

export default function NavBar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
      <div className="w-full max-w-7xl flex items-center justify-between pointer-events-auto">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Network className="w-6 h-6 text-cyan-400" />
          <span className="font-heading italic text-white text-xl">CodeAtlas</span>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex items-center gap-6 liquid-glass rounded-full px-8 py-2.5">
          {['Home', 'Features', 'How It Works', 'Use Cases', 'Pricing'].map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>

        {/* Right: CTA */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 bg-cyan-400 text-black font-body rounded-full px-6 py-2.5 font-medium hover:bg-cyan-300 transition-colors"
        >
          Try Free <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  )
}
