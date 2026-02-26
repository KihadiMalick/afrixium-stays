-- ================================================
-- MIGRATION 003 — Table bookings
-- ================================================

CREATE TABLE IF NOT EXISTS public.bookings (
  id                        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id                UUID NOT NULL REFERENCES public.listings(id) ON DELETE RESTRICT,
  guest_id                  UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  check_in                  DATE NOT NULL,
  check_out                 DATE NOT NULL,
  guests                    INTEGER NOT NULL DEFAULT 1 CHECK (guests > 0),
  status                    TEXT NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending','confirmed','cancelled','completed','refunded')),
  price_per_night           INTEGER NOT NULL,
  cleaning_fee              INTEGER NOT NULL DEFAULT 0,
  service_fee               INTEGER NOT NULL DEFAULT 0,
  total_price               INTEGER NOT NULL,
  points_earned             INTEGER NOT NULL DEFAULT 0,
  stripe_payment_intent_id  TEXT,
  guest_message             TEXT,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT valid_dates CHECK (check_out > check_in)
);

-- Index
CREATE INDEX IF NOT EXISTS bookings_guest_idx    ON public.bookings(guest_id);
CREATE INDEX IF NOT EXISTS bookings_listing_idx  ON public.bookings(listing_id);
CREATE INDEX IF NOT EXISTS bookings_status_idx   ON public.bookings(status);
CREATE INDEX IF NOT EXISTS bookings_dates_idx    ON public.bookings(check_in, check_out);

-- Trigger updated_at
CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ================================================
-- RLS — bookings
-- ================================================
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Un guest voit uniquement ses réservations
CREATE POLICY "Guests see own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = guest_id);

-- Un hôte voit les réservations de ses listings
CREATE POLICY "Hosts see bookings of their listings"
  ON public.bookings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE id = listing_id AND host_id = auth.uid()
    )
  );

-- Un guest peut créer une réservation
CREATE POLICY "Guests can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = guest_id);

-- Admin voit tout
CREATE POLICY "Admins have full access to bookings"
  ON public.bookings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
