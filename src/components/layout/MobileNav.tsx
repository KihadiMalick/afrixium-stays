"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, Star, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

const navItems = [
  { href: ROUTES.DASHBOARD, label: "Accueil",    icon: LayoutDashboard },
  { href: ROUTES.BOOKINGS,  label: "Séjours",    icon: CalendarDays },
  { href: ROUTES.REWARDS,   label: "Rewards",    icon: Star },
  { href: ROUTES.MESSAGES,  label: "Messages",   icon: MessageCircle },
  { href: ROUTES.PROFILE,   label: "Profil",     icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-dark-100 flex">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors",
            pathname === href ? "text-brand-500" : "text-dark-400"
          )}
        >
          <Icon size={20} />
          {label}
        </Link>
      ))}
    </nav>
  );
}
