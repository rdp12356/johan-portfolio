import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import ProjectOrbit from './components/ProjectOrbit'
import Activity from './components/Activity'
import SkillsEngine from './components/SkillsEngine'
import Exploring from './components/Exploring'
import FunSection from './components/FunSection'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SecretEngine from './components/SecretEngine'

function App() {
  useEffect(() => {
    // Smooth scroll offset adjustment for fixed navbar
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const targetId = this.getAttribute('href').slice(1)
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          const offset = 80
          const bodyRect = document.body.getBoundingClientRect().top
          const elementRect = targetElement.getBoundingClientRect().top
          const elementPosition = elementRect - bodyRect
          const offsetPosition = elementPosition - offset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        }
      })
    })
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 selection:bg-cyan-500/30 dark:bg-black dark:text-slate-300">
      <Navbar />
      <main>
        <Hero />
        <About />
        <ProjectOrbit />
        <Activity />
        <SkillsEngine />
        <Exploring />
        <FunSection />
        <Contact />
      </main>
      <Footer />
      <SecretEngine />
    </div>
  )
}

export default App
