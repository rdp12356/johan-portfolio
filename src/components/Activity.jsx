import { motion as Motion } from 'framer-motion'
import { useGitHub } from '../hooks/useGitHub'
import { FiGithub, FiActivity, FiGitCommit, FiLoader } from 'react-icons/fi'
import SectionTitle from './SectionTitle'

function Activity() {
  const { activity, loading, error } = useGitHub()

  return (
    <section id="activity" className="px-6 py-24 sm:px-8 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-4xl">
        <SectionTitle 
          title="Live Activity" 
          subtitle="Real-time insights directly from my GitHub profile." 
        />

        {loading ? (
          <div className="flex h-64 w-full items-center justify-center text-cyan-500">
            <FiLoader className="animate-spin text-4xl" />
          </div>
        ) : error ? (
          <div className="mt-16 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-12 text-center text-slate-500">
            <p className="text-sm font-black uppercase tracking-widest mb-2">Live Sync Paused</p>
            <p className="text-xs opacity-60">GitHub API rate limit exceeded. Please try again later.</p>
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* GitHub Stats */}
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-8 backdrop-blur-md shadow-sm dark:shadow-none"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiGithub className="text-2xl text-slate-900 dark:text-white" />
                  <h3 className="font-black text-slate-900 dark:text-white text-xl tracking-tighter">GitHub Insights</h3>
                </div>
                <a href="https://github.com/rdp12356" target="_blank" rel="noreferrer" className="text-xs font-bold text-cyan-500 hover:underline">View Profile</a>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 dark:bg-black/40 p-6 border border-slate-100 dark:border-slate-800/50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Public Repos</p>
                  <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">{activity?.stats.repositories || '0'}</p>
                </div>
                <div className="rounded-2xl bg-cyan-500/5 dark:bg-cyan-500/10 p-6 border border-cyan-500/10 dark:border-cyan-500/20 col-span-2 sm:col-span-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-cyan-500">Latest Active Project</p>
                  <p className="mt-2 text-sm font-black text-slate-900 dark:text-white truncate uppercase tracking-tight">
                    {activity?.stats.currentProject || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Latest Commits</p>
                <div className="space-y-3">
                  {activity?.recentCommits.map((commit, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-black/20 p-4 border border-slate-100 dark:border-slate-800/50 hover:border-cyan-500/30 transition-all group">
                      <div className="flex items-center gap-3">
                        <FiGitCommit className="text-cyan-500 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-md">{commit.message}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{commit.repo}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-black">{commit.date}</span>
                    </div>
                  ))}
                  {activity?.recentCommits.length === 0 && (
                    <p className="text-center text-sm text-slate-500 py-4">No recent activity found.</p>
                  )}
                </div>
              </div>
            </Motion.div>

            {/* Real-time Activity Card */}
            <Motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-8 backdrop-blur-md shadow-sm dark:shadow-none relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-8">
                <FiActivity className="text-2xl text-emerald-500" />
                <h3 className="font-black text-slate-900 dark:text-white text-xl tracking-tighter">Status</h3>
              </div>
              
              <div className="space-y-8">
                <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-emerald-500 before:animate-ping">
                  <p className="text-xs font-black text-emerald-500 uppercase tracking-widest">Active Now</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Currently building and refining automated systems.
                  </p>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Kochi, India</p>
                  <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
                    {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Current Local Time</p>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Code Soundtrack</p>
                  <div className="mt-4 flex items-center gap-4 group">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&h=100&fit=crop" alt="Lofi" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">Study Beats</p>
                      <p className="text-[10px] text-slate-500 font-bold">LIVE ON YOUTUBE</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative background pulse */}
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl" />
            </Motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Activity
