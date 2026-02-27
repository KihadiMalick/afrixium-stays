"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { PROPERTY_TYPES } from "@/lib/constants";

interface SearchFiltersProps {
  onFilter: (filters: Record<string, string | number>) => void;
  initialValues?: Record<string, string | number>;
}

export function SearchFilters({ onFilter, initialValues = {} }: SearchFiltersProps) {
  const [minPrice, setMinPrice] = useState(String(initialValues.min_price ?? ""));
  const [maxPrice, setMaxPrice] = useState(String(initialValues.max_price ?? ""));
  const [type,     setType]     = useState(String(initialValues.type ?? ""));

  function apply() {
    const filters: Record<string, string | number> = {};
    if (minPrice) filters.min_price = Number(minPrice);
    if (maxPrice) filters.max_price = Number(maxPrice);
    if (type)     filters.type      = type;
    onFilter(filters);
  }

  function reset() {
    setMinPrice(""); setMaxPrice(""); setType("");
    onFilter({});
  }

  return (
    <aside className="space-y-6">
      <div>
        <h3 className="font-semibold text-dark-900 mb-3 text-sm">Type de bien</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="type" value="" checked={type === ""} onChange={() => setType("")} className="accent-brand-500" />
            <span className="text-sm text-dark-700">Tous</span>
          </label>
          {Object.entries(PROPERTY_TYPES).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="type" value={value} checked={type === value} onChange={() => setType(value)} className="accent-brand-500" />
              <span className="text-sm text-dark-700 capitalize">{value}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-dark-900 mb-3 text-sm">Prix / nuit (FCFA)</h3>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Minimum"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="input-base text-sm"
          />
          <input
            type="number"
            placeholder="Maximum"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="input-base text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button onClick={apply} size="sm" className="w-full">Appliquer</Button>
        <Button onClick={reset} variant="ghost" size="sm" className="w-full">Réinitialiser</Button>
      </div>
    </aside>
  );
}
