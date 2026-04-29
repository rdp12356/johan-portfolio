import { useState, useEffect } from 'react'
import { motion as Motion } from 'framer-motion'
import { FiTerminal, FiX, FiMinus, FiMaximize2 } from 'react-icons/fi'
import { useGitHubData } from '../hooks/useGitHubData'

function LabTerminal() {
  const username = 'rdp12356'
  const { repos, languages, topTopic, loading } = useGitHubData(username)
  const [lines, setLines] = useState([])
  const [index, setIndex] = useState(0)

  const dynamicLogs = [
    '> Initializing JohanOS...',
    '> Loading AI core modules...',
    `> Syncing with GitHub profile: ${username}...`,
    loading ? '> Fetching cloud data...' : `> Data retrieved: ${repos.length} active repositories.`,
    !loading && repos.length > 0 ? `> Deep scanning: ${repos[0].name}...` : null,
    !loading && languages ? `> Stack identified: ${Object.keys(languages).slice(0, 3).join(', ')}.` : null,
    !loading && topTopic ? `> Core Specialization: ${topTopic}...` : null,
    '> Deploying automated workflows...',
    '> Running n8n logic gates...',
    '> Status: All systems operational.',
    '> Building the future...',
  ].filter(Boolean)

  useEffect(() => {
    if (index < dynamicLogs.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, dynamicLogs[index]])
        setIndex(prev => prev + 1)
      }, 800 + Math.random() * 1500)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setLines(['> System reset. Starting new session...'])
        setIndex(0)
      }, 8000)
      return () => clearTimeout(timer)
    }
  }, [index, loading])

  return (
    <Motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-2xl overflow-hidden font-mono"
    >
      {/* Header */}
      <div className="bg-slate-800/50 px-4 py-3 flex items-center justify-between border-b border-slate-700/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
          <FiTerminal />
          <span>Johan-Lab-v2.0</span>
        </div>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Terminal Content */}
      <div className="p-6 h-64 overflow-y-auto space-y-2 text-sm">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-cyan-500 font-bold tracking-tighter shrink-0">~</span>
            <span className={line.includes('reset') ? 'text-slate-500 italic' : 'text-slate-300'}>
              {line}
            </span>
          </div>
        ))}
        <div className="flex gap-3 items-center">
          <span className="text-cyan-500 font-bold">~</span>
          <div className="w-2 h-4 bg-cyan-500 animate-pulse" />
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-slate-950/50 px-6 py-3 border-t border-slate-800 flex justify-between items-center">
        <div className="flex gap-4 text-[9px] font-black uppercase tracking-widest text-slate-600">
          <span>Mem: 16.4GB / 32GB</span>
          <span>CPU: 12%</span>
        </div>
        <div className="text-cyan-500/50 text-[10px]">
          UTF-8
        </div>
      </div>
    </Motion.div>
  )
}

export default LabTerminal
