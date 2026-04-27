import { motion as Motion } from 'framer-motion'
import { FiMoon, FiSun } from 'react-icons/fi'
import { navLinks } from '../data/content'

function Navbar({ activeSection, theme, onToggleTheme }) {
  const scrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 shadow-2xl backdrop-blur-xl dark:border-white/15 dark:bg-slate-900/65">
        <button
          onClick={() => scrollToSection('home')}
          className="group inline-flex items-center gap-2 text-sm font-medium text-slate-800 transition hover:text-cyan-500 dark:text-slate-100 dark:hover:text-cyan-300"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/10 text-[11px] tracking-[0.2em] dark:bg-white/10">
            JM
          </span>
          Johan Manoj
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative rounded-full px-3 py-1.5 text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                {isActive ? (
                  <Motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-slate-900/10 dark:bg-white/12"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </button>
            )
          })}
        </div>

        <button
          onClick={onToggleTheme}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 transition hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.34)] dark:border-white/20 dark:bg-white/10 dark:text-slate-100"
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>
      </nav>
    </header>
  )
}

export default Navbar

