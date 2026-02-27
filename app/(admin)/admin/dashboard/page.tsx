export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900">
          Tableau de bord Admin
        </h1>
        <p className="text-dark-500 text-sm mt-1">
          Vue d&apos;ensemble de la plateforme
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5">
          <p className="text-sm text-dark-500">Utilisateurs</p>
          <p className="text-2xl font-bold text-dark-900 mt-1">—</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-dark-500">Listings actifs</p>
          <p className="text-2xl font-bold text-dark-900 mt-1">—</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-dark-500">Réservations</p>
          <p className="text-2xl font-bold text-dark-900 mt-1">—</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-dark-500">Revenus</p>
          <p className="text-2xl font-bold text-dark-900 mt-1">—</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-semibold text-dark-900 mb-4">Actions rapides</h2>
          <div className="space-y-2">
            <a href="/admin/listings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-dark-50 text-sm text-dark-700">
              <span>🏠</span> Gérer les listings
            </a>
            <a href="/admin/bookings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-dark-50 text-sm text-dark-700">
              <span>📅</span> Voir les réservations
            </a>
            <a href="/admin/users" className="flex items-center gap-3 p-3 rounded-xl hover:bg-dark-50 text-sm text-dark-700">
              <span>👥</span> Gérer les utilisateurs
            </a>
            <a href="/admin/messages" className="flex items-center gap-3 p-3 rounded-xl hover:bg-dark-50 text-sm text-dark-700">
              <span>💬</span> Boîte de réception
            </a>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-semibold text-dark-900 mb-4">Statut système</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-dark-600">Supabase Auth</span>
              <span className="text-green-600 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                Actif
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-dark-600">Base de données</span>
              <span className="text-green-600 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                Actif
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-dark-600">Stripe</span>
              <span className="text-orange-500 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
                Non configuré
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
