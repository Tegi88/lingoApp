# LingoMaster 🌍

Full-stack personalized language learning application built with Next.js 16, Supabase, and Claude AI.

## Features

- **Onboarding** — choose native language and target language (6 languages supported)
- **i18n UI** — entire interface adapts to your native language (EN/HE/ES/FR)
- **Vocabulary Hub** — categorized word cards with Text-to-Speech (Web Speech API), status tracking (New / Learning / Known), search and filter
- **Video Learning** — embedded YouTube videos (no redirect), organized by category and difficulty
- **AI Tutor Chat** — conversation partner powered by Claude (Anthropic API)
- **Flashcard Game** — flip cards to practice word/translation recall with scoring
- **Sentence Builder Game** — drag words into correct sentence order
- **Progress Dashboard** — stats, study streak, quick navigation

## Setup

### 1. Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### 2. Database (Supabase)

Run the SQL in `supabase/schema.sql` in your Supabase project's SQL Editor. This creates all tables and seeds vocabulary + video data.

### 3. Run

```bash
npm install
npm run dev
```

Open `http://localhost:3002` (or whichever port is free).

## Project Structure

```
src/
  app/
    (dashboard)/        # Protected routes (layout guards onboarding)
      dashboard/        # Progress overview
      vocabulary/       # Word cards with TTS
      videos/           # Embedded video player
      chat/             # AI Tutor chat
      games/            # Flashcards + Sentence Builder
    api/chat/           # Anthropic API route
    page.tsx            # Onboarding (language selector)
  components/
    Sidebar.tsx         # Desktop navigation
    MobileNav.tsx       # Mobile top navigation
  context/
    LanguageContext.tsx  # i18n + language state
    ProgressContext.tsx  # Word/video progress (localStorage)
  lib/
    utils.ts            # TTS, translations, categories
    supabase.ts         # Supabase client
    vocabulary-data.ts  # Built-in word data (ES/FR/DE)
    video-data.ts       # Built-in video data
  types/index.ts        # TypeScript interfaces
supabase/schema.sql     # Database schema + seed data
```

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Supabase** (auth + database)
- **Anthropic Claude** (AI Tutor)
- **Web Speech API** (Text-to-Speech)
- **YouTube Embed** (no-cookie player)
