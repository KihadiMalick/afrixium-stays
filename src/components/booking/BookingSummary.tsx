import { formatPrice, formatDate } from "@/lib/utils";
import { BookingStatus } from "./BookingStatus";
import type { Booking } from "@/types/booking.types";
import type { ListingCard } from "@/types/listing.types";

interface BookingSummaryProps {
  booking: Booking & { listing?: Partial<ListingCard> };
}

export function BookingSummary({ booking }: BookingSummaryProps) {
  return (
    <div className="card p-5 space-y-4">
      {booking.listing && (
        <div>
          <p className="font-semibold text-dark-900 text-base">{booking.listing.title}</p>
          <p className="text-sm text-dark-400">{booking.listing.city}, {booking.listing.country}</p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-dark-400 mb-0.5">Arrivée</p>
          <p className="font-medium text-dark-800">{formatDate(booking.check_in)}</p>
        </div>
        <div>
          <p className="text-dark-400 mb-0.5">Départ</p>
          <p className="font-medium text-dark-800">{formatDate(booking.check_out)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-dark-100">
        <BookingStatus status={booking.status} />
        <p className="font-bold text-dark-900">{formatPrice(booking.total_price)}</p>
      </div>
    </div>
  );
}
