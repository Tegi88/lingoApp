'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'

const NAV_ITEMS = [
  { href: '/dashboard', icon: '📊', key: 'dashboard' },
  { href: '/vocabulary', icon: '📖', key: 'vocabulary' },
  { href: '/videos', icon: '🎬', key: 'videos' },
  { href: '/chat', icon: '🤖', key: 'aiTutor' },
  { href: '/games', icon: '🎮', key: 'games' },
]

export default function MobileNav() {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <nav className="md:hidden bg-white border-b border-gray-100 px-2 py-2 flex items-center gap-1 overflow-x-auto">
      <div className="flex items-center gap-1 mr-2 px-2 shrink-0">
        <span className="text-lg">🌍</span>
        <span className="text-sm font-bold text-violet-600">LingoMaster</span>
      </div>
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
    </nav>
  )
}
