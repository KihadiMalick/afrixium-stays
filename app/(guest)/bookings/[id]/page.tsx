export default function BookingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-dark-900">
        Réservation #{params.id.slice(0, 8)}
      </h1>
      <div className="bg-white rounded-2xl shadow p-8 text-center">
        <p className="text-4xl mb-3">📋</p>
        <p className="text-dark-600">Détail de la réservation</p>
      </div>
    </div>
  );
}
