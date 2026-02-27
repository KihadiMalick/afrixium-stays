import Link from "next/link";
import { ArrowRight, Star, Shield, Award, MapPin, Bed, Users } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";
import { ROUTES, REWARDS_TIERS } from "@/lib/constants";

// Données de démo pour le hero (remplacées par Supabase en prod)
const FEATURED_CITIES = [
  { name: "Abidjan",    country: "Côte d'Ivoire", emoji: "🇨🇮", count: 47 },
  { name: "Dakar",      country: "Sénégal",       emoji: "🇸🇳", count: 32 },
  { name: "Douala",     country: "Cameroun",      emoji: "🇨🇲", count: 28 },
  { name: "Lagos",      country: "Nigeria",       emoji: "🇳🇬", count: 54 },
  { name: "Nairobi",    country: "Kenya",         emoji: "🇰🇪", count: 41 },
  { name: "Accra",      country: "Ghana",         emoji: "🇬🇭", count: 19 },
];

const DEMO_LISTINGS = [
  {
    id: "1", slug: "villa-cocody-abidjan", title: "Villa prestige à Cocody",
    city: "Abidjan", country: "Côte d'Ivoire", price_per_night: 95000,
    cover_image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
    property_type: "villa", bedrooms: 4, max_guests: 8, rating_average: 4.9, rating_count: 23, is_featured: true,
  },
  {
    id: "2", slug: "penthouse-plateau-dakar", title: "Penthouse vue mer au Plateau",
    city: "Dakar", country: "Sénégal", price_per_night: 72000,
    cover_image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800",
    property_type: "penthouse", bedrooms: 3, max_guests: 6, rating_average: 4.8, rating_count: 17, is_featured: true,
  },
  {
    id: "3", slug: "loft-moderne-douala", title: "Loft moderne Bonapriso",
    city: "Douala", country: "Cameroun", price_per_night: 55000,
    cover_image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    property_type: "loft", bedrooms: 2, max_guests: 4, rating_average: 4.7, rating_count: 31, is_featured: false,
  },
];

const STATS = [
  { value: "500+",  label: "Propriétés premium" },
  { value: "12",    label: "Pays africains" },
  { value: "4.8★",  label: "Note moyenne" },
  { value: "98%",   label: "Satisfaction clients" },
];

