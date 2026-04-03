import { Link, ScanLine, Network, ArrowUpRight } from 'lucide-react'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative w-full min-h-[700px] py-32 px-6 md:px-16 lg:px-24 flex flex-col items-center border-t border-white/5 overflow-hidden">
      {/* Background (simulated with CSS gradients) */}
      <div className="absolute inset-0 z-0 bg-black/80" />
      <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent z-[1]" />
      
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
          How It Works
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-6 text-center">
          Paste a URL. Get your architecture.
        </h2>
        <p className="text-white/60 font-body font-light text-lg text-center max-w-3xl mb-16">
          CodeAtlas clones your repo, scans every config and manifest, detects your full tech stack, and renders an interactive architecture map — all in under 30 seconds.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full">
          {[
            { step: '01', icon: Link, title: 'Paste Your Repo URL', desc: 'Drop in any public or private GitHub URL to get started.' },
            { step: '02', icon: ScanLine, title: 'We Analyze Everything', desc: 'Our engine scans dependencies, configs, services, and infra files automatically.' },
            { step: '03', icon: Network, title: 'Explore Your Architecture', desc: 'An interactive graph appears — explore nodes, relationships, and insights.' }
          ].map((item, i) => (
            <div key={i} className="liquid-glass rounded-2xl p-8 flex flex-col items-center text-center">
              <span className="text-cyan-400 font-heading italic text-xl mb-4">{item.step}</span>
              <div className="w-12 h-12 rounded-full liquid-glass-strong flex items-center justify-center mb-6">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-heading italic text-white mb-3">{item.title}</h3>
              <p className="text-white/60 font-body font-light text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="liquid-glass-strong rounded-full px-8 py-3.5 flex items-center gap-2 text-white font-medium hover:bg-white/5 transition-colors"
        >
          Try It Now <ArrowUpRight className="w-4 h-4 text-cyan-400" />
        </button>
      </div>
    </section>
  )
}
