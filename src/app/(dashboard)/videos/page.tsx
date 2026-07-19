'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useProgress } from '@/context/ProgressContext'
import { getVideosByContentType } from '@/lib/video-data'
import { getTranslation, formatDuration } from '@/lib/utils'
import type { Video } from '@/types'

// YouTube IDs verified to be playable (culture-only embed; everything else opens YouTube search)
const PLAYABLE_IDS = new Set([
  'kJQP7kiw5Fk', // Despacito – Luis Fonsi (ES)
  'pRpeEdMmmQ0', // Waka Waka – Shakira (ES)
  'oiKj0Z_Xnjc', // Papaoutai – Stromae (FR)
  'VHoT4N43jK8', // Alors On Danse – Stromae (FR)
  'rzeLynj1GYM', // La Vie en Rose – Édith Piaf (FR)
  'Fpu5a0Bl8eY', // 99 Luftballons – Nena (DE)
  'W3q8Od5qJio', // Du Hast – Rammstein (DE)
  '9bZkp7q19f0', // Gangnam Style – PSY (KO)
  'gdZLi9oWNZg', // BTS – Dynamite (KO)
  'ioNng23DkIM', // BLACKPINK – How You Like That (KO)
  'WMweEpGlu_U', // BTS – Butter (KO)
  'SX_ViT4Ra7k', // Lemon – Kenshi Yonezu (JA)
  'x8VYWazR5mE', // Yoru ni Kakeru – YOASOBI (JA)
  '51xS4yXbryc', // 月亮代表我的心 – Teresa Teng (ZH)
])

type Tab = 'lesson' | 'sentences' | 'culture'

const TABS: { id: Tab; icon: string; labelEn: string; labelHe: string }[] = [
  { id: 'lesson',    icon: '📚', labelEn: 'Lessons',        labelHe: 'שיעורים' },
  { id: 'sentences', icon: '💬', labelEn: 'Short Sentences', labelHe: 'משפטים קצרים' },
  { id: 'culture',   icon: '🎬', labelEn: 'Songs & Shows',   labelHe: 'שירים וסדרות' },
]

