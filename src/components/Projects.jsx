import { motion as Motion } from 'framer-motion'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import { projects } from '../data/content'
import SectionTitle from './SectionTitle'
import TiltCard from './TiltCard'

function ProjectCard({ project, index }) {
  return (
    <TiltCard className="h-full">
      <Motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay: index * 0.1 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white transition-all hover:border-cyan-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/50"
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-grow flex-col p-6">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="rounded-full bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
            {project.title}
          </h3>
          
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {project.description}
          </p>

          <div className="mt-6 rounded-2xl bg-cyan-50/50 p-4 dark:bg-cyan-500/5">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Why I built this</p>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300 italic">
              "{project.why}"
            </p>
          </div>

          <div className="mt-auto pt-8 flex gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:-translate-y-1 dark:bg-white dark:text-slate-900"
            >
              Demo <FiArrowUpRight />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-900 transition hover:-translate-y-1 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            >
              Code <FiGithub />
            </a>
          </div>
        </div>
      </Motion.article>
    </TiltCard>
  )
}

function Projects() {
  return (
    <section id="projects" className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="Cool stuff I've built"
          subtitle="Here are some of my favorite projects. Most of them started as an 'I wonder if I can do this' thought."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
