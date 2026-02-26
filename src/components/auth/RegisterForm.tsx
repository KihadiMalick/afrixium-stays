"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ROUTES } from "@/lib/constants";

export function RegisterForm() {
  const [form,    setForm]    = useState({
    first_name: "", last_name: "", email: "", phone: "", password: ""
  });
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error ?? "Erreur d'inscription");
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Prénom"
          placeholder="Jean"
          value={form.first_name}
          onChange={(e) => update("first_name", e.target.value)}
          icon={<User size={17} />}
          required
        />
        <Input
          label="Nom"
          placeholder="Dupont"
          value={form.last_name}
          onChange={(e) => update("last_name", e.target.value)}
          required
        />
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="ton@email.com"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        icon={<Mail size={17} />}
        required
        autoComplete="email"
      />

      <Input
        label="Téléphone (optionnel)"
        type="tel"
        placeholder="+225 07 00 00 00 00"
        value={form.phone}
        onChange={(e) => update("phone", e.target.value)}
        icon={<Phone size={17} />}
      />

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-dark-700">Mot de passe</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
            <Lock size={17} />
          </span>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Minimum 8 caractères"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            required
            minLength={8}
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

      <Button type="submit" loading={loading} className="w-full" size="lg">
        Créer mon compte gratuitement
      </Button>

      <p className="text-center text-sm text-dark-400">
        En vous inscrivant, vous acceptez nos{" "}
        <Link href="/terms" className="text-brand-600 hover:underline">
          conditions d&apos;utilisation
        </Link>
      </p>

      <p className="text-center text-sm text-dark-500">
        Déjà un compte ?{" "}
        <Link href={ROUTES.LOGIN} className="text-brand-600 hover:text-brand-700 font-semibold">
          Se connecter
        </Link>
      </p>
    </form>
  );
}
