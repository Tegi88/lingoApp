'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { SupportedLanguage } from '@/types'
import { isRTL } from '@/lib/utils'

type UILang = 'en' | 'he'

interface LanguageContextValue {
  nativeLang: SupportedLanguage
  targetLang: SupportedLanguage
  uiLang: UILang
  setNativeLang: (lang: SupportedLanguage) => void
  setTargetLang: (lang: SupportedLanguage) => void
  toggleUILang: () => void
  isOnboarded: boolean
  isLoading: boolean
  completeOnboarding: (native: SupportedLanguage, target: SupportedLanguage) => void
  dir: 'ltr' | 'rtl'
  t: (key: string) => string
}

const UI_STRINGS: Record<UILang, Record<string, string>> = {
  en: {
    welcome: 'Welcome to LingoMaster',
    subtitle: 'Your personalized language learning journey starts here',
    selectNative: 'What is your native language?',
    selectTarget: 'What language do you want to learn?',
    startLearning: 'Start Learning',
    vocabulary: 'Vocabulary',
    videos: 'Videos',
    aiTutor: 'AI Tutor',
    games: 'Games',
    dashboard: 'Dashboard',
    wordsLearned: 'Words Learned',
    wordsKnown: 'Known',
    wordsLearning: 'Learning',
    markKnown: 'Mark as Known',
    markLearning: 'Add to Learning',
    playAudio: 'Play Audio',
    example: 'Example',
    search: 'Search words...',
    allCategories: 'All Categories',
    watchVideo: 'Watch',
    completed: 'Completed',
    typeMessage: 'Type your message...',
    send: 'Send',
    newGame: 'New Game',
    checkAnswer: 'Check Answer',
    nextCard: 'Next Card',
    correct: 'Correct!',
    incorrect: 'Try again',
    score: 'Score',
    flashcards: 'Flashcards',
    sentenceBuilder: 'Sentence Builder',
    progress: 'My Progress',
    savedWords: 'Saved Words',
    studyStreak: 'Study Days',
    videosWatched: 'Videos Watched',
    shuffle: 'Shuffle',
    flip: 'Flip Card',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    email: 'Email',
    password: 'Password',
    continueAsGuest: 'Continue as Guest',
    loading: 'Loading...',
    noWords: 'No words found.',
    arrange: 'Arrange the words to form the sentence:',
    reset: 'Reset',
    submit: 'Submit',
    difficultyAll: 'All Levels',
    difficulty1: 'Beginner',
    difficulty2: 'Elementary',
    difficulty3: 'Intermediate',
    difficulty4: 'Advanced',
    difficulty5: 'Expert',
    downloadPDF: 'Download PDF',
    printVocab: 'Print List',
    downloadCSV: 'Export CSV',
    allWords: 'All Words',
    filterBy: 'Filter',
    changeLanguage: 'Change Language',
    uiLanguage: 'Interface Language',
    learningLang: 'Learning',
    nativeLangLabel: 'Native Language',
    targetLangLabel: 'Target Language',
    noVideos: 'No videos for this language yet.',
  },
  he: {
    welcome: 'ברוכים הבאים ל-LingoMaster',
    subtitle: 'מסע לימוד השפה האישי שלך מתחיל כאן',
    selectNative: 'מה שפת האם שלך?',
    selectTarget: 'איזו שפה אתה רוצה ללמוד?',
    startLearning: 'התחל ללמוד',
    vocabulary: 'אוצר מילים',
    videos: 'סרטונים',
    aiTutor: 'מורה AI',
    games: 'משחקים',
    dashboard: 'לוח בקרה',
    wordsLearned: 'מילים שנלמדו',
    wordsKnown: 'ידועות',
    wordsLearning: 'בלמידה',
    markKnown: 'סמן כידוע',
    markLearning: 'הוסף ללמידה',
    playAudio: 'נגן שמע',
    example: 'דוגמה',
    search: 'חיפוש מילים...',
    allCategories: 'כל הקטגוריות',
    watchVideo: 'צפה',
    completed: 'הושלם',
    typeMessage: 'הקלד הודעה...',
    send: 'שלח',
    newGame: 'משחק חדש',
    checkAnswer: 'בדוק תשובה',
    nextCard: 'כרטיס הבא',
    correct: 'נכון!',
    incorrect: 'נסה שוב',
    score: 'ניקוד',
    flashcards: 'כרטיסיות',
    sentenceBuilder: 'בנאי משפטים',
    progress: 'ההתקדמות שלי',
    savedWords: 'מילים שמורות',
    studyStreak: 'ימי לימוד',
    videosWatched: 'סרטונים שנצפו',
    shuffle: 'ערבב',
    flip: 'הפוך כרטיס',
    signIn: 'כניסה',
    signUp: 'הרשמה',
    signOut: 'יציאה',
    email: 'אימייל',
    password: 'סיסמה',
    continueAsGuest: 'המשך כאורח',
    loading: 'טוען...',
    noWords: 'לא נמצאו מילים.',
    arrange: 'סדר את המילים ליצירת המשפט:',
    reset: 'אפס',
    submit: 'שלח',
    difficultyAll: 'כל הרמות',
    difficulty1: 'מתחיל',
    difficulty2: 'יסודי',
    difficulty3: 'בינוני',
    difficulty4: 'מתקדם',
    difficulty5: 'מומחה',
    downloadPDF: 'הורד PDF',
    printVocab: 'הדפס רשימה',
    downloadCSV: 'ייצוא CSV',
    allWords: 'כל המילים',
    filterBy: 'סינון',
    changeLanguage: 'החלף שפה',
    uiLanguage: 'שפת הממשק',
    learningLang: 'לומד',
    nativeLangLabel: 'שפת אם',
    targetLangLabel: 'שפת יעד',
    noVideos: 'אין סרטונים לשפה זו עדיין.',
  },
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [nativeLang, setNativeLangState] = useState<SupportedLanguage>('en')
  const [targetLang, setTargetLangState] = useState<SupportedLanguage>('es')
  const [uiLang, setUILang] = useState<UILang>('en')
  const [isOnboarded, setIsOnboarded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('lingomaster_settings')
    if (stored) {
      const parsed = JSON.parse(stored)
      setNativeLangState(parsed.nativeLang ?? 'en')
      setTargetLangState(parsed.targetLang ?? 'es')
      setUILang(parsed.uiLang ?? (parsed.nativeLang === 'he' ? 'he' : 'en'))
      setIsOnboarded(true)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    document.documentElement.dir = isRTL(uiLang as SupportedLanguage) ? 'rtl' : 'ltr'
    document.documentElement.lang = uiLang
  }, [uiLang])

  const persist = (patch: Record<string, unknown>) => {
    const stored = JSON.parse(localStorage.getItem('lingomaster_settings') || '{}')
    localStorage.setItem('lingomaster_settings', JSON.stringify({ ...stored, ...patch }))
  }

  const setNativeLang = (lang: SupportedLanguage) => {
    setNativeLangState(lang)
    persist({ nativeLang: lang })
  }

  const setTargetLang = (lang: SupportedLanguage) => {
    setTargetLangState(lang)
    persist({ targetLang: lang })
  }

  const toggleUILang = () => {
    setUILang((prev) => {
      const next: UILang = prev === 'en' ? 'he' : 'en'
      persist({ uiLang: next })
      return next
    })
  }

  const completeOnboarding = (native: SupportedLanguage, target: SupportedLanguage) => {
    const ui: UILang = native === 'he' ? 'he' : 'en'
    setNativeLangState(native)
    setTargetLangState(target)
    setUILang(ui)
    setIsOnboarded(true)
    localStorage.setItem('lingomaster_settings', JSON.stringify({ nativeLang: native, targetLang: target, uiLang: ui }))
  }

  const t = (key: string): string => {
    return UI_STRINGS[uiLang][key] ?? UI_STRINGS['en'][key] ?? key
  }

  const dir: 'ltr' | 'rtl' = uiLang === 'he' ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider value={{ nativeLang, targetLang, uiLang, setNativeLang, setTargetLang, toggleUILang, isOnboarded, isLoading, completeOnboarding, dir, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
