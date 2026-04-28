import { motion as Motion } from 'framer-motion'
import { services } from '../data/content'
import SectionTitle from './SectionTitle'
import { FiCloud, FiLayers, FiCpu, FiZap } from 'react-icons/fi'

const iconMap = {
  Bot: FiZap,
  Cloud: FiCloud,
  Cpu: FiCpu,
  Layout: FiLayers,
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

function Services() {
  return (
    <section id="services" className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="Services"
          subtitle="How I can help your business grow through automation and cloud systems."
        />

        <Motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {services.map((service, index) => {
            const Icon = iconMap[service.icon]
            return (
              <Motion.div
                key={index}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 dark:border-slate-800 dark:bg-slate-900/50"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-500 dark:bg-cyan-500/20">
                    {Icon && <Icon size={24} />}
                  </div>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {service.price}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>
                <div className="mt-8">
                  <a
                    href="#contact"
                    className="inline-flex items-center text-sm font-semibold text-cyan-500 transition-colors hover:text-cyan-400"
                  >
                    Hire Me <span className="ml-2">→</span>
                  </a>
                </div>
              </Motion.div>
            )
          })}
        </Motion.div>
      </div>
    </section>
  )
}

export default Services
