"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Erreur</h1>
      <button onClick={reset}>Réessayer</button>
    </div>
  );
}
