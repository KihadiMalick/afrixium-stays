import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageWrapperProps {
  children: React.ReactNode;
  user?: React.ComponentProps<typeof Header>["user"];
  fullWidth?: boolean;
}

export function PageWrapper({ children, user, fullWidth }: PageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      <main className={fullWidth ? "flex-1" : "flex-1 page-container py-8"}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
