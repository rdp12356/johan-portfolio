import { useEffect, useMemo, useState } from 'react'
import About from './components/About'
import AnimatedCursor from './components/AnimatedCursor'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Footer from './components/Footer'
import GamificationHud from './components/GamificationHud'
import Hero from './components/Hero'
import InteractiveBackground from './components/InteractiveBackground'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import Projects from './components/Projects'
import Skills from './components/Skills'
import { navLinks } from './data/content'
import { useActiveSection } from './hooks/useActiveSection'
import { useGamification } from './hooks/useGamification'
import { useTheme } from './hooks/useTheme'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { theme, toggleTheme } = useTheme()
  const sectionIds = useMemo(() => navLinks.map((link) => link.id), [])
  const activeSection = useActiveSection(sectionIds)
  const game = useGamification()

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setIsLoading(false)
    }, 1300)

    return () => window.clearTimeout(timerId)
  }, [])

  return (
    <div className="min-h-screen text-slate-900 transition-colors duration-500 dark:text-slate-100">
      <InteractiveBackground />
      <AnimatedCursor />
      <Preloader isLoading={isLoading} />
      <Navbar activeSection={activeSection} theme={theme} onToggleTheme={toggleTheme} />
      <GamificationHud game={game} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
