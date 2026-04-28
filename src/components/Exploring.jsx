import { motion as Motion } from 'framer-motion'
import { exploring } from '../data/content'
import SectionTitle from './SectionTitle'
import { FiZap, FiCloud, FiDollarSign } from 'react-icons/fi'

const iconMap = {
  Zap: FiZap,
  Cloud: FiCloud,
  DollarSign: FiDollarSign,
}

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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function Exploring() {
  return (
    <section id="exploring" className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          title="Currently Exploring"
          subtitle="Learning never stops. Here are the things I'm currently obsessed with."
        />

        <Motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {exploring.map((item, index) => {
            const Icon = iconMap[item.icon]
            return (
              <Motion.div
                key={index}
                variants={itemVariants}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-cyan-200 dark:border-slate-800 dark:bg-slate-900/50"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500 dark:bg-cyan-500/10">
                  {Icon && <Icon size={20} />}
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </Motion.div>
            )
          })}
        </Motion.div>
      </div>
    </section>
  )
}

export default Exploring
