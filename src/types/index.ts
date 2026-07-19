export type SupportedLanguage = 'en' | 'he' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'ja' | 'ko' | 'zh' | 'tr' | 'ar'

export interface LanguageOption {
  code: SupportedLanguage
  label: string
  nativeLabel: string
  flag: string
  rtl?: boolean
}

export interface Profile {
  id: string
  email: string
  display_name: string | null
  native_language: SupportedLanguage
  target_language: SupportedLanguage
  created_at: string
}

export interface VocabularyWord {
  id: string
  word: string
  translation: Record<string, string>
  language: string
  category: WordCategory
  example_sentence: Record<string, string>
  phonetic: string | null
  difficulty: 1 | 2 | 3 | 4 | 5
}

export type WordCategory =
  | 'greetings'
  | 'food'
  | 'travel'
  | 'business'
  | 'home'
  | 'family'
  | 'numbers'
  | 'colors'
  | 'body'
  | 'time'
  | 'nature'
  | 'emotions'
  | 'general'

export type WordStatus = 'new' | 'learning' | 'known'

export interface UserWordProgress {
  id: string
  user_id: string
  word_id: string
  status: WordStatus
  correct_count: number
  incorrect_count: number
  last_reviewed_at: string | null
  vocabulary?: VocabularyWord
}

export interface Video {
  id: string
  title: Record<string, string>
  description: Record<string, string>
  youtube_id: string
  language: string
  category: string
  content_type: 'lesson' | 'sentences' | 'culture'
  source_label?: string
  difficulty: 1 | 2 | 3 | 4 | 5
  duration_seconds: number | null
  thumbnail_url: string | null
}

export interface UserVideoProgress {
  id: string
  user_id: string
  video_id: string
  watched_seconds: number
  completed: boolean
  last_watched_at: string | null
  video?: Video
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  created_at?: string
}

export interface UserStats {
  wordsLearned: number
  wordsKnown: number
  wordsLearning: number
  videosWatched: number
  studyDays: number
}
