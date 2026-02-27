import type { ListingStatus } from "@/lib/constants";
import type { PublicProfile } from "./user.types";

// Équipements disponibles
export type Amenity =
  | "wifi"
  | "parking"
  | "pool"
  | "gym"
  | "ac"
  | "kitchen"
  | "washer"
  | "dryer"
  | "tv"
  | "balcony"
  | "garden"
  | "security"
  | "generator"
  | "water_tank"
  | "cleaning_service";

// Listing principal
export interface Listing {
  id:               string;
  host_id:          string;
  title:            string;
  slug:             string;
  description:      string;
  property_type:    string;
  status:           ListingStatus;
  location:         string;       // Adresse complète
  city:             string;
  country:          string;
  latitude:         number | null;
  longitude:        number | null;
  price_per_night:  number;       // En FCFA ou devise locale
  cleaning_fee:     number;
  max_guests:       number;
  bedrooms:         number;
  bathrooms:        number;
  amenities:        Amenity[];
  images:           string[];     // URLs Supabase Storage
  cover_image:      string | null;
  is_featured:      boolean;
  min_stay_nights:  number;
  max_stay_nights:  number;
  rating_average:   number;
  rating_count:     number;
  created_at:       string;
  updated_at:       string;
}

// Listing avec son hôte inclus (pour les pages de détail)
export interface ListingWithHost extends Listing {
  host: PublicProfile;
}

// Carte de listing pour les résultats de recherche (données allégées)
export type ListingCard = Pick
  Listing,
  | "id"
  | "slug"
  | "title"
  | "city"
  | "country"
  | "price_per_night"
  | "cover_image"
  | "property_type"
  | "bedrooms"
  | "max_guests"
  | "rating_average"
  | "rating_count"
  | "is_featured"
>;

// Filtres de recherche
export interface SearchFilters {
  location?:    string;
  check_in?:    string;
  check_out?:   string;
  guests?:      number;
  min_price?:   number;
  max_price?:   number;
  type?:        string;
  amenities?:   Amenity[];
  page?:        number;
}

// Résultats paginés
export interface PaginatedListings {
  data:       ListingCard[];
  total:      number;
  page:       number;
  totalPages: number;
}
