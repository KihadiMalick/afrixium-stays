"use client";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center page-container">
        <p className="text-8xl font-display font-bold text-dark-200 mb-4">500</p>
        <h1 className="text-2xl font-semibold text-dark-900 mb-2">
          Une erreur est survenue
        </h1>
        <p className="text-dark-500 mb-8">{error.message}</p>
        <button onClick={reset} className="btn-primary">
          Réessayer
        </button>
      </div>
    </main>
  );
}
