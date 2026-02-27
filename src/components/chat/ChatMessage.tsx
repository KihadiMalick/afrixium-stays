import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/types/chat.types";

interface ChatMessageProps {
  message:    ChatMessageType;
  isOwnMessage: boolean;
}

export function ChatMessage({ message, isOwnMessage }: ChatMessageProps) {
  const time = new Date(message.created_at).toLocaleTimeString("fr-FR", {
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className={cn("flex", isOwnMessage ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm",
          isOwnMessage
            ? "bg-brand-500 text-white rounded-br-sm"
            : "bg-dark-100 text-dark-900 rounded-bl-sm"
        )}
      >
        <p className="leading-relaxed">{message.content}</p>
        <p className={cn("text-xs mt-1", isOwnMessage ? "text-brand-200" : "text-dark-400")}>
          {time}
        </p>
      </div>
    </div>
  );
}
