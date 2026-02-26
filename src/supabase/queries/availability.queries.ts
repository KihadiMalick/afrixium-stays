import { getSupabaseServerClient } from "@/supabase/server";

// Récupère toutes les dates réservées d'un listing (pour le calendrier)
export async function getBookedDates(
  listingId: string
): Promise<{ check_in: string; check_out: string }[]> {
  const supabase = getSupabaseServerClient();

  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("bookings")
    .select("check_in, check_out")
    .eq("listing_id", listingId)
    .in("status", ["confirmed", "pending"])
    .gte("check_out", today);  // Seulement les futures

  if (error) throw new Error(error.message);
  return data ?? [];
}
