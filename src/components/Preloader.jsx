import { AnimatePresence, motion } from 'framer-motion'

const Motion = motion

function Preloader({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading ? (
        <Motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
        >
          <Motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: [0.98, 1.06, 1], opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="text-center"
          >
            <p className="text-5xl font-semibold tracking-[0.2em] text-white">JM</p>
            <Motion.div
              initial={{ width: 0 }}
              animate={{ width: 160 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              className="mx-auto mt-4 h-px bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400"
            />
          </Motion.div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default Preloader