function formatPrice(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-dark-100">
        <div className="page-container">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AX</span>
              </div>
              <span className="font-display font-bold text-dark-900 text-lg hidden sm:block">
                AfriXium <span className="text-brand-500">Stays</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href={ROUTES.SEARCH} className="text-dark-600 hover:text-brand-500 font-medium transition-colors">Explorer</Link>
              <Link href="#how-it-works" className="text-dark-600 hover:text-brand-500 font-medium transition-colors">Comment ça marche</Link>
              <Link href="#rewards" className="text-dark-600 hover:text-gold-600 font-medium transition-colors flex items-center gap-1">
                <Star size={14} className="text-gold-500 fill-gold-500" /> Rewards
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <Link href={ROUTES.LOGIN}>
                <button className="px-4 py-2 text-sm font-semibold text-dark-700 hover:text-brand-600 transition-colors">Connexion</button>
              </Link>
              <Link href={ROUTES.REGISTER} className="btn-primary text-sm px-4 py-2">S&apos;inscrire</Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-dark-950">
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/60 via-dark-950/40 to-dark-950/80" />

        {/* Orange glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-500/20 rounded-full blur-[120px]" />

        <div className="relative z-10 page-container w-full py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse-slow" />
              Plateforme de location premium africaine
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
              Votre séjour{" "}
              <span className="text-gradient">d&apos;exception</span>
              {" "}en Afrique
            </h1>

            <p className="text-xl text-dark-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Appartements et villas premium pour les expatriés, voyageurs d&apos;affaires
              et séjours courts, moyens ou longs. L&apos;Afrique comme vous la méritez.
            </p>

            {/* Search bar */}
            <div className="max-w-3xl mx-auto mb-12">
              <SearchBar variant="hero" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-3xl font-display font-bold text-white mb-1">{value}</p>
                  <p className="text-dark-400 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VILLES POPULAIRES ───────────────────────────────────────────── */}
      <section className="section bg-dark-50">
        <div className="page-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-4xl font-display font-bold text-dark-900 mb-2">
                Villes populaires
              </h2>
              <p className="text-dark-500">Les destinations les plus demandées</p>
            </div>
            <Link href={ROUTES.SEARCH} className="hidden md:flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors text-sm">
              Voir tout <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {FEATURED_CITIES.map((city) => (
              <Link
                key={city.name}
                href={`${ROUTES.SEARCH}?location=${city.name}`}
                className="group bg-white rounded-2xl p-5 shadow-card hover:shadow-premium transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="text-4xl mb-3">{city.emoji}</div>
                <p className="font-semibold text-dark-900 group-hover:text-brand-600 transition-colors">{city.name}</p>
                <p className="text-xs text-dark-400 mt-0.5">{city.country}</p>
                <p className="text-xs text-brand-500 font-medium mt-2">{city.count} logements</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LISTINGS EN VEDETTE ─────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="page-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-4xl font-display font-bold text-dark-900 mb-2">
                Propriétés en vedette
              </h2>
              <p className="text-dark-500">Les plus appréciées par nos voyageurs</p>
            </div>
            <Link href={ROUTES.SEARCH} className="hidden md:flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors text-sm">
              Tous les logements <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_LISTINGS.map((listing) => (
              <Link key={listing.id} href={`/stays/${listing.slug}`} className="group block">
                <div className="card hover:-translate-y-1 transition-all duration-300">
                  <div className="relative w-full h-60 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={listing.cover_image}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {listing.is_featured && (
                      <div className="absolute top-3 left-3 bg-gold-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Star size={11} className="fill-white" /> En vedette
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-dark-700 text-xs font-medium px-2.5 py-1 rounded-full capitalize">
                      {listing.property_type}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-dark-900 leading-snug line-clamp-1 group-hover:text-brand-600 transition-colors">
                        {listing.title}
                      </h3>
                      {listing.rating_count > 0 && (
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Star size={13} className="text-gold-500 fill-gold-500" />
                          <span className="text-sm font-semibold">{listing.rating_average}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-dark-400 text-sm mb-3">
                      <MapPin size={13} />
                      <span>{listing.city}, {listing.country}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-dark-400 mb-4">
                      <span className="flex items-center gap-1"><Bed size={13} /> {listing.bedrooms} ch.</span>
                      <span className="flex items-center gap-1"><Users size={13} /> {listing.max_guests} pers.</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-dark-100">
                      <div>
                        <span className="text-lg font-bold text-dark-900">{formatPrice(listing.price_per_night)}</span>
                        <span className="text-dark-400 text-sm"> / nuit</span>
                      </div>
                      <span className="text-xs text-dark-400">{listing.rating_count} avis</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href={ROUTES.SEARCH} className="btn-primary inline-flex items-center gap-2">
              Explorer tous les logements <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── COMMENT CA MARCHE ───────────────────────────────────────────── */}
      <section id="how-it-works" className="section bg-dark-50">
        <div className="page-container">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-display font-bold text-dark-900 mb-3">
              Simple comme bonjour
            </h2>
            <p className="text-dark-500 text-lg max-w-xl mx-auto">
              Réservez votre logement premium en 3 étapes, de partout dans le monde.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-brand-200 to-brand-200 border-b border-dashed border-brand-300" />

            {[
              { step: "1", icon: "🔍", title: "Cherchez", desc: "Entrez votre destination, vos dates et vos préférences. Notre recherche intelligente trouve votre logement idéal." },
              { step: "2", icon: "📅", title: "Réservez", desc: "Choisissez votre appartement, vérifiez la disponibilité en temps réel et réservez en quelques clics." },
              { step: "3", icon: "✈️", title: "Profitez", desc: "Arrivez directement dans votre logement premium. Tout est prêt pour un séjour exceptionnel." },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="text-center relative">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-card flex items-center justify-center mx-auto mb-6 text-3xl relative">
                  {icon}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-dark-900 mb-3">{title}</h3>
                <p className="text-dark-500 text-sm leading-relaxed max-w-xs mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REWARDS ─────────────────────────────────────────────────────── */}
      <section id="rewards" className="section bg-dark-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-500/10 rounded-full blur-[100px]" />

        <div className="page-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star size={15} className="fill-gold-400" />
                Programme AfriXium Rewards
              </div>
              <h2 className="text-4xl font-display font-bold text-white mb-5">
                Chaque séjour vous{" "}
                <span className="text-gradient">rapproche</span>{" "}
                du prochain
              </h2>
              <p className="text-dark-300 text-lg mb-8 leading-relaxed">
                Gagnez des points à chaque réservation et accédez à des avantages exclusifs.
                Plus vous séjournez, plus vous êtes récompensé.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {Object.values(REWARDS_TIERS).map((tier) => (
                  <div key={tier.name} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tier.color }} />
                      <p className="font-semibold text-white text-sm">{tier.name}</p>
                    </div>
                    <p className="text-dark-400 text-xs">{tier.minPoints}+ points</p>
                  </div>
                ))}
              </div>

              <Link href={ROUTES.REGISTER} className="btn-primary inline-flex items-center gap-2">
                Rejoindre et gagner des points <ArrowRight size={18} />
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { icon: "⭐", title: "10 pts par nuit",        desc: "Gagnez des points à chaque nuit réservée" },
                { icon: "🎁", title: "Bonus de bienvenue",     desc: "100 points offerts à l'inscription" },
                { icon: "👥", title: "Parrainage",             desc: "50 pts pour chaque ami que vous invitez" },
                { icon: "💎", title: "Avantages Platinum",     desc: "Accès prioritaire, late checkout, surprises" },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-2xl flex-shrink-0">{icon}</span>
                  <div>
                    <p className="font-semibold text-white text-sm mb-0.5">{title}</p>
                    <p className="text-dark-400 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONFIANCE ───────────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-dark-900 mb-3">
              Vous êtes en sécurité
            </h2>
            <p className="text-dark-500">Nous vérifions chaque propriété et chaque hôte.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield,  color: "bg-brand-50 text-brand-500",  title: "Propriétés vérifiées",  desc: "Chaque logement est inspecté et photographié par notre équipe locale." },
              { icon: Award,   color: "bg-gold-50 text-gold-600",     title: "Hôtes certifiés",       desc: "Tous nos hôtes sont vérifiés avec présentation d'identité et visite." },
              { icon: Star,    color: "bg-green-50 text-green-600",   title: "Avis authentiques",     desc: "Les avis sont 100% vérifiés, publiés uniquement après séjour effectif." },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="text-center p-8 bg-dark-50 rounded-2xl">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${color}`}>
                  <Icon size={26} />
                </div>
                <h3 className="font-semibold text-dark-900 mb-3 text-lg">{title}</h3>
                <p className="text-dark-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────────────────────────── */}
      <section className="section bg-brand-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="page-container text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Prêt pour votre séjour ?
          </h2>
          <p className="text-brand-100 text-xl mb-10 max-w-xl mx-auto">
            Rejoignez des milliers de voyageurs qui font confiance à AfriXium Stays.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ROUTES.SEARCH} className="bg-white text-brand-600 font-semibold px-8 py-4 rounded-xl hover:bg-brand-50 transition-colors inline-flex items-center gap-2">
              Explorer les logements <ArrowRight size={18} />
            </Link>
            <Link href={ROUTES.REGISTER} className="bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-brand-700 transition-colors border border-brand-400">
              S&apos;inscrire gratuitement
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-dark-900 text-dark-300">
        <div className="page-container py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
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
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Explorer</h4>
              <ul className="space-y-2 text-sm text-dark-400">
                <li><Link href={ROUTES.SEARCH} className="hover:text-white transition-colors">Tous les appartements</Link></li>
                <li><Link href={`${ROUTES.SEARCH}?location=Abidjan`} className="hover:text-white transition-colors">Abidjan</Link></li>
                <li><Link href={`${ROUTES.SEARCH}?location=Dakar`} className="hover:text-white transition-colors">Dakar</Link></li>
                <li><Link href={`${ROUTES.SEARCH}?type=villa`} className="hover:text-white transition-colors">Villas</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Programme</h4>
              <ul className="space-y-2 text-sm text-dark-400">
                <li><Link href="#rewards" className="hover:text-white transition-colors">Rewards AfriXium</Link></li>
                <li><Link href={ROUTES.REGISTER} className="hover:text-white transition-colors">Devenir membre</Link></li>
                <li><Link href="#how-it-works" className="hover:text-white transition-colors">Comment ça marche</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Support</h4>
              <ul className="space-y-2 text-sm text-dark-400">
                <li><Link href={ROUTES.MESSAGES} className="hover:text-white transition-colors">Nous contacter</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Conditions d&apos;utilisation</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-dark-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-dark-500">© {2025} AfriXium Stays. Tous droits réservés.</p>
            <p className="text-sm text-dark-500">Fait avec ❤️ pour l&apos;Afrique & la diaspora</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
