"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import type { SearchFilters } from "@/types/listing.types";

export function useSearch() {
  const searchParams = useSearchParams();
  const router       = useRouter();

  const filters: SearchFilters = {
    location:  searchParams.get("location")  ?? undefined,
    check_in:  searchParams.get("check_in")  ?? undefined,
    check_out: searchParams.get("check_out") ?? undefined,
    guests:    searchParams.get("guests")    ? Number(searchParams.get("guests"))    : undefined,
    min_price: searchParams.get("min_price") ? Number(searchParams.get("min_price")) : undefined,
    max_price: searchParams.get("max_price") ? Number(searchParams.get("max_price")) : undefined,
    type:      searchParams.get("type")      ?? undefined,
    page:      searchParams.get("page")      ? Number(searchParams.get("page"))      : 1,
  };

  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

  function applyFilters(newFilters: Partial<SearchFilters>) {
    const merged = { ...localFilters, ...newFilters, page: 1 };
    setLocalFilters(merged);
    const params = new URLSearchParams();
    if (merged.location)  params.set("location",  merged.location);
    if (merged.check_in)  params.set("check_in",  merged.check_in);
    if (merged.check_out) params.set("check_out", merged.check_out);
    if (merged.guests)    params.set("guests",    String(merged.guests));
    if (merged.min_price) params.set("min_price", String(merged.min_price));
    if (merged.max_price) params.set("max_price", String(merged.max_price));
    if (merged.type)      params.set("type",      merged.type);
    router.push(`/search?${params.toString()}`);
  }

  return { filters: localFilters, applyFilters };
}
