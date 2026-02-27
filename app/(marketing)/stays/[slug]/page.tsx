export default function ListingPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {params.slug}
        </h1>
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <p className="text-4xl mb-3">🏠</p>
          <p className="text-gray-600">Page détail en construction</p>
        </div>
      </div>
    </div>
  );
}
