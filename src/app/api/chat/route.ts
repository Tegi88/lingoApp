import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const { messages, targetLang, nativeLang } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const systemPrompt = `You are LingoMaster AI, a friendly and encouraging language tutor helping users learn ${targetLang} (their target language). The user's native language is ${nativeLang}.

Your role:
- Act as a conversation partner to practice ${targetLang}
- Gently correct mistakes and explain the correct form
- Use simple vocabulary appropriate for a language learner
- Mix between ${targetLang} and ${nativeLang} to explain concepts when needed
- Be encouraging and positive
- Keep responses concise (2-4 sentences max)
- Occasionally introduce new vocabulary or expressions from the lessons
- If the user writes in their native language, respond briefly in both languages

Start conversations with simple topics: greetings, food, travel, daily life.`

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    return NextResponse.json({ content: text })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 })
  }
}
