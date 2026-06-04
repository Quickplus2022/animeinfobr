"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

export default function AuthModal({ open, onClose, defaultTab = "login" }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "register">(defaultTab);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function reset() {
    setName(""); setEmail(""); setPassword(""); setError(""); setSuccess("");
  }

  function switchTab(t: "login" | "register") {
    setTab(t); reset();
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("E-mail ou senha incorretos.");
    } else {
      onClose();
      window.location.reload();
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Erro ao criar conta."); setLoading(false); return; }
      // Auto login after register
      await signIn("credentials", { email, password, redirect: false });
      setLoading(false);
      onClose();
      window.location.reload();
    } catch {
      setError("Erro de conexão."); setLoading(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#0d1424] border border-white/12 p-6 shadow-2xl focus:outline-none">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-1 bg-white/5 rounded-xl p-1">
              <button
                onClick={() => switchTab("login")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === "login" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Entrar
              </button>
              <button
                onClick={() => switchTab("register")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === "register" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Criar conta
              </button>
            </div>
            <Dialog.Close asChild>
              <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-colors">
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-slate-400 text-xs mb-1.5">E-mail</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 bg-white/6 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-xs mb-1.5">Senha</label>
                <input
                  type="password" value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/6 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button
                type="submit" disabled={loading}
                className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors disabled:opacity-50"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
              <p className="text-center text-slate-500 text-xs">
                Não tem conta?{" "}
                <button type="button" onClick={() => switchTab("register")} className="text-violet-400 hover:text-violet-300">
                  Criar agora
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-slate-400 text-xs mb-1.5">Nome (opcional)</label>
                <input
                  type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Seu apelido de otaku"
                  className="w-full px-4 py-3 bg-white/6 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-xs mb-1.5">E-mail</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 bg-white/6 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-xs mb-1.5">Senha (mín. 6 caracteres)</label>
                <input
                  type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/6 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              {success && <p className="text-emerald-400 text-xs">{success}</p>}
              <button
                type="submit" disabled={loading}
                className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors disabled:opacity-50"
              >
                {loading ? "Criando conta..." : "Criar conta grátis"}
              </button>
              <p className="text-center text-slate-500 text-xs">
                Já tem conta?{" "}
                <button type="button" onClick={() => switchTab("login")} className="text-violet-400 hover:text-violet-300">
                  Entrar
                </button>
              </p>
            </form>
          )}

          <p className="text-center text-slate-600 text-[11px] mt-5">
            Ao criar conta você concorda com nossa{" "}
            <a href="/privacidade" className="text-slate-500 hover:text-slate-400">Política de Privacidade</a>.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
