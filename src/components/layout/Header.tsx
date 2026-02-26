"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User, LogOut, LayoutDashboard, Heart } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Types simplifiés — sera remplacé par le vrai profil en Phase 4
interface HeaderUser {
  first_name: string;
  last_name:  string;
  avatar_url: string | null;
  role:       string;
}

interface HeaderProps {
  user?: HeaderUser | null;
}

export function Header({ user }: HeaderProps) {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-dark-100 shadow-sm">
      <div className="page-container">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AX</span>
            </div>
            <span className="font-display font-bold text-dark-900 text-lg hidden sm:block">
              AfriXium <span className="text-brand-500">Stays</span>
            </span>
          </Link>

          {/* Navigation centre */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={ROUTES.SEARCH}
              className="text-dark-600 hover:text-brand-500 font-medium transition-colors text-sm"
            >
              Explorer
            </Link>
            <Link
              href="/#how-it-works"
              className="text-dark-600 hover:text-brand-500 font-medium transition-colors text-sm"
            >
              Comment ça marche
            </Link>
            <Link
              href="/#rewards"
              className="text-dark-600 hover:text-gold-600 font-medium transition-colors text-sm flex items-center gap-1"
            >
              <span>⭐</span> Rewards
            </Link>
          </nav>

          {/* Actions droite */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-dark-100 transition-colors"
                >
                  <Avatar
                    src={user.avatar_url}
                    name={`${user.first_name} ${user.last_name}`}
                    size="sm"
                  />
                  <span className="text-sm font-medium text-dark-700 hidden sm:block">
                    {user.first_name}
                  </span>
                </button>

                {/* Dropdown profil */}
                {profileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setProfileOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-premium border border-dark-100 z-20 overflow-hidden animate-slide-up">
                      <div className="p-3 border-b border-dark-100">
                        <p className="font-semibold text-dark-900 text-sm">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs text-dark-400 capitalize">{user.role}</p>
                      </div>
                      <nav className="p-1">
                        <DropdownLink href={ROUTES.DASHBOARD} icon={<LayoutDashboard size={16} />}>
                          Tableau de bord
                        </DropdownLink>
                        <DropdownLink href={ROUTES.BOOKINGS} icon={<Heart size={16} />}>
                          Mes réservations
                        </DropdownLink>
                        <DropdownLink href={ROUTES.PROFILE} icon={<User size={16} />}>
                          Mon profil
                        </DropdownLink>
                        {user.role === "admin" && (
                          <DropdownLink href={ROUTES.ADMIN} icon={<LayoutDashboard size={16} />}>
                            Administration
                          </DropdownLink>
                        )}
                      </nav>
                      <div className="p-1 border-t border-dark-100">
                        <form action="/api/auth/signout" method="POST">
                          <button
                            type="submit"
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <LogOut size={16} />
                            Se déconnecter
                          </button>
                        </form>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm">Connexion</Button>
                </Link>
                <Link href={ROUTES.REGISTER}>
                  <Button variant="primary" size="sm">S&apos;inscrire</Button>
                </Link>
              </div>
            )}

            {/* Burger menu mobile */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-dark-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="md:hidden border-t border-dark-100 py-4 space-y-1 animate-slide-up">
            <MobileLink href={ROUTES.SEARCH}    onClick={() => setMenuOpen(false)}>Explorer</MobileLink>
            <MobileLink href="/#how-it-works"  onClick={() => setMenuOpen(false)}>Comment ça marche</MobileLink>
            <MobileLink href="/#rewards"        onClick={() => setMenuOpen(false)}>⭐ Rewards</MobileLink>
            {!user && (
              <div className="pt-3 flex flex-col gap-2 px-2">
                <Link href={ROUTES.LOGIN}    className="btn-secondary text-center">Connexion</Link>
                <Link href={ROUTES.REGISTER} className="btn-primary text-center">S&apos;inscrire</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

function DropdownLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 text-sm text-dark-700 hover:bg-dark-50 rounded-lg transition-colors"
    >
      <span className="text-dark-400">{icon}</span>
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-2 py-2.5 text-dark-700 hover:text-brand-500 font-medium transition-colors"
    >
      {children}
    </Link>
  );
}
