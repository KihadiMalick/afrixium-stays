import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 to-brand-50 flex flex-col">
      {/* Header minimal */}
      <header className="p-6">
        <Link
          href="/"
          className="flex items-center gap-2 w-fit"
        >
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AX</span>
          </div>
          <span className="font-display font-bold text-dark-900 text-lg">
            AfriXium <span className="text-brand-500">Stays</span>
          </span>
        </Link>
      </header>

      {/* Formulaire centré */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      <footer className="p-6 text-center text-xs text-dark-400">
        © {new Date().getFullYear()} AfriXium Stays
      </footer>
    </div>
  );
}
