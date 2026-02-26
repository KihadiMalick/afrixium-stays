import { PageWrapper } from "@/components/layout/PageWrapper";
import { getCurrentProfile } from "@/supabase/queries/users.queries";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Récupère l'utilisateur connecté pour afficher son nom dans le header
  const profile = await getCurrentProfile();

  return (
    <PageWrapper user={profile} fullWidth>
      {children}
    </PageWrapper>
  );
}
