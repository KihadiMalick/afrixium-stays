import Link from "next/link";
import { formatDateShort } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { ChatThread } from "@/types/chat.types";

interface ChatThreadListProps {
  threads:         ChatThread[];
  activeThreadId?: string;
}

export function ChatThreadList({ threads, activeThreadId }: ChatThreadListProps) {
  if (threads.length === 0) {
    return (
      <div className="text-center py-12 text-dark-400 text-sm">
        Aucune conversation
      </div>
    );
  }

  return (
    <div className="divide-y divide-dark-100">
      {threads.map((thread) => (
        <Link
          key={thread.id}
          href={`/messages/${thread.id}`}
          className={cn(
            "block p-4 hover:bg-dark-50 transition-colors",
            activeThreadId === thread.id && "bg-brand-50"
          )}
        >
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="font-medium text-dark-900 text-sm line-clamp-1">{thread.subject}</p>
            {thread.last_message_at && (
              <span className="text-xs text-dark-400 flex-shrink-0">
                {formatDateShort(thread.last_message_at)}
              </span>
            )}
          </div>
          {thread.last_message && (
            <p className="text-xs text-dark-400 line-clamp-1">{thread.last_message}</p>
          )}
          <div className="flex items-center gap-2 mt-1.5">
            <span className={cn(
              "inline-block w-2 h-2 rounded-full flex-shrink-0",
              thread.status === "open"   ? "bg-green-400" :
              thread.status === "pending"? "bg-orange-400" :
                                           "bg-dark-300"
            )} />
            <span className="text-xs text-dark-400 capitalize">{thread.status}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
