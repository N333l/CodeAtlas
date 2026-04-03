export default function SocialProof() {
  return (
    <section className="py-24 px-6 flex flex-col items-center border-t border-white/5">
      <div className="liquid-glass rounded-full px-4 py-1.5 mb-12">
        <span className="text-white/80 font-medium text-sm">Trusted by engineers at</span>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70">
        {['GitHub', 'GitLab', 'Vercel', 'Notion', 'Linear'].map(company => (
          <span key={company} className="text-2xl md:text-3xl font-heading italic text-white/70">
            {company}
          </span>
        ))}
      </div>
    </section>
  )
}
