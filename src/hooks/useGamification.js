import { useEffect, useMemo, useRef, useState } from 'react'
import { navLinks } from '../data/content'

const LEVEL_XP = 320

const achievementMilestones = [
  { sections: 2, label: 'Curious Explorer' },
  { sections: 4, label: 'Deep Diver' },
  { sections: navLinks.length, label: 'Map Complete' },
]

export function useGamification() {
  const [xp, setXp] = useState(0)
  const [visitedSections, setVisitedSections] = useState([])
  const [achievements, setAchievements] = useState([])
  const [recentEvent, setRecentEvent] = useState('')
  const visitSetRef = useRef(new Set())
  const unlockedRef = useRef(new Set())
  const actionCooldownRef = useRef(new Map())
  const streakRef = useRef({ count: 0, lastVisitAt: 0 })

  const addXp = (amount, reason) => {
    setXp((previous) => previous + amount)
    setRecentEvent(`+${amount} XP · ${reason}`)
  }

  useEffect(() => {
    const timerId = window.setTimeout(() => setRecentEvent(''), 2200)
    return () => window.clearTimeout(timerId)
  }, [recentEvent])

  useEffect(() => {
    const sections = navLinks
      .map((entry) => document.getElementById(entry.id))
      .filter(Boolean)

    if (sections.length === 0) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const id = entry.target.id
          if (!id || visitSetRef.current.has(id)) {
            return
          }

          visitSetRef.current.add(id)
          const now = Date.now()
          const withinComboWindow = now - streakRef.current.lastVisitAt < 32000
          streakRef.current.count = withinComboWindow ? streakRef.current.count + 1 : 1
          streakRef.current.lastVisitAt = now

          const comboBonus = streakRef.current.count >= 3 ? 30 : 0
          addXp(120 + comboBonus, comboBonus ? `${id} discovered (Combo)` : `${id} discovered`)

          const visitedList = Array.from(visitSetRef.current)
          setVisitedSections(visitedList)

          achievementMilestones.forEach((milestone) => {
            if (visitedList.length >= milestone.sections && !unlockedRef.current.has(milestone.label)) {
              unlockedRef.current.add(milestone.label)
              setAchievements((previous) => [...previous, milestone.label])
              addXp(90, `Achievement Unlocked: ${milestone.label}`)
            }
          })
        })
      },
      {
        threshold: 0.5,
        rootMargin: '-10% 0px -30% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const onClick = (event) => {
      const target = event.target instanceof Element ? event.target : null
      if (!target) {
        return
      }

      const clickable = target.closest('a, button')
      if (!clickable) {
        return
      }

      const keyBase = `${clickable.tagName}:${clickable.textContent?.trim() || ''}:${clickable.getAttribute('href') || ''}`
      const now = Date.now()
      const last = actionCooldownRef.current.get(keyBase) || 0
      if (now - last < 2500) {
        return
      }
      actionCooldownRef.current.set(keyBase, now)

      const label = (clickable.textContent || '').toLowerCase()
      const href = clickable.getAttribute('href') || ''

      if (label.includes('live demo')) {
        addXp(80, 'Live Demo Quest')
      } else if (label.includes('github') || href.includes('github.com')) {
        addXp(55, 'Repo Hunter')
      } else if (href.startsWith('mailto:') || label.includes('send message')) {
        addXp(100, 'Connection Initiated')
      } else {
        addXp(15, 'Interaction Bonus')
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const level = Math.floor(xp / LEVEL_XP) + 1
  const xpInLevel = xp % LEVEL_XP
  const xpProgress = Math.min(100, Math.round((xpInLevel / LEVEL_XP) * 100))

  return useMemo(
    () => ({
      xp,
      level,
      xpInLevel,
      xpProgress,
      visitedCount: visitedSections.length,
      totalSections: navLinks.length,
      achievements,
      recentEvent,
    }),
    [achievements, level, recentEvent, visitedSections.length, xp, xpInLevel, xpProgress],
  )
}
