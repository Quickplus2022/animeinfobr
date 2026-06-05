"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CharacterMini } from "@/components/rpg/CharacterMini";

const THEMES = [
  { id: "fantasia", label: "Fantasia", emoji: "🏰" },
  { id: "cyberpunk", label: "Cyberpunk", emoji: "🏙️" },
  { id: "shounen", label: "Shounen", emoji: "🔥" },
  { id: "misterio", label: "Mistério", emoji: "🔍" },
];

interface Member {
  userId: string;
  role: string;
  user: { name: string | null; username: string | null; avatarEmoji: string | null; avatarColor: string | null };
  rpgCharacter?: { name: string; avatarEmoji: string; classType: string; elementType: string; level: number; xp: number } | null;
}

interface Party {
  id: string;
  name: string;
  inviteCode: string;
  theme: string;
  status: string;
  maxPlayers: number;
  owner: { id: string };
  members: Member[];
}

export default function PartyClient() {
  const { data: session } = useSession();
  const [party, setParty] = useState<Party | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"idle" | "create" | "join">("idle");
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("fantasia");
  const [code, setCode] = useState("");
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/rpg/party");
      if (res.ok) {
        const data = await res.json();
        if (data?.id) setParty(data);
      }
      setLoading(false);
    }
    if (session?.user) load();
    else setLoading(false);
  }, [session]);

  if (!session?.user) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="mb-4">Faça login para criar ou entrar em uma party.</p>
        <Link href="/login" className="text-violet-400 hover:text-violet-300 font-bold">Entrar</Link>
      </div>
    );
  }

  if (loading) return <div className="text-center text-slate-500 py-16">Carregando...</div>;

  async function createParty() {
    if (!name.trim()) return;
    setSaving(true);
    const res = await fetch("/api/rpg/party", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, theme }) });
    if (res.ok) setParty(await res.json());
    setSaving(false);
  }

  async function joinParty() {
    if (!code.trim()) return;
    setSaving(true);
    const res = await fetch(`/api/rpg/party/${code.toUpperCase()}`, { method: "POST" });
    if (res.ok) setParty(await res.json());
    else alert("Código inválido ou party cheia.");
    setSaving(false);
  }

  function copyCode() {
    if (!party) return;
    navigator.clipboard.writeText(party.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (party) {
    const isOwner = party.owner.id === (session.user as { id?: string }).id;
    return (
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-2xl font-black text-white">{party.name}</div>
            <div className="text-sm text-slate-400 mt-1">
              {THEMES.find(t => t.id === party.theme)?.emoji} {THEMES.find(t => t.id === party.theme)?.label}
              <span className="ml-3 text-slate-500">· {party.members.length}/{party.maxPlayers} membros</span>
            </div>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${party.status === "OPEN" ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-400"}`}>
            {party.status === "OPEN" ? "Aberta" : "Em jogo"}
          </span>
        </div>

        <div className="bg-slate-900/60 rounded-xl p-4">
          <div className="text-xs text-slate-500 mb-1">Código de convite</div>
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-violet-400 font-mono tracking-widest">{party.inviteCode}</span>
            <button onClick={copyCode} className="text-xs text-slate-400 hover:text-white transition-colors">
              {copied ? "✓ Copiado" : "Copiar"}
            </button>
          </div>
        </div>

        <div>
          <div className="text-sm text-slate-400 mb-3">Membros</div>
          <div className="space-y-3">
            {party.members.map(m => (
              <div key={m.userId} className="flex items-center justify-between">
                {m.rpgCharacter ? (
                  <CharacterMini name={m.rpgCharacter.name} avatarEmoji={m.rpgCharacter.avatarEmoji} classType={m.rpgCharacter.classType} elementType={m.rpgCharacter.elementType} level={m.rpgCharacter.level} xp={m.rpgCharacter.xp} size="xs" />
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{m.user.avatarEmoji ?? "🙂"}</span>
                    <span className="text-sm text-slate-400">{m.user.name ?? m.user.username} <span className="text-slate-600">(sem personagem)</span></span>
                  </div>
                )}
                {m.role === "OWNER" && <span className="text-xs text-amber-400">👑 Dono</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/missoes" className="flex-1 text-center bg-violet-600 hover:bg-violet-500 text-white font-bold px-4 py-2.5 rounded-xl transition-colors text-sm">
            ⚔️ Escolher Missão
          </Link>
          {!isOwner && (
            <button onClick={async () => { await fetch("/api/rpg/party", { method: "DELETE" }); setParty(null); }}
              className="text-sm text-slate-400 hover:text-red-400 px-4 py-2.5 rounded-xl border border-slate-700 hover:border-red-900 transition-colors">
              Sair
            </button>
          )}
        </div>
      </div>
    );
  }

  if (mode === "create") {
    return (
      <div className="space-y-5">
        <button onClick={() => setMode("idle")} className="text-sm text-slate-400 hover:text-white">← Voltar</button>
        <h2 className="text-lg font-bold text-white">Criar nova party</h2>
        <div>
          <label className="text-sm text-slate-400 mb-1 block">Nome da guilda *</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} maxLength={50} placeholder="Ex: Ordem do Relâmpago"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500" />
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-2 block">Tema</label>
          <div className="grid grid-cols-2 gap-3">
            {THEMES.map(t => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-sm font-bold ${theme === t.id ? "border-violet-500 bg-violet-600/20 text-white" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}>
                {t.emoji} {t.label}
              </button>
            ))}
          </div>
        </div>
        <button onClick={createParty} disabled={!name.trim() || saving}
          className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold px-4 py-3 rounded-xl transition-colors">
          {saving ? "Criando..." : "🏰 Criar Party"}
        </button>
      </div>
    );
  }

  if (mode === "join") {
    return (
      <div className="space-y-5">
        <button onClick={() => setMode("idle")} className="text-sm text-slate-400 hover:text-white">← Voltar</button>
        <h2 className="text-lg font-bold text-white">Entrar em uma party</h2>
        <div>
          <label className="text-sm text-slate-400 mb-1 block">Código de convite</label>
          <input type="text" value={code} onChange={e => setCode(e.target.value.toUpperCase())} maxLength={10} placeholder="Ex: AB3X7F"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 uppercase tracking-widest font-mono" />
        </div>
        <button onClick={joinParty} disabled={!code.trim() || saving}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold px-4 py-3 rounded-xl transition-colors">
          {saving ? "Entrando..." : "🤝 Entrar na Party"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 text-center text-slate-400">
        <p className="mb-6">Você não está em nenhuma party ainda.</p>
        <p className="text-sm text-slate-500">Crie uma para convidar seus amigos, ou entre pelo código de alguém.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => setMode("create")} className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-4 py-3 rounded-xl transition-colors text-sm">
          🏰 Criar Party
        </button>
        <button onClick={() => setMode("join")} className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-3 rounded-xl transition-colors text-sm">
          🤝 Entrar por Código
        </button>
      </div>
    </div>
  );
}
