import { motion as Motion } from 'framer-motion'
import { funFacts } from '../data/content'
import SectionTitle from './SectionTitle'

function FunSection() {
  return (
    <section className="bg-slate-50 px-6 py-24 dark:bg-slate-900/20 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          title="Fun stuff"
          subtitle="Just a few random facts about me and my journey."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {funFacts.map((fact, index) => (
            <Motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-6 rounded-2xl border border-slate-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="text-4xl">{fact.icon}</div>
              <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                {fact.text}
              </p>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FunSection
