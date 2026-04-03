import { Zap, Network, ScanLine, ShieldCheck } from 'lucide-react'

export default function FeaturesGrid() {
  const features = [
    { icon: Zap, title: "Under 30 Seconds", desc: "Full architecture analysis from clone to diagram, faster than a coffee run." },
    { icon: Network, title: "Graph-Based View", desc: "Interactive node graphs you can pan, zoom, and explore freely." },
    { icon: ScanLine, title: "Zero Configuration", desc: "No setup, no YAML files, no plugins. Just paste a URL and go." },
    { icon: ShieldCheck, title: "Private Repo Support", desc: "Analyze private repositories securely with token-based authentication." }
  ]

  return (
    <section className="py-24 px-6 md:px-16 lg:px-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
          Why CodeAtlas
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-16 text-center">
          The difference is in the details.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {features.map((item, i) => (
            <div key={i} className="liquid-glass rounded-2xl p-6">
              <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center mb-6">
                <item.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-heading italic text-white mb-2">{item.title}</h3>
              <p className="text-white/60 font-body font-light text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
