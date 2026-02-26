import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/supabase/queries/users.queries";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();

  if (!profile) redirect("/login");
  if (profile.role !== "admin") redirect("/dashboard");

  return (
    <div className="min-h-screen flex bg-dark-900">
      {/* Sidebar admin */}
      <aside className="w-64 bg-dark-950 border-r border-dark-800 p-6 flex flex-col gap-6 hidden lg:flex">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AX</span>
          </div>
          <span className="font-display font-bold text-white text-sm">
            Admin Panel
          </span>
        </div>
        <nav className="flex flex-col gap-1">
          {adminLinks.map((link) => (
            
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-colors text-sm"
            >
              <span>{link.icon}</span>
              {link.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Contenu */}
      <div className="flex-1 flex flex-col">
        <header className="bg-dark-900 border-b border-dark-800 px-8 py-4">
          <p className="text-dark-400 text-sm">
            Connecté en tant que <span className="text-white font-medium">{profile.first_name} {profile.last_name}</span>
          </p>
        </header>
        <main className="flex-1 p-8 bg-dark-50">
          {children}
        </main>
      </div>
    </div>
  );
}

const adminLinks = [
  { href: "/admin/dashboard", icon: "📊", label: "Tableau de bord" },
  { href: "/admin/listings",  icon: "🏠", label: "Listings" },
  { href: "/admin/bookings",  icon: "📅", label: "Réservations" },
  { href: "/admin/users",     icon: "👥", label: "Utilisateurs" },
  { href: "/admin/rewards",   icon: "⭐", label: "Rewards" },
  { href: "/admin/messages",  icon: "💬", label: "Messages" },
];
```

---

# 📊 Rapport de fin de Phase 3

## ✅ Travail accompli

**22 fichiers** créés. L'application a maintenant une identité visuelle complète.

---

## 🗂️ Récapitulatif total

| Phase | Fichiers | Statut |
|---|---|---|
| Phase 1 — Config racine | 18 fichiers | ✅ Complet |
| Phase 2 — Types + Supabase | 22 fichiers | ✅ Complet |
| Phase 3 — Components UI | 22 fichiers | ✅ Complet |
| **Total actuel** | **62 fichiers** | |

---

## 🔌 Quoi faire à la fin de Phase 3

C'est maintenant le bon moment pour **connecter Vercel** :

**Étape 1** — Va sur vercel.com → New Project → importe ton repo GitHub `afrixium-stays`

**Étape 2** — Dans Vercel, va dans **Settings → Environment Variables** et ajoute :
```
NEXT_PUBLIC_SUPABASE_URL        → ton URL Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY   → ta clé anon
SUPABASE_SERVICE_ROLE_KEY       → ta clé service role
NEXT_PUBLIC_APP_URL             → https://afrixium-stays.vercel.app
NEXT_PUBLIC_APP_NAME            → AfriXium Stays
