import { motion as Motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { personalInfo } from '../data/content'
import { FiArrowDown, FiZap } from 'react-icons/fi'

const roles = personalInfo.roles

function Typewriter({ words }) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1500)
      return
    }

    if (subIndex === 0 && reverse) {
      setReverse(false)
      setIndex((prev) => (prev + 1) % words.length)
      return
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1))
    }, reverse ? 75 : 150)

    return () => clearTimeout(timeout)
  }, [subIndex, index, reverse, words])

  return (
    <span className="text-cyan-500 font-black">
      {words[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </span>
  )
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 transition-colors">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-white dark:bg-black transition-colors">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(#2dd4bf 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.05),transparent_70%)]" />
      </div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-cyan-500/30 bg-slate-50 dark:bg-cyan-500/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-cyan-400 backdrop-blur-md"
        >
          <FiZap /> Available for new ideas
        </Motion.div>

        <Motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-black text-slate-900 dark:text-white sm:text-7xl lg:text-8xl tracking-tight mt-8"
        >
          Hey, I’m <span className="text-cyan-500">Johan</span> <span className="inline-block animate-bounce">👋</span>
        </Motion.h1>

        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-xl font-bold text-slate-600 dark:text-slate-300 sm:text-2xl md:text-3xl"
        >
          17-year-old <Typewriter words={roles} />
        </Motion.div>

        <Motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-8 max-w-2xl text-base text-slate-500 dark:text-slate-400 sm:text-lg leading-relaxed"
        >
          {personalInfo.tagline}
        </Motion.p>

        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative overflow-hidden rounded-2xl bg-slate-950 dark:bg-white px-10 py-5 text-sm font-black text-white dark:text-slate-950 transition-all hover:scale-105"
          >
            <span className="relative z-10">VIEW PROJECTS</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-transform duration-300 group-hover:translate-x-0 opacity-20" />
          </a>
          <a
            href="#contact"
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-10 py-5 text-sm font-black text-slate-900 dark:text-white backdrop-blur-md transition-all hover:border-cyan-500/50 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            CONTACT ME
          </a>
        </Motion.div>
      </Motion.div>

      <Motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 text-slate-300 dark:text-slate-700"
      >
        <FiArrowDown size={24} />
      </Motion.div>
    </section>
  )
}

export default Hero
