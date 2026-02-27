"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import type { ChatMessage as ChatMessageType } from "@/types/chat.types";

interface ChatWindowProps {
  messages:    ChatMessageType[];
  currentUserId: string;
  onSend:      (content: string) => Promise<void>;
  loading?:    boolean;
}

export function ChatWindow({ messages, currentUserId, onSend, loading }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading && (
          <div className="flex justify-center py-8">
            <span className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            isOwnMessage={msg.sender_id === currentUserId}
          />
        ))}
        <div ref={bottomRef} />
      </div>
      <ChatInput onSend={onSend} />
    </div>
  );
}
