'use client'

import { useState, useMemo } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useProgress } from '@/context/ProgressContext'
import { getVocabularyByLanguage } from '@/lib/vocabulary-data'
import { getTranslation, speak, WORD_CATEGORIES, getLanguageOption } from '@/lib/utils'
import type { VocabularyWord, WordStatus } from '@/types'

function downloadCSV(words: VocabularyWord[], nativeLang: string, targetLang: string, langLabel: string) {
  const header = ['Word', 'Phonetic', 'Translation', 'Category', 'Difficulty', 'Example']
  const rows = words.map((w) => [
    `"${w.word.replace(/"/g, '""')}"`,
    `"${(w.phonetic ?? '').replace(/"/g, '""')}"`,
    `"${getTranslation(w.translation, nativeLang).replace(/"/g, '""')}"`,
    `"${w.category}"`,
    w.difficulty,
    `"${getTranslation(w.example_sentence, nativeLang).replace(/"/g, '""')}"`,
  ])
  const csv = [header.join(','), ...rows.map((r) => r.join(','))].join('\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `lingomaster-${langLabel}-vocabulary.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function printVocabulary(words: VocabularyWord[], nativeLang: string, langLabel: string) {
  const rows = words.map((w) => {
    const translation = getTranslation(w.translation, nativeLang)
    const example = getTranslation(w.example_sentence, nativeLang)
    return `
      <tr>
        <td style="padding:6px 10px;border-bottom:1px solid #eee;font-weight:600">${w.word}</td>
        <td style="padding:6px 10px;border-bottom:1px solid #eee;color:#666;font-family:monospace">${w.phonetic ?? ''}</td>
        <td style="padding:6px 10px;border-bottom:1px solid #eee">${translation}</td>
        <td style="padding:6px 10px;border-bottom:1px solid #eee;text-transform:capitalize;color:#777">${w.category}</td>
        <td style="padding:6px 10px;border-bottom:1px solid #eee;color:#888;font-style:italic;font-size:12px">${example}</td>
      </tr>`
  }).join('')

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>LingoMaster – ${langLabel} Vocabulary</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 30px; color: #222; }
    h1 { color: #5b21b6; margin-bottom: 4px; }
    p { color: #666; margin: 0 0 20px; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    thead tr { background: #5b21b6; color: white; }
    thead th { padding: 8px 10px; text-align: left; }
    tbody tr:nth-child(even) { background: #f9f5ff; }
    @media print { body { margin: 10px; } }
  </style>
</head>
<body>
  <h1>LingoMaster – ${langLabel} Vocabulary</h1>
  <p>${words.length} words</p>
  <table>
    <thead><tr>
      <th>Word</th><th>Phonetic</th><th>Translation</th><th>Category</th><th>Example</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>
</body>
</html>`

  const win = window.open('', '_blank')
  if (!win) return
  win.document.write(html)
  win.document.close()
  win.focus()
  setTimeout(() => { win.print() }, 400)
}

export default function VocabularyPage() {
  const { t, targetLang, nativeLang } = useLanguage()
  const { wordProgress, updateWordStatus } = useProgress()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [statusFilter, setStatusFilter] = useState<WordStatus | 'all'>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const allWords = useMemo(() => getVocabularyByLanguage(targetLang), [targetLang])
  const langLabel = getLanguageOption(targetLang)?.label ?? targetLang

  const filtered = useMemo(() => {
    return allWords.filter((w) => {
      const matchCat = category === 'all' || w.category === category
      const matchSearch =
        !search ||
        w.word.toLowerCase().includes(search.toLowerCase()) ||
        getTranslation(w.translation, nativeLang).toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === 'all' || (wordProgress[w.id] ?? 'new') === statusFilter
      return matchCat && matchSearch && matchStatus
    })
  }, [allWords, category, search, statusFilter, wordProgress, nativeLang])

  const handleSpeak = (e: React.MouseEvent, word: string) => {
    e.stopPropagation()
    speak(word, targetLang)
  }

  const handleStatus = (e: React.MouseEvent, wordId: string, status: WordStatus) => {
    e.stopPropagation()
    updateWordStatus(wordId, status)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('vocabulary')}</h1>
          <p className="text-gray-500 text-sm">{allWords.length} words available</p>
        </div>
        {/* Download buttons */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => printVocabulary(filtered, nativeLang, langLabel)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 transition-colors"
          >
            🖨️ {t('printVocab')}
          </button>
          <button
            onClick={() => downloadCSV(filtered, nativeLang, targetLang, langLabel)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 transition-colors"
          >
            📥 {t('downloadCSV')}
          </button>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          placeholder={t('search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as WordStatus | 'all')}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
        >
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="learning">{t('wordsLearning')}</option>
          <option value="known">{t('wordsKnown')}</option>
        </select>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setCategory('all')}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${category === 'all' ? 'bg-violet-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
        >
          {t('allCategories')}
        </button>
        {WORD_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${category === cat.id ? 'bg-violet-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
          >
            {cat.icon} {getTranslation(cat.label, nativeLang)}
          </button>
        ))}
      </div>

      {/* Word cards */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-12">{t('noWords')}</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((word) => (
            <WordCard
              key={word.id}
              word={word}
              nativeLang={nativeLang}
              targetLang={targetLang}
              status={wordProgress[word.id] ?? 'new'}
              expanded={expandedId === word.id}
              onToggle={() => setExpandedId(expandedId === word.id ? null : word.id)}
              onSpeak={(e) => handleSpeak(e, word.word)}
              onStatus={handleStatus}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function WordCard({
  word, nativeLang, targetLang, status, expanded, onToggle, onSpeak, onStatus, t,
}: {
  word: VocabularyWord
  nativeLang: string
  targetLang: string
  status: WordStatus
  expanded: boolean
  onToggle: () => void
  onSpeak: (e: React.MouseEvent) => void
  onStatus: (e: React.MouseEvent, wordId: string, status: WordStatus) => void
  t: (k: string) => string
}) {
  const statusColors: Record<WordStatus, string> = {
    new: 'bg-gray-100 text-gray-500',
    learning: 'bg-blue-100 text-blue-600',
    known: 'bg-green-100 text-green-600',
  }

  return (
    <div
      onClick={onToggle}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-4 p-4">
        {/* Word */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">{word.word}</span>
            {word.phonetic && (
              <span className="text-xs text-gray-400 font-mono">[{word.phonetic}]</span>
            )}
          </div>
          <div className="text-sm text-gray-500">{getTranslation(word.translation, nativeLang)}</div>
        </div>

        {/* Status badge */}
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[status]}`}>
          {status}
        </span>

        {/* Difficulty */}
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`w-1.5 h-4 rounded-full ${i < word.difficulty ? 'bg-violet-400' : 'bg-gray-100'}`} />
          ))}
        </div>

        {/* Audio */}
        <button
          onClick={onSpeak}
          className="text-violet-500 hover:text-violet-700 text-xl p-1 rounded-lg hover:bg-violet-50 transition-colors"
          title={t('playAudio')}
        >
          🔊
        </button>

        <span className="text-gray-300">{expanded ? '▲' : '▼'}</span>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-50 pt-3 space-y-3 animate-fade-in">
          {getTranslation(word.example_sentence, nativeLang) && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{t('example')}</p>
              <p className="text-sm text-gray-600 italic">{word.word.split(' ')[0]}… {getTranslation(word.example_sentence, nativeLang)}</p>
              <p className="text-sm text-gray-500">{getTranslation(word.example_sentence, targetLang, nativeLang) || getTranslation(word.example_sentence, 'en')}</p>
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={(e) => onStatus(e, word.id, 'learning')}
              className={`flex-1 text-sm py-2 rounded-xl border font-medium transition-colors ${status === 'learning' ? 'bg-blue-100 border-blue-300 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-blue-50'}`}
            >
              🔄 {t('markLearning')}
            </button>
            <button
              onClick={(e) => onStatus(e, word.id, 'known')}
              className={`flex-1 text-sm py-2 rounded-xl border font-medium transition-colors ${status === 'known' ? 'bg-green-100 border-green-300 text-green-700' : 'border-gray-200 text-gray-600 hover:bg-green-50'}`}
            >
              ✅ {t('markKnown')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
