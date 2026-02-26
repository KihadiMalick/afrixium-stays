-- ================================================
-- MIGRATION 005 — Système de messagerie
-- ================================================

-- Threads de conversation
CREATE TABLE IF NOT EXISTS public.chat_threads (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  admin_id         UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  booking_id       UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  subject          TEXT NOT NULL,
  status           TEXT NOT NULL DEFAULT 'open'
                     CHECK (status IN ('open', 'closed', 'pending')),
  last_message     TEXT,
  last_message_at  TIMESTAMPTZ,
  is_read_guest    BOOLEAN NOT NULL DEFAULT true,
  is_read_admin    BOOLEAN NOT NULL DEFAULT false,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS chat_threads_guest_idx  ON public.chat_threads(guest_id);
CREATE INDEX IF NOT EXISTS chat_threads_admin_idx  ON public.chat_threads(admin_id);
CREATE INDEX IF NOT EXISTS chat_threads_status_idx ON public.chat_threads(status);

-- Messages individuels
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id    UUID NOT NULL REFERENCES public.chat_threads(id) ON DELETE CASCADE,
  sender_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  sender_role  TEXT NOT NULL CHECK (sender_role IN ('guest', 'host', 'admin')),
  content      TEXT NOT NULL,
  is_read      BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS chat_messages_thread_idx ON public.chat_messages(thread_id);
CREATE INDEX IF NOT EXISTS chat_messages_sender_idx ON public.chat_messages(sender_id);

-- Trigger : met à jour le thread quand un message est envoyé
CREATE OR REPLACE FUNCTION public.update_thread_on_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.chat_threads
  SET
    last_message    = NEW.content,
    last_message_at = NEW.created_at,
    is_read_guest   = CASE WHEN NEW.sender_role = 'admin' THEN false ELSE true END,
    is_read_admin   = CASE WHEN NEW.sender_role = 'guest' THEN false ELSE true END,
    updated_at      = NOW()
  WHERE id = NEW.thread_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_message_sent
  AFTER INSERT ON public.chat_messages
  FOR EACH ROW EXECUTE FUNCTION public.update_thread_on_message();

-- Trigger updated_at
CREATE TRIGGER chat_threads_updated_at
  BEFORE UPDATE ON public.chat_threads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ================================================
-- RLS — chat
-- ================================================
ALTER TABLE public.chat_threads  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Un guest voit ses threads
CREATE POLICY "Guests see own threads"
  ON public.chat_threads FOR SELECT
  USING (auth.uid() = guest_id);

-- Un admin voit tous les threads
CREATE POLICY "Admins see all threads"
  ON public.chat_threads FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Un guest peut créer un thread
CREATE POLICY "Guests can create threads"
  ON public.chat_threads FOR INSERT
  WITH CHECK (auth.uid() = guest_id);

-- Participants voient les messages de leurs threads
CREATE POLICY "Thread participants see messages"
  ON public.chat_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_threads
      WHERE id = thread_id
      AND (guest_id = auth.uid() OR admin_id = auth.uid())
    )
  );

-- Participants peuvent envoyer des messages
CREATE POLICY "Thread participants can send messages"
  ON public.chat_messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- Active Realtime pour le chat (nécessaire pour useChat)
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_threads;
