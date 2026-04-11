import { motion as Motion } from 'framer-motion'
import { FiCpu, FiGlobe, FiSmartphone } from 'react-icons/fi'
import SectionTitle from './SectionTitle'
import TiltCard from './TiltCard'

const highlights = [
  { title: 'Web Dev', icon: FiGlobe },
  { title: 'AI Tools', icon: FiCpu },
  { title: 'App Development', icon: FiSmartphone },
]

function About() {
  return (
    <section id="about" className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="About"
          title="Commerce Student, Tech-First Mindset"
          description="I am Johan Manoj, a commerce student passionate about technology, AI workflows, and building products that solve practical problems for real users."
        />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <TiltCard className="futuristic-card hover-glow">
            <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-7 sm:p-8"
          >
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              I enjoy blending analytical thinking with design clarity. From web interfaces to productivity apps,
              I focus on clean architecture, smooth UX, and tools that scale with user needs.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <Motion.div
                  key={item.title}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="futuristic-card rounded-2xl border border-slate-300/60 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <item.icon className="text-cyan-300" size={20} />
                  <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">{item.title}</p>
                </Motion.div>
              ))}
            </div>
          </Motion.div>
          </TiltCard>

          <TiltCard className="futuristic-card hover-glow">
            <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="group glass-card flex items-center justify-center p-4"
          >
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
              alt="Johan Manoj profile"
              className="h-[320px] w-full rounded-2xl object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </Motion.div>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}

export default About

