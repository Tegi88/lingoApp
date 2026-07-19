'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { getLanguageOption } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/dashboard',   icon: '📊', key: 'dashboard'  },
  { href: '/vocabulary',  icon: '📖', key: 'vocabulary' },
  { href: '/videos',      icon: '🎬', key: 'videos'     },
  { href: '/chat',        icon: '🤖', key: 'aiTutor'    },
  { href: '/games',       icon: '🎮', key: 'games'      },
]

export default function Sidebar() {
  const pathname   = usePathname()
  const { t, targetLang, nativeLang, uiLang, toggleUILang } = useLanguage()
  const targetOpt  = getLanguageOption(targetLang)
  const nativeOpt  = getLanguageOption(nativeLang)

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full shadow-sm">

      {/* Brand */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌍</span>
          <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            LingoMaster
          </span>
        </div>

        {/* Language pair pill */}
        <div className="mt-3 flex items-center gap-2 bg-violet-50 rounded-lg px-3 py-2">
          <span className="text-lg">{nativeOpt?.flag}</span>
          <span className="text-gray-400 text-sm">→</span>
          <span className="text-lg">{targetOpt?.flag}</span>
          <span className="text-sm font-medium text-violet-700 truncate">{targetOpt?.nativeLabel}</span>
        </div>

        {/* UI Language toggle — EN ⇄ עב */}
        <button
          onClick={toggleUILang}
          title={t('uiLanguage')}
          className="mt-2 w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-violet-50 rounded-lg text-xs text-gray-600 hover:text-violet-700 transition-colors border border-gray-100"
        >
          <span>🌐 {t('uiLanguage')}</span>
          <span className="font-bold bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
            {uiLang === 'en' ? 'EN' : 'עב'}
          </span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-violet-100 text-violet-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {t(item.key)}
            </Link>
          )
        })}
      </nav>

      {/* Change language */}
      <div className="px-3 py-4 border-t border-gray-100">
        <Link
          href="/?change=true"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all"
        >
          <span className="text-xl">⚙️</span>
          {t('changeLanguage')}
        </Link>
      </div>
    </aside>
  )
}
