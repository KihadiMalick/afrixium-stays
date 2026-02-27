import Link from "next/link";
import { Search, CalendarDays, Star, MessageCircle, Home } from "lucide-react";
import { ROUTES } from "@/lib/constants";

const actions = [
  { href: ROUTES.SEARCH,   label: "Explorer",     icon: Search,       color: "bg-brand-50  text-brand-600" },
  { href: ROUTES.BOOKINGS, label: "Réservations", icon: CalendarDays, color: "bg-gold-50   text-gold-600"  },
  { href: ROUTES.REWARDS,  label: "Rewards",      icon: Star,         color: "bg-green-50  text-green-600" },
  { href: ROUTES.MESSAGES, label: "Messages",     icon: MessageCircle, color: "bg-blue-50  text-blue-600"  },
  { href: ROUTES.HOST,     label: "Espace hôte",  icon: Home,         color: "bg-purple-50 text-purple-600" },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {actions.map(({ href, label, icon: Icon, color }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl shadow-card hover:shadow-premium transition-all duration-200 hover:-translate-y-0.5"
        >
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
            <Icon size={20} />
          </div>
          <span className="text-xs font-medium text-dark-700 text-center">{label}</span>
        </Link>
      ))}
    </div>
  );
}
