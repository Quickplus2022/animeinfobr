"use client";

import { useEffect } from "react";

export default function PerfilError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[PERFIL_BOUNDARY]", error.message, error.digest, error.stack);
  }, [error]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-red-950/40 border border-red-800/50 rounded-2xl p-6 text-center">
        <div className="text-3xl mb-3">⚠️</div>
        <p className="text-red-300 font-semibold mb-2">Erro ao carregar o perfil</p>
        <pre className="text-xs text-slate-400 text-left bg-slate-900 rounded-xl p-4 overflow-auto mt-3 max-h-48">
          {error.name}: {error.message}
          {error.digest ? `\nDigest: ${error.digest}` : ""}
        </pre>
        <button
          onClick={reset}
          className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
