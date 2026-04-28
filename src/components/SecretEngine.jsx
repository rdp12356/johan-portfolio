import { motion as Motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FiX, FiCpu, FiZap, FiCode, FiTerminal } from 'react-icons/fi'

function SecretEngine() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')

  useEffect(() => {
    const handleKeydown = (e) => {
      const newInput = (input + e.key.toLowerCase()).slice(-5)
      setInput(newInput)
      if (newInput === 'johan') {
        setIsOpen(true)
        setInput('')
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [input])

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-2xl bg-black/80"
          onClick={() => setIsOpen(false)}
        >
          <Motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-[3rem] border border-cyan-500/30 bg-black p-12 text-white shadow-2xl shadow-cyan-500/20"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute right-8 top-8 text-slate-500 hover:text-white transition-colors"
            >
              <FiX size={32} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 text-4xl mb-8">
                <FiTerminal />
              </div>
              <h2 className="text-5xl font-black tracking-tighter mb-4 uppercase">Johan's Lab 🧪</h2>
              <p className="text-cyan-400 font-mono text-sm tracking-widest mb-12">EXPERIMENTAL SYSTEMS ACCESS GRANTED</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
                {[
                  { icon: FiCpu, title: 'Neural Automation', desc: 'Developing self-healing n8n nodes for complex error handling.' },
                  { icon: FiZap, title: 'Velocity Engine', desc: 'Custom cloud deployment scripts for sub-second cold starts.' },
                  { icon: FiCode, title: 'Aura UI Framework', desc: 'A proprietary React library for glassmorphic interfaces.' },
                ].map((lab, i) => (
                  <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all group">
                    <lab.icon className="text-3xl text-cyan-500 mb-6 group-hover:scale-110 transition-transform" />
                    <h4 className="font-black text-xl mb-3 tracking-tight">{lab.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{lab.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-8 border-t border-white/10 w-full">
                <p className="text-[10px] font-mono text-slate-600 tracking-[0.5em] uppercase italic">
                  Systems stable. All builders welcome.
                </p>
              </div>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  )
}

export default SecretEngine
