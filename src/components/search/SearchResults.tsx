import { ListingCard } from "./ListingCard";
import { ListingCardSkeleton } from "@/components/ui/Skeleton";
import type { ListingCard as ListingCardType } from "@/types/listing.types";

interface SearchResultsProps {
  listings:    ListingCardType[];
  loading:     boolean;
  total:       number;
  currentPage: number;
  totalPages:  number;
  onPageChange: (page: number) => void;
}

export function SearchResults({
  listings,
  loading,
  total,
  currentPage,
  totalPages,
  onPageChange,
}: SearchResultsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => <ListingCardSkeleton key={i} />)}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-5xl mb-4">🔍</p>
        <p className="text-xl font-semibold text-dark-900 mb-2">Aucun résultat</p>
        <p className="text-dark-400">Essayez d&apos;autres critères de recherche.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-dark-500">
        <span className="font-semibold text-dark-800">{total}</span> logement{total > 1 ? "s" : ""} trouvé{total > 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                page === currentPage
                  ? "bg-brand-500 text-white"
                  : "bg-white border border-dark-200 text-dark-700 hover:border-brand-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
