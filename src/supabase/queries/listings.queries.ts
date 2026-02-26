import { getSupabaseServerClient } from "@/supabase/server";
import type { SearchFilters, PaginatedListings, ListingWithHost } from "@/types/listing.types";
import { LISTINGS_PER_PAGE } from "@lib/constants";

// Récupère les listings publiés avec filtres et pagination
export async function getListings(filters: SearchFilters = {}): Promise<PaginatedListings> {
  const supabase = getSupabaseServerClient();
  const page = filters.page ?? 1;
  const from = (page - 1) * LISTINGS_PER_PAGE;
  const to   = from + LISTINGS_PER_PAGE - 1;

  let query = supabase
    .from("listings")
    .select(
      `id, slug, title, city, country, price_per_night, cover_image,
       property_type, bedrooms, max_guests, rating_average, rating_count, is_featured`,
      { count: "exact" }
    )
    .eq("status", "published")
    .range(from, to)
    .order("is_featured", { ascending: false })
    .order("created_at",  { ascending: false });

  if (filters.location) {
    query = query.or(
      `city.ilike.%${filters.location}%,country.ilike.%${filters.location}%,location.ilike.%${filters.location}%`
    );
  }
  if (filters.guests)    query = query.gte("max_guests",       filters.guests);
  if (filters.min_price) query = query.gte("price_per_night",  filters.min_price);
  if (filters.max_price) query = query.lte("price_per_night",  filters.max_price);
  if (filters.type)      query = query.eq("property_type",     filters.type);

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);

  return {
    data:       data ?? [],
    total:      count ?? 0,
    page,
    totalPages: Math.ceil((count ?? 0) / LISTINGS_PER_PAGE),
  };
}

// Récupère un listing par son slug (page de détail)
export async function getListingBySlug(slug: string): Promise<ListingWithHost | null> {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("listings")
    .select(`
      *,
      host:profiles!host_id (
        id, first_name, last_name, avatar_url, is_verified
      )
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data as unknown as ListingWithHost;
}

// Récupère les listings d'un hôte
export async function getHostListings(hostId: string) {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("host_id", hostId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

// Récupère les listings mis en avant pour la homepage
export async function getFeaturedListings(limit = 6) {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("listings")
    .select(
      `id, slug, title, city, country, price_per_night, cover_image,
       property_type, bedrooms, max_guests, rating_average, rating_count, is_featured`
    )
    .eq("status", "published")
    .eq("is_featured", true)
    .limit(limit)
    .order("rating_average", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}
