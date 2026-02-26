import { getSupabaseServerClient } from "@/supabase/server";
import type { BookingWithDetails } from "@/types/booking.types";

// Réservations d'un guest (son tableau de bord)
export async function getGuestBookings(guestId: string): Promise<BookingWithDetails[]> {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      listing:listings!listing_id (
        id, slug, title, city, country, cover_image,
        price_per_night, property_type, bedrooms, max_guests,
        rating_average, rating_count, is_featured
      ),
      guest:profiles!guest_id (
        id, first_name, last_name, avatar_url, is_verified
      )
    `)
    .eq("guest_id", guestId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as unknown as BookingWithDetails[];
}

// Une réservation par ID (pour la page détail)
export async function getBookingById(bookingId: string, guestId: string) {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      listing:listings!listing_id (*),
      guest:profiles!guest_id (
        id, first_name, last_name, avatar_url, is_verified
      )
    `)
    .eq("id", bookingId)
    .eq("guest_id", guestId)
    .single();

  if (error) return null;
  return data;
}

// Vérifie si un listing est disponible pour les dates demandées
export async function checkAvailability(
  listingId: string,
  checkIn: string,
  checkOut: string
): Promise<boolean> {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("bookings")
    .select("id")
    .eq("listing_id", listingId)
    .in("status", ["confirmed", "pending"])
    .or(`check_in.lt.${checkOut},check_out.gt.${checkIn}`);

  if (error) throw new Error(error.message);
  return (data?.length ?? 0) === 0; // true = disponible
}

// Toutes les réservations (admin)
export async function getAllBookings() {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      listing:listings!listing_id (id, title, city),
      guest:profiles!guest_id (id, first_name, last_name, email)
    `)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}
