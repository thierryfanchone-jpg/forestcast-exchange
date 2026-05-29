-- ─────────────────────────────────────────────────────────────
-- TrustLayer AI — schéma Supabase (PostgreSQL)
-- À exécuter dans l'éditeur SQL Supabase.
-- ─────────────────────────────────────────────────────────────

-- Table des profils (1:1 avec auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  free_audits_used integer not null default 0,
  plan text not null default 'free',
  audit_credits integer not null default 2,
  is_unlimited boolean not null default false,
  created_at timestamptz not null default now()
);

-- Table des audits
create table if not exists public.audits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  original_question text not null,
  ai_answer text not null,
  report_language text not null default 'fr',
  trust_score integer,
  risk_level text,
  status text,
  main_claims jsonb,
  verified_claims jsonb,
  uncertain_claims jsonb,
  risky_claims jsonb,
  sources jsonb,
  corrected_answer text,
  final_recommendation text,
  raw_report jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audits_user_id_created_at_idx
  on public.audits (user_id, created_at desc);

-- Table des paiements
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  provider text,
  provider_payment_id text,
  amount integer,
  currency text not null default 'EUR',
  product_type text,
  credits_added integer,
  status text,
  created_at timestamptz not null default now()
);

create unique index if not exists payments_provider_payment_unique
  on public.payments (provider, provider_payment_id)
  where provider_payment_id is not null;

-- ── Sécurité : Row Level Security ─────────────────────────────
alter table public.profiles enable row level security;
alter table public.audits enable row level security;
alter table public.payments enable row level security;

-- Profils : lecture/écriture limitées au propriétaire
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- Audits : lecture/création limitées au propriétaire
drop policy if exists "audits_select_own" on public.audits;
create policy "audits_select_own" on public.audits
  for select using (auth.uid() = user_id);

drop policy if exists "audits_insert_own" on public.audits;
create policy "audits_insert_own" on public.audits
  for insert with check (auth.uid() = user_id);

-- Paiements : lecture seule pour le propriétaire
-- (les écritures passent par la service role key côté serveur).
drop policy if exists "payments_select_own" on public.payments;
create policy "payments_select_own" on public.payments
  for select using (auth.uid() = user_id);

-- ── Création automatique du profil à l'inscription ────────────
-- Chaque nouvel utilisateur reçoit 2 audits gratuits.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, audit_credits, plan)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url',
    2,
    'free'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
