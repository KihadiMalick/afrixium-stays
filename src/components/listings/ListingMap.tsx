import { MapPin } from "lucide-react";

interface ListingMapProps {
  location:  string;
  city:      string;
  country:   string;
  latitude?:  number | null;
  longitude?: number | null;
}

export function ListingMap({ location, city, country }: ListingMapProps) {
  return (
    <div>
      <h2 className="text-xl font-display font-semibold text-dark-900 mb-4">Localisation</h2>
      <div className="bg-dark-100 rounded-2xl overflow-hidden h-64 flex flex-col items-center justify-center gap-3 border border-dark-200">
        <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
          <MapPin size={24} className="text-brand-500" />
        </div>
        <div className="text-center">
          <p className="font-medium text-dark-900">{city}, {country}</p>
          <p className="text-sm text-dark-400 mt-0.5">{location}</p>
        </div>
        <p className="text-xs text-dark-400">Carte disponible après réservation</p>
      </div>
    </div>
  );
}
