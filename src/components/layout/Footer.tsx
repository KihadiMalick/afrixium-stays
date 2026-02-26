import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-dark-300">
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AX</span>
              </div>
              <span className="font-display font-bold text-white text-lg">
                AfriXium <span className="text-brand-400">Stays</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-dark-400">
              La plateforme de location premium pour les expatriés et voyageurs en Afrique.
            </p>
          </div>

          {/* Explorer */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Explorer</h4>
            <ul className="space-y-2 text-sm">
              <FooterLink href={ROUTES.SEARCH}>Tous les appartements</FooterLink>
              <FooterLink href={`${ROUTES.SEARCH}?city=Abidjan`}>Abidjan</FooterLink>
              <FooterLink href={`${ROUTES.SEARCH}?city=Dakar`}>Dakar</FooterLink>
              <FooterLink href={`${ROUTES.SEARCH}?city=Douala`}>Douala</FooterLink>
              <FooterLink href={`${ROUTES.SEARCH}?type=villa`}>Villas</FooterLink>
            </ul>
          </div>

          {/* Programme */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Programme</h4>
            <ul className="space-y-2 text-sm">
              <FooterLink href="/#rewards">Rewards AfriXium</FooterLink>
              <FooterLink href={ROUTES.REGISTER}>Devenir membre</FooterLink>
              <FooterLink href="/#how-it-works">Comment ça marche</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Support</h4>
            <ul className="space-y-2 text-sm">
              <FooterLink href={ROUTES.MESSAGES}>Nous contacter</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/terms">Conditions d&apos;utilisation</FooterLink>
              <FooterLink href="/privacy">Politique de confidentialité</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-dark-500">
            © {year} AfriXium Stays. Tous droits réservés.
          </p>
          <p className="text-sm text-dark-500">
            Fait avec ❤️ pour l&apos;Afrique & la diaspora
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-dark-400 hover:text-white transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
