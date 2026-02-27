import { formatDate } from "@/lib/utils";
import type { RewardsTransaction } from "@/types/rewards.types";

interface RewardsHistoryProps {
  transactions: RewardsTransaction[];
}

const typeLabels: Record<RewardsTransaction["type"], string> = {
  earned_booking: "Points gagnés",
  redeemed:       "Points utilisés",
  bonus:          "Bonus",
  expired:        "Expirés",
  referral:       "Parrainage",
};

export function RewardsHistory({ transactions }: RewardsHistoryProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-3xl mb-3">⭐</p>
        <p className="text-dark-600 font-medium mb-1">Aucune transaction</p>
        <p className="text-sm text-dark-400">Vos points apparaîtront ici après vos séjours.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-dark-100">
      {transactions.map((tx) => (
        <div key={tx.id} className="flex items-center justify-between py-3 px-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-dark-800">{tx.description}</p>
            <p className="text-xs text-dark-400 mt-0.5">
              {typeLabels[tx.type]} · {formatDate(tx.created_at)}
            </p>
          </div>
          <span className={`text-sm font-bold ml-4 flex-shrink-0 ${tx.points > 0 ? "text-green-600" : "text-red-500"}`}>
            {tx.points > 0 ? "+" : ""}{tx.points} pts
          </span>
        </div>
      ))}
    </div>
  );
}
