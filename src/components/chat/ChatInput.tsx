"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend:   (content: string) => Promise<void>;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!content.trim() || loading) return;
    setLoading(true);
    await onSend(content.trim());
    setContent("");
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-3 p-4 border-t border-dark-100 bg-white">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
        placeholder="Votre message..."
        disabled={disabled || loading}
        className="flex-1 input-base py-2.5 text-sm"
      />
      <button
        onClick={handleSend}
        disabled={!content.trim() || loading || disabled}
        className="w-11 h-11 bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
      >
        <Send size={18} />
      </button>
    </div>
  );
}
