import { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Play, Search } from 'lucide-react'
import ForceGraph2D, { type ForceGraphMethods } from 'react-force-graph-2d'
import BlurText from './ui/BlurText'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const graphRef = useRef<ForceGraphMethods | undefined>(undefined)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [repoUrl, setRepoUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  
  // Real graph data state
  const [activeGraph, setActiveGraph] = useState<{nodes: any[], links: any[]} | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight
      })
    }
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        })
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Generate a random abstract network graph
  const graphData = useMemo(() => {
    const nodes = Array.from({ length: 40 }).map((_, id) => ({ id, val: Math.random() * 2 + 1 }))
    const links = []
    for (let i = 0; i < nodes.length; i++) {
      const connections = Math.floor(Math.random() * 3) + 1
      for (let j = 0; j < connections; j++) {
        const target = Math.floor(Math.random() * nodes.length)
        if (target !== i) {
          links.push({ source: i, target })
        }
      }
    }
    return { nodes, links }
  }, [])

  const handleAnalyze = async () => {
    if (!repoUrl) return;
    setIsAnalyzing(true);
    setErrorMsg("");
    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repo_url: repoUrl }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to analyze");
      
      // If the backend returns nodes/edges or similar graph format, apply it natively
      // Otherwise, we just show a fake enhanced graph as visual feedback for the demo
      if (data.architecture && data.architecture.nodes) {
        setActiveGraph({ 
          nodes: data.architecture.nodes, 
          links: data.architecture.edges || data.architecture.links || [] 
        });
      } else if (data.nodes && data.edges) {
        setActiveGraph({ nodes: data.nodes, links: data.edges });
      } else if (data.graph && data.graph.nodes) {
        setActiveGraph(data.graph);
      } else {
        // Fallback or visualization effect to signify success 
        setActiveGraph(graphData); // retrigger
      }
      setTimeout(() => graphRef.current?.zoomToFit(1000), 500);
    } catch (e: any) {
      setErrorMsg(e.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="home" ref={containerRef} className="relative overflow-visible h-[1000px] bg-black">
      {/* Background Visual */}
      <div className="absolute top-[15%] w-full h-[85%] z-0 opacity-30 select-none pointer-events-none flex justify-center overflow-hidden">
        {dimensions.width > 0 && (
          <ForceGraph2D
            ref={graphRef}
            width={dimensions.width}
            height={dimensions.height}
            graphData={activeGraph || graphData}
            nodeColor={() => '#22d3ee'} // cyan-400
            nodeRelSize={4}
            linkColor={() => 'rgba(34, 211, 238, 0.2)'}
            linkWidth={1}
            d3AlphaDecay={0.01}
            d3VelocityDecay={0.08}
            onEngineStop={() => graphRef.current?.zoomToFit(400)}
            cooldownTicks={100}
          />
        )}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 z-[1] h-[300px] bg-gradient-to-b from-transparent to-black pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-[150px] md:pt-[200px] max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="liquid-glass rounded-full px-4 py-1.5 flex items-center gap-2 mb-8"
        >
          <span className="bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
          <span className="text-white/80 text-sm font-medium">Now with AI-powered architecture insights.</span>
        </motion.div>

        <BlurText 
          text="Understand Any Codebase. Instantly." 
          className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.85] tracking-[-4px] mb-8 max-w-3xl"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-white/60 font-body font-light text-lg md:text-xl max-w-2xl mb-12"
        >
          Paste a GitHub URL. CodeAtlas maps your entire architecture — services, dependencies, tech stack — in seconds. No config. No guesswork.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-6 mb-16"
        >
          <button 
            onClick={() => document.getElementById('repo-input')?.focus()}
            className="liquid-glass-strong rounded-full px-8 py-3.5 flex items-center gap-2 text-white font-medium hover:bg-white/5 transition-colors"
          >
            Analyze a Repo <ArrowUpRight className="w-5 h-5 text-cyan-400" />
          </button>
          <button 
            onClick={() => {
              setRepoUrl("https://github.com/facebook/react");
              setErrorMsg("Note: The React repository is massive. It will take 1-3 minutes to clone and analyze. Please leave the backend running.");
              setTimeout(() => document.getElementById('analyze-btn')?.click(), 100);
            }}
            className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors px-4 py-2 font-medium"
          >
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/5 transition-all">
              <Play className="w-4 h-4" />
            </div>
            See a Live Demo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="w-full max-w-xl"
        >
          <div className="liquid-glass-strong rounded-full p-2 flex items-center gap-2">
            <div className="pl-4 text-white/40"><Search className="w-5 h-5" /></div>
            <input 
              id="repo-input"
              type="text" 
              placeholder="Paste a GitHub repo URL..." 
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-white/30 px-2 font-light"
              disabled={isAnalyzing}
            />
            <button 
              id="analyze-btn"
              onClick={handleAnalyze} 
              disabled={isAnalyzing}
              className="bg-cyan-400 text-black px-6 py-2.5 rounded-full font-medium hover:bg-cyan-300 transition-colors shrink-0 disabled:opacity-50"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze"}
            </button>
          </div>
          {errorMsg && <p className="text-red-400 text-sm mt-4">{errorMsg}</p>}
        </motion.div>
      </div>
    </section>
  )
}
