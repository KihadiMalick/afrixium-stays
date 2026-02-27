"use client";

import { useState } from "react";
import { Star, Shield } from "lucide-react";
import { formatPrice, calculateNights } from "@/lib/utils";
import { SERVICE_FEE_PERCENT } from "@/lib/constants";
import type { PriceSummary } from "@/types/booking.types";

interface BookingWidgetProps {
  listing: {
    id: string;
    price_per_night: number;
    cleaning_fee: number;
    max_guests: number;
    rating_average: number;
    rating_count: number;
  };
  isLoggedIn: boolean;
}

export function BookingWidget({ listing, isLoggedIn }: BookingWidgetProps) {
  const [checkIn,  setCheckIn]  = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests,   setGuests]   = useState(1);

  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;

  const summary: PriceSummary | null = nights > 0
    ? (() => {
        const subtotal   = listing.price_per_night * nights;
        const serviceFee = Math.round(subtotal * SERVICE_FEE_PERCENT);
        const total      = subtotal + listing.cleaning_fee + serviceFee;
        return {
          nights,
          price_per_night: listing.price_per_night,
          subtotal,
          cleaning_fee:    listing.cleaning_fee,
          service_fee:     serviceFee,
          total,
          points_to_earn:  nights * 10,
        };
      })()
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(listing.price_per_night)}
          </span>
          <span className="text-gray-400 text-sm"> / nuit</span>
        </div>
        {listing.rating_count > 0 && (
          <div className="flex items-center gap-1">
            <Star size={15} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold">
              {listing.rating_average.toFixed(1)}
            </span>
            <span className="text-gray-400 text-xs">
              ({listing.rating_count})
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="p-3 border border-gray-200 rounded-xl">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Arrivée</p>
          <input
            type="date"
            value={checkIn}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setCheckIn(e.target.value)}
            className="text-sm text-gray-900 w-full outline-none bg-transparent"
          />
        </div>
        <div className="p-3 border border-gray-200 rounded-xl">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Départ</p>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="text-sm text-gray-900 w-full outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="p-3 border border-gray-200 rounded-xl mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Voyageurs</p>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="text-sm text-gray-900 w-full outline-none bg-transparent"
        >
          {Array.from({ length: listing.max_guests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "voyageur" : "voyageurs"}
            </option>
          ))}
        </select>
      </div>

      {summary && (
        <div className="space-y-2 mb-4 p-4 bg-gray-50 rounded-xl text-sm">
          <div className="flex justify-between text-gray-600">
            <span>{formatPrice(listing.price_per_night)} × {summary.nights} nuits</span>
            <span>{formatPrice(summary.subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Frais de ménage</span>
            <span>{formatPrice(summary.cleaning_fee)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Frais de service</span>
            <span>{formatPrice(summary.service_fee)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span>{formatPrice(summary.total)}</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-600 text-xs">
            <span>⭐</span>
            <span>Vous gagnerez {summary.points_to_earn} points rewards</span>
          </div>
        </div>
      )}

      <button
        disabled={!checkIn || !checkOut || nights <= 0}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
      >
        {isLoggedIn ? "Réserver" : "Connexion pour réserver"}
      </button>

      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
        <Shield size={13} />
        <span>Annulation gratuite · Paiement sécurisé</span>
      </div>
    </div>
  );
}
