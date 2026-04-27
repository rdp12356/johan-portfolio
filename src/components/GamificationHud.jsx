import { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { FiAward, FiTarget, FiZap, FiChevronUp, FiChevronDown } from 'react-icons/fi'

function GamificationHud({ game }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <Motion.aside
        initial={false}
        animate={{ 
          width: isExpanded ? 290 : 85,
          height: isExpanded ? 'auto' : 40,
          borderRadius: isExpanded ? 20 : 20,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-5 right-5 z-[70] overflow-hidden border border-cyan-400/30 bg-slate-950/80 text-white shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_20px_rgba(34,211,238,0.2)] backdrop-blur-xl"
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between p-2.5 px-3 outline-none"
        >
          <div className="flex items-center gap-2.5">
            <FiZap className={`text-cyan-300 transition-transform ${isExpanded ? 'rotate-12' : 'animate-pulse'}`} size={14} />
            <span className="text-[11px] font-bold tracking-wider text-cyan-100 whitespace-nowrap">LV {game.level}</span>
          </div>
          {isExpanded ? <FiChevronDown className="text-slate-400" /> : <FiChevronUp className="text-slate-400" />}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <Motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-4 pt-0"
            >
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <Motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${game.xpProgress}%` }}
                />
              </div>
              <p className="mt-2 text-[10px] tracking-tight text-slate-400">
                XP: {game.xpInLevel} / 320 to Level {game.level + 1}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-[10px]">
                <div className="rounded-lg border border-white/5 bg-white/5 p-2 transition-colors hover:bg-white/10">
                  <p className="text-slate-500 uppercase tracking-tighter font-medium">Visited</p>
                  <p className="mt-0.5 flex items-center gap-1.5 font-bold text-cyan-200">
                    <FiTarget size={12} className="text-cyan-400" /> {game.visitedCount}/{game.totalSections}
                  </p>
                </div>
                <div className="rounded-lg border border-white/5 bg-white/5 p-2 transition-colors hover:bg-white/10">
                  <p className="text-slate-500 uppercase tracking-tighter font-medium">Streak</p>
                  <p className="mt-0.5 flex items-center gap-1.5 font-bold text-orange-300">
                    <FiZap size={12} className="text-orange-400" /> {game.streak}x
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[9px] uppercase tracking-[0.15em] text-slate-500 font-bold mb-2">Active Quests</p>
                <div className="space-y-1.5">
                  {[
                    { label: 'Explore Sections', done: game.visitedCount >= 3 },
                    { label: 'View 2 Live Demos', done: false }, // Logic for this can be added later
                    { label: 'Map Completist', done: game.visitedCount === game.totalSections },
                  ].map((quest, i) => (
                    <div key={i} className="flex items-center justify-between rounded bg-white/5 px-2 py-1.5">
                      <span className={`text-[10px] ${quest.done ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                        {quest.label}
                      </span>
                      {quest.done ? (
                        <div className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                      ) : (
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {game.achievements.length > 0 ? (
                <div className="mt-4">
                  <p className="text-[9px] uppercase tracking-[0.15em] text-slate-500 font-bold mb-2">Badges</p>
                  <div className="flex flex-wrap gap-1.5">
                    {game.achievements.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-0.5 text-[9px] font-medium text-cyan-50 shadow-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </Motion.div>
          )}
        </AnimatePresence>
      </Motion.aside>

      <AnimatePresence>
        {game.recentEvent ? (
          <Motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 10 }}
            className="fixed bottom-20 right-6 z-[71] rounded-lg border border-cyan-400/40 bg-slate-900/90 px-3 py-1.5 text-[11px] font-medium text-cyan-50 shadow-xl"
          >
            {game.recentEvent}
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default GamificationHud
