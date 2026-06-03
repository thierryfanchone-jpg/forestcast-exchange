-- ORION ACADEMY — Supabase Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles
create table profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  full_name text not null default '',
  avatar_url text,
  bio text,
  global_score integer default 0,
  total_simulations integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Courses
create table courses (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  subtitle text not null,
  description text not null,
  category text not null,
  level text not null,
  duration_hours integer default 0,
  lesson_count integer default 0,
  price integer not null default 0,
  stripe_price_id text,
  thumbnail text,
  color text,
  icon text,
  tags text[] default '{}',
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- Lessons
create table lessons (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references courses(id) on delete cascade not null,
  title text not null,
  content text,
  video_url text,
  duration_minutes integer default 0,
  has_exercise boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Exercises
create table exercises (
  id uuid primary key default uuid_generate_v4(),
  lesson_id uuid references lessons(id) on delete cascade not null,
  title text not null,
  description text not null,
  instructions text not null,
  created_at timestamptz default now()
);

-- Purchases
create table purchases (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id uuid references courses(id),
  plan_id text,
  amount integer not null,
  stripe_session_id text unique not null,
  created_at timestamptz default now()
);

-- Subscriptions
create table subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  stripe_subscription_id text unique not null,
  plan text not null,
  status text not null default 'active',
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Course progress
create table course_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id uuid references courses(id) on delete cascade not null,
  completed_lessons uuid[] default '{}',
  score integer default 0,
  last_lesson_id uuid,
  started_at timestamptz default now(),
  completed_at timestamptz,
  unique(user_id, course_id)
);

-- AI Simulations
create table ai_simulations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  scenario text not null,
  user_input text not null,
  score integer not null default 0,
  strengths text[] default '{}',
  weaknesses text[] default '{}',
  correction text,
  next_exercise text,
  analysis jsonb,
  created_at timestamptz default now()
);

-- Certificates
create table certificates (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id uuid references courses(id),
  user_name text not null,
  certification_name text not null,
  score integer not null,
  level text not null,
  qr_code text,
  issued_at timestamptz default now()
);

-- Badges
create table badges (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text not null,
  icon text,
  color text,
  created_at timestamptz default now()
);

-- User badges
create table user_badges (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  badge_id uuid references badges(id) on delete cascade not null,
  earned_at timestamptz default now(),
  unique(user_id, badge_id)
);

-- Skill passport
create table skill_passport (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  skills jsonb default '[]',
  updated_at timestamptz default now()
);

-- Row Level Security
alter table profiles enable row level security;
alter table purchases enable row level security;
alter table subscriptions enable row level security;
alter table course_progress enable row level security;
alter table ai_simulations enable row level security;
alter table certificates enable row level security;
alter table user_badges enable row level security;
alter table skill_passport enable row level security;

-- RLS Policies (users can only read/write their own data)
create policy "Users can read own profile" on profiles for select using (auth.uid() = user_id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = user_id);
create policy "Users can read own purchases" on purchases for select using (auth.uid() = user_id);
create policy "Users can read own subscriptions" on subscriptions for select using (auth.uid() = user_id);
create policy "Users can manage own progress" on course_progress for all using (auth.uid() = user_id);
create policy "Users can manage own simulations" on ai_simulations for all using (auth.uid() = user_id);
create policy "Users can read own certificates" on certificates for select using (auth.uid() = user_id);
create policy "Users can read own badges" on user_badges for select using (auth.uid() = user_id);
create policy "Users can manage own passport" on skill_passport for all using (auth.uid() = user_id);
