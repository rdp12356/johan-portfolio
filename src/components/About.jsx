import { motion as Motion } from 'framer-motion'
import { personalInfo } from '../data/content'
import SectionTitle from './SectionTitle'

function About() {
  return (
    <section id="about" className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          title="A bit about me"
          subtitle="I'm not your typical developer. I'm still in high school, but I spend most of my free time building things that I think are cool."
        />

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 rounded-3xl border border-slate-100 bg-slate-50/50 p-8 dark:border-slate-800 dark:bg-slate-900/30"
        >
          <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            {personalInfo.about}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            I love the feeling of starting with a blank file and ending with something that actually solves a problem. Whether it's an AI bot that automates my social media or a cloud system that I'm still trying to fully understand, I'm always building something new.
          </p>
        </Motion.div>
      </div>
    </section>
  )
}

export default About
