"use client";

import { useEffect, useState } from "react";
import type { RewardsBalance, RewardsTransaction } from "@/types/rewards.types";

export function useRewards() {
  const [balance,      setBalance]      = useState<RewardsBalance | null>(null);
  const [transactions, setTransactions] = useState<RewardsTransaction[]>([]);
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    fetch("/api/rewards")
      .then((r) => r.json())
      .then((json) => {
        setBalance(json.balance ?? null);
        setTransactions(json.transactions ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  return { balance, transactions, loading };
}
