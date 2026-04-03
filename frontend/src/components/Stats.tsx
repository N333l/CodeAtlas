export default function Stats() {
  return (
    <section className="relative py-24 px-6 md:px-16 lg:px-24 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent z-[1]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="liquid-glass rounded-3xl p-12 md:p-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center bg-black/20">
          {[
            { value: "500+", label: "Repos analyzed" },
            { value: "30s", label: "Average scan time" },
            { value: "15+", label: "Tech stacks detected" },
            { value: "100%", label: "Zero config needed" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white">
                {stat.value}
              </span>
              <span className="text-white/60 font-body font-light text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
