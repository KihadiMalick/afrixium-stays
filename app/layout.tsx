import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AfriXium Stays — Location Premium en Afrique",
    template: "%s | AfriXium Stays",
  },
  description:
    "Découvrez des appartements et villas premium pour vos séjours courts, moyens ou longs en Afrique. Expérience de location exceptionnelle.",
  keywords: [
    "location appartement Afrique",
    "vacation rental",
    "expat housing",
    "short term rental Africa",
    "AfriXium Stays",
  ],
  openGraph: {
    type:        "website",
    locale:      "fr_FR",
    url:         "https://afrixium-stays.vercel.app",
    siteName:    "AfriXium Stays",
    title:       "AfriXium Stays — Location Premium en Afrique",
    description: "Séjours courts, moyens et longs dans des propriétés premium.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
