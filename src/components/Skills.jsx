import { motion as Motion } from 'framer-motion'
import { skills } from '../data/content'
import SectionTitle from './SectionTitle'
import { FaReact, FaPython } from 'react-icons/fa'
import { SiTailwindcss, SiSupabase, SiN8N } from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'

const iconMap = {
  React: FaReact,
  Tailwind: SiTailwindcss,
  Supabase: SiSupabase,
  Azure: VscAzure,
  Python: FaPython,
  n8n: SiN8N,
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
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
}

function Skills() {
  return (
    <section id="skills" className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          title="Tools I use"
          subtitle="The tech stack I rely on to bring my ideas to life."
        />

        <Motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6"
        >
          {skills.map((skill, index) => {
            const Icon = iconMap[skill.name]
            return (
              <Motion.div
                key={index}
                variants={itemVariants}
                className="group flex flex-col items-center justify-center rounded-3xl border border-slate-100 bg-white p-8 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="text-4xl text-slate-400 transition-colors group-hover:text-cyan-500 dark:text-slate-600 dark:group-hover:text-cyan-500">
                  {Icon && <Icon />}
                </div>
                <h4 className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                  {skill.name}
                </h4>
              </Motion.div>
            )
          })}
        </Motion.div>
      </div>
    </section>
  )
}

export default Skills
