import { useEffect, useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { FiArrowUpRight, FiGithub, FiStar, FiGitBranch } from 'react-icons/fi'
import { defaultProjects } from '../data/content'
import SectionTitle from './SectionTitle'
import TiltCard from './TiltCard'
import { useGitHubData } from '../hooks/useGitHubData'

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'rdp12356'
const defaultProjectsWithDemo = defaultProjects.filter((project) => Boolean(project.liveUrl))

// Helper to normalize GitHub repo data to Project format
function normalizeProject(repo, index) {
  const fallbackImages = [
    'https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
  ]

  return {
    id: repo.id,
    title: repo.name,
    description: repo.description || 'Professional repository developed by Johan Manoj.',
    image: repo.homepage 
      ? `https://api.microlink.io?url=${encodeURIComponent(repo.homepage)}&screenshot=true&meta=false&embed=screenshot.url`
      : fallbackImages[index % fallbackImages.length],
    liveUrl: repo.homepage,
    githubUrl: repo.html_url,
    updatedAt: repo.updated_at,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language
  }
}

function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const [showIframe, setShowIframe] = useState(false)

  useEffect(() => {
    let timer
    if (isHovered && project.liveUrl) {
      timer = setTimeout(() => setShowIframe(true), 800)
    } else {
      setShowIframe(false)
    }
    return () => clearTimeout(timer)
  }, [isHovered, project.liveUrl])

  return (
    <TiltCard className="futuristic-card hover-glow h-full">
      <Motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay: index * 0.08 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group glass-card overflow-hidden h-full flex flex-col"
      >
        <div className="relative overflow-hidden aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className={`h-full w-full object-cover transition duration-700 ${isHovered && project.liveUrl ? 'scale-110 blur-sm opacity-20' : 'scale-100'}`}
          />
          
          <AnimatePresence>
            {showIframe && project.liveUrl && (
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 bg-slate-900"
              >
                <iframe
                  src={project.liveUrl}
                  title={project.title}
                  className="h-[400%] w-[400%] origin-top-left scale-[0.25] pointer-events-none border-none"
                />
                <div className="absolute inset-0 bg-transparent z-20" />
                <div className="absolute bottom-2 right-2 z-30 rounded bg-cyan-500/80 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-tighter">
                  Live Preview
                </div>
              </Motion.div>
            )}
          </AnimatePresence>

          {isHovered && project.liveUrl && !showIframe && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px]">
              <div className="flex flex-col items-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                <span className="text-[10px] font-bold text-cyan-100 uppercase tracking-widest">Loading Live...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-5 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tighter">{project.title}</h3>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                <FiStar className="text-amber-400" />
                {project.stars}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                <FiGitBranch className="text-slate-400" />
                {project.forks}
              </span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3 mb-6">
            {project.description}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500 hover:text-white transition-all"
                  title="Live Demo"
                >
                  <FiArrowUpRight size={18} />
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all"
                title="View Code"
              >
                <FiGithub size={18} />
              </a>
            </div>
            {project.language && (
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500">
                {project.language}
              </span>
            )}
          </div>
        </div>
      </Motion.article>
    </TiltCard>
  )
}

function Projects() {
  // Revert to old style: use the static curated list
  const displayProjects = defaultProjects.map(p => ({
    ...p,
    stars: p.title === 'AuraTune' ? 5 : 8, // Estimated or placeholders for old style
    forks: 2,
    language: p.title === 'AuraTune' ? 'JavaScript' : 'TypeScript'
  }))

  return (
    <section id="projects" className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Portfolio"
          title="Recent Deployments"
          description="High-performance systems and automated solutions curated for precision and impact."
        />

        <div className="grid gap-6 lg:grid-cols-2 max-w-4xl mx-auto">
          {displayProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

