export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900">
          Réservations
        </h1>
        <p className="text-dark-500 text-sm mt-1">
          Gestion de toutes les réservations
        </p>
      </div>
      <div className="card p-8 text-center">
        <p className="text-4xl mb-3">📅</p>
        <p className="text-dark-600 font-medium">
          Aucune réservation pour le moment
        </p>
      </div>
    </div>
  );
}
