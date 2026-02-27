import Link from "next/link";
import { formatPrice, formatDateShort } from "@/lib/utils";
import { BookingStatus } from "@/components/booking/BookingStatus";
import type { BookingWithDetails } from "@/types/booking.types";

interface RecentBookingsProps {
  bookings: BookingWithDetails[];
  limit?:   number;
}

export function RecentBookings({ bookings, limit = 5 }: RecentBookingsProps) {
  const displayed = bookings.slice(0, limit);

  if (displayed.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-3xl mb-3">📅</p>
        <p className="font-medium text-dark-700 mb-1">Aucune réservation</p>
        <p className="text-sm text-dark-400">Vos réservations apparaîtront ici.</p>
      </div>
    );
  }

  return (
    <div className="card divide-y divide-dark-100">
      {displayed.map((booking) => (
        <Link
          key={booking.id}
          href={`/bookings/${booking.id}`}
          className="flex items-center gap-4 p-4 hover:bg-dark-50 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <p className="font-medium text-dark-900 text-sm line-clamp-1">
              {booking.listing?.title ?? "Logement"}
            </p>
            <p className="text-xs text-dark-400 mt-0.5">
              {formatDateShort(booking.check_in)} → {formatDateShort(booking.check_out)}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <BookingStatus status={booking.status} />
            <span className="text-sm font-semibold text-dark-800">
              {formatPrice(booking.total_price)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
