import { motion as Motion } from 'framer-motion'
import { achievements } from '../data/content'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

function Results() {
  return (
    <section id="results" className="bg-slate-50 px-6 py-24 dark:bg-slate-900/30 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {achievements.map((item, index) => (
            <Motion.div key={index} variants={itemVariants} className="text-center">
              <h3 className="text-4xl font-bold text-cyan-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] md:text-5xl">{item.value}</h3>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {item.label}
              </p>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </section>
  )
}

export default Results
