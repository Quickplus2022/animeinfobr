"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import GameClient from "./GameClient";

export default function GameGate() {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-10 h-10 border-4 border-white/10 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="relative rounded-2xl overflow-hidden border border-violet-500/30">
          {/* Blurred preview */}
          <div className="blur-sm pointer-events-none select-none p-6">
            <div className="bg-[#0d1424] border border-white/8 rounded-2xl p-6 mb-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">De qual anime é essa sinopse?</p>
              <p className="text-white text-base">Um estudante genial encontra um caderno sobrenatural que pode matar qualquer pessoa escrevendo um nome...</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Death Note", "Code Geass", "Parasyte", "Monster"].map((opt) => (
                <div key={opt} className="p-4 rounded-xl bg-[#0d1424] border border-white/10 text-slate-300 text-sm font-medium">
                  {opt}
                </div>
              ))}
            </div>
          </div>

          {/* Lock overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080f1e]/80 backdrop-blur-sm p-6 text-center">
            <div className="text-5xl mb-4">🔐</div>
            <h2 className="text-xl font-black text-white mb-2">Exclusivo para Cadastrados</h2>
            <p className="text-slate-400 text-sm mb-6 max-w-xs">
              Crie uma conta gratuita para jogar, salvar seu recorde e desbloquear todos os jogos.
            </p>
            <button
              onClick={() => setShowAuth(true)}
              className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-colors"
            >
              Criar conta grátis →
            </button>
            <button
              onClick={() => setShowAuth(true)}
              className="mt-2 text-slate-500 hover:text-slate-300 text-xs transition-colors"
            >
              Já tenho conta — entrar
            </button>
          </div>
        </div>

        <AuthModal open={showAuth} onClose={() => setShowAuth(false)} defaultTab="register" />
      </>
    );
  }

  return <GameClient />;
}
