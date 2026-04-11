import { useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import { defaultProjects } from '../data/content'
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

  return {
    id: repo.name.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
    title: repo.name,
    description: repo.description || 'Project repository by Johan Manoj.',
    image: fallbackImages[index % fallbackImages.length],
    liveUrl: repo.homepage || '',
    githubUrl: repo.html_url,
    stars: repo.stargazers_count || 0,
    updatedAt: repo.updated_at,
  }
}

async function fetchGitHubProjects() {
  try {
    const endpointResponse = await fetch(`/api/github-projects?username=${encodeURIComponent(GITHUB_USERNAME)}&limit=6`)
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
      .filter((repo) => !repo.fork && typeof repo.homepage === 'string' && repo.homepage.trim().length > 0)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 6)
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
            <TiltCard key={project.id} className="futuristic-card hover-glow">
              <Motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group glass-card overflow-hidden"
              >
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                  {project.updatedAt ? (
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
                      Updated {formatUpdatedDate(project.updatedAt)}
                    </p>
                  ) : null}
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>

                  <div className="mt-6 flex gap-3">
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

