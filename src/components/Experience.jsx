import { useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { defaultProjects, timeline } from '../data/content'
import { GITHUB_SELECTED_REPOS } from '../data/config'
import SectionTitle from './SectionTitle'
import TiltCard from './TiltCard'

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'rdp12356'

function formatDateLabel(dateValue) {
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

function toTimelineFromProjects(projects) {
  return projects
    .filter((project) => Boolean(project.updatedAt))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)
    .map((project) => {
      const date = new Date(project.updatedAt)
      const year = Number.isNaN(date.getTime()) ? 'Recent' : String(date.getFullYear())
      const dateLabel = formatDateLabel(project.updatedAt)

      return {
        year,
        title: `${project.title} Updated`,
        details: dateLabel
          ? `Latest public update on ${dateLabel}. ${project.description}`
          : project.description,
        githubUrl: project.githubUrl,
      }
    })
}

async function fetchExperienceFromGitHub() {
  try {
    const reposParam = GITHUB_SELECTED_REPOS.length > 0 
      ? `&repos=${encodeURIComponent(GITHUB_SELECTED_REPOS.join(','))}` 
      : ''
    const endpointResponse = await fetch(`/api/github-projects?username=${encodeURIComponent(GITHUB_USERNAME)}&limit=8${reposParam}`)
    if (endpointResponse.ok) {
      const payload = await endpointResponse.json()
      if (Array.isArray(payload.projects) && payload.projects.length > 0) {
        return toTimelineFromProjects(payload.projects)
      }
    }
  } catch {
    // Fall through to other sources.
  }

  return toTimelineFromProjects(defaultProjects)
}

function Experience() {
  const timelineItems = timeline

  return (
    <section id="experience" className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          eyebrow="Experience"
          title="Achievements and Milestones"
          description="A timeline of key student wins, projects, and builder moments."
        />

        <div className="relative ml-2 space-y-8 border-l border-slate-300/80 pl-8 dark:border-white/15">
          {timelineItems.map((item, index) => (
            <TiltCard key={`${item.year}-${item.title}`} className="futuristic-card hover-glow">
              <Motion.article
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative glass-card p-5"
              >
              <span className="absolute -left-[41px] top-7 h-4 w-4 rounded-full border border-cyan-400/70 bg-white dark:border-cyan-300/60 dark:bg-slate-900" />
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">{item.year}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.details}</p>
              {item.githubUrl ? (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glow-button hover-glow mt-4 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-900 transition hover:-translate-y-1 hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  View Repo <FiArrowUpRight />
                </a>
              ) : null}
              </Motion.article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

