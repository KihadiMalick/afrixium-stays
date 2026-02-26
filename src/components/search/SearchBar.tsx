"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  variant?: "hero" | "compact";
  defaultValues?: {
    location?: string;
    checkIn?:  string;
    checkOut?: string;
    guests?:   number;
  };
}

export function SearchBar({ variant = "hero", defaultValues }: SearchBarProps) {
  const router = useRouter();
  const [location, setLocation] = useState(defaultValues?.location ?? "");
  const [checkIn,  setCheckIn]  = useState(defaultValues?.checkIn  ?? "");
  const [checkOut, setCheckOut] = useState(defaultValues?.checkOut ?? "");
  const [guests,   setGuests]   = useState(defaultValues?.guests   ?? 1);

  function handleSearch() {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (checkIn)  params.set("check_in",  checkIn);
    if (checkOut) params.set("check_out", checkOut);
    if (guests)   params.set("guests",    String(guests));
    router.push(`/search?${params.toString()}`);
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2 bg-white rounded-xl border border-dark-200 p-2 shadow-card">
        <Search size={18} className="text-dark-400 ml-2" />
        <input
          type="text"
          placeholder="Destination..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 text-sm outline-none text-dark-900 placeholder-dark-400"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button size="sm" onClick={handleSearch}>Rechercher</Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-premium p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

        {/* Destination */}
        <SearchField
          icon={<MapPin size={18} className="text-brand-500" />}
          label="Destination"
          className="md:col-span-1"
        >
          <input
            type="text"
            placeholder="Ville, quartier..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-sm outline-none text-dark-900 placeholder-dark-400 bg-transparent"
          />
        </SearchField>

        {/* Arrivée */}
        <SearchField
          icon={<Calendar size={18} className="text-brand-500" />}
          label="Arrivée"
        >
          <input
            type="date"
            value={checkIn}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full text-sm outline-none text-dark-900 bg-transparent"
          />
        </SearchField>

        {/* Départ */}
        <SearchField
          icon={<Calendar size={18} className="text-brand-500" />}
          label="Départ"
        >
          <input
            type="date"
            value={checkOut}
            min={checkIn || new Date().toISOString().split("T")[0]}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full text-sm outline-none text-dark-900 bg-transparent"
          />
        </SearchField>

        {/* Voyageurs + Bouton */}
        <div className="flex gap-3">
          <SearchField
            icon={<Users size={18} className="text-brand-500" />}
            label="Voyageurs"
            className="flex-1"
          >
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full text-sm outline-none text-dark-900 bg-transparent"
            >
              {[1,2,3,4,5,6,7,8].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "voyageur" : "voyageurs"}</option>
              ))}
            </select>
          </SearchField>

          <button
            onClick={handleSearch}
            className="bg-brand-500 hover:bg-brand-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors shadow-md hover:shadow-glow mt-auto"
          >
            <Search size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

function SearchField({
  icon,
  label,
  children,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 p-3 bg-dark-50 rounded-xl", className)}>
      {icon}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-dark-500 uppercase tracking-wide mb-0.5">
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}
