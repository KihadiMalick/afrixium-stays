"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { calculateNights } from "@/lib/utils";

interface BookingFormProps {
  listingId:    string;
  maxGuests:    number;
  minStay:      number;
  onSuccess?:   () => void;
}

export function BookingForm({ listingId, maxGuests, minStay, onSuccess }: BookingFormProps) {
  const [checkIn,  setCheckIn]  = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests,   setGuests]   = useState(1);
  const [message,  setMessage]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;
  const isValid = checkIn && checkOut && nights >= minStay;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listing_id: listingId, check_in: checkIn, check_out: checkOut, guests, message }),
      });
      const data = await res.json();
      if (!data.success) setError(data.error ?? "Erreur lors de la réservation");
      else onSuccess?.();
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <Input label="Arrivée"  type="date" value={checkIn}  onChange={(e) => setCheckIn(e.target.value)}  min={new Date().toISOString().split("T")[0]} required />
        <Input label="Départ"   type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} min={checkIn} required />
      </div>
      <div>
        <label className="text-sm font-medium text-dark-700 block mb-1.5">Voyageurs</label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="input-base"
        >
          {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? "voyageur" : "voyageurs"}</option>
          ))}
        </select>
      </div>
      <Input
        label="Message à l'hôte (optionnel)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Questions, demandes spéciales..."
      />
      <Button type="submit" loading={loading} disabled={!isValid} className="w-full" size="lg">
        {nights > 0 ? `Réserver — ${nights} nuits` : "Réserver"}
      </Button>
    </form>
  );
}
