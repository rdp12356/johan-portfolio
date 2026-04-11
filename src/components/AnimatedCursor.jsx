import { useEffect, useState } from 'react'
import { motion as Motion, useMotionValue, useSpring } from 'framer-motion'

function AnimatedCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const ringX = useSpring(cursorX, { stiffness: 320, damping: 28, mass: 0.5 })
  const ringY = useSpring(cursorY, { stiffness: 320, damping: 28, mass: 0.5 })
  const dotX = useSpring(cursorX, { stiffness: 750, damping: 45, mass: 0.25 })
  const dotY = useSpring(cursorY, { stiffness: 750, damping: 45, mass: 0.25 })

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')
    if (!media.matches) {
      return undefined
    }

    const onMouseMove = (event) => {
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
      if (!isVisible) {
        setIsVisible(true)
      }

      const target = event.target
      if (target instanceof Element) {
        const hoveredInteractive = target.closest('a, button, input, textarea, [data-cursor="hover"]')
        setIsPointer(Boolean(hoveredInteractive))
      }
    }

    const onMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [cursorX, cursorY, isVisible])

  return (
    <>
      <Motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width: isPointer ? 58 : 34,
          height: isPointer ? 58 : 34,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      >
        <div className="h-full w-full rounded-full border border-cyan-300/80 bg-cyan-300/10 shadow-[0_0_26px_rgba(34,211,238,0.45)]" />
      </Motion.div>

      <Motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[81] hidden md:block"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isPointer ? 1.3 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.95)]" />
      </Motion.div>
    </>
  )
}

export default AnimatedCursor
