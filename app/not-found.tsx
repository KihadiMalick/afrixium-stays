import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center page-container">
        <p className="text-8xl font-display font-bold text-brand-500 mb-4">404</p>
        <h1 className="text-2xl font-semibold text-dark-900 mb-2">
          Page introuvable
        </h1>
        <p className="text-dark-500 mb-8">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Link href="/" className="btn-primary">
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
