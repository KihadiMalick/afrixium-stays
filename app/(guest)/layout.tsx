import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/supabase/queries/users.queries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default async function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login?redirectTo=/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col bg-dark-50">
      <Header user={profile} />
      <main className="flex-1 page-container py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
