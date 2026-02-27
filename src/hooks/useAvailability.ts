"use client";

import { useEffect, useState } from "react";

export function useAvailability(listingId: string) {
  const [bookedDates, setBookedDates] = useState<{ check_in: string; check_out: string }[]>([]);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    if (!listingId) return;
    fetch(`/api/availability?listing_id=${listingId}`)
      .then((r) => r.json())
      .then((json) => setBookedDates(json.data ?? []))
      .finally(() => setLoading(false));
  }, [listingId]);

  function isDateAvailable(date: string): boolean {
    return !bookedDates.some(
      ({ check_in, check_out }) => date >= check_in && date < check_out
    );
  }

  return { bookedDates, loading, isDateAvailable };
}
