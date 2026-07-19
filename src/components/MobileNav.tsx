'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { getLanguageOption } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/dashboard', icon: '📊', key: 'dashboard' },
  { href: '/vocabulary', icon: '📖', key: 'vocabulary' },
  { href: '/videos', icon: '🎬', key: 'videos' },
  { href: '/chat', icon: '🤖', key: 'aiTutor' },
  { href: '/games', icon: '🎮', key: 'games' },
]

export default function MobileNav() {
  const pathname = usePathname()
  const { t, targetLang, nativeLang, uiLang, toggleUILang } = useLanguage()
  const targetOpt = getLanguageOption(targetLang)
  const nativeOpt = getLanguageOption(nativeLang)

  return (
    <nav className="md:hidden bg-white border-b border-gray-100 flex flex-col">

      {/* Top bar: brand + language controls */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-50">
        <div className="flex items-center gap-1.5">
          <span className="text-base">🌍</span>
          <span className="text-sm font-bold text-violet-600">LingoMaster</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Language pair */}
          <Link
            href="/?change=true"
            className="flex items-center gap-1 bg-violet-50 hover:bg-violet-100 rounded-lg px-2 py-1 transition-colors"
          >
            <span className="text-sm">{nativeOpt?.flag}</span>
            <span className="text-gray-400 text-xs">→</span>
            <span className="text-sm">{targetOpt?.flag}</span>
            <span className="text-xs font-medium text-violet-700 max-w-[60px] truncate">
              {targetOpt?.nativeLabel}
            </span>
          </Link>

          {/* UI language toggle */}
          <button
            onClick={toggleUILang}
            className="flex items-center gap-1 bg-gray-100 hover:bg-violet-100 rounded-lg px-2 py-1 transition-colors"
          >
            <span className="text-xs">🌐</span>
            <span className="text-xs font-bold text-violet-700">
              {uiLang === 'en' ? 'EN' : 'עב'}
            </span>
          </button>
        </div>
      </div>

      {/* Nav items row */}
      <div className="flex items-center px-1 py-1 overflow-x-auto gap-0.5">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-all ${
                active ? 'bg-violet-100 text-violet-700' : 'text-gray-500'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{t(item.key)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
