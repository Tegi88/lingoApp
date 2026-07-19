-- LingoMaster Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =====================
-- PROFILES TABLE
-- =====================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  display_name text,
  native_language text not null default 'en',
  target_language text not null default 'es',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =====================
-- VOCABULARY TABLE
-- =====================
create table public.vocabulary (
  id uuid default uuid_generate_v4() primary key,
  word text not null,
  translation jsonb not null default '{}',  -- { "en": "hello", "he": "שלום", ... }
  language text not null,                    -- source language of the word
  category text not null default 'general',
  example_sentence jsonb default '{}',       -- { "en": "Hello, how are you?", ... }
  phonetic text,
  difficulty integer default 1 check (difficulty between 1 and 5),
  created_at timestamptz default now()
);

create index on public.vocabulary(language);
create index on public.vocabulary(category);

alter table public.vocabulary enable row level security;

create policy "Vocabulary is publicly readable"
  on public.vocabulary for select
  to authenticated
  using (true);

-- =====================
-- USER WORD PROGRESS TABLE
-- =====================
create table public.user_word_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  word_id uuid references public.vocabulary(id) on delete cascade not null,
  status text not null default 'new' check (status in ('new', 'learning', 'known')),
  correct_count integer default 0,
  incorrect_count integer default 0,
  last_reviewed_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, word_id)
);

create index on public.user_word_progress(user_id);
create index on public.user_word_progress(user_id, status);

alter table public.user_word_progress enable row level security;

create policy "Users can manage own word progress"
  on public.user_word_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =====================
-- VIDEOS TABLE
-- =====================
create table public.videos (
  id uuid default uuid_generate_v4() primary key,
  title jsonb not null default '{}',         -- { "en": "...", "he": "..." }
  description jsonb default '{}',
  youtube_id text not null,
  language text not null,
  category text not null default 'general',
  difficulty integer default 1 check (difficulty between 1 and 5),
  duration_seconds integer,
  thumbnail_url text,
  created_at timestamptz default now()
);

create index on public.videos(language);
create index on public.videos(category);

alter table public.videos enable row level security;

create policy "Videos are publicly readable"
  on public.videos for select
  to authenticated
  using (true);

-- =====================
-- USER VIDEO PROGRESS TABLE
-- =====================
create table public.user_video_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  video_id uuid references public.videos(id) on delete cascade not null,
  watched_seconds integer default 0,
  completed boolean default false,
  last_watched_at timestamptz,
  unique(user_id, video_id)
);

alter table public.user_video_progress enable row level security;

create policy "Users can manage own video progress"
  on public.user_video_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =====================
-- CHAT HISTORY TABLE
-- =====================
create table public.chat_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now()
);

create index on public.chat_history(user_id, created_at desc);

alter table public.chat_history enable row level security;

create policy "Users can manage own chat history"
  on public.chat_history for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =====================
-- SEED VOCABULARY DATA
-- =====================
insert into public.vocabulary (word, translation, language, category, example_sentence, phonetic, difficulty) values
-- Spanish words
('hola', '{"en":"hello","he":"שלום"}', 'es', 'greetings', '{"en":"Hola, ¿cómo estás?","he":"שלום, מה שלומך?"}', 'OH-lah', 1),
('gracias', '{"en":"thank you","he":"תודה"}', 'es', 'greetings', '{"en":"Muchas gracias por tu ayuda.","he":"תודה רבה על עזרתך."}', 'GRAH-see-ahs', 1),
('por favor', '{"en":"please","he":"בבקשה"}', 'es', 'greetings', '{"en":"¿Puedes ayudarme, por favor?","he":"האם תוכל לעזור לי, בבקשה?"}', 'por fah-VOR', 1),
('agua', '{"en":"water","he":"מים"}', 'es', 'food', '{"en":"Quiero un vaso de agua.","he":"אני רוצה כוס מים."}', 'AH-gwah', 1),
('comida', '{"en":"food","he":"אוכל"}', 'es', 'food', '{"en":"La comida está deliciosa.","he":"האוכל טעים."}', 'koh-MEE-dah', 1),
('casa', '{"en":"house","he":"בית"}', 'es', 'home', '{"en":"Mi casa es tu casa.","he":"ביתי הוא ביתך."}', 'KAH-sah', 1),
('trabajo', '{"en":"work","he":"עבודה"}', 'es', 'business', '{"en":"Tengo mucho trabajo hoy.","he":"יש לי הרבה עבודה היום."}', 'trah-BAH-hoh', 2),
('viaje', '{"en":"trip","he":"נסיעה"}', 'es', 'travel', '{"en":"El viaje fue increíble.","he":"הנסיעה הייתה מדהימה."}', 'BYAH-heh', 2),
('aeropuerto', '{"en":"airport","he":"שדה תעופה"}', 'es', 'travel', '{"en":"Llegamos al aeropuerto a tiempo.","he":"הגענו לשדה התעופה בזמן."}', 'ah-eh-roh-PWER-toh', 2),
('mercado', '{"en":"market","he":"שוק"}', 'es', 'travel', '{"en":"Vamos al mercado a comprar frutas.","he":"בואו נלך לשוק לקנות פירות."}', 'mer-KAH-doh', 2),
-- French words
('bonjour', '{"en":"hello","he":"שלום"}', 'fr', 'greetings', '{"en":"Bonjour, comment allez-vous?","he":"שלום, מה שלומך?"}', 'bon-ZHOOR', 1),
('merci', '{"en":"thank you","he":"תודה"}', 'fr', 'greetings', '{"en":"Merci beaucoup!","he":"תודה רבה!"}', 'mer-SEE', 1),
('eau', '{"en":"water","he":"מים"}', 'fr', 'food', '{"en":"Je voudrais de l''eau, s''il vous plaît.","he":"אני רוצה מים, בבקשה."}', 'OH', 1),
('maison', '{"en":"house","he":"בית"}', 'fr', 'home', '{"en":"Ma maison est grande.","he":"הבית שלי גדול."}', 'meh-ZON', 1),
('travail', '{"en":"work","he":"עבודה"}', 'fr', 'business', '{"en":"J''aime mon travail.","he":"אני אוהב את עבודתי."}', 'trah-VY', 2);

-- =====================
-- SEED VIDEOS DATA
-- =====================
insert into public.videos (title, description, youtube_id, language, category, difficulty, duration_seconds) values
('{"en":"Spanish for Beginners - Greetings","he":"ספרדית למתחילים - ברכות"}',
 '{"en":"Learn basic Spanish greetings","he":"למד ברכות בסיסיות בספרדית"}',
 'dQw4w9WgXcQ', 'es', 'greetings', 1, 600),
('{"en":"Spanish Food Vocabulary","he":"אוצר מילים של אוכל בספרדית"}',
 '{"en":"Essential food words in Spanish","he":"מילים חיוניות של אוכל בספרדית"}',
 'dQw4w9WgXcQ', 'es', 'food', 1, 480),
('{"en":"French Basics - First Lesson","he":"צרפתית בסיסית - שיעור ראשון"}',
 '{"en":"Start learning French from scratch","he":"התחל ללמוד צרפתית מאפס"}',
 'dQw4w9WgXcQ', 'fr', 'greetings', 1, 720);
