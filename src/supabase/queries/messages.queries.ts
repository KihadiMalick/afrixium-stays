import { getSupabaseServerClient } from "@/supabase/server";
import type { ChatThread, ChatMessage } from "@/types/chat.types";

// Threads d'un utilisateur (sa boîte de réception)
export async function getUserThreads(userId: string): Promise<ChatThread[]> {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("chat_threads")
    .select("*")
    .or(`guest_id.eq.${userId},admin_id.eq.${userId}`)
    .order("last_message_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as ChatThread[];
}

// Messages d'un thread
export async function getThreadMessages(
  threadId: string
): Promise<ChatMessage[]> {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as ChatMessage[];
}

// Marque les messages d'un thread comme lus
export async function markThreadAsRead(
  threadId: string,
  role: "guest" | "admin"
) {
  const supabase = getSupabaseServerClient();
  const field = role === "guest" ? "is_read_guest" : "is_read_admin";

  await supabase
    .from("chat_threads")
    .update({ [field]: true })
    .eq("id", threadId);
}
