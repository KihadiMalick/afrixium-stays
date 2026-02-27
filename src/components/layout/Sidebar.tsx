"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, Star, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

const navItems = [
  { href: ROUTES.DASHBOARD, label: "Tableau de bord", icon: LayoutDashboard },
  { href: ROUTES.BOOKINGS,  label: "Réservations",    icon: CalendarDays },
  { href: ROUTES.REWARDS,   label: "Rewards",          icon: Star },
  { href: ROUTES.MESSAGES,  label: "Messages",         icon: MessageCircle },
  { href: ROUTES.PROFILE,   label: "Mon profil",       icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-dark-100 h-full p-4 hidden lg:flex flex-col gap-1">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
            pathname === href
              ? "bg-brand-50 text-brand-600"
              : "text-dark-600 hover:bg-dark-50 hover:text-dark-900"
          )}
        >
          <Icon size={18} />
          {label}
        </Link>
      ))}
    </aside>
  );
}
