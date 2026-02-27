import { getSupabaseServerClient } from "@/supabase/server";
import type { ChatThread, ChatMessage } from "@/types/chat.types";

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

export async function getThreadMessages(threadId: string): Promise<ChatMessage[]> {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as ChatMessage[];
}

export async function markThreadAsRead(
  threadId: string,
  role: "guest" | "admin"
) {
  const supabase = getSupabaseServerClient();

  if (role === "guest") {
    await supabase
      .from("chat_threads")
      .update({ is_read_guest: true })
      .eq("id", threadId);
  } else {
    await supabase
      .from("chat_threads")
      .update({ is_read_admin: true })
      .eq("id", threadId);
  }
}
