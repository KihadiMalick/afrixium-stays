// Types pour le système de fidélité

export type RewardsTier = "Bronze" | "Silver" | "Gold" | "Platinum";

export type TransactionType =
  | "earned_booking"    // Points gagnés après séjour complété
  | "redeemed"          // Points utilisés
  | "bonus"             // Bonus offert par admin
  | "expired"           // Points expirés
  | "referral";         // Parrainage

export interface RewardsBalance {
  id:            string;
  user_id:       string;
  total_points:  number;
  tier:          RewardsTier;
  lifetime_points: number;   // Total cumulé (pour calculer le tier)
  updated_at:    string;
}

export interface RewardsTransaction {
  id:               string;
  user_id:          string;
  booking_id:       string | null;
  type:             TransactionType;
  points:           number;         // Positif = gagné, négatif = dépensé
  description:      string;
  created_at:       string;
}

export interface RewardsSummary {
  balance:      RewardsBalance;
  transactions: RewardsTransaction[];
  next_tier:    RewardsTier | null;
  points_to_next_tier: number;
}
