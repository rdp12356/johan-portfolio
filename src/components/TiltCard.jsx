import { useState } from 'react'
import { motion as Motion } from 'framer-motion'

function TiltCard({ className = '', children }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    const rotateY = (px - 0.5) * 16
    const rotateX = (0.5 - py) * 16
    setRotation({ x: rotateX, y: rotateY })
  }

  const handleLeave = () => {
    setRotation({ x: 0, y: 0 })
  }

  return (
    <Motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ rotateX: rotation.x, rotateY: rotation.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 20, mass: 0.8 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={`tilt-card ${className}`}
    >
      <div style={{ transform: 'translateZ(24px)' }}>{children}</div>
      <span className="tilt-shine" aria-hidden="true" />
    </Motion.div>
  )
}

export default TiltCard
