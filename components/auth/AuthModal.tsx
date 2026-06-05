"use client";

import { useState } from "react";
import { useAuth } from "./AuthContext";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Eye, EyeOff } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

export default function AuthModal({ open, onClose, defaultTab = "login" }: AuthModalProps) {
  const { login, register } = useAuth();
  const [tab, setTab] = useState<"login" | "register">(defaultTab);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function reset() { setName(""); setEmail(""); setPassword(""); setError(""); }
  function switchTab(t: "login" | "register") { setTab(t); reset(); }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao entrar.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(name.trim() || null, email, password);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#0d1424] border border-white/12 p-6 shadow-2xl focus:outline-none">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-1 bg-white/5 rounded-xl p-1">
              <button onClick={() => switchTab("login")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === "login" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"}`}>
                Entrar
              </button>
              <button onClick={() => switchTab("register")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === "register" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"}`}>
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
              <Field label="E-mail" type="email" value={email} onChange={setEmail} placeholder="seu@email.com" />
              <PasswordField label="Senha" value={password} onChange={setPassword} show={showPassword} onToggle={() => setShowPassword(v => !v)} />
              {error && <p className="text-red-400 text-xs bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors disabled:opacity-50">
                {loading ? "Verificando..." : "Entrar"}
              </button>
              <p className="text-center text-slate-500 text-xs">
                Não tem conta?{" "}
                <button type="button" onClick={() => switchTab("register")} className="text-violet-400 hover:text-violet-300">Criar grátis</button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <Field label="Apelido (opcional)" type="text" value={name} onChange={setName} placeholder="Seu nome de otaku" />
              <Field label="E-mail" type="email" value={email} onChange={setEmail} placeholder="seu@email.com" />
              <PasswordField label="Senha (mínimo 6 caracteres)" value={password} onChange={setPassword} show={showPassword} onToggle={() => setShowPassword(v => !v)} minLength={6} />
              {error && <p className="text-red-400 text-xs bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors disabled:opacity-50">
                {loading ? "Criando conta..." : "Criar conta grátis"}
              </button>
              <p className="text-center text-slate-500 text-xs">
                Já tem conta?{" "}
                <button type="button" onClick={() => switchTab("login")} className="text-violet-400 hover:text-violet-300">Entrar</button>
              </p>
            </form>
          )}

          <p className="text-center text-slate-600 text-[11px] mt-4">
            Ao criar conta você concorda com nossa{" "}
            <a href="/privacidade" className="text-slate-500 hover:text-slate-400">Política de Privacidade</a>.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Field({ label, type, value, onChange, placeholder, minLength }: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string; minLength?: number;
}) {
  return (
    <div>
      <label className="block text-slate-400 text-xs mb-1.5">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} required
        placeholder={placeholder} minLength={minLength}
        className="w-full px-4 py-3 bg-white/6 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
      />
    </div>
  );
}

function PasswordField({ label, value, onChange, show, onToggle, minLength }: {
  label: string; value: string; onChange: (v: string) => void;
  show: boolean; onToggle: () => void; minLength?: number;
}) {
  return (
    <div>
      <label className="block text-slate-400 text-xs mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={e => onChange(e.target.value)}
          required
          placeholder="••••••••"
          minLength={minLength}
          className="w-full px-4 py-3 pr-11 bg-white/6 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
        />
        <button
          type="button"
          onClick={onToggle}
          tabIndex={-1}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          aria-label={show ? "Ocultar senha" : "Mostrar senha"}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}
