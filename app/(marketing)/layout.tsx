import { PageWrapper } from "../../src/components/layout/PageWrapper";
import { getCurrentProfile } from "../../src/supabase/queries/users.queries";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();

  return (
    <PageWrapper user={profile} fullWidth>
      {children}
    </PageWrapper>
  );
}
