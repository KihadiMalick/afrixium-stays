"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { formatDateShort } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  checkIn?:   string;
  checkOut?:  string;
  onChange:   (checkIn: string, checkOut: string) => void;
  className?: string;
}

export function DateRangePicker({ checkIn, checkOut, onChange, className }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-3 bg-dark-50 rounded-xl text-left hover:bg-dark-100 transition-colors"
      >
        <Calendar size={18} className="text-brand-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-dark-500 uppercase tracking-wide">Dates</p>
          <p className="text-sm text-dark-900">
            {checkIn && checkOut
              ? `${formatDateShort(checkIn)} → ${formatDateShort(checkOut)}`
              : "Choisir les dates"}
          </p>
        </div>
        <ChevronDown size={16} className={cn("text-dark-400 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-0 z-20 bg-white rounded-2xl shadow-premium border border-dark-100 p-4 w-full min-w-[280px]">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-dark-500 uppercase block mb-1">Arrivée</label>
              <input
                type="date"
                value={checkIn ?? ""}
                min={today}
                onChange={(e) => onChange(e.target.value, checkOut ?? "")}
                className="input-base text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-dark-500 uppercase block mb-1">Départ</label>
              <input
                type="date"
                value={checkOut ?? ""}
                min={checkIn ?? today}
                onChange={(e) => onChange(checkIn ?? "", e.target.value)}
                className="input-base text-sm"
              />
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="mt-3 w-full bg-brand-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-brand-600 transition-colors"
          >
            Confirmer
          </button>
        </div>
      )}
    </div>
  );
}
