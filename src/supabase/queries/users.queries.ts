import { getSupabaseServerClient } from "@/supabase/server";
import type { Profile, UpdateProfileInput } from "@/types/user.types";

// Récupère le profil de l'utilisateur connecté
export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = getSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) return null;
  return data as Profile;
}

// Récupère un profil public par ID
export async function getProfileById(userId: string): Promise<Profile | null> {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) return null;
  return data as Profile;
}

// Met à jour le profil utilisateur
export async function updateProfile(
  userId: string,
  updates: UpdateProfileInput
): Promise<Profile | null> {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Profile;
}

// Liste tous les utilisateurs (admin)
export async function getAllUsers() {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}
