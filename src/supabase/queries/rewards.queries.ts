import { getSupabaseServerClient } from "@/supabase/server";
import type { RewardsBalance, RewardsTransaction } from "@/types/rewards.types";

// Solde de points d'un utilisateur
export async function getRewardsBalance(userId: string): Promise<RewardsBalance | null> {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("rewards_balances")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) return null;
  return data as RewardsBalance;
}

// Historique des transactions
export async function getRewardsTransactions(
  userId: string,
  limit = 20
): Promise<RewardsTransaction[]> {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("rewards_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data ?? []) as RewardsTransaction[];
}
