-- ================================================
-- MIGRATION 002 — Table listings
-- ================================================

CREATE TABLE IF NOT EXISTS public.listings (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  host_id          UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title            TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  description      TEXT NOT NULL,
  property_type    TEXT NOT NULL DEFAULT 'apartment',
  status           TEXT NOT NULL DEFAULT 'draft'
                     CHECK (status IN ('draft', 'published', 'paused', 'archived')),
  location         TEXT NOT NULL,
  city             TEXT NOT NULL,
  country          TEXT NOT NULL DEFAULT 'CI',
  latitude         DECIMAL(9,6),
  longitude        DECIMAL(9,6),
  price_per_night  INTEGER NOT NULL CHECK (price_per_night > 0),
  cleaning_fee     INTEGER NOT NULL DEFAULT 0,
  max_guests       INTEGER NOT NULL DEFAULT 1 CHECK (max_guests > 0),
  bedrooms         INTEGER NOT NULL DEFAULT 1,
  bathrooms        INTEGER NOT NULL DEFAULT 1,
  amenities        TEXT[] NOT NULL DEFAULT '{}',
  images           TEXT[] NOT NULL DEFAULT '{}',
  cover_image      TEXT,
  is_featured      BOOLEAN NOT NULL DEFAULT false,
  min_stay_nights  INTEGER NOT NULL DEFAULT 1,
  max_stay_nights  INTEGER NOT NULL DEFAULT 90,
  rating_average   DECIMAL(3,2) NOT NULL DEFAULT 0,
  rating_count     INTEGER NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour les recherches fréquentes
CREATE INDEX IF NOT EXISTS listings_city_idx      ON public.listings(city);
CREATE INDEX IF NOT EXISTS listings_status_idx    ON public.listings(status);
CREATE INDEX IF NOT EXISTS listings_host_idx      ON public.listings(host_id);
CREATE INDEX IF NOT EXISTS listings_featured_idx  ON public.listings(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS listings_price_idx     ON public.listings(price_per_night);
-- Index de recherche textuelle
CREATE INDEX IF NOT EXISTS listings_search_idx    ON public.listings USING gin(to_tsvector('french', title || ' ' || city));

-- Trigger updated_at
CREATE TRIGGER listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ================================================
-- RLS — listings
-- ================================================
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Tout le monde voit les listings publiés
CREATE POLICY "Published listings viewable by all"
  ON public.listings FOR SELECT
  USING (status = 'published');

-- Un hôte voit tous ses listings (même brouillons)
CREATE POLICY "Hosts see own listings"
  ON public.listings FOR SELECT
  USING (auth.uid() = host_id);

-- Un hôte peut créer des listings
CREATE POLICY "Hosts can insert listings"
  ON public.listings FOR INSERT
  WITH CHECK (auth.uid() = host_id);

-- Un hôte peut modifier ses listings
CREATE POLICY "Hosts can update own listings"
  ON public.listings FOR UPDATE
  USING (auth.uid() = host_id);

-- Admin peut tout faire
CREATE POLICY "Admins have full access to listings"
  ON public.listings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
