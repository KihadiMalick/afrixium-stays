// Homepage — Phase 1 : placeholder simple
// On enrichira cette page en Phase 4

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center page-container">
        <h1 className="text-5xl font-display font-bold text-dark-900 mb-4">
          <span className="text-gradient">AfriXium Stays</span>
        </h1>
        <p className="text-xl text-dark-500 mb-8">
          Location premium — Afrique & Diaspora
        </p>
        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-2 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse-slow" />
          Plateforme en construction — Phase 1 ✓
        </div>
      </div>
    </main>
  );
}
