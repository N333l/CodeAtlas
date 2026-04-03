import { Database, Server, Smartphone, Container, Layout, MousePointerClick, AlertTriangle, Lightbulb, Network } from 'lucide-react'

export default function FeaturesChess() {
  return (
    <section id="features" className="py-24 px-6 md:px-16 lg:px-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col">
        <div className="mb-20">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
            Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            Everything you need to understand your codebase.
          </h2>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h3 className="text-3xl font-heading italic text-white mb-6">Instant technology detection.</h3>
            <p className="text-white/60 font-body font-light text-lg mb-8">
              CodeAtlas identifies every language, framework, database, and infrastructure tool used in your project — from a single scan. No setup required.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="liquid-glass-strong rounded-full px-6 py-2.5 text-white font-medium hover:bg-white/5 transition-colors"
            >
              Explore Features
            </button>
          </div>
          <div className="liquid-glass rounded-2xl p-8 aspect-[4/3] flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-cyan-900/5 group-hover:bg-cyan-900/10 transition-colors" />
            <div className="flex flex-wrap gap-4 justify-center items-center z-10 p-8">
               <div className="p-4 liquid-glass-strong rounded-xl"><Layout className="w-8 h-8 text-cyan-400" /></div>
               <div className="p-4 liquid-glass-strong rounded-xl"><Server className="w-8 h-8 text-cyan-400" /></div>
               <div className="p-4 liquid-glass-strong rounded-xl"><Database className="w-8 h-8 text-cyan-400" /></div>
               <div className="p-4 liquid-glass-strong rounded-xl"><Container className="w-8 h-8 text-cyan-400" /></div>
               <div className="p-4 liquid-glass-strong rounded-xl"><Smartphone className="w-8 h-8 text-cyan-400" /></div>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="order-2 lg:order-1 liquid-glass rounded-2xl p-8 aspect-[4/3] flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/10 transition-colors" />
            <div className="relative w-full h-full liquid-glass-strong rounded-xl border border-white/5 flex items-center justify-center p-4">
                <Network className="w-32 h-32 text-white/10 mx-auto" strokeWidth={1} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
                <MousePointerClick className="absolute bottom-1/4 right-1/4 w-6 h-6 text-white/50" />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="text-3xl font-heading italic text-white mb-6">Your architecture, mapped visually.</h3>
            <p className="text-white/60 font-body font-light text-lg mb-8">
              Every service, module, and dependency rendered as an interactive graph. Click any node to drill in. Understand connections at a glance — not after hours of reading.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
            >
              See a Live Map →
            </button>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-heading italic text-white mb-6">AI insights, not just diagrams.</h3>
            <p className="text-white/60 font-body font-light text-lg mb-8">
              Beyond visualization, CodeAtlas surfaces intelligent observations — circular dependencies, orphaned services, architectural anti-patterns, and improvement suggestions.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
            >
              View Sample Insights →
            </button>
          </div>
          <div className="liquid-glass rounded-2xl p-6 aspect-[4/3] flex flex-col justify-center gap-4 relative overflow-hidden">
             <div className="liquid-glass-strong rounded-xl p-4 flex gap-4 items-start">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                   <h4 className="text-white font-medium text-sm">Circular Dependency Detected</h4>
                   <p className="text-white/50 text-xs mt-1">user-service and auth-service mutually depend on each other.</p>
                </div>
             </div>
             <div className="liquid-glass-strong rounded-xl p-4 flex gap-4 items-start">
                <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                   <h4 className="text-white font-medium text-sm">Orphaned Module</h4>
                   <p className="text-white/50 text-xs mt-1">legacy-billing.js is not imported anywhere in the graph.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
