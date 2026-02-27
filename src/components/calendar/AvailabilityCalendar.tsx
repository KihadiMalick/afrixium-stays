"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvailabilityCalendarProps {
  bookedDates: { check_in: string; check_out: string }[];
  onSelectRange?: (checkIn: string, checkOut: string) => void;
}

function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function isBooked(date: Date, bookedDates: { check_in: string; check_out: string }[]): boolean {
  const iso = date.toISOString().split("T")[0];
  return bookedDates.some(({ check_in, check_out }) => iso >= check_in && iso < check_out);
}

export function AvailabilityCalendar({ bookedDates, onSelectRange }: AvailabilityCalendarProps) {
  const today = new Date();
  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [start, setStart] = useState<string | null>(null);
  const [end,   setEnd]   = useState<string | null>(null);

  const days    = getDaysInMonth(year, month);
  const weekday = new Date(year, month, 1).getDay();
  const blanks  = Array.from({ length: (weekday + 6) % 7 });

  function prevMonth() { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); }
  function nextMonth() { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); }

  function handleDay(date: Date) {
    const iso = date.toISOString().split("T")[0];
    if (!start || (start && end)) {
      setStart(iso); setEnd(null);
    } else {
      if (iso < start) { setStart(iso); }
      else { setEnd(iso); onSelectRange?.(start, iso); }
    }
  }

  const monthName = new Date(year, month).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  return (
    <div className="bg-white rounded-2xl p-4 border border-dark-100">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1.5 hover:bg-dark-100 rounded-lg transition-colors"><ChevronLeft size={18} /></button>
        <p className="font-semibold text-dark-900 text-sm capitalize">{monthName}</p>
        <button onClick={nextMonth} className="p-1.5 hover:bg-dark-100 rounded-lg transition-colors"><ChevronRight size={18} /></button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Lu","Ma","Me","Je","Ve","Sa","Di"].map(d => (
          <div key={d} className="text-center text-xs text-dark-400 font-medium py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, i) => <div key={`b${i}`} />)}
        {days.map((date) => {
          const iso     = date.toISOString().split("T")[0];
          const booked  = isBooked(date, bookedDates);
          const isPast  = date < today;
          const isStart = iso === start;
          const isEnd   = iso === end;
          const inRange = start && end && iso > start && iso < end;

          return (
            <button
              key={iso}
              onClick={() => !booked && !isPast && handleDay(date)}
              disabled={booked || isPast}
              className={cn(
                "aspect-square rounded-lg text-xs font-medium transition-colors",
                booked || isPast ? "text-dark-200 cursor-not-allowed" :
                isStart || isEnd ? "bg-brand-500 text-white" :
                inRange          ? "bg-brand-100 text-brand-700" :
                                   "text-dark-700 hover:bg-dark-100"
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {start && !end && (
        <p className="text-xs text-dark-400 mt-3 text-center">Sélectionnez la date de départ</p>
      )}
    </div>
  );
}
