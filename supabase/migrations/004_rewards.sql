-- ================================================
-- MIGRATION 004 — Système de récompenses
-- ================================================

-- Solde de points par utilisateur
CREATE TABLE IF NOT EXISTS public.rewards_balances (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  total_points     INTEGER NOT NULL DEFAULT 0 CHECK (total_points >= 0),
  tier             TEXT NOT NULL DEFAULT 'Bronze'
                     CHECK (tier IN ('Bronze', 'Silver', 'Gold', 'Platinum')),
  lifetime_points  INTEGER NOT NULL DEFAULT 0,
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS rewards_balances_user_idx ON public.rewards_balances(user_id);

-- Historique des transactions de points
CREATE TABLE IF NOT EXISTS public.rewards_transactions (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  booking_id   UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  type         TEXT NOT NULL
                 CHECK (type IN ('earned_booking','redeemed','bonus','expired','referral')),
  points       INTEGER NOT NULL,  -- Positif = gagné, négatif = dépensé
  description  TEXT NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS rewards_transactions_user_idx ON public.rewards_transactions(user_id);
CREATE INDEX IF NOT EXISTS rewards_transactions_booking_idx ON public.rewards_transactions(booking_id);

-- Trigger updated_at sur rewards_balances
CREATE TRIGGER rewards_balances_updated_at
  BEFORE UPDATE ON public.rewards_balances
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Trigger : crée un solde rewards quand un profil est créé
CREATE OR REPLACE FUNCTION public.handle_new_profile_rewards()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.rewards_balances (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_profile_created_rewards
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_profile_rewards();

-- ================================================
-- RLS — rewards
-- ================================================
ALTER TABLE public.rewards_balances    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own rewards balance"
  ON public.rewards_balances FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users see own transactions"
  ON public.rewards_transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins have full access to rewards"
  ON public.rewards_balances FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
