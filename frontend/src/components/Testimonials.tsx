export default function Testimonials() {
  const testimonials = [
    { quote: "I dropped in our monorepo URL and had a full dependency map in 20 seconds. Would've taken me two days manually.", name: "Arjun Mehta", role: "Senior Engineer @ Razorpay" },
    { quote: "Onboarding used to mean days of digging through READMEs. CodeAtlas changed that completely.", name: "Sophie Laurent", role: "Tech Lead @ Miro" },
    { quote: "I use it to study open-source projects before contributing. It's like having X-ray vision for codebases.", name: "Daniel Osei", role: "Indie Developer" }
  ]

  return (
    <section className="py-24 px-6 md:px-16 lg:px-24 border-t border-white/5 bg-black/40">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
          What Developers Say
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-16 text-center">
          Don't take our word for it.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {testimonials.map((test, i) => (
            <div key={i} className="liquid-glass rounded-2xl p-8 flex flex-col justify-between">
              <p className="text-white/80 font-body font-light text-sm italic mb-8">"{test.quote}"</p>
              <div>
                <h4 className="text-white font-body font-medium text-sm">{test.name}</h4>
                <p className="text-white/50 font-body font-light text-xs">{test.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
