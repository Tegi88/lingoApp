'use client'

import { useState, useEffect, Suspense } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { SUPPORTED_LANGUAGES } from '@/lib/utils'
import type { SupportedLanguage } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingInner />
    </Suspense>
  )
}

function OnboardingInner() {
  const { completeOnboarding, isOnboarded, nativeLang, targetLang, t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isChanging = searchParams.get('change') === 'true'

  const [native, setNative] = useState<SupportedLanguage>('en')
  const [target, setTarget] = useState<SupportedLanguage>('es')
  const [step, setStep] = useState(1)

  // Pre-fill with current languages when changing
  useEffect(() => {
    if (isChanging) {
      setNative(nativeLang)
      setTarget(targetLang)
    }
  }, [isChanging, nativeLang, targetLang])

  useEffect(() => {
    // Only auto-redirect if NOT in "change language" mode
    if (isOnboarded && !isChanging) {
      router.replace('/dashboard')
    }
  }, [isOnboarded, isChanging, router])

  if (isOnboarded && !isChanging) return null

  const handleStart = () => {
    if (native === target) return
    completeOnboarding(native, target)
    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-slide-up">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌍</div>
          <h1 className="text-3xl font-bold text-gray-900">{t('welcome')}</h1>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed">{t('subtitle')}</p>
        </div>

        {/* Step 1: Native language */}
        {step === 1 && (
          <div className="animate-slide-up">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">{t('selectNative')}</h2>
            <div className="grid grid-cols-2 gap-3">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setNative(lang.code)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                    native === lang.code
                      ? 'border-violet-500 bg-violet-50 text-violet-700 font-semibold'
                      : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50 text-gray-700'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <div className="text-sm font-medium">{lang.nativeLabel}</div>
                    <div className="text-xs text-gray-400">{lang.label}</div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="mt-6 w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 2: Target language */}
        {step === 2 && (
          <div className="animate-slide-up">
            <button onClick={() => setStep(1)} className="text-sm text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1">
              ← Back
            </button>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">{t('selectTarget')}</h2>
            <div className="grid grid-cols-2 gap-3">
              {SUPPORTED_LANGUAGES.filter((l) => l.code !== native).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setTarget(lang.code)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                    target === lang.code
                      ? 'border-violet-500 bg-violet-50 text-violet-700 font-semibold'
                      : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50 text-gray-700'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <div className="text-sm font-medium">{lang.nativeLabel}</div>
                    <div className="text-xs text-gray-400">{lang.label}</div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={handleStart}
              className="mt-6 w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-xl transition-colors text-lg"
            >
              {t('startLearning')} 🚀
            </button>
          </div>
        )}

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          <div className={`w-2 h-2 rounded-full transition-colors ${step === 1 ? 'bg-violet-500' : 'bg-gray-200'}`} />
          <div className={`w-2 h-2 rounded-full transition-colors ${step === 2 ? 'bg-violet-500' : 'bg-gray-200'}`} />
        </div>
      </div>
    </main>
  )
}
