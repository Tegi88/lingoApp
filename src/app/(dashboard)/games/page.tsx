'use client'

import { useState, useMemo, useCallback } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { getVocabularyByLanguage } from '@/lib/vocabulary-data'
import { SAMPLE_SENTENCES } from '@/lib/vocabulary-data'
import { getTranslation as getT, speak } from '@/lib/utils'
import type { VocabularyWord } from '@/types'

type GameMode = 'menu' | 'flashcards' | 'sentence'

export default function GamesPage() {
  const { t } = useLanguage()
  const [mode, setMode] = useState<GameMode>('menu')

  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      {mode === 'menu' && <GameMenu t={t} onSelect={setMode} />}
      {mode === 'flashcards' && <FlashcardGame t={t} onBack={() => setMode('menu')} />}
      {mode === 'sentence' && <SentenceBuilderGame t={t} onBack={() => setMode('menu')} />}
    </div>
  )
}

function GameMenu({ t, onSelect }: { t: (k: string) => string; onSelect: (m: GameMode) => void }) {
  const games = [
    { mode: 'flashcards' as GameMode, icon: '🃏', key: 'flashcards', desc: 'Match words with their translations', color: 'from-violet-500 to-purple-600' },
    { mode: 'sentence' as GameMode, icon: '🧩', key: 'sentenceBuilder', desc: 'Arrange words into correct sentences', color: 'from-blue-500 to-indigo-600' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('games')}</h1>
        <p className="text-gray-500 text-sm">Practice makes perfect!</p>
      </div>
      <div className="grid gap-4">
        {games.map((g) => (
          <button
            key={g.mode}
            onClick={() => onSelect(g.mode)}
            className={`bg-gradient-to-r ${g.color} rounded-2xl p-6 text-white text-left hover:scale-[1.02] transition-transform shadow-md`}
          >
            <div className="text-4xl mb-2">{g.icon}</div>
            <div className="text-xl font-bold">{t(g.key)}</div>
            <div className="text-white/70 text-sm mt-1">{g.desc}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function FlashcardGame({ t, onBack }: { t: (k: string) => string; onBack: () => void }) {
  const { targetLang, nativeLang } = useLanguage()
  const words = useMemo(() => {
    const all = getVocabularyByLanguage(targetLang)
    return shuffle(all).slice(0, 15)
  }, [targetLang])

  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [score, setScore] = useState({ correct: 0, incorrect: 0 })
  const [done, setDone] = useState(false)

  const word = words[index]

  const handleFlip = () => setFlipped((f) => !f)

  const handleNext = (correct: boolean) => {
    setScore((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      incorrect: s.incorrect + (correct ? 0 : 1),
    }))
    if (index + 1 >= words.length) {
      setDone(true)
    } else {
      setIndex((i) => i + 1)
      setFlipped(false)
    }
  }

  const restart = () => {
    setIndex(0)
    setFlipped(false)
    setScore({ correct: 0, incorrect: 0 })
    setDone(false)
  }

  if (done) {
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900">Game Over!</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-2xl p-4">
            <div className="text-3xl font-bold text-green-600">{score.correct}</div>
            <div className="text-sm text-green-700">{t('correct')}</div>
          </div>
          <div className="bg-red-50 rounded-2xl p-4">
            <div className="text-3xl font-bold text-red-500">{score.incorrect}</div>
            <div className="text-sm text-red-600">{t('incorrect')}</div>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={restart} className="bg-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors">
            {t('newGame')}
          </button>
          <button onClick={onBack} className="border border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
            Back
          </button>
        </div>
      </div>
    )
  }

  if (!word) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 text-sm">← Back</button>
        <h1 className="text-xl font-bold text-gray-900 flex-1">{t('flashcards')}</h1>
        <span className="text-sm text-gray-500">{index + 1}/{words.length}</span>
      </div>

      {/* Progress bar */}
      <div className="bg-gray-100 rounded-full h-2">
        <div className="bg-violet-500 rounded-full h-2 transition-all" style={{ width: `${((index) / words.length) * 100}%` }} />
      </div>

      {/* Score */}
      <div className="flex gap-4 justify-center text-sm">
        <span className="text-green-600 font-semibold">✓ {score.correct}</span>
        <span className="text-red-500 font-semibold">✗ {score.incorrect}</span>
      </div>

      {/* Flashcard */}
      <div className="card-flip cursor-pointer" onClick={handleFlip}>
        <div className={`card-flip-inner ${flipped ? 'flipped' : ''}`} style={{ minHeight: '240px' }}>
          {/* Front */}
          <div className="card-face absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl flex flex-col items-center justify-center p-8 text-white shadow-xl" style={{ minHeight: '240px' }}>
            <div className="text-4xl font-bold mb-2">{word.word}</div>
            {word.phonetic && <div className="text-violet-200 text-sm font-mono">[{word.phonetic}]</div>}
            <button
              onClick={(e) => { e.stopPropagation(); speak(word.word, targetLang) }}
              className="mt-4 text-white/70 hover:text-white text-2xl transition-colors"
            >
              🔊
            </button>
            <div className="mt-6 text-violet-200 text-sm">{t('flip')} →</div>
          </div>
          {/* Back */}
          <div className="card-face card-face-back absolute inset-0 bg-white rounded-2xl flex flex-col items-center justify-center p-8 shadow-xl border border-gray-100" style={{ minHeight: '240px' }}>
            <div className="text-3xl font-bold text-gray-900 mb-2">{getT(word.translation, nativeLang)}</div>
            {getT(word.example_sentence, nativeLang) && (
              <div className="text-sm text-gray-500 text-center italic mt-2">"{getT(word.example_sentence, nativeLang)}"</div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      {flipped && (
        <div className="flex gap-3 animate-fade-in">
          <button
            onClick={() => handleNext(false)}
            className="flex-1 bg-red-50 border border-red-200 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-100 transition-colors"
          >
            ✗ {t('incorrect')}
          </button>
          <button
            onClick={() => handleNext(true)}
            className="flex-1 bg-green-50 border border-green-200 text-green-700 py-3 rounded-xl font-semibold hover:bg-green-100 transition-colors"
          >
            ✓ {t('correct')}
          </button>
        </div>
      )}
      {!flipped && (
        <button onClick={handleFlip} className="w-full bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors">
          {t('flip')}
        </button>
      )}
    </div>
  )
}

function SentenceBuilderGame({ t, onBack }: { t: (k: string) => string; onBack: () => void }) {
  const { targetLang, nativeLang } = useLanguage()
  const sentences = useMemo(() => {
    const data = SAMPLE_SENTENCES[targetLang] ?? SAMPLE_SENTENCES['es']
    return shuffle(data)
  }, [targetLang])

  const [index, setIndex] = useState(0)
  const [arranged, setArranged] = useState<string[]>([])
  const [available, setAvailable] = useState<string[]>([])
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null)
  const [score, setScore] = useState(0)

  const sentence = sentences[index]

  const reset = useCallback(() => {
    if (!sentence) return
    setArranged([])
    setAvailable(shuffle([...sentence.words]))
    setResult(null)
  }, [sentence])

  useMemo(() => reset(), [reset])

  const addWord = (word: string, idx: number) => {
    if (result) return
    setArranged((prev) => [...prev, word])
    setAvailable((prev) => prev.filter((_, i) => i !== idx))
  }

  const removeWord = (idx: number) => {
    if (result) return
    const word = arranged[idx]
    setAvailable((prev) => [...prev, word])
    setArranged((prev) => prev.filter((_, i) => i !== idx))
  }

  const check = () => {
    if (!sentence) return
    const isCorrect = arranged.join(' ') === sentence.words.join(' ')
    setResult(isCorrect ? 'correct' : 'incorrect')
    if (isCorrect) setScore((s) => s + 1)
  }

  const nextSentence = () => {
    if (index + 1 >= sentences.length) {
      setIndex(0)
    } else {
      setIndex((i) => i + 1)
    }
    setResult(null)
  }

  if (!sentence) return <p className="text-center text-gray-400 py-12">No sentences available for this language yet.</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 text-sm">← Back</button>
        <h1 className="text-xl font-bold text-gray-900 flex-1">{t('sentenceBuilder')}</h1>
        <span className="text-sm font-semibold text-violet-600">{t('score')}: {score}</span>
      </div>

      {/* Translation hint */}
      <div className="bg-blue-50 rounded-xl p-4">
        <p className="text-xs text-blue-500 font-semibold uppercase tracking-wide mb-1">{t('arrange')}</p>
        <p className="text-blue-800 font-medium">{getT(sentence.translation, nativeLang)}</p>
      </div>

      {/* Drop zone */}
      <div className="min-h-16 bg-white rounded-2xl border-2 border-dashed border-gray-200 p-4 flex flex-wrap gap-2 items-center">
        {arranged.length === 0 && (
          <p className="text-gray-300 text-sm">Tap words below to arrange them here...</p>
        )}
        {arranged.map((word, i) => (
          <button
            key={i}
            onClick={() => removeWord(i)}
            className="bg-violet-100 text-violet-800 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100 hover:text-red-700 transition-colors"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Result banner */}
      {result && (
        <div className={`rounded-xl p-3 text-center font-semibold animate-slide-up ${result === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
          {result === 'correct' ? `🎉 ${t('correct')} — "${sentence.words.join(' ')}"` : `❌ ${t('incorrect')} — Correct: "${sentence.words.join(' ')}"`}
        </div>
      )}

      {/* Available words */}
      <div className="flex flex-wrap gap-2">
        {available.map((word, i) => (
          <button
            key={i}
            onClick={() => addWord(word, i)}
            disabled={!!result}
            className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-violet-50 hover:border-violet-300 transition-colors disabled:opacity-60"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={reset} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
          {t('reset')}
        </button>
        {!result ? (
          <button
            onClick={check}
            disabled={arranged.length === 0}
            className="flex-1 bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 disabled:opacity-50 transition-colors"
          >
            {t('checkAnswer')}
          </button>
        ) : (
          <button
            onClick={nextSentence}
            className="flex-1 bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors"
          >
            {t('nextCard')} →
          </button>
        )}
      </div>
    </div>
  )
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
