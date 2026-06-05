"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { RPG_CLASSES, RPG_ELEMENTS, STYLE_OPTIONS, getLevelFromXp, type RpgClass } from "@/data/mock/rpg";
import { CharacterMini } from "@/components/rpg/CharacterMini";

const EMOJI_OPTIONS = ["⚔️","🌀","🔥","💚","🌑","🏹","🛡️","✨","♟️","👊","⚗️","📖","🐉","🌊","☄️","🦋","🐺","🦊"];
const ATTR_LABELS: Record<string, string> = {
  courage: "Coragem", strategy: "Estratégia", empathy: "Empatia",
  energy: "Energia", technique: "Técnica", defense: "Defesa",
  luck: "Sorte", charisma: "Carisma",
};

interface CharacterData {
  id?: string;
  name: string;
  avatarEmoji: string;
  classType: string;
  elementType: string;
  backstory: string;
  courage: number; strategy: number; empathy: number; energy: number;
  technique: number; defense: number; luck: number; charisma: number;
  level: number;
  xp: number;
}

export default function PersonagemClient() {
  const { data: session } = useSession();
  const [step, setStep] = useState<"style" | "class" | "element" | "details" | "view">("style");
  const [character, setCharacter] = useState<CharacterData | null>(null);
  const [draft, setDraft] = useState({
    name: "", avatarEmoji: "⚔️", classType: "", elementType: "", backstory: "",
    style: "",
  });
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/rpg/character");
      if (res.ok) {
        const data = await res.json();
        if (data?.id) { setCharacter(data); setStep("view"); }
      }
      setLoaded(true);
    }
    if (session?.user) load();
    else setLoaded(true);
  }, [session]);

  if (!session?.user) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="mb-4">Faça login para criar seu personagem.</p>
        <Link href="/login" className="text-violet-400 hover:text-violet-300 font-bold">Entrar</Link>
      </div>
    );
  }

  if (!loaded) return <div className="text-center text-slate-500 py-16">Carregando...</div>;

  async function save() {
    setSaving(true);
    const cls = RPG_CLASSES.find(c => c.id === draft.classType);
    const body = {
      name: draft.name,
      avatarEmoji: draft.avatarEmoji,
      classType: draft.classType,
      elementType: draft.elementType,
      backstory: draft.backstory,
      ...(cls?.attributes ?? {}),
    };
    const res = await fetch("/api/rpg/character", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) {
      const data = await res.json();
      setCharacter(data);
      setStep("view");
    }
    setSaving(false);
  }

  if (step === "view" && character) {
    const lvl = getLevelFromXp(character.xp);
    const attrs = ["courage","strategy","empathy","energy","technique","defense","luck","charisma"] as const;
    return (
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 space-y-6">
        <CharacterMini name={character.name} avatarEmoji={character.avatarEmoji} classType={character.classType} elementType={character.elementType} level={character.level} xp={character.xp} size="md" showStats />

        <div className="border-t border-slate-700 pt-4">
          <div className="text-sm text-slate-400 mb-3">Atributos</div>
          <div className="grid grid-cols-2 gap-2">
            {attrs.map(a => (
              <div key={a} className="flex items-center justify-between bg-slate-900/50 rounded-lg px-3 py-2">
                <span className="text-xs text-slate-400">{ATTR_LABELS[a]}</span>
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-16 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: `${(character[a] / 11) * 100}%` }} />
                  </div>
                  <span className="text-xs text-violet-400 font-bold w-4 text-right">{character[a]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {character.backstory && (
          <div className="border-t border-slate-700 pt-4">
            <div className="text-sm text-slate-400 mb-2">Backstory</div>
            <p className="text-slate-300 text-sm">{character.backstory}</p>
          </div>
        )}

        <div className="border-t border-slate-700 pt-4 text-center">
          <div className="text-xs text-slate-500 mb-1">Progresso até Lv.{character.level + 1}</div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all" style={{ width: `${Math.min(100, (character.xp % 100))}%` }} />
          </div>
          <div className="text-xs text-slate-500 mt-1">{character.xp} XP · {lvl.label}</div>
        </div>

        <div className="flex gap-3">
          <Link href="/party" className="flex-1 text-center bg-violet-600 hover:bg-violet-500 text-white font-bold px-4 py-2.5 rounded-xl transition-colors text-sm">
            🏰 Ir para Party
          </Link>
          <Link href="/missoes" className="flex-1 text-center bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2.5 rounded-xl transition-colors text-sm">
            ⚔️ Missões
          </Link>
        </div>
      </div>
    );
  }

  // Creation flow
  if (step === "style") {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white text-center">Qual é o seu estilo de jogo?</h2>
        <p className="text-slate-400 text-sm text-center">Isso vai sugerir as classes mais adequadas para você.</p>
        <div className="grid grid-cols-1 gap-3 mt-6">
          {STYLE_OPTIONS.map(s => (
            <button key={s.id} onClick={() => { setDraft(d => ({ ...d, style: s.id })); setStep("class"); }}
              className="flex items-start gap-4 bg-slate-800/60 border border-slate-700 hover:border-violet-500 rounded-xl p-4 text-left transition-all">
              <span className="text-3xl flex-shrink-0">{s.emoji}</span>
              <div>
                <div className="font-bold text-white">{s.label}</div>
                <div className="text-sm text-slate-400">{s.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === "class") {
    const style = STYLE_OPTIONS.find(s => s.id === draft.style);
    const suggested = RPG_CLASSES.filter(c => style?.classes.includes(c.id));
    const others = RPG_CLASSES.filter(c => !style?.classes.includes(c.id));
    const renderClass = (cls: RpgClass) => (
      <button key={cls.id} onClick={() => { setDraft(d => ({ ...d, classType: cls.id })); setStep("element"); }}
        className={`flex items-start gap-3 bg-slate-800/60 border rounded-xl p-4 text-left transition-all hover:border-violet-500 ${draft.classType === cls.id ? "border-violet-500" : "border-slate-700"}`}>
        <span className="text-3xl flex-shrink-0">{cls.emoji}</span>
        <div>
          <div className="font-bold text-white text-sm">{cls.label}</div>
          <div className="text-xs text-slate-400">{cls.description}</div>
        </div>
      </button>
    );
    return (
      <div className="space-y-4">
        <button onClick={() => setStep("style")} className="text-sm text-slate-400 hover:text-white">← Voltar</button>
        <h2 className="text-lg font-bold text-white">Escolha sua classe</h2>
        {suggested.length > 0 && <>
          <p className="text-xs text-violet-400 font-bold uppercase tracking-wider">Sugerido para você</p>
          <div className="grid grid-cols-1 gap-3">{suggested.map(renderClass)}</div>
          <p className="text-xs text-slate-500 uppercase tracking-wider pt-2">Outras classes</p>
        </>}
        <div className="grid grid-cols-1 gap-3">{others.map(renderClass)}</div>
      </div>
    );
  }

  if (step === "element") {
    return (
      <div className="space-y-4">
        <button onClick={() => setStep("class")} className="text-sm text-slate-400 hover:text-white">← Voltar</button>
        <h2 className="text-lg font-bold text-white">Seu elemento</h2>
        <div className="grid grid-cols-2 gap-3">
          {RPG_ELEMENTS.map(el => (
            <button key={el.id} onClick={() => { setDraft(d => ({ ...d, elementType: el.id })); setStep("details"); }}
              className={`flex items-center gap-3 bg-slate-800/60 border rounded-xl p-3 text-left transition-all hover:border-violet-500 ${draft.elementType === el.id ? "border-violet-500" : "border-slate-700"}`}>
              <span className="text-2xl">{el.emoji}</span>
              <div>
                <div className="font-bold text-white text-sm">{el.label}</div>
                <div className="text-xs text-slate-400 line-clamp-1">{el.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // step === "details"
  const cls = RPG_CLASSES.find(c => c.id === draft.classType);
  return (
    <div className="space-y-5">
      <button onClick={() => setStep("element")} className="text-sm text-slate-400 hover:text-white">← Voltar</button>
      <h2 className="text-lg font-bold text-white">Detalhes do personagem</h2>

      <div>
        <label className="text-sm text-slate-400 mb-1 block">Nome do personagem *</label>
        <input type="text" value={draft.name} onChange={e => setDraft(d => ({ ...d, name: e.target.value }))} maxLength={50}
          placeholder="Ex: Kazuki Ashborne" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500" />
      </div>

      <div>
        <label className="text-sm text-slate-400 mb-2 block">Emoji do avatar</label>
        <div className="flex flex-wrap gap-2">
          {EMOJI_OPTIONS.map(e => (
            <button key={e} onClick={() => setDraft(d => ({ ...d, avatarEmoji: e }))}
              className={`text-2xl p-2 rounded-lg transition-all ${draft.avatarEmoji === e ? "bg-violet-600/40 ring-2 ring-violet-500" : "bg-slate-800 hover:bg-slate-700"}`}>
              {e}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm text-slate-400 mb-1 block">Backstory <span className="text-slate-600">(opcional)</span></label>
        <textarea value={draft.backstory} onChange={e => setDraft(d => ({ ...d, backstory: e.target.value }))} maxLength={500} rows={3}
          placeholder="Quem é seu personagem? O que o trouxe até aqui?" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none" />
      </div>

      {cls && (
        <div className="bg-slate-900/60 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-2">Preview — {cls.emoji} {cls.label}</div>
          <CharacterMini name={draft.name || "Sem nome"} avatarEmoji={draft.avatarEmoji} classType={draft.classType} elementType={draft.elementType} level={1} xp={0} />
        </div>
      )}

      <button onClick={save} disabled={!draft.name.trim() || saving}
        className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold px-4 py-3 rounded-xl transition-colors">
        {saving ? "Criando..." : "⚔️ Criar Personagem"}
      </button>
    </div>
  );
}
