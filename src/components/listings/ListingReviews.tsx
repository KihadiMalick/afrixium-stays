import { Star } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

interface Review {
  id:         string;
  author:     string;
  avatar_url?: string | null;
  rating:     number;
  comment:    string;
  date:       string;
}

interface ListingReviewsProps {
  rating_average: number;
  rating_count:   number;
  reviews?:       Review[];
}

export function ListingReviews({ rating_average, rating_count, reviews = [] }: ListingReviewsProps) {
  if (rating_count === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-display font-semibold text-dark-900">Avis</h2>
        <div className="flex items-center gap-1.5">
          <Star size={18} className="text-gold-500 fill-gold-500" />
          <span className="font-bold text-dark-900">{rating_average.toFixed(1)}</span>
          <span className="text-dark-400 text-sm">({rating_count} avis)</span>
        </div>
      </div>

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 bg-dark-50 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Avatar src={review.avatar_url} name={review.author} size="sm" />
                <div>
                  <p className="font-medium text-dark-900 text-sm">{review.author}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className={i < review.rating ? "text-gold-500 fill-gold-500" : "text-dark-200"} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-dark-600 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-dark-400 text-sm">
          Ce logement a {rating_count} avis avec une note de {rating_average.toFixed(1)}/5.
        </p>
      )}
    </div>
  );
}
