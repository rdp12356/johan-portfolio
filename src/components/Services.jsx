import { motion as Motion } from 'framer-motion'
import { FiZap, FiTarget, FiBox, FiTrendingUp } from 'react-icons/fi'
import SectionTitle from './SectionTitle'

const services = [
  {
    title: 'AI Automation',
    desc: 'Building autonomous workflows with n8n and AI agents to automate business processes.',
    icon: FiZap,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10'
  },
  {
    title: 'Web Architect',
    desc: 'Scalable, high-performance web applications built with React and modern cloud backends.',
    icon: FiBox,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
  {
    title: 'Data Systems',
    desc: 'Structured database architectures and real-time data streaming for robust applications.',
    icon: FiTarget,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  },
  {
    title: 'Growth Tools',
    desc: 'Developing custom SaaS tools and automation scripts that drive user engagement and revenue.',
    icon: FiTrendingUp,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10'
  }
]

function Services() {
  return (
    <section id="services" className="px-6 py-24 sm:px-8 bg-slate-50 dark:bg-slate-950/50 transition-colors">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="Solutions"
          subtitle="How I help teams and businesses build the future."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${s.bg} ${s.color} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                <s.icon size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">{s.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{s.desc}</p>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
