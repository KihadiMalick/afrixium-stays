import { cn } from "@/lib/utils";
import type { RewardsTier } from "@/types/rewards.types";

interface RewardsTierBadgeProps {
  tier:       RewardsTier;
  size?:      "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const tierConfig: Record<RewardsTier, { emoji: string; color: string; bg: string }> = {
  Bronze:   { emoji: "🥉", color: "text-amber-700",  bg: "bg-amber-50 border-amber-200" },
  Silver:   { emoji: "🥈", color: "text-slate-600",  bg: "bg-slate-50 border-slate-200" },
  Gold:     { emoji: "🥇", color: "text-gold-700",   bg: "bg-gold-50 border-gold-200" },
  Platinum: { emoji: "💎", color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-2 text-base",
};

export function RewardsTierBadge({
  tier,
  size      = "md",
  showLabel = true,
  className,
}: RewardsTierBadgeProps) {
  const config = tierConfig[tier];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold",
        config.color,
        config.bg,
        sizes[size],
        className
      )}
    >
      <span>{config.emoji}</span>
      {showLabel && <span>{tier}</span>}
    </span>
  );
}
