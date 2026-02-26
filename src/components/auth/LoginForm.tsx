"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ROUTES } from "@/lib/constants";

export function LoginForm() {
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [showPass,  setShowPass]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error ?? "Erreur de connexion");
      } else {
        window.location.href = ROUTES.DASHBOARD;
      }
    } catch {
      setError("Erreur réseau. Réessaye.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        placeholder="ton@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<Mail size={17} />}
        required
        autoComplete="email"
      />

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-dark-700">Mot de passe</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
            <Lock size={17} />
          </span>
          <input
            type={showPass ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="input-base pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600"
          >
            {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-brand-600 hover:text-brand-700 font-medium"
        >
          Mot de passe oublié ?
        </Link>
      </div>

      <Button type="submit" loading={loading} className="w-full" size="lg">
        Se connecter
      </Button>

      <p className="text-center text-sm text-dark-500">
        Pas encore de compte ?{" "}
        <Link href={ROUTES.REGISTER} className="text-brand-600 hover:text-brand-700 font-semibold">
          S&apos;inscrire gratuitement
        </Link>
      </p>
    </form>
  );
}
