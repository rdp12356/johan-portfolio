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

function SkillsEngine() {
  return (
    <section id="skills" className="px-6 py-24 sm:px-8 bg-white dark:bg-black transition-colors">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          title="Skills Engine"
          subtitle="The technologies powering my automated universe."
        />

        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2">
          {skills.map((skill, index) => {
            const Icon = iconMap[skill.name]
            return (
              <Motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-2xl text-slate-400 transition-colors group-hover:border-cyan-500/50 group-hover:text-cyan-500">
                      {Icon && <Icon />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">{skill.name}</h4>
                    </div>
                  </div>
                  <span className="text-xs font-black text-slate-400 group-hover:text-cyan-500 transition-colors uppercase tracking-widest">
                    {skill.level}% Mastery
                  </span>
                </div>
                
                {/* Custom Progress Bar */}
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/50 p-[2px]">
                  <Motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: index * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  />
                </div>
              </Motion.div>
            )
          })}
        </div>

        {/* Professional Quote */}
        <Motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-10 text-center"
        >
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium italic leading-relaxed">
            "I don't just learn tools; I learn how to bend them to my will to build things that matter."
          </p>
          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">— BUILDER ETHOS</p>
        </Motion.div>
      </div>
    </section>
  )
}

export default SkillsEngine
