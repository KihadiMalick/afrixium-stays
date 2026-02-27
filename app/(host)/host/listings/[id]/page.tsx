export default function EditListingPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-dark-900">
        Modifier le listing
      </h1>
      <p className="text-dark-500 text-sm">ID : {params.id}</p>
      <div className="bg-white rounded-2xl shadow p-8 text-center">
        <p className="text-4xl mb-3">✏️</p>
        <p className="text-dark-600">Formulaire de modification en construction</p>
      </div>
    </div>
  );
}
