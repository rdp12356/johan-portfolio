import { useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'

const particles = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  size: 6 + (index % 5) * 3,
  left: (index * 7.2 + 4) % 100,
  delay: (index % 6) * 0.35,
  duration: 8 + (index % 5) * 2,
}))

function InteractiveBackground() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const onMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 100
      const y = (event.clientY / window.innerHeight) * 100
      setMouse({ x, y })
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  const driftX = (mouse.x - 50) * 0.35
  const driftY = (mouse.y - 50) * 0.35

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Motion.div
        className="absolute -left-40 top-[-10rem] h-96 w-96 rounded-full bg-cyan-400/20 blur-[100px]"
        animate={{ x: driftX, y: driftY, scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Motion.div
        className="absolute -right-24 top-32 h-[26rem] w-[26rem] rounded-full bg-indigo-500/20 blur-[120px]"
        animate={{ x: -driftX, y: -driftY, scale: [1, 1.1, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Motion.div
        className="absolute bottom-[-8rem] left-1/3 h-[22rem] w-[22rem] rounded-full bg-teal-400/20 blur-[100px]"
        animate={{ x: driftX * 0.4, y: -driftY * 0.45, scale: [1, 1.07, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.22)_1px,transparent_0)] [background-size:38px_38px] opacity-25 dark:opacity-20" />

      {particles.map((particle) => (
        <Motion.span
          key={particle.id}
          className="absolute rounded-full bg-cyan-300/50"
          style={{ width: particle.size, height: particle.size, left: `${particle.left}%`, top: '110%' }}
          animate={{ y: ['0vh', '-120vh'], opacity: [0, 0.8, 0] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

export default InteractiveBackground
