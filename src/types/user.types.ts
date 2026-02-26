import type { UserRole } from "@lib/constants";

// Profil utilisateur stocké dans la table `profiles` de Supabase
export interface Profile {
  id:            string;       // UUID — correspond à auth.users.id
  email:         string;
  first_name:    string;
  last_name:     string;
  phone:         string | null;
  avatar_url:    string | null;
  role:          UserRole;     // "guest" | "host" | "admin"
  is_verified:   boolean;
  created_at:    string;
  updated_at:    string;
}

// Ce qu'on affiche publiquement d'un utilisateur
export type PublicProfile = Pick
  Profile,
  "id" | "first_name" | "last_name" | "avatar_url" | "is_verified"
>;

// Formulaire de mise à jour du profil
export interface UpdateProfileInput {
  first_name?: string;
  last_name?:  string;
  phone?:      string;
  avatar_url?: string;
}
