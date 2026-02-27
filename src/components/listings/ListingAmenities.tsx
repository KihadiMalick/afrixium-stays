import { Wifi, Car, Waves, Dumbbell, Wind, UtensilsCrossed, WashingMachine, Tv, Flower2, Shield, Zap, Droplets, Sparkles } from "lucide-react";
import type { Amenity } from "@/types/listing.types";

interface ListingAmenitiesProps {
  amenities: Amenity[];
}

const amenityConfig: Record<Amenity, { label: string; icon: React.ElementType }> = {
  wifi:             { label: "Wi-Fi",           icon: Wifi },
  parking:          { label: "Parking",         icon: Car },
  pool:             { label: "Piscine",          icon: Waves },
  gym:              { label: "Salle de sport",   icon: Dumbbell },
  ac:               { label: "Climatisation",    icon: Wind },
  kitchen:          { label: "Cuisine",          icon: UtensilsCrossed },
  washer:           { label: "Lave-linge",       icon: WashingMachine },
  dryer:            { label: "Sèche-linge",      icon: WashingMachine },
  tv:               { label: "Télévision",       icon: Tv },
  balcony:          { label: "Balcon",           icon: Flower2 },
  garden:           { label: "Jardin",           icon: Flower2 },
  security:         { label: "Sécurité 24h",     icon: Shield },
  generator:        { label: "Groupe électrogène", icon: Zap },
  water_tank:       { label: "Citerne d'eau",    icon: Droplets },
  cleaning_service: { label: "Ménage inclus",    icon: Sparkles },
};

export function ListingAmenities({ amenities }: ListingAmenitiesProps) {
  if (amenities.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-display font-semibold text-dark-900 mb-4">Équipements</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {amenities.map((amenity) => {
          const config = amenityConfig[amenity];
          if (!config) return null;
          const Icon = config.icon;
          return (
            <div key={amenity} className="flex items-center gap-3 p-3 bg-dark-50 rounded-xl">
              <Icon size={18} className="text-brand-500 flex-shrink-0" />
              <span className="text-sm text-dark-700 font-medium">{config.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
