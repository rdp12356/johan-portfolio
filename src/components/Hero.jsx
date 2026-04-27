import { motion as Motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

function Hero() {
  const scrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32 sm:px-8">
      <div className="hero-gradient" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />

      <Motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        <Motion.p variants={itemVariants} className="text-sm uppercase tracking-[0.35em] text-cyan-300">
          Personal Portfolio
        </Motion.p>

        <Motion.h1
          variants={itemVariants}
          className="mt-5 max-w-4xl text-5xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-6xl md:text-7xl"
        >
          Johan Manoj
        </Motion.h1>

        <Motion.p
          variants={itemVariants}
          className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300 sm:text-xl"
        >
          Student | Developer | Builder
        </Motion.p>

        <Motion.p
          variants={itemVariants}
          className="mt-8 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base"
        >
          Building thoughtful digital products at the intersection of creativity, commerce, and emerging AI.
        </Motion.p>

        <Motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
          <button
            onClick={() => scrollToSection('projects')}
            className="glow-button hover-glow group rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-1 dark:bg-white dark:text-slate-900"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="glow-button hover-glow rounded-full border border-slate-300 bg-white/70 px-7 py-3 text-sm font-semibold text-slate-900 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          >
            Contact Me
          </button>
        </Motion.div>
      </Motion.div>
    </section>
  )
}

export default Hero

