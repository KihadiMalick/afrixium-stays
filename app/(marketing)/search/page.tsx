import { Suspense } from "react";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchResults } from "@/components/search/SearchResults";
import { SearchFilters } from "@/components/search/SearchFilters";
import { getListings } from "@/supabase/queries/listings.queries";
import type { SearchFilters as SearchFiltersType, PaginatedListings } from "@/types/listing.types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Recherche de logements" };

interface SearchPageProps {
  searchParams: {
    location?:  string;
    check_in?:  string;
    check_out?: string;
    guests?:    string;
    min_price?: string;
    max_price?: string;
    type?:      string;
    page?:      string;
  };
}

async function SearchContent({ searchParams }: SearchPageProps) {
  const filters: SearchFiltersType = {
    location:  searchParams.location,
    check_in:  searchParams.check_in,
    check_out: searchParams.check_out,
    guests:    searchParams.guests    ? Number(searchParams.guests)    : undefined,
    min_price: searchParams.min_price ? Number(searchParams.min_price) : undefined,
    max_price: searchParams.max_price ? Number(searchParams.max_price) : undefined,
    type:      searchParams.type,
    page:      searchParams.page      ? Number(searchParams.page)      : 1,
  };

  let result: PaginatedListings = { data: [], total: 0, page: 1, totalPages: 0 };
  try {
    result = await getListings(filters);
  } catch { /* Les listings s'afficheront vides en l'absence de BDD */ }

  return (
    <SearchResults
      listings={result.data}
      loading={false}
      total={result.total}
      currentPage={result.page}
      totalPages={result.totalPages}
      onPageChange={() => {}}
    />
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <div className="min-h-screen bg-dark-50">
      {/* Header avec searchbar */}
      <div className="bg-white border-b border-dark-100 sticky top-0 z-30">
        <div className="page-container py-4">
          <SearchBar variant="compact" defaultValues={{
            location: searchParams.location,
            checkIn:  searchParams.check_in,
            checkOut: searchParams.check_out,
            guests:   searchParams.guests ? Number(searchParams.guests) : undefined,
          }} />
        </div>
      </div>

      <div className="page-container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtres */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-card p-5 sticky top-24">
              <h2 className="font-semibold text-dark-900 mb-4">Filtres</h2>
              <SearchFilters
                onFilter={() => {}}
                initialValues={{
                  type:      searchParams.type      ?? "",
                  min_price: Number(searchParams.min_price) || 0,
                  max_price: Number(searchParams.max_price) || 0,
                }}
              />
            </div>
          </aside>

          {/* Résultats */}
          <div className="flex-1 min-w-0">
            <Suspense fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />
                ))}
              </div>
            }>
              <SearchContent searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
