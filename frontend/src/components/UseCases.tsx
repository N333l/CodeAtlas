import { Users, FolderSearch, FileText, GraduationCap } from 'lucide-react'

export default function UseCases() {
  const cards = [
    { icon: Users, title: "Developer Onboarding", desc: "New to a codebase? Get a full architectural overview in seconds, not days." },
    { icon: FolderSearch, title: "Codebase Exploration", desc: "Exploring an open-source repo? See the whole picture before reading a single file." },
    { icon: FileText, title: "Architecture Documentation", desc: "Auto-generate architecture diagrams that stay accurate as your code evolves." },
    { icon: GraduationCap, title: "Educational Use", desc: "Study real-world system design by analyzing production-grade open-source projects." }
  ]

  return (
    <section id="use-cases" className="py-24 px-6 md:px-16 lg:px-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
          Use Cases
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-16 text-center">
          Built for every stage of development.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {cards.map((card, i) => (
            <div key={i} className="liquid-glass rounded-2xl p-8 flex gap-6 items-start">
              <card.icon className="w-8 h-8 text-cyan-400 shrink-0 mt-1" />
              <div>
                <h3 className="font-heading italic text-white text-xl mb-2">{card.title}</h3>
                <p className="text-white/60 font-body font-light text-sm">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
