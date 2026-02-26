import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Fusionne les classes Tailwind sans conflits
// Utilisation : cn("px-4 py-2", isActive && "bg-brand-500")
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formate un prix : 150000 → "150 000 FCFA"
export function formatPrice(amount: number, currency = "FCFA"): string {
  return new Intl.NumberFormat("fr-FR").format(amount) + " " + currency;
}

// Formate une date : "2024-12-25" → "25 décembre 2024"
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  });
}

// Formate une date courte : "2024-12-25" → "25 déc. 2024"
export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day:   "numeric",
    month: "short",
    year:  "numeric",
  });
}

// Calcule le nombre de nuits entre deux dates
export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end   = new Date(checkOut);
  const diff  = end.getTime() - start.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Génère un slug depuis un titre
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Tronque un texte
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

// Capitalise la première lettre
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
