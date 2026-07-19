'use client'

import { useLanguage } from '@/context/LanguageContext'
import { useProgress } from '@/context/ProgressContext'
import { getLanguageOption } from '@/lib/utils'
import Link from 'next/link'

const QUICK_ACTIONS = [
  { href: '/vocabulary', icon: '📖', key: 'vocabulary', color: 'from-violet-500 to-purple-600' },
  { href: '/videos', icon: '🎬', key: 'videos', color: 'from-blue-500 to-indigo-600' },
  { href: '/chat', icon: '🤖', key: 'aiTutor', color: 'from-emerald-500 to-teal-600' },
  { href: '/games', icon: '🎮', key: 'games', color: 'from-orange-500 to-red-600' },
]

export default function DashboardPage() {
  const { t, targetLang, nativeLang } = useLanguage()
  const { stats } = useProgress()
  const targetLangOpt = getLanguageOption(targetLang)
  const nativeLangOpt = getLanguageOption(nativeLang)

  const progressPercent = Math.min(100, Math.round((stats.wordsLearned / 50) * 100))

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{nativeLangOpt?.flag}</span>
          <span className="text-xl text-white/60">→</span>
          <span className="text-3xl">{targetLangOpt?.flag}</span>
        </div>
        <h1 className="text-2xl font-bold">{t('progress')}</h1>
        <p className="text-white/70 text-sm mt-1">
          Learning {targetLangOpt?.label} from {nativeLangOpt?.label}
        </p>
        <div className="mt-4 bg-white/20 rounded-full h-2">
          <div
            className="bg-white rounded-full h-2 transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-white/70 text-xs mt-1">{progressPercent}% of beginner words mastered</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('wordsLearned'), value: stats.wordsLearned, icon: '📚', color: 'text-violet-600' },
          { label: t('wordsKnown'), value: stats.wordsKnown, icon: '✅', color: 'text-green-600' },
          { label: t('wordsLearning'), value: stats.wordsLearning, icon: '🔄', color: 'text-blue-600' },
          { label: t('videosWatched'), value: stats.videosWatched, icon: '🎬', color: 'text-orange-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Study streak */}
      <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
        <div className="text-4xl">🔥</div>
        <div>
          <div className="text-2xl font-bold text-orange-500">{stats.studyDays}</div>
          <div className="text-sm text-gray-500">{t('studyStreak')}</div>
        </div>
        <div className="ml-auto flex gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-full ${i < stats.studyDays ? 'bg-orange-400' : 'bg-gray-100'}`}
            />
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-base font-semibold text-gray-700 mb-3">Continue Learning</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`bg-gradient-to-br ${action.color} rounded-2xl p-5 text-white flex flex-col items-center gap-2 hover:scale-105 transition-transform shadow-sm`}
            >
              <span className="text-3xl">{action.icon}</span>
              <span className="text-sm font-semibold">{t(action.key)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
