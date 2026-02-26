import Link from "next/link";
import Image from "next/image";
import { Star, Bed, Users, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import type { ListingCard as ListingCardType } from "@/types/listing.types";

interface ListingCardProps {
  listing: ListingCardType;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/stays/${listing.slug}`} className="group block">
      <div className="card hover:-translate-y-1 transition-all duration-300">

        {/* Image */}
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={listing.cover_image ?? "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600"}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {listing.is_featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="gold" size="sm">⭐ En vedette</Badge>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge variant="default" size="sm" className="bg-white/90 text-dark-700 backdrop-blur-sm">
              {listing.property_type}
            </Badge>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-dark-900 text-base leading-snug line-clamp-1 group-hover:text-brand-600 transition-colors">
              {listing.title}
            </h3>
            {listing.rating_count > 0 && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star size={14} className="text-gold-500 fill-gold-500" />
                <span className="text-sm font-semibold text-dark-800">
                  {listing.rating_average.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 text-dark-400 text-sm mb-3">
            <MapPin size={13} />
            <span>{listing.city}, {listing.country}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-dark-500 mb-4">
            <span className="flex items-center gap-1">
              <Bed size={14} />
              {listing.bedrooms} ch.
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} />
              {listing.max_guests} pers.
            </span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-dark-100">
            <div>
              <span className="text-lg font-bold text-dark-900">
                {formatPrice(listing.price_per_night)}
              </span>
              <span className="text-dark-400 text-sm"> / nuit</span>
            </div>
            {listing.rating_count > 0 && (
              <span className="text-xs text-dark-400">
                {listing.rating_count} avis
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
