"use client";

import { useEffect, useState } from "react";
import type { ListingCard, SearchFilters, PaginatedListings } from "@/types/listing.types";

export function useListings(filters: SearchFilters = {}) {
  const [data,    setData]    = useState<PaginatedListings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.location)  params.set("location",  filters.location);
    if (filters.check_in)  params.set("check_in",  filters.check_in);
    if (filters.check_out) params.set("check_out", filters.check_out);
    if (filters.guests)    params.set("guests",    String(filters.guests));
    if (filters.min_price) params.set("min_price", String(filters.min_price));
    if (filters.max_price) params.set("max_price", String(filters.max_price));
    if (filters.type)      params.set("type",      filters.type);

    fetch(`/api/listings?${params.toString()}`)
      .then((r) => r.json())
      .then((json) => { setData(json.data ?? null); })
      .catch(() => setError("Erreur de chargement"))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  return { data, loading, error };
}

export function useFeaturedListings() {
  const [listings, setListings] = useState<ListingCard[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    fetch("/api/listings?featured=true&limit=6")
      .then((r) => r.json())
      .then((json) => setListings(json.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  return { listings, loading };
}
