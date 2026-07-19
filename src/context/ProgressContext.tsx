'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import type { UserWordProgress, WordStatus, UserStats } from '@/types'

interface ProgressContextValue {
  wordProgress: Record<string, WordStatus>
  updateWordStatus: (wordId: string, status: WordStatus) => void
  stats: UserStats
  incrementStat: (key: keyof UserStats) => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

const STORAGE_KEY = 'lingomaster_progress'

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [wordProgress, setWordProgress] = useState<Record<string, WordStatus>>({})
  const [stats, setStats] = useState<UserStats>({
    wordsLearned: 0,
    wordsKnown: 0,
    wordsLearning: 0,
    videosWatched: 0,
    studyDays: 1,
  })

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      setWordProgress(parsed.wordProgress ?? {})
      setStats(parsed.stats ?? stats)
    }
  }, [])

  const save = (wp: Record<string, WordStatus>, s: UserStats) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ wordProgress: wp, stats: s }))
  }

  const updateWordStatus = useCallback((wordId: string, status: WordStatus) => {
    setWordProgress((prev) => {
      const next = { ...prev, [wordId]: status }
      setStats((prevStats) => {
        const known = Object.values(next).filter((s) => s === 'known').length
        const learning = Object.values(next).filter((s) => s === 'learning').length
        const nextStats = { ...prevStats, wordsKnown: known, wordsLearning: learning, wordsLearned: known + learning }
        save(next, nextStats)
        return nextStats
      })
      return next
    })
  }, [])

  const incrementStat = useCallback((key: keyof UserStats) => {
    setStats((prev) => {
      const next = { ...prev, [key]: prev[key] + 1 }
      setWordProgress((wp) => {
        save(wp, next)
        return wp
      })
      return next
    })
  }, [])

  return (
    <ProgressContext.Provider value={{ wordProgress, updateWordStatus, stats, incrementStat }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}
