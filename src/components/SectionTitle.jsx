import { motion as Motion } from 'framer-motion'

function SectionTitle({ title, subtitle, centered = true }) {
  return (
    <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
      <Motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 backdrop-blur-md"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
        {title}
      </Motion.div>
      
      <Motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-6 text-4xl font-black tracking-tighter text-slate-900 dark:text-white sm:text-5xl md:text-6xl"
      >
        {subtitle}
      </Motion.h2>
    </div>
  )
}

export default SectionTitle