export default function VideosPage() {
  const { t, targetLang, nativeLang, uiLang } = useLanguage()
  const { incrementStat } = useProgress()
  const [activeTab, setActiveTab] = useState<Tab>('lesson')
  const [activeVideo, setActiveVideo] = useState<Video | null>(null)
  const [watchedIds, setWatchedIds] = useState<Set<string>>(new Set())

  const videos = getVideosByContentType(targetLang, activeTab)

  const handleWatch = (video: Video) => {
    if (activeVideo?.id === video.id) {
      setActiveVideo(null)
      return
    }
    if (!watchedIds.has(video.id)) {
      setWatchedIds((prev) => new Set([...prev, video.id]))
      incrementStat('videosWatched')
    }
    if (video.content_type === 'culture' && PLAYABLE_IDS.has(video.youtube_id)) {
      setActiveVideo(video)
    } else {
      window.open(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(getTranslation(video.title, 'en'))}`,
        '_blank',
        'noopener,noreferrer'
      )
    }
  }

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    setActiveVideo(null)
  }

  const tabLabel = (tab: typeof TABS[number]) =>
    uiLang === 'he' ? tab.labelHe : tab.labelEn

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('videos')}</h1>
        <p className="text-gray-500 text-sm mt-1">
          {uiLang === 'he' ? 'צפה ולמד דרך שיעורים, משפטים קצרים ושירים וסדרות'
                           : 'Watch and learn through lessons, short sentences, songs & shows'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-white text-violet-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tabLabel(tab)}</span>
          </button>
        ))}
      </div>

      {/* Tab description */}
      <TabDescription tab={activeTab} uiLang={uiLang} count={videos.length} />

      {/* Embedded video player */}
      {activeVideo && (
        <div className="bg-black rounded-2xl overflow-hidden shadow-xl">
          <div className="relative" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtube_id}?autoplay=1&rel=0&modestbranding=1`}
              title={getTranslation(activeVideo.title, nativeLang)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="p-4 text-white">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h2 className="text-lg font-bold leading-tight">
                  {getTranslation(activeVideo.title, nativeLang)}
                </h2>
                <p className="text-gray-300 text-sm mt-1">
                  {getTranslation(activeVideo.description, nativeLang)}
                </p>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-gray-400 hover:text-white text-2xl leading-none flex-shrink-0"
              >
                ×
              </button>
            </div>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              {activeVideo.source_label && (
                <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full font-medium">
                  {activeVideo.source_label}
                </span>
              )}
              {activeVideo.duration_seconds && (
                <span className="text-xs text-gray-400">
                  {formatDuration(activeVideo.duration_seconds)}
                </span>
              )}
              <DifficultyBadge difficulty={activeVideo.difficulty} />
              <a
                href={`https://www.youtube.com/watch?v=${activeVideo.youtube_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full transition-colors"
              >
                ↗ YouTube
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Video grid */}
      {videos.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">🎬</div>
          <p>{uiLang === 'he' ? 'אין סרטונים זמינים לקטגוריה זו' : 'No videos available for this category yet.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              nativeLang={nativeLang}
              watched={watchedIds.has(video.id)}
              active={activeVideo?.id === video.id}
              isEmbeddable={video.content_type === 'culture' && PLAYABLE_IDS.has(video.youtube_id)}
              onClick={() => handleWatch(video)}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function TabDescription({ tab, uiLang, count }: { tab: Tab; uiLang: string; count: number }) {
  const descriptions: Record<Tab, { en: string; he: string; color: string }> = {
    lesson: {
      en: 'Structured video lessons covering vocabulary, grammar and pronunciation.',
      he: 'שיעורי וידאו מובנים לאוצר מילים, דקדוק והגייה.',
      color: 'bg-blue-50 border-blue-100 text-blue-700',
    },
    sentences: {
      en: 'Short clips focused on daily phrases and real conversations.',
      he: 'קטעים קצרים המתמקדים בביטויים יומיומיים ושיחות אמיתיות.',
      color: 'bg-green-50 border-green-100 text-green-700',
    },
    culture: {
      en: 'Learn naturally through songs, TV shows and movies in your target language.',
      he: 'למד באופן טבעי דרך שירים, סדרות וסרטים בשפת הלימוד.',
      color: 'bg-purple-50 border-purple-100 text-purple-700',
    },
  }
  const d = descriptions[tab]
  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border text-sm ${d.color}`}>
      <span className="font-medium flex-1">{uiLang === 'he' ? d.he : d.en}</span>
      <span className="font-bold whitespace-nowrap">
        {count} {uiLang === 'he' ? 'סרטונים' : 'videos'}
      </span>
    </div>
  )
}

function VideoCard({
  video, nativeLang, watched, active, isEmbeddable, onClick, t,
}: {
  video: Video
  nativeLang: string
  watched: boolean
  active: boolean
  isEmbeddable: boolean
  onClick: () => void
  t: (k: string) => string
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-all group ${
        active ? 'border-violet-400 ring-2 ring-violet-200' : 'border-gray-100'
      }`}
    >
      {/* Thumbnail */}
      <div className="relative bg-gradient-to-br from-violet-600 to-indigo-700 h-36 flex items-center justify-center overflow-hidden">
        <img
          src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
          alt={getTranslation(video.title, nativeLang)}
          className="w-full h-full object-cover absolute inset-0 transition-transform group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
        {/* Play button */}
        <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
          active ? 'bg-violet-500' : 'bg-white/90'
        }`}>
          <span className={`text-xl ${isEmbeddable ? 'ml-1' : ''} ${active ? 'text-white' : 'text-gray-800'}`}>
            {active ? '⏸' : isEmbeddable ? '▶' : '↗'}
          </span>
        </div>
        {/* Badges */}
        {watched && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium z-10">
            {t('completed')}
          </div>
        )}
        {video.source_label && (
          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full z-10">
            {video.source_label}
          </div>
        )}
        {video.duration_seconds && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded z-10">
            {formatDuration(video.duration_seconds)}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
          {getTranslation(video.title, nativeLang)}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {getTranslation(video.description, nativeLang)}
        </p>
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <DifficultyBadge difficulty={video.difficulty} />
          <span className="text-xs text-gray-400 capitalize">{video.category}</span>
        </div>
      </div>
    </button>
  )
}

function DifficultyBadge({ difficulty }: { difficulty: number }) {
  const colors = ['', 'bg-green-100 text-green-700', 'bg-blue-100 text-blue-700', 'bg-yellow-100 text-yellow-700', 'bg-orange-100 text-orange-700', 'bg-red-100 text-red-700']
  const labels = ['', 'Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert']
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[difficulty]}`}>
      {labels[difficulty]}
    </span>
  )
}
