import { Star, TrendingUp } from "lucide-react";
import { RewardsTierBadge } from "./RewardsTierBadge";
import { REWARDS_TIERS } from "@/lib/constants";
import type { RewardsBalance as RewardsBalanceType, RewardsTier } from "@/types/rewards.types";

interface RewardsBalanceProps {
  balance: RewardsBalanceType;
}

const tierOrder: RewardsTier[] = ["Bronze", "Silver", "Gold", "Platinum"];

export function RewardsBalance({ balance }: RewardsBalanceProps) {
  const currentTierIndex = tierOrder.indexOf(balance.tier);
  const nextTier = tierOrder[currentTierIndex + 1] as RewardsTier | undefined;
  const nextTierConfig = nextTier ? REWARDS_TIERS[nextTier.toUpperCase() as keyof typeof REWARDS_TIERS] : null;
  const pointsToNext = nextTierConfig
    ? nextTierConfig.minPoints - balance.lifetime_points
    : 0;
  const progress = nextTierConfig
    ? Math.min(
        ((balance.lifetime_points - REWARDS_TIERS[balance.tier.toUpperCase() as keyof typeof REWARDS_TIERS].minPoints) /
         (nextTierConfig.minPoints - REWARDS_TIERS[balance.tier.toUpperCase() as keyof typeof REWARDS_TIERS].minPoints)) * 100,
        100
      )
    : 100;

  return (
    <div className="card p-6 bg-gradient-to-br from-dark-900 to-dark-800 text-white">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-dark-300 text-sm mb-1">Solde de points</p>
          <p className="text-4xl font-bold text-white flex items-center gap-2">
            <Star className="text-gold-400 fill-gold-400" size={28} />
            {balance.total_points.toLocaleString("fr-FR")}
          </p>
          <p className="text-dark-400 text-xs mt-1">
            {balance.lifetime_points.toLocaleString("fr-FR")} points à vie
          </p>
        </div>
        <RewardsTierBadge tier={balance.tier} size="md" />
      </div>

      {nextTier && (
        <div>
          <div className="flex justify-between text-xs text-dark-300 mb-2">
            <span className="flex items-center gap-1">
              <TrendingUp size={12} />
              Progression vers {nextTier}
            </span>
            <span>{pointsToNext} pts restants</span>
          </div>
          <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-gold-500 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {!nextTier && (
        <div className="flex items-center gap-2 text-gold-400 text-sm">
          <span>💎</span>
          <span className="font-medium">Niveau maximum atteint !</span>
        </div>
      )}
    </div>
  );
}
