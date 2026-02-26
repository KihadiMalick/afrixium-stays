// Types pour le système de messagerie en temps réel

export interface ChatThread {
  id:            string;
  guest_id:      string;
  admin_id:      string | null;   // Assigné à un admin
  booking_id:    string | null;   // Optionnel : lié à une réservation
  subject:       string;
  status:        "open" | "closed" | "pending";
  last_message:  string | null;
  last_message_at: string | null;
  is_read_guest:  boolean;
  is_read_admin:  boolean;
  created_at:    string;
  updated_at:    string;
}

export interface ChatMessage {
  id:         string;
  thread_id:  string;
  sender_id:  string;
  sender_role: "guest" | "host" | "admin";
  content:    string;
  is_read:    boolean;
  created_at: string;
}

// Thread avec son dernier message et infos participants (pour la liste inbox)
export interface ThreadWithPreview extends ChatThread {
  unread_count: number;
}
