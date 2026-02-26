// Constantes globales de l'application AfriXium Stays

// Rôles utilisateurs
export const USER_ROLES = {
  GUEST: "guest",
  HOST:  "host",
  ADMIN: "admin",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

// Statuts de réservation
export const BOOKING_STATUS = {
  PENDING:   "pending",    // En attente de confirmation
  CONFIRMED: "confirmed",  // Confirmée
  CANCELLED: "cancelled",  // Annulée
  COMPLETED: "completed",  // Séjour terminé
  REFUNDED:  "refunded",   // Remboursée
} as const;

export type BookingStatus = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

// Statuts de listing
export const LISTING_STATUS = {
  DRAFT:     "draft",      // Brouillon
  PUBLISHED: "published",  // Publié
  PAUSED:    "paused",     // Mis en pause
  ARCHIVED:  "archived",   // Archivé
} as const;

export type ListingStatus = (typeof LISTING_STATUS)[keyof typeof LISTING_STATUS];

// Types de bien
export const PROPERTY_TYPES = {
  APARTMENT:  "apartment",
  VILLA:      "villa",
  STUDIO:     "studio",
  HOUSE:      "house",
  LOFT:       "loft",
  PENTHOUSE:  "penthouse",
} as const;

// Système de récompenses (tiers)
export const REWARDS_TIERS = {
  BRONZE:   { name: "Bronze",   minPoints: 0,    color: "#cd7f32" },
  SILVER:   { name: "Silver",   minPoints: 200,  color: "#c0c0c0" },
  GOLD:     { name: "Gold",     minPoints: 500,  color: "#f59e0b" },
  PLATINUM: { name: "Platinum", minPoints: 1000, color: "#e5e4e2" },
} as const;

// Points gagnés par nuit réservée
export const POINTS_PER_NIGHT = 10;

// Frais de service (pourcentage)
export const SERVICE_FEE_PERCENT = 0.08; // 8%

// Durée minimale et maximale de séjour (nuits)
export const MIN_STAY_NIGHTS = 1;
export const MAX_STAY_NIGHTS = 90;

// Pagination
export const LISTINGS_PER_PAGE = 12;

// Routes de l'application
export const ROUTES = {
  HOME:        "/",
  SEARCH:      "/search",
  LOGIN:       "/login",
  REGISTER:    "/register",
  DASHBOARD:   "/dashboard",
  BOOKINGS:    "/bookings",
  REWARDS:     "/rewards",
  MESSAGES:    "/messages",
  PROFILE:     "/profile",
  HOST:        "/host/dashboard",
  ADMIN:       "/admin/dashboard",
} as const;
