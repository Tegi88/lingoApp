'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import Sidebar from '@/components/Sidebar'
import MobileNav from '@/components/MobileNav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isOnboarded, isLoading } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isOnboarded) {
      router.replace('/')
    }
  }, [isLoading, isOnboarded, router])

  if (isLoading || !isOnboarded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f7ff]">
        <div className="flex flex-col items-center gap-3">
          <div className="text-4xl">🌍</div>
          <div className="text-violet-600 font-semibold">LingoMaster</div>
          <div className="w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f7ff]">
      {/* Sidebar – desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top nav */}
        <MobileNav />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
