"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ROUTES } from "@/lib/constants";

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res  = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!data.success) setError(data.error ?? "Erreur");
      else setSent(true);
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-dark-900 mb-2">
          Mot de passe oublié ?
        </h1>
        <p className="text-dark-500">Entrez votre email pour recevoir un lien de réinitialisation</p>
      </div>

      <div className="bg-white rounded-2xl shadow-premium p-8">
        {sent ? (
          <div className="text-center py-4">
            <p className="text-4xl mb-4">📧</p>
            <p className="font-semibold text-dark-900 mb-2">Email envoyé !</p>
            <p className="text-sm text-dark-400 mb-6">
              Vérifiez votre boîte mail et cliquez sur le lien pour réinitialiser votre mot de passe.
            </p>
            <Link href={ROUTES.LOGIN} className="btn-primary inline-block">
              Retour à la connexion
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}
            <Input
              label="Adresse email"
              type="email"
              placeholder="ton@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={17} />}
              required
            />
            <Button type="submit" loading={loading} className="w-full" size="lg">
              Envoyer le lien
            </Button>
            <p className="text-center text-sm text-dark-400">
              Vous vous souvenez ?{" "}
              <Link href={ROUTES.LOGIN} className="text-brand-600 hover:text-brand-700 font-semibold">
                Se connecter
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
