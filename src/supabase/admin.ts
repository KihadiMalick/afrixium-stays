import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

// ATTENTION : Ne jamais exposer ce client côté navigateur
// Uniquement dans les API routes (app/api/)
export function getSupabaseAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY manquante");
  }

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken:  false,
        persistSession:    false,
      },
    }
  );
}
