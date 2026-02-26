"use client";

import { useState } from "react";
import { Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice, calculateNights } from "@/lib/utils";
import { SERVICE_FEE_PERCENT } from "@/lib/constants";
import type { PriceSummary } from "@/types/booking.types";
import type { Listing } from "@/types/listing.types";

interface BookingWidgetProps {
  listing: Pick
    Listing,
    "id" | "price_per_night" | "cleaning_fee" | "max_guests" | "rating_average" | "rating_count"
  >;
  isLoggedIn: boolean;
}

export function BookingWidget({ listing, isLoggedIn }: BookingWidgetProps) {
  const [checkIn,  setCheckIn]  = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests,   setGuests]   = useState(1);

  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;

  const summary: PriceSummary | null = nights > 0
    ? (() => {
        const subtotal     = listing.price_per_night * nights;
        const serviceFee   = Math.round(subtotal * SERVICE_FEE_PERCENT);
        const total        = subtotal + listing.cleaning_fee + serviceFee;
        const pointsToEarn = nights * 10;
        return {
          nights,
          price_per_night: listing.price_per_night,
          subtotal,
          cleaning_fee:    listing.cleaning_fee,
          service_fee:     serviceFee,
          total,
          points_to_earn:  pointsToEarn,
        };
      })()
    : null;

  return (
    <div className="card p-6 sticky top-24">
      {/* Prix */}
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <span className="text-2xl font-bold text-dark-900">
            {formatPrice(listing.price_per_night)}
          </span>
          <span className="text-dark-400 text-sm"> / nuit</span>
        </div>
        {listing.rating_count > 0 && (
          <div className="flex items-center gap-1">
            <Star size={15} className="text-gold-500 fill-gold-500" />
            <span className="text-sm font-semibold">
              {listing.rating_average.toFixed(1)}
            </span>
            <span className="text-dark-400 text-xs">
              ({listing.rating_count})
            </span>
          </div>
        )}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="p-3 border border-dark-200 rounded-xl">
          <p className="text-xs font-semibold text-dark-500 uppercase mb-1">Arrivée</p>
          <input
            type="date"
            value={checkIn}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setCheckIn(e.target.value)}
            className="text-sm text-dark-900 w-full outline-none bg-transparent"
          />
        </div>
        <div className="p-3 border border-dark-200 rounded-xl">
          <p className="text-xs font-semibold text-dark-500 uppercase mb-1">Départ</p>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="text-sm text-dark-900 w-full outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Voyageurs */}
      <div className="p-3 border border-dark-200 rounded-xl mb-4">
        <p className="text-xs font-semibold text-dark-500 uppercase mb-1">Voyageurs</p>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="text-sm text-dark-900 w-full outline-none bg-transparent"
        >
          {Array.from({ length: listing.max_guests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "voyageur" : "voyageurs"}
            </option>
          ))}
        </select>
      </div>

      {/* Récapitulatif des prix */}
      {summary && (
        <div className="space-y-2 mb-4 p-4 bg-dark-50 rounded-xl text-sm">
          <PriceLine
            label={`${formatPrice(listing.price_per_night)} × ${summary.nights} nuits`}
            value={formatPrice(summary.subtotal)}
          />
          <PriceLine label="Frais de ménage"    value={formatPrice(summary.cleaning_fee)} />
          <PriceLine label="Frais de service"   value={formatPrice(summary.service_fee)} />
          <div className="border-t border-dark-200 pt-2 mt-2">
            <PriceLine
              label="Total"
              value={formatPrice(summary.total)}
              bold
            />
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-gold-600">
            <span>⭐</span>
            <span className="text-xs font-medium">
              Vous gagnerez {summary.points_to_earn} points rewards
            </span>
          </div>
        </div>
      )}

      {/* CTA */}
      <Button
        className="w-full"
        size="lg"
        disabled={!checkIn || !checkOut || nights <= 0}
      >
        {isLoggedIn ? "Réserver" : "Connexion pour réserver"}
      </Button>

      {/* Garanties */}
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-dark-400">
        <Shield size={13} />
        <span>Annulation gratuite · Paiement sécurisé</span>
      </div>
    </div>
  );
}

function PriceLine({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className={`flex justify-between ${bold ? "font-bold text-dark-900" : "text-dark-600"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
