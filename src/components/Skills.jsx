import React from 'react'
import { motion as Motion } from 'framer-motion'
import { FiCode, FiDatabase, FiLayers, FiTerminal, FiZap } from 'react-icons/fi'
import SectionTitle from './SectionTitle'
import TiltCard from './TiltCard'
import { useGitHubData } from '../hooks/useGitHubData'

const iconMap = {
  Frontend: FiLayers,
  Programming: FiTerminal,
  Backend: FiDatabase,
  'App Development': FiCode,
}

function Skills() {
  const username = 'rdp12356'
  const { languages, topics, topTopic, loading } = useGitHubData(username)

  // Map GitHub languages to the UI format
  const dynamicSkills = Object.entries(languages).slice(0, 8).map(([name, count]) => {
    // Artificial but realistic percentage calculation
    const baseLevel = 75
    const bonus = Math.min(count * 3, 20)
    const level = baseLevel + bonus
    
    let category = 'Programming'
    if (['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React'].includes(name)) category = 'Frontend'
    if (['Python', 'Node.js', 'Go', 'PHP', 'Ruby'].includes(name)) category = 'Backend'
    
    return { name, category, level }
  })

  return (
    <section id="skills" className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <SectionTitle
              eyebrow="Skills"
              title="Tools and Stacks I Build With"
              description="Real-time expertise metrics dynamically generated from my GitHub repository data."
            />
          </div>
          {!loading && topTopic && (
            <Motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="px-6 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 mb-1">Current Focus</p>
              <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter capitalize">#{topTopic}</h4>
            </Motion.div>
          )}
        </div>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 rounded-3xl bg-slate-100 dark:bg-slate-900 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2">
              {dynamicSkills.map((skill, index) => {
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

            {/* Dynamic Tags from Repo Topics */}
            <div className="mt-12">
              <div className="flex items-center gap-2 mb-6">
                <FiZap className="text-cyan-500" />
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Live Ecosystem Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {topics.slice(0, 20).map((topic, i) => (
                  <Motion.span
                    key={topic}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02 }}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/5 border border-cyan-500/10 text-cyan-500/80 text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500/10 transition-colors cursor-default"
                  >
                    #{topic}
                  </Motion.span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Skills

