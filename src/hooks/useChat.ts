"use client";

import { useEffect, useState } from "react";
import type { ChatThread, ChatMessage } from "@/types/chat.types";

export function useThreads() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then((json) => setThreads(json.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  return { threads, loading };
}

export function useMessages(threadId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    if (!threadId) return;
    fetch(`/api/messages?thread_id=${threadId}`)
      .then((r) => r.json())
      .then((json) => setMessages(json.data ?? []))
      .finally(() => setLoading(false));
  }, [threadId]);

  async function sendMessage(content: string) {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ thread_id: threadId, content }),
    });
    const json = await res.json();
    if (json.success && json.data) {
      setMessages((prev) => [...prev, json.data as ChatMessage]);
    }
  }

  return { messages, loading, sendMessage };
}
