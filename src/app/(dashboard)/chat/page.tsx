'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { getLanguageOption, speak } from '@/lib/utils'
import type { ChatMessage } from '@/types'

export default function ChatPage() {
  const { t, targetLang, nativeLang } = useLanguage()
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content: getWelcomeMessage(targetLang, nativeLang),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const targetLangOpt = getLanguageOption(targetLang)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.slice(1).map((m) => ({ role: m.role, content: m.content })),
          targetLang,
          nativeLang,
        }),
      })
      const data = await res.json()
      if (data.content) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), role: 'assistant', content: data.content },
        ])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: 'assistant', content: 'Sorry, I had trouble responding. Please try again.' },
      ])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const SUGGESTED_PROMPTS = [
    `Say hello in ${targetLangOpt?.label}`,
    `How do I order food?`,
    `Teach me 3 new words`,
    `Correct my grammar`,
  ]

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-8rem)] animate-slide-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 mb-4 text-white flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🤖</div>
        <div>
          <h1 className="font-bold">{t('aiTutor')}</h1>
          <p className="text-xs text-white/70">Practicing {targetLangOpt?.label} {targetLangOpt?.flag}</p>
        </div>
        <div className="ml-auto flex gap-1">
          <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
          <span className="text-xs text-white/70">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-2 shrink-0 mt-1">
                🤖
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-violet-600 text-white rounded-br-sm'
                  : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
              }`}
            >
              {msg.content}
              {msg.role === 'assistant' && (
                <button
                  onClick={() => speak(msg.content, targetLang)}
                  className="ml-2 text-gray-400 hover:text-emerald-500 transition-colors text-xs"
                  title="Listen"
                >
                  🔊
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-2 shrink-0">🤖</div>
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested prompts */}
      {messages.length <= 1 && (
        <div className="flex gap-2 flex-wrap my-3">
          {SUGGESTED_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => { setInput(p); inputRef.current?.focus() }}
              className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 mt-3">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={t('typeMessage')}
          disabled={loading}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white disabled:opacity-60"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white px-5 py-3 rounded-xl font-medium text-sm transition-colors"
        >
          {t('send')}
        </button>
      </div>
    </div>
  )
}

function getWelcomeMessage(targetLang: string, nativeLang: string): string {
  const greetings: Record<string, string> = {
    es: '¡Hola! I\'m your AI language tutor. Let\'s practice Spanish together! I\'ll help you with vocabulary, grammar, and conversation. What would you like to talk about? 😊',
    fr: 'Bonjour! I\'m your AI language tutor. Let\'s practice French together! I\'ll help you learn vocabulary, grammar, and have natural conversations. Qu\'est-ce que vous voulez apprendre? 😊',
    de: 'Hallo! I\'m your AI language tutor. Let\'s practice German together! I\'ll help you learn vocabulary, grammar, and have natural conversations. Was möchten Sie lernen? 😊',
    he: 'שלום! I\'m your AI language tutor. Let\'s practice Hebrew together! I\'ll help you learn vocabulary, grammar, and have natural conversations. מה תרצה ללמוד? 😊',
    ar: 'مرحبا! I\'m your AI language tutor. Let\'s practice Arabic together! I\'ll help you learn vocabulary, grammar, and have natural conversations. 😊',
    en: 'Hello! I\'m your AI language tutor. Let\'s practice English together! I\'ll help you with vocabulary, grammar, and conversation. What would you like to talk about? 😊',
  }
  return greetings[targetLang] ?? greetings['en']
}
