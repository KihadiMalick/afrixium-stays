import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Inscription",
};

export default function RegisterPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-dark-900 mb-2">
          Rejoignez-nous ✨
        </h1>
        <p className="text-dark-500">Créez votre compte gratuit en 30 secondes</p>
      </div>
      <div className="bg-white rounded-2xl shadow-premium p-8">
        <RegisterForm />
      </div>
    </div>
  );
}
