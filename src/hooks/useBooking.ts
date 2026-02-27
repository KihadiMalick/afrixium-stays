"use client";

import { useState } from "react";

interface BookingFormState {
  check_in:  string;
  check_out: string;
  guests:    number;
}

export function useBooking(listingId: string) {
  const [form,    setForm]    = useState<BookingFormState>({ check_in: "", check_out: "", guests: 1 });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  async function submitBooking(message?: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listing_id: listingId, ...form, message }),
      });
      const data = await res.json();
      if (!data.success) setError(data.error ?? "Erreur lors de la réservation");
      return data;
    } catch {
      setError("Erreur réseau");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { form, setForm, submitBooking, loading, error };
}
