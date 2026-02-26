-- ================================================
-- MIGRATION 001 — Extensions et configuration
-- ================================================

-- Active l'extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Active l'extension pour la recherche textuelle
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ================================================
-- TABLE : profiles
-- Liée à auth.users de Supabase
-- ================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email        TEXT NOT NULL UNIQUE,
  first_name   TEXT NOT NULL DEFAULT '',
  last_name    TEXT NOT NULL DEFAULT '',
  phone        TEXT,
  avatar_url   TEXT,
  role         TEXT NOT NULL DEFAULT 'guest' CHECK (role IN ('guest', 'host', 'admin')),
  is_verified  BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index sur email et rôle
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);
CREATE INDEX IF NOT EXISTS profiles_role_idx  ON public.profiles(role);

-- ================================================
-- TRIGGER : crée un profil automatiquement
-- quand un utilisateur s'inscrit via Supabase Auth
-- ================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ================================================
-- TRIGGER : met à jour updated_at automatiquement
-- ================================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ================================================
-- ROW LEVEL SECURITY (RLS) — profiles
-- ================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut voir les profils publics
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

-- Un utilisateur peut modifier uniquement son propre profil
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Un admin peut tout modifier
CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
