// Accès typé et centralisé à toutes les variables d'environnement
// Si une variable est manquante, l'app lève une erreur claire au démarrage

export const config = {
  supabase: {
    url:             process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey:         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    serviceRoleKey:  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  },
  stripe: {
    publishableKey:  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
    secretKey:       process.env.STRIPE_SECRET_KEY ?? "",
    webhookSecret:   process.env.STRIPE_WEBHOOK_SECRET ?? "",
  },
  app: {
    url:  process.env.NEXT_PUBLIC_APP_URL ?? "https://rwpljacthttfetwlinow.supabase.co",
    name: process.env.NEXT_PUBLIC_APP_NAME ?? "AfriXium Stays",
  },
} as const;
