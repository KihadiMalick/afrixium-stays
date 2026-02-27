import { notFound } from "next/navigation";
import { getListingBySlug } from "@/supabase/queries/listings.queries";
import { getSupabaseServerClient } from "@/supabase/server";
import { ListingGallery } from "@/components/listings/ListingGallery";
import { ListingAmenities } from "@/components/listings/ListingAmenities";
import { ListingMap } from "@/components/listings/ListingMap";
import { ListingReviews } from "@/components/listings/ListingReviews";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Star, Bed, Bath, Users, MapPin, Shield } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface ListingPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  try {
    const listing = await getListingBySlug(params.slug);
    if (!listing) return { title: "Logement introuvable" };
    return {
      title: listing.title,
      description: listing.description.slice(0, 155),
    };
  } catch {
    return { title: "Logement" };
  }
}

export default async function ListingPage({ params }: ListingPageProps) {
  let listing = null;
  let isLoggedIn = false;

  try {
    listing = await getListingBySlug(params.slug);
    const supabase = getSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    isLoggedIn = !!user;
  } catch { /* Connexion Supabase non disponible */ }

  // Données de démo si pas de BDD
  if (!listing) {
    return (
      <div className="min-h-screen bg-white">
        <div className="page-container py-12">
          <div className="text-center py-24">
            <p className="text-6xl mb-6">🏠</p>
            <h1 className="text-3xl font-display font-bold text-dark-900 mb-3">
              Logement non trouvé
            </h1>
            <p className="text-dark-400 mb-8">Ce logement n&apos;existe pas ou a été retiré.</p>
            <Link href="/search" className="btn-primary inline-block">
              Explorer d&apos;autres logements
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation breadcrumb */}
      <div className="border-b border-dark-100 py-3">
        <div className="page-container flex items-center gap-2 text-sm text-dark-400">
          <Link href="/" className="hover:text-brand-500 transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/search" className="hover:text-brand-500 transition-colors">Recherche</Link>
          <span>/</span>
          <span className="text-dark-700 font-medium line-clamp-1">{listing.title}</span>
        </div>
      </div>

      <div className="page-container py-8">
        {/* Titre et infos */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-dark-900 leading-tight">
              {listing.title}
            </h1>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="capitalize">{listing.property_type}</Badge>
              {listing.is_featured && <Badge variant="gold">⭐ En vedette</Badge>}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-dark-500">
            <div className="flex items-center gap-1">
              <MapPin size={15} className="text-brand-500" />
              <span>{listing.city}, {listing.country}</span>
            </div>
            {listing.rating_count > 0 && (
              <div className="flex items-center gap-1">
                <Star size={15} className="text-gold-500 fill-gold-500" />
                <span className="font-semibold text-dark-800">{listing.rating_average.toFixed(1)}</span>
                <span>({listing.rating_count} avis)</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Bed size={15} /> {listing.bedrooms} ch.</span>
              <span className="flex items-center gap-1"><Bath size={15} /> {listing.bathrooms} sdb.</span>
              <span className="flex items-center gap-1"><Users size={15} /> {listing.max_guests} pers.</span>
            </div>
          </div>
        </div>

        {/* Galerie */}
        <div className="mb-10">
          <ListingGallery
            images={listing.images.length > 0 ? listing.images : ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"]}
            title={listing.title}
          />
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Gauche — infos */}
          <div className="lg:col-span-2 space-y-10">

            {/* Hôte */}
            <div className="flex items-center gap-4 pb-8 border-b border-dark-100">
              <Avatar
                src={listing.host?.avatar_url}
                name={`${listing.host?.first_name ?? "Hôte"} ${listing.host?.last_name ?? ""}`}
                size="lg"
              />
              <div>
                <p className="font-semibold text-dark-900 text-lg">
                  Hébergé par {listing.host?.first_name ?? "un hôte certifié"}
                </p>
                {listing.host?.is_verified && (
                  <div className="flex items-center gap-1.5 text-sm text-green-600 mt-0.5">
                    <Shield size={14} /> Hôte vérifié
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-display font-semibold text-dark-900 mb-4">
                À propos de ce logement
              </h2>
              <p className="text-dark-600 leading-relaxed whitespace-pre-wrap">{listing.description}</p>
            </div>

            {/* Équipements */}
            <ListingAmenities amenities={listing.amenities as never} />

            {/* Règles */}
            <div className="bg-dark-50 rounded-2xl p-6">
              <h2 className="text-xl font-display font-semibold text-dark-900 mb-4">Règles du séjour</h2>
              <div className="grid grid-cols-2 gap-3 text-sm text-dark-600">
                <div className="flex items-center gap-2">
                  <span>📅</span> Minimum {listing.min_stay_nights} nuit{listing.min_stay_nights > 1 ? "s" : ""}
                </div>
                <div className="flex items-center gap-2">
                  <span>📅</span> Maximum {listing.max_stay_nights} nuits
                </div>
              </div>
            </div>

            {/* Carte */}
            <ListingMap
              location={listing.location}
              city={listing.city}
              country={listing.country}
              latitude={listing.latitude}
              longitude={listing.longitude}
            />

            {/* Avis */}
            <ListingReviews
              rating_average={listing.rating_average}
              rating_count={listing.rating_count}
            />
          </div>

          {/* Widget réservation */}
          <div className="lg:col-span-1">
            <BookingWidget
              listing={{
                id:               listing.id,
                price_per_night:  listing.price_per_night,
                cleaning_fee:     listing.cleaning_fee,
                max_guests:       listing.max_guests,
                rating_average:   listing.rating_average,
                rating_count:     listing.rating_count,
              }}
              isLoggedIn={isLoggedIn}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
