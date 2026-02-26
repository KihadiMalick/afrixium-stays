import { z } from "zod";

// --- Auth ---

export const loginSchema = z.object({
  email:    z.string().email("Email invalide"),
  password: z.string().min(8, "Minimum 8 caractères"),
});

export const registerSchema = z.object({
  email:      z.string().email("Email invalide"),
  password:   z.string().min(8, "Minimum 8 caractères"),
  first_name: z.string().min(2, "Minimum 2 caractères"),
  last_name:  z.string().min(2, "Minimum 2 caractères"),
  phone:      z.string().optional(),
});

export type LoginInput    = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

// --- Réservation ---

export const bookingSchema = z.object({
  listing_id: z.string().uuid("ID listing invalide"),
  check_in:   z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format date invalide (YYYY-MM-DD)"),
  check_out:  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format date invalide (YYYY-MM-DD)"),
  guests:     z.number().int().min(1).max(20),
  message:    z.string().max(500).optional(),
}).refine(
  (data) => new Date(data.check_out) > new Date(data.check_in),
  { message: "La date de départ doit être après la date d'arrivée", path: ["check_out"] }
);

export type BookingInput = z.infer<typeof bookingSchema>;

// --- Listing ---

export const listingSchema = z.object({
  title:         z.string().min(10, "Minimum 10 caractères").max(100),
  description:   z.string().min(50, "Minimum 50 caractères").max(2000),
  property_type: z.string(),
  location:      z.string().min(3),
  city:          z.string().min(2),
  country:       z.string().min(2),
  price_per_night: z.number().positive("Le prix doit être positif"),
  max_guests:    z.number().int().min(1).max(20),
  bedrooms:      z.number().int().min(0),
  bathrooms:     z.number().int().min(1),
  amenities:     z.array(z.string()).optional(),
});

export type ListingInput = z.infer<typeof listingSchema>;

// --- Message ---

export const messageSchema = z.object({
  thread_id: z.string().uuid(),
  content:   z.string().min(1, "Le message ne peut pas être vide").max(1000),
});

export type MessageInput = z.infer<typeof messageSchema>;

// --- Recherche ---

export const searchSchema = z.object({
  location:  z.string().optional(),
  check_in:  z.string().optional(),
  check_out: z.string().optional(),
  guests:    z.coerce.number().int().min(1).optional(),
  min_price: z.coerce.number().optional(),
  max_price: z.coerce.number().optional(),
  type:      z.string().optional(),
});

export type SearchInput = z.infer<typeof searchSchema>;
