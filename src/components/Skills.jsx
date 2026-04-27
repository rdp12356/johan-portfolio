import { motion as Motion } from 'framer-motion'
import { FiCode, FiDatabase, FiLayers, FiTerminal } from 'react-icons/fi'
import { skills } from '../data/content'
import SectionTitle from './SectionTitle'
import TiltCard from './TiltCard'

const iconMap = {
  Frontend: FiLayers,
  Programming: FiTerminal,
  Backend: FiDatabase,
  'App Development': FiCode,
}

function Skills() {
  return (
    <section id="skills" className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Skills"
          title="Tools and Stacks I Build With"
          description="A focused skillset across frontend, app development, and modern backend services."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {skills.map((skill, index) => {
            const Icon = iconMap[skill.category] || FiCode
            return (
              <TiltCard key={skill.name} className="futuristic-card hover-glow">
                <Motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.04 }}
                  whileHover={{ y: -4 }}
                  className="glass-card p-5"
                >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-500 dark:text-cyan-300">
                      <Icon size={18} />
                    </span>
                    <div>
                      <h3 className="text-base font-medium text-slate-900 dark:text-white">{skill.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{skill.category}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{skill.level}%</p>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-300/50 dark:bg-white/10">
                  <Motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.9, delay: 0.15 + index * 0.04, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400"
                  />
                </div>
                </Motion.article>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills

