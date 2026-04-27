import { useEffect, useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import { defaultProjects } from '../data/content'
import { GITHUB_SELECTED_REPOS, GITHUB_REPO_IMAGES } from '../data/config'
import { supabase } from '../lib/supabase'
import SectionTitle from './SectionTitle'
import TiltCard from './TiltCard'

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'rdp12356'
const defaultProjectsWithDemo = defaultProjects.filter((project) => Boolean(project.liveUrl))

function formatUpdatedDate(dateValue) {
  if (!dateValue) {
    return ''
  }

  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function normalizeRepo(repo, index) {
  const fallbackImages = [
    'https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80',
  ]

  const liveUrl = repo.homepage || ''
  const customImage = GITHUB_REPO_IMAGES[repo.name]

  // Use manual override first, then screenshot API if liveUrl exists, finally fallback
  let image = fallbackImages[index % fallbackImages.length]
  if (customImage) {
    image = customImage
  } else if (liveUrl) {
    image = `https://api.microlink.io?url=${encodeURIComponent(liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`
  }

  return {
    id: repo.name.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
    title: repo.name,
    description: repo.description || 'Project repository by Johan Manoj.',
    image,
    liveUrl,
    githubUrl: repo.html_url,
    stars: repo.stargazers_count || 0,
    updatedAt: repo.updated_at,
  }
}

async function fetchGitHubProjects() {
  try {
    const reposParam = GITHUB_SELECTED_REPOS.length > 0 
      ? `&repos=${encodeURIComponent(GITHUB_SELECTED_REPOS.join(','))}` 
      : ''
    const endpointResponse = await fetch(`/api/github-projects?username=${encodeURIComponent(GITHUB_USERNAME)}&limit=10${reposParam}`)
    if (endpointResponse.ok) {
      const payload = await endpointResponse.json()
      if (Array.isArray(payload.projects) && payload.projects.length > 0) {
        return payload.projects
      }
    }
  } catch {
    // Ignore endpoint errors and fallback to direct GitHub API fetch.
  }

  try {
    const directResponse = await fetch(
      `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/repos?sort=updated&per_page=100`,
    )
    if (!directResponse.ok) {
      return []
    }

    const repos = await directResponse.json()
    if (!Array.isArray(repos) || repos.length === 0) {
      return []
    }

    return repos
      .filter((repo) => {
        const isSelected = GITHUB_SELECTED_REPOS.some(
          (name) => name.toLowerCase() === repo.name.toLowerCase(),
        )
        if (GITHUB_SELECTED_REPOS.length > 0) {
          return isSelected
        }
        return !repo.fork && typeof repo.homepage === 'string' && repo.homepage.trim().length > 0
      })
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 10)
      .map(normalizeRepo)
  } catch {
    return []
  }
}

async function fetchProjects() {
  const githubProjects = await fetchGitHubProjects()
  if (githubProjects.length > 0) {
    return githubProjects
  }

  if (!supabase) {
    return defaultProjectsWithDemo
  }

  const { data, error } = await supabase
    .from('projects')
    .select('id, title, description, image, live_url, github_url, created_at')
    .order('created_at', { ascending: false })

  if (error || !data || data.length === 0) {
    return defaultProjectsWithDemo
  }

  const supabaseProjects = data
    .filter((project) => typeof project.live_url === 'string' && project.live_url.trim().length > 0)
    .map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      image: project.image,
      liveUrl: project.live_url,
      githubUrl: project.github_url,
      updatedAt: project.created_at,
    }))

  return supabaseProjects.length > 0 ? supabaseProjects : defaultProjectsWithDemo
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
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.title}</h3>
          {project.updatedAt ? (
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300 font-medium">
              Updated {formatUpdatedDate(project.updatedAt)}
            </p>
          ) : null}
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">{project.description}</p>

          <div className="mt-auto pt-6 flex gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="glow-button hover-glow inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-1 dark:bg-white dark:text-slate-900"
              >
                Live Demo <FiArrowUpRight />
              </a>
            ) : null}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="glow-button hover-glow inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-900 transition hover:-translate-y-1 hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              GitHub <FiGithub />
            </a>
          </div>
        </div>
      </Motion.article>
    </TiltCard>
  )
}

function Projects() {
  const [projects, setProjects] = useState(defaultProjectsWithDemo)

  useEffect(() => {
    let mounted = true

    fetchProjects().then((result) => {
      if (mounted) {
        setProjects(result)
      }
    })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <section id="projects" className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Projects"
          title="Selected Work"
          description="A snapshot of projects I have built across social impact, productivity, and education domains."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

