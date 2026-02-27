import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Connexion",
};

export default function LoginPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-dark-900 mb-2">
          Bon retour 👋
        </h1>
        <p className="text-dark-500">Connectez-vous à votre compte</p>
      </div>
      <div className="bg-white rounded-2xl shadow-premium p-8">
        <LoginForm />
      </div>
    </div>
  );
}
