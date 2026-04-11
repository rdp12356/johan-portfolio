import { motion as Motion, AnimatePresence } from 'framer-motion'
import { FiAward, FiTarget, FiZap } from 'react-icons/fi'

function GamificationHud({ game }) {
  return (
    <>
      <Motion.aside
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-5 right-4 z-[70] w-[290px] rounded-2xl border border-cyan-300/35 bg-slate-950/70 p-4 text-white shadow-[0_0_30px_rgba(34,211,238,0.28)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Player Level</p>
          <span className="inline-flex items-center gap-1 rounded-full border border-cyan-300/40 px-2 py-1 text-xs text-cyan-200">
            <FiZap size={12} /> Lv {game.level}
          </span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <Motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300"
            animate={{ width: `${game.xpProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <p className="mt-2 text-xs text-slate-300">XP: {game.xpInLevel} / 320</p>

        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl border border-white/15 bg-white/5 p-3">
            <p className="text-slate-400">Sections</p>
            <p className="mt-1 flex items-center gap-1 text-cyan-200">
              <FiTarget size={12} /> {game.visitedCount}/{game.totalSections}
            </p>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/5 p-3">
            <p className="text-slate-400">Achievements</p>
            <p className="mt-1 flex items-center gap-1 text-cyan-200">
              <FiAward size={12} /> {game.achievements.length}
            </p>
          </div>
        </div>

        {game.achievements.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {game.achievements.slice(-2).map((item) => (
              <span
                key={item}
                className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2.5 py-1 text-[11px] text-cyan-100"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </Motion.aside>

      <AnimatePresence>
        {game.recentEvent ? (
          <Motion.div
            initial={{ opacity: 0, y: 16, x: 12 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 10, x: 10 }}
            className="fixed bottom-40 right-4 z-[71] rounded-xl border border-cyan-300/40 bg-slate-900/90 px-4 py-2 text-xs text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.25)]"
          >
            {game.recentEvent}
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default GamificationHud
