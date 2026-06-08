"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthContext";
import {
  RPG_CLASSES, RPG_ELEMENTS, STYLE_OPTIONS, getLevelFromXp, getVisualTier,
  getAwakeningOptions, getAwakeningById, getAttributeWithLevel,
  type RpgClass, type AwakeningPath,
} from "@/data/mock/rpg";
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
  awakeningClass?: string | null;
  prestigeCount?: number;
}

export default function PersonagemClient() {
  const { user, loading: authLoading } = useAuth();
  const [step, setStep] = useState<"style" | "class" | "element" | "details" | "view">("style");
  const [character, setCharacter] = useState<CharacterData | null>(null);
  const [draft, setDraft] = useState({
    name: "", avatarEmoji: "⚔️", classType: "", elementType: "", backstory: "", style: "",
  });
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [awakeningView, setAwakeningView] = useState(false);
  const [choosingAwakening, setChoosingAwakening] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/rpg/character");
      if (res.ok) {
        const data = await res.json();
        if (data?.id) { setCharacter(data); setStep("view"); }
      }
      setLoaded(true);
    }
    if (!authLoading) {
      if (user) load();
      else setLoaded(true);
    }
  }, [user, authLoading]);

  if (!authLoading && !user) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="mb-4">Faça login para criar seu personagem.</p>
        <Link href="/login" className="text-violet-400 hover:text-violet-300 font-bold">Entrar</Link>
      </div>
    );
  }

  if (authLoading || !loaded) return <div className="text-center text-slate-500 py-16">Carregando...</div>;

  async function save() {
    setSaving(true);
    const cls = RPG_CLASSES.find(c => c.id === draft.classType);
    const body = {
      name: draft.name, avatarEmoji: draft.avatarEmoji,
      classType: draft.classType, elementType: draft.elementType,
      backstory: draft.backstory, ...(cls?.attributes ?? {}),
    };
    const res = await fetch("/api/rpg/character", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    });
    if (res.ok) { const data = await res.json(); setCharacter(data); setStep("view"); }
    setSaving(false);
  }

  async function chooseAwakening(awakeningId: string) {
    if (!character) return;
    setChoosingAwakening(true);
    const res = await fetch("/api/rpg/character/awaken", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ awakeningClassId: awakeningId }),
    });
    if (res.ok) {
      const updated = await res.json();
      setCharacter(updated);
      setAwakeningView(false);
    }
    setChoosingAwakening(false);
  }

  if (step === "view" && character) {
    const lvlData = getLevelFromXp(character.xp);
    const tier = getVisualTier(character.level);
    const cls = RPG_CLASSES.find(c => c.id === character.classType);
    const attrs = ["courage","strategy","empathy","energy","technique","defense","luck","charisma"] as const;
    const awakeningOptions = getAwakeningOptions(character.classType);
    const currentAwakening = character.awakeningClass
      ? getAwakeningById(character.classType, character.awakeningClass)
      : null;
    const canAwaken = character.level >= 25 && !character.awakeningClass && !!awakeningOptions;

    if (awakeningView && awakeningOptions) {
      return (
        <AwakeningChoice
          options={awakeningOptions}
          characterName={character.name}
          level={character.level}
          choosing={choosingAwakening}
          onChoose={chooseAwakening}
          onBack={() => setAwakeningView(false)}
        />
      );
    }

    return (
      <div className="space-y-4">
        {/* Card principal com tier */}
        <div className={`rounded-2xl border-2 ${tier.borderColor} ${tier.bgColor} p-5 ${tier.glowClass} ${tier.shadowColor}`}>
          <div className="flex items-start justify-between mb-4">
            <CharacterMini
              name={character.name}
              avatarEmoji={character.avatarEmoji}
              classType={character.classType}
              elementType={character.elementType}
              level={character.level}
              xp={character.xp}
              awakeningClass={character.awakeningClass}
              prestigeCount={character.prestigeCount}
              size="md"
              showStats
              showXpBar
            />
            <div className={`text-right shrink-0 ml-4`}>
              <div className={`text-xs font-bold px-2 py-1 rounded-full border ${tier.borderColor} ${tier.textColor} bg-black/20`}>
                {tier.badgeEmoji} {tier.tierLabel}
              </div>
              {(character.prestigeCount ?? 0) > 0 && (
                <div className="text-xs text-yellow-400 mt-1 font-bold">★ Prestígio {character.prestigeCount}</div>
              )}
            </div>
          </div>

          {/* Barra de XP */}
          <div className="mb-1">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>{character.xp} XP</span>
              {character.level < 100 && <span>Próx. nível: {lvlData.nextXp} XP</span>}
            </div>
            <div className="h-2 bg-black/30 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${tier.tier === "recruta" ? "bg-slate-500" : tier.tier === "aventureiro" ? "bg-emerald-500" : tier.tier === "iniciado" ? "bg-blue-500" : tier.tier === "guerreiro" ? "bg-cyan-500" : tier.tier === "veterano" ? "bg-violet-500" : tier.tier === "mestre" ? "bg-purple-500" : tier.tier === "campeao" ? "bg-amber-500" : tier.tier === "guardiao" ? "bg-orange-500" : tier.tier === "lendario" ? "bg-rose-500" : tier.tier === "transcendido" ? "bg-red-500" : "bg-yellow-400"}`}
                style={{ width: `${lvlData.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Banner de Despertar disponível */}
        {canAwaken && (
          <div className="rounded-xl border border-violet-500/60 bg-violet-900/20 p-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-violet-300 font-bold text-sm">✨ Despertar Desbloqueado!</p>
              <p className="text-slate-400 text-xs mt-0.5">Nível 25 atingido — escolha seu caminho evolutivo.</p>
            </div>
            <button
              onClick={() => setAwakeningView(true)}
              className="shrink-0 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-colors"
            >
              Despertar →
            </button>
          </div>
        )}

        {/* Despertar atual */}
        {currentAwakening && (
          <div className="rounded-xl border border-white/10 bg-white/3 p-4 flex items-center gap-3">
            <span className="text-2xl">{currentAwakening.emoji}</span>
            <div>
              <p className="text-white font-bold text-sm">{currentAwakening.label}</p>
              <p className="text-slate-400 text-xs">{currentAwakening.description}</p>
            </div>
            <div className="ml-auto text-xs text-slate-500">Despertar</div>
          </div>
        )}

        {/* Atributos com bônus de nível */}
        <div className="bg-[#0d1424] rounded-xl border border-white/8 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-bold text-white">Atributos</div>
            {character.level > 1 && (
              <div className="text-xs text-slate-500">Base + bônus de nível</div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {attrs.map(a => {
              const base = character[a];
              const isPrimary = cls?.primaryAttribute === a;
              const withLevel = getAttributeWithLevel(base, character.level, isPrimary);
              const bonus = withLevel - base;
              return (
                <div key={a} className="flex items-center justify-between bg-white/3 rounded-lg px-3 py-2">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    {isPrimary && <span className="text-yellow-400 text-[10px]">★</span>}
                    {ATTR_LABELS[a]}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-14 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-500 rounded-full" style={{ width: `${(withLevel / 14) * 100}%` }} />
                    </div>
                    <span className="text-xs text-violet-400 font-bold w-6 text-right">{withLevel}</span>
                    {bonus > 0 && <span className="text-[10px] text-emerald-400 font-bold">+{bonus}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {character.backstory && (
          <div className="bg-[#0d1424] rounded-xl border border-white/8 p-4">
            <div className="text-sm font-bold text-white mb-2">Backstory</div>
            <p className="text-slate-300 text-sm leading-relaxed">{character.backstory}</p>
          </div>
        )}

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

  // Fluxo de criação
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
          placeholder="Ex: Kazuki Ashborne"
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500" />
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
          placeholder="Quem é seu personagem? O que o trouxe até aqui?"
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none" />
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

// ── Tela de escolha de despertar ──────────────────────────────────────────────

function AwakeningChoice({
  options, characterName, level, choosing, onChoose, onBack,
}: {
  options: [AwakeningPath, AwakeningPath];
  characterName: string;
  level: number;
  choosing: boolean;
  onChoose: (id: string) => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-sm text-slate-400 hover:text-white">← Voltar</button>

      <div className="text-center">
        <div className="text-4xl mb-2">✨</div>
        <h2 className="text-xl font-black text-white">Primeiro Despertar</h2>
        <p className="text-slate-400 text-sm mt-1">
          <span className="text-violet-400 font-bold">{characterName}</span> atingiu o nível {level}.<br />
          Escolha seu caminho evolutivo — é permanente.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-2">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className={`text-left p-5 rounded-2xl border-2 transition-all ${
              selected === opt.id
                ? "border-violet-500 bg-violet-900/30"
                : "border-white/10 bg-white/3 hover:border-violet-500/50"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{opt.emoji}</span>
              <div className="flex-1">
                <div className="font-black text-white">{opt.label}</div>
                <p className="text-slate-400 text-sm mt-1">{opt.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {Object.entries(opt.attrBonuses).map(([attr, val]) => (
                    <span key={attr} className={`text-xs px-2 py-1 rounded-full font-bold ${(val ?? 0) > 0 ? "bg-emerald-900/40 text-emerald-400 border border-emerald-500/30" : "bg-red-900/30 text-red-400 border border-red-500/20"}`}>
                      {(val ?? 0) > 0 ? "+" : ""}{val} {({ courage:"Coragem", strategy:"Estratégia", empathy:"Empatia", energy:"Energia", technique:"Técnica", defense:"Defesa", luck:"Sorte", charisma:"Carisma" } as Record<string,string>)[attr] ?? attr}
                    </span>
                  ))}
                </div>
              </div>
              {selected === opt.id && (
                <span className="text-violet-400 text-xl shrink-0">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <button
          onClick={() => onChoose(selected)}
          disabled={choosing}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-black transition-all disabled:opacity-50 text-base"
        >
          {choosing ? "Despertando..." : `✨ Confirmar Despertar`}
        </button>
      )}
    </div>
  );
}
