import { motion as Motion } from 'framer-motion'

function SectionTitle({ eyebrow, title, description }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto mb-12 max-w-2xl text-center"
    >
      <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">{description}</p>
      ) : null}
    </Motion.div>
  )
}

export default SectionTitle

