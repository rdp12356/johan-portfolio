import { motion as Motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useGitHub } from '../hooks/useGitHub'
import { FiX, FiGithub, FiExternalLink, FiLoader } from 'react-icons/fi'
import SectionTitle from './SectionTitle'

function ProjectOrbit() {
  const { projects, loading, error } = useGitHub()
  const [rotation, setRotation] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isHovering, setIsHovering] = useState(false)

  // Auto-rotation effect
  useEffect(() => {
    if (isHovering || selectedProject || loading) return
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.2)
    }, 30)
    return () => clearInterval(interval)
  }, [isHovering, selectedProject, loading])

  return (
    <section id="projects" className="relative min-h-screen py-24 overflow-hidden bg-white dark:bg-black transition-colors">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle 
          title="The Orbit" 
          subtitle="Dynamic universe of live projects fetched directly from GitHub." 
        />
      </div>

      {loading ? (
        <div className="flex h-[600px] w-full items-center justify-center text-cyan-500">
          <FiLoader className="animate-spin text-4xl" />
        </div>
      ) : error ? (
        <div className="flex h-[600px] w-full flex-col items-center justify-center text-slate-500">
          <p className="text-sm font-bold uppercase tracking-widest mb-4">GitHub Connection Pause</p>
          <p className="text-xs max-w-xs text-center opacity-60">The GitHub API is currently rate-limited or unavailable. Please check back in a few minutes to see the live orbiting projects.</p>
        </div>
      ) : (
        <div className="relative mt-20 flex h-[600px] w-full items-center justify-center">
          {/* Central Hub */}
          <Motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 20px rgba(45, 212, 191, 0.2)',
                '0 0 40px rgba(45, 212, 191, 0.4)',
                '0 0 20px rgba(45, 212, 191, 0.2)'
              ]
            }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="z-10 flex h-32 w-32 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/50 backdrop-blur-xl"
          >
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Johan" 
              alt="Johan" 
              className="h-24 w-24 rounded-full"
            />
          </Motion.div>

          {/* Orbit Paths */}
          <div className="absolute h-[500px] w-[500px] rounded-full border border-slate-200 dark:border-slate-800/50" />
          <div className="absolute h-[300px] w-[300px] rounded-full border border-slate-200 dark:border-slate-800/30" />

          {/* Orbiting Projects */}
          <div 
            className="absolute h-full w-full"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {projects.map((project, index) => {
              const angle = (index * (360 / projects.length)) + rotation
              const radius = 320 // increased distance from center
              const x = radius * Math.cos((angle * Math.PI) / 180)
              const y = radius * Math.sin((angle * Math.PI) / 180)

              return (
                <Motion.div
                  key={project.id}
                  animate={{ x, y }}
                  transition={{ type: 'spring', damping: 20 }}
                  className="absolute left-1/2 top-1/2 -ml-20 -mt-20"
                >
                  <Motion.div
                    whileHover={{ scale: 1.1, zIndex: 50 }}
                    onClick={() => setSelectedProject(project)}
                    className="group relative h-40 w-40 cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-slate-900/50 p-4 backdrop-blur-lg transition-all hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent dark:from-black/90" />
                    <div className="relative flex h-full flex-col justify-end">
                      <h3 className="text-[10px] font-black text-slate-900 dark:text-white truncate uppercase tracking-tighter">{project.title}</h3>
                      <div className="mt-2 flex gap-1">
                        {project.tech.map(t => (
                          <span key={t} className="text-[8px] text-cyan-600 dark:text-cyan-400 font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/10">{t}</span>
                        ))}
                      </div>
                    </div>
                  </Motion.div>
                </Motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60"
            onClick={() => setSelectedProject(null)}
          >
            <Motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute right-6 top-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <FiX size={24} />
              </button>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 aspect-video border border-slate-200 dark:border-slate-700 shadow-inner">
                  <img src={selectedProject.image} alt={selectedProject.title} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{selectedProject.title}</h2>
                  
                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-cyan-500">Description</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{selectedProject.problem}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-purple-500">Tech Stack</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{selectedProject.solution}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Stats</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{selectedProject.result}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <a 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-white py-3 text-xs font-bold text-white dark:text-slate-900 transition-transform hover:scale-[1.02]"
                    >
                      Demo <FiExternalLink />
                    </a>
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-3 text-xs font-bold text-slate-900 dark:text-white transition-transform hover:scale-[1.02]"
                    >
                      Source <FiGithub />
                    </a>
                  </div>
                </div>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProjectOrbit
