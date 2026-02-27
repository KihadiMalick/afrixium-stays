import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/supabase/queries/users.queries";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  if (profile.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex bg-dark-900">
      <aside className="w-64 bg-dark-900 border-r border-dark-800 p-6 flex-col gap-6 hidden lg:flex">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AX</span>
          </div>
          <span className="font-bold text-white text-sm">Admin Panel</span>
        </Link>
        <nav className="flex flex-col gap-1">
          <AdminLink href="/admin/dashboard" icon="📊" label="Tableau de bord" />
          <AdminLink href="/admin/listings"  icon="🏠" label="Listings" />
          <AdminLink href="/admin/bookings"  icon="📅" label="Réservations" />
          <AdminLink href="/admin/users"     icon="👥" label="Utilisateurs" />
          <AdminLink href="/admin/rewards"   icon="⭐" label="Rewards" />
          <AdminLink href="/admin/messages"  icon="💬" label="Messages" />
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-dark-900 border-b border-dark-800 px-8 py-4">
          <p className="text-dark-400 text-sm">
            Connecté :{" "}
            <span className="text-white font-medium">
              {profile.first_name} {profile.last_name}
            </span>
          </p>
        </header>
        <main className="flex-1 p-8 bg-dark-50">
          {children}
        </main>
      </div>
    </div>
  );
}

function AdminLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-colors text-sm"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
