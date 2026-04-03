import NavBar from './components/NavBar'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import HowItWorks from './components/HowItWorks'
import FeaturesChess from './components/FeaturesChess'
import FeaturesGrid from './components/FeaturesGrid'
import Stats from './components/Stats'
import UseCases from './components/UseCases'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

function App() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden selection:bg-cyan-400/30 selection:text-cyan-100">
      <NavBar />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <FeaturesChess />
      <FeaturesGrid />
      <Stats />
      <UseCases />
      <Testimonials />
      <Footer />
    </main>
  )
}

export default App
