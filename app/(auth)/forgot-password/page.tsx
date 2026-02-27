export default function ForgotPasswordPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Mot de passe oublié
        </h1>
        <p className="text-gray-500">
          Entrez votre email pour recevoir un lien de réinitialisation
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow p-8">
        <p className="text-center text-gray-400">
          Formulaire en construction
        </p>
      </div>
    </div>
  );
}
```

---

## Faisons le tour complet maintenant

Je pense que **tous** tes fichiers créés sur GitHub sont vides. Au lieu de corriger un par un à chaque erreur Vercel, voici ce que je te propose :

**Va sur GitHub et vérifie chaque fichier dans ces dossiers — clique dessus et regarde s'il y a du contenu ou non :**
```
app/
├── (admin)/admin/dashboard/page.tsx     ✓ corrigé
├── (admin)/admin/bookings/page.tsx      ✓ corrigé
├── (admin)/admin/listings/page.tsx      ✓ corrigé
├── (admin)/admin/users/page.tsx         ✓ corrigé
├── (admin)/admin/rewards/page.tsx       ✓ corrigé
├── (admin)/admin/messages/page.tsx      ✓ corrigé
├── (auth)/callback/route.ts             ✓ corrigé
├── (auth)/login/page.tsx                ✓ corrigé
├── (auth)/register/page.tsx             ✓ corrigé
├── (auth)/forgot-password/page.tsx      ✓ corrigé maintenant
├── (guest)/dashboard/page.tsx           ✓ corrigé
├── (guest)/rewards/page.tsx             ✓ corrigé
├── (guest)/bookings/page.tsx            ❓ vide ?
├── (guest)/messages/page.tsx            ❓ vide ?
├── (guest)/profile/page.tsx             ❓ vide ?
├── (marketing)/search/page.tsx          ✓ corrigé
├── (marketing)/stays/[slug]/page.tsx    ✓ corrigé
├── (host)/host/dashboard/page.tsx       ❓ vide ?
├── api/auth/login/route.ts              ❓ vide ?
├── api/auth/register/route.ts           ❓ vide ?
├── api/auth/signout/route.ts            ❓ vide ?
