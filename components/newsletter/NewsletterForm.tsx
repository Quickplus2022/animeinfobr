"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Cadastrado! Você receberá novos guias por e-mail.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Algo deu errado. Tente novamente.");
      }
    } catch {
      setStatus("error");
      setMessage("Erro de conexão. Tente novamente.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
        disabled={status === "loading" || status === "success"}
        className="flex-1 px-4 py-2.5 bg-white/8 border border-white/12 rounded-xl text-white placeholder-slate-500 text-sm outline-none focus:border-violet-500 transition-colors disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "success" || !email}
        className="px-5 py-2.5 btn-primary text-white font-semibold text-sm rounded-xl whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Cadastrando..." : status === "success" ? "✓ Cadastrado!" : "Quero receber"}
      </button>
      {message && (
        <p className={`text-xs mt-1 absolute -bottom-5 ${status === "success" ? "text-emerald-400" : "text-red-400"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
