import { useState } from 'react';

export default function Footer() {
  const [repoUrl, setRepoUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [message, setMessage] = useState("")

  const handleAnalyze = async () => {
    if (!repoUrl) return;
    setIsAnalyzing(true);
    setMessage("");
    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repo_url: repoUrl }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed");
      
      setMessage("Analysis complete! Scroll up to explore your graph.");
      setRepoUrl("");
    } catch (e: any) {
      setMessage("Error: " + e.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="pricing" className="relative pt-32 pb-8 px-6 md:px-16 lg:px-24 overflow-hidden border-t border-white/5 bg-black">
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black to-transparent" />
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white mb-6">
          Map your first codebase — free.
        </h2>
        <p className="text-white/60 font-body font-light text-lg mb-12">
          No account needed to start. Paste a GitHub URL and see your architecture in under 30 seconds.
        </p>
        
        <div className="w-full max-w-xl mb-6">
          <div className="liquid-glass-strong rounded-full p-2 flex items-center gap-2">
            <input 
              type="text" 
              placeholder="github.com/your/repo" 
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-white/30 px-6 font-light"
              disabled={isAnalyzing}
            />
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-cyan-400 text-black px-8 py-2.5 rounded-full font-medium hover:bg-cyan-300 transition-colors shrink-0 disabled:opacity-50"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Now"}
            </button>
          </div>
          {message && <p className="text-cyan-400 text-sm mt-4">{message}</p>}
        </div>
        
        <a 
          href="mailto:contact@codeatlas.demo?subject=Book a Demo"
          className="text-white/50 text-sm hover:text-white transition-colors cursor-pointer block"
        >
          Or book a demo →
        </a>
        
        <div className="w-full mt-32 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-xs">
          <span>© 2026 CodeAtlas</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </section>
  )
}
