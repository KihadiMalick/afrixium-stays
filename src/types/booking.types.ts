import type { BookingStatus } from "@lib/constants";
import type { ListingCard } from "./listing.types";
import type { PublicProfile } from "./user.types";

export interface Booking {
  id:            string;
  listing_id:    string;
  guest_id:      string;
  check_in:      string;   // Format "YYYY-MM-DD"
  check_out:     string;
  guests:        number;
  status:        BookingStatus;
  // Prix calculé au moment de la réservation (snapshot)
  price_per_night:  number;
  cleaning_fee:     number;
  service_fee:      number;
  total_price:      number;
  // Points gagnés
  points_earned:    number;
  // Stripe (futur)
  stripe_payment_intent_id: string | null;
  // Message du guest à l'hôte
  guest_message:    string | null;
  created_at:       string;
  updated_at:       string;
}

// Réservation avec listing et guest inclus (pour les dashboards)
export interface BookingWithDetails extends Booking {
  listing: ListingCard;
  guest:   PublicProfile;
}

// Résumé de prix affiché dans le widget de réservation
export interface PriceSummary {
  nights:          number;
  price_per_night: number;
  subtotal:        number;
  cleaning_fee:    number;
  service_fee:     number;
  total:           number;
  points_to_earn:  number;
}
