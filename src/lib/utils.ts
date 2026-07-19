import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { SupportedLanguage, LanguageOption } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en',  label: 'English',    nativeLabel: 'English',    flag: '🇺🇸' },
  { code: 'he',  label: 'Hebrew',     nativeLabel: 'עברית',      flag: '🇮🇱', rtl: true },
  { code: 'es',  label: 'Spanish',    nativeLabel: 'Español',    flag: '🇪🇸' },
  { code: 'fr',  label: 'French',     nativeLabel: 'Français',   flag: '🇫🇷' },
  { code: 'de',  label: 'German',     nativeLabel: 'Deutsch',    flag: '🇩🇪' },
  { code: 'it',  label: 'Italian',    nativeLabel: 'Italiano',   flag: '🇮🇹' },
  { code: 'pt',  label: 'Portuguese', nativeLabel: 'Português',  flag: '🇧🇷' },
  { code: 'ru',  label: 'Russian',    nativeLabel: 'Русский',    flag: '🇷🇺' },
  { code: 'ja',  label: 'Japanese',   nativeLabel: '日本語',       flag: '🇯🇵' },
  { code: 'ko',  label: 'Korean',     nativeLabel: '한국어',       flag: '🇰🇷' },
  { code: 'zh',  label: 'Chinese',    nativeLabel: '中文',         flag: '🇨🇳' },
  { code: 'tr',  label: 'Turkish',    nativeLabel: 'Türkçe',     flag: '🇹🇷' },
  { code: 'ar',  label: 'Arabic',     nativeLabel: 'العربية',    flag: '🇸🇦', rtl: true },
]

/** Languages that can serve as the NATIVE (UI) language */
export const NATIVE_LANGUAGES: LanguageOption[] = SUPPORTED_LANGUAGES.filter(
  (l) => ['en', 'he', 'es', 'fr', 'de', 'ru', 'ar'].includes(l.code)
)

/** BCP-47 locale codes for TTS */
export const LANG_BCP47: Record<string, string> = {
  en: 'en-US', he: 'he-IL', es: 'es-ES', fr: 'fr-FR', de: 'de-DE',
  it: 'it-IT', pt: 'pt-BR', ru: 'ru-RU', ja: 'ja-JP', ko: 'ko-KR',
  zh: 'zh-CN', tr: 'tr-TR', ar: 'ar-SA',
}

export function getLanguageOption(code: string): LanguageOption | undefined {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code)
}

export function isRTL(lang: SupportedLanguage): boolean {
  return ['he', 'ar'].includes(lang)
}

export function getTranslation(
  obj: Record<string, string> | null | undefined,
  lang: string,
  fallback = 'en'
): string {
  if (!obj) return ''
  return obj[lang] ?? obj[fallback] ?? Object.values(obj)[0] ?? ''
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function speak(text: string, lang: string) {
  if (typeof window === 'undefined') return
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = LANG_BCP47[lang] ?? lang
  utterance.rate = 0.85
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}

export const WORD_CATEGORIES = [
  { id: 'greetings', label: { en: 'Greetings', he: 'ברכות',   es: 'Saludos',   fr: 'Salutations', de: 'Begrüßung', it: 'Saluti',      pt: 'Saudações', ru: 'Приветствия', ja: 'あいさつ', ko: '인사',  zh: '问候', tr: 'Selamlar' }, icon: '👋' },
  { id: 'food',      label: { en: 'Food',      he: 'אוכל',    es: 'Comida',    fr: 'Nourriture',  de: 'Essen',     it: 'Cibo',        pt: 'Comida',    ru: 'Еда',         ja: '食べ物', ko: '음식', zh: '食物', tr: 'Yiyecek'  }, icon: '🍕' },
  { id: 'travel',    label: { en: 'Travel',    he: 'נסיעות',  es: 'Viajes',    fr: 'Voyages',     de: 'Reisen',    it: 'Viaggi',      pt: 'Viagem',    ru: 'Путешествия', ja: '旅行',   ko: '여행', zh: '旅行', tr: 'Seyahat'  }, icon: '✈️' },
  { id: 'numbers',   label: { en: 'Numbers',   he: 'מספרים',  es: 'Números',   fr: 'Nombres',     de: 'Zahlen',    it: 'Numeri',      pt: 'Números',   ru: 'Числа',       ja: '数字',   ko: '숫자', zh: '数字', tr: 'Sayılar'  }, icon: '🔢' },
  { id: 'colors',    label: { en: 'Colors',    he: 'צבעים',   es: 'Colores',   fr: 'Couleurs',    de: 'Farben',    it: 'Colori',      pt: 'Cores',     ru: 'Цвета',       ja: '色',     ko: '색깔', zh: '颜色', tr: 'Renkler'  }, icon: '🎨' },
  { id: 'body',      label: { en: 'Body',      he: 'גוף',     es: 'Cuerpo',    fr: 'Corps',       de: 'Körper',    it: 'Corpo',       pt: 'Corpo',     ru: 'Тело',        ja: '体',     ko: '신체', zh: '身体', tr: 'Vücut'    }, icon: '🧍' },
  { id: 'time',      label: { en: 'Time',      he: 'זמן',     es: 'Tiempo',    fr: 'Temps',       de: 'Zeit',      it: 'Tempo',       pt: 'Tempo',     ru: 'Время',       ja: '時間',   ko: '시간', zh: '时间', tr: 'Zaman'    }, icon: '⏰' },
  { id: 'nature',    label: { en: 'Nature',    he: 'טבע',     es: 'Naturaleza',fr: 'Nature',      de: 'Natur',     it: 'Natura',      pt: 'Natureza',  ru: 'Природа',     ja: '自然',   ko: '자연', zh: '自然', tr: 'Doğa'     }, icon: '🌿' },
  { id: 'business',  label: { en: 'Business',  he: 'עסקים',   es: 'Negocios',  fr: 'Affaires',    de: 'Geschäft',  it: 'Affari',      pt: 'Negócios',  ru: 'Бизнес',      ja: 'ビジネス',ko: '비즈니스',zh: '商业',tr: 'İş'       }, icon: '💼' },
  { id: 'home',      label: { en: 'Home',      he: 'בית',     es: 'Hogar',     fr: 'Maison',      de: 'Zuhause',   it: 'Casa',        pt: 'Casa',      ru: 'Дом',         ja: '家',     ko: '집',   zh: '家',   tr: 'Ev'       }, icon: '🏠' },
  { id: 'family',    label: { en: 'Family',    he: 'משפחה',   es: 'Familia',   fr: 'Famille',     de: 'Familie',   it: 'Famiglia',    pt: 'Família',   ru: 'Семья',       ja: '家族',   ko: '가족', zh: '家庭', tr: 'Aile'     }, icon: '👨‍👩‍👧' },
  { id: 'emotions',  label: { en: 'Emotions',  he: 'רגשות',   es: 'Emociones', fr: 'Émotions',    de: 'Gefühle',   it: 'Emozioni',    pt: 'Emoções',   ru: 'Эмоции',      ja: '感情',   ko: '감정', zh: '情感', tr: 'Duygular' }, icon: '❤️' },
  { id: 'general',   label: { en: 'General',   he: 'כללי',    es: 'General',   fr: 'Général',     de: 'Allgemein', it: 'Generale',    pt: 'Geral',     ru: 'Общее',       ja: '一般',   ko: '일반', zh: '一般', tr: 'Genel'    }, icon: '📚' },
] as const
