import React from 'react'
import { motion as Motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { useGitHubData } from '../hooks/useGitHubData'

function RepoCard({ title, description, stars, forks, language, color, url }) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-6 backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-cyan-500/50"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tighter group-hover:text-cyan-500 transition-colors">{title}</h4>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
            <svg className="w-3 h-3 fill-amber-400" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>
            {stars}
          </span>
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${color}`} />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{language}</span>
        </div>
      </div>
    </a>
  )
}

function GitHubActivity() {
  const username = 'rdp12356'
  const { languages, topics, loading } = useGitHubData(username)
  const [imageErrors, setImageErrors] = React.useState({})

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }))
  }

  return (
    <section id="github" className="px-6 py-24 sm:px-8 bg-white dark:bg-black transition-colors relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.05),transparent_50%)]" />
      
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="Live Pulse"
          subtitle="Real-time contribution data and repository insights fetched from GitHub."
        />

        {/* Recruiter Executive Summary */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 mb-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Commits', value: '1.2k+', color: 'text-cyan-500' },
            { label: 'Live Projects', value: '15+', color: 'text-purple-500' },
            { label: 'Pull Requests', value: '45+', color: 'text-emerald-500' },
            { label: 'Building Since', value: '2022', color: 'text-rose-500' },
          ].map((stat, i) => (
            <div key={stat.label} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-6 text-center backdrop-blur-sm transition-transform hover:scale-[1.02]">
              <p className={`text-2xl font-black ${stat.color} tracking-tighter`}>{stat.value}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </Motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Main Stats Card */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-8 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Contribution Overview</h3>
              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-cyan-500 animate-pulse">Live</span>
            </div>
            
            <div className="flex justify-center">
              {/* Using a different provider that is more stable */}
              <img 
                src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&bg_color=00000000&title_color=06b6d4&text_color=94a3b8&icon_color=06b6d4&border_color=00000000&hide_border=true&count_private=true&include_all_commits=true`} 
                alt="GitHub Stats"
                className="w-full max-w-md dark:block hidden"
                onError={(e) => { 
                  if (!e.target.dataset.triedFallback) {
                    e.target.dataset.triedFallback = 'true'
                    e.target.src = `https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=2077` 
                  }
                }}
              />
              <img 
                src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=light&bg_color=00000000&title_color=06b6d4&text_color=475569&icon_color=06b6d4&border_color=00000000&hide_border=true&count_private=true&include_all_commits=true`} 
                alt="GitHub Stats"
                className="w-full max-w-md dark:hidden block"
                onError={(e) => { 
                  if (!e.target.dataset.triedFallback) {
                    e.target.dataset.triedFallback = 'true'
                    e.target.src = `https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=default` 
                  }
                }}
              />
            </div>
          </Motion.div>

          {/* Top Languages Card - Native Implementation */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-8 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Technology Radar</h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Native Pulse</span>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(languages).slice(0, 5).map(([lang, count], i) => {
                  const total = Object.values(languages).reduce((a, b) => a + b, 0)
                  const percentage = Math.round((count / total) * 100)
                  return (
                    <div key={lang} className="group">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{lang}</span>
                        <span className="text-xs font-black text-cyan-500">{percentage}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <Motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                        />
                      </div>
                    </div>
                  )
                })}
                <p className="text-[10px] text-center text-slate-500 font-medium pt-4">
                  Aggregated from {Object.keys(languages).length} distinct technology footprints.
                </p>
              </div>
            )}
          </Motion.div>

          {/* High-Impact Repositories */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-8 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Featured Repositories</h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Project Highlights</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {!imageErrors['repo1'] ? (
                <>
                  <img 
                    src={`https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=johan-portfolio-main&theme=dark&bg_color=00000000&title_color=06b6d4&text_color=94a3b8&icon_color=06b6d4&border_color=00000000&hide_border=true`} 
                    alt="Repo Pin 1"
                    className="w-full dark:block hidden"
                    onError={() => handleImageError('repo1')}
                  />
                  <img 
                    src={`https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=johan-portfolio-main&theme=light&bg_color=00000000&title_color=06b6d4&text_color=475569&icon_color=06b6d4&border_color=00000000&hide_border=true`} 
                    alt="Repo Pin 1"
                    className="w-full dark:hidden block"
                    onError={() => handleImageError('repo1')}
                  />
                </>
              ) : (
                <RepoCard 
                  title="johan-portfolio-main"
                  description="Premium developer portfolio built with React, Tailwind, and Framer Motion. Focused on performance and aesthetics."
                  stars="5+"
                  language="JavaScript"
                  color="bg-yellow-400"
                  url={`https://github.com/${username}/johan-portfolio-main`}
                />
              )}

              {!imageErrors['repo2'] ? (
                <>
                  <img 
                    src={`https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=AuraTune&theme=dark&bg_color=00000000&title_color=06b6d4&text_color=94a3b8&icon_color=06b6d4&border_color=00000000&hide_border=true`} 
                    alt="Repo Pin 2"
                    className="w-full dark:block hidden"
                    onError={() => handleImageError('repo2')}
                  />
                  <img 
                    src={`https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=AuraTune&theme=light&bg_color=00000000&title_color=06b6d4&text_color=475569&icon_color=06b6d4&border_color=00000000&hide_border=true`} 
                    alt="Repo Pin 2"
                    className="w-full dark:hidden block"
                    onError={() => handleImageError('repo2')}
                  />
                </>
              ) : (
                <RepoCard 
                  title="AuraTune"
                  description="A scientifically-tuned binaural beats platform for focus and relaxation. Cross-platform support."
                  stars="3+"
                  language="JavaScript"
                  color="bg-yellow-400"
                  url={`https://github.com/${username}/AuraTune`}
                />
              )}
            </div>
          </Motion.div>

          {/* Streak Stats Card */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-8 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Commit Streak</h3>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Consistent Builder</span>
              </div>
            </div>
            
            <div className="flex justify-center">
              <img 
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark&background=00000000&ring=06b6d4&fire=06b6d4&currStreakLabel=06b6d4&sideNums=94a3b8&sideLabels=94a3b8&dates=94a3b8&hide_border=true`} 
                alt="GitHub Streak"
                className="w-full max-w-2xl dark:block hidden"
              />
              <img 
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=light&background=00000000&ring=06b6d4&fire=06b6d4&currStreakLabel=06b6d4&sideNums=475569&sideLabels=475569&dates=475569&hide_border=true`} 
                alt="GitHub Streak"
                className="w-full max-w-2xl dark:hidden block"
              />
            </div>
          </Motion.div>

          {/* Activity Graph */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-2 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-8 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Contribution Flow</h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Yearly History</span>
            </div>
            <div className="flex justify-center">
              <img 
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=react-dark&bg_color=00000000&color=06b6d4&line=06b6d4&point=06b6d4&hide_border=true`} 
                alt="GitHub Activity Graph"
                className="w-full max-w-4xl dark:block hidden"
              />
              <img 
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=react&bg_color=00000000&color=06b6d4&line=06b6d4&point=06b6d4&hide_border=true`} 
                alt="GitHub Activity Graph"
                className="w-full max-w-4xl dark:hidden block"
              />
            </div>
          </Motion.div>

          {/* Dynamic Tech Ecosystem */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-8 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Real-time Stack</h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Derived from Code</span>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Core Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(languages).slice(0, 10).map(([lang, count]) => (
                      <div key={lang} className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{lang}</span>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500">{count} Repos</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Ecosystem & Tools</p>
                  <div className="flex flex-wrap gap-2">
                    {topics.slice(0, 15).map(topic => (
                      <span key={topic} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs font-bold border border-transparent hover:border-cyan-500/30 hover:text-cyan-500 transition-colors cursor-default">
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

export default GitHubActivity
