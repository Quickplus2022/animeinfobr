"use client";

import { useState } from "react";

const EMOJIS = ["🦊","🐉","⚡","🌸","🔥","❄️","⚔️","🌙","🎌","💜","🌊","🦋","👁️","🎭","🏯","🌀","🎯","🧬","🌑","🌟"];
const COLORS = [
  { id: "violet", gradient: "from-violet-600 to-indigo-700", label: "Violeta" },
  { id: "cyan", gradient: "from-cyan-500 to-blue-600", label: "Ciano" },
  { id: "rose", gradient: "from-rose-500 to-pink-700", label: "Rosa" },
  { id: "amber", gradient: "from-amber-500 to-orange-600", label: "Âmbar" },
  { id: "emerald", gradient: "from-emerald-500 to-teal-700", label: "Esmeralda" },
];

interface Props {
  currentEmoji: string | null;
  currentColor: string | null;
  initial: string;
  onSave: (emoji: string, color: string) => Promise<void>;
}

export default function AvatarPicker({ currentEmoji, currentColor, initial, onSave }: Props) {
  const [open, setOpen] = useState(false);
  const [emoji, setEmoji] = useState(currentEmoji ?? "");
  const [color, setColor] = useState(currentColor ?? "violet");
  const [saving, setSaving] = useState(false);

  const gradient = COLORS.find((c) => c.id === color)?.gradient ?? "from-violet-600 to-indigo-700";

  async function handleSave() {
    setSaving(true);
    await onSave(emoji, color);
    setSaving(false);
    setOpen(false);
  }

  return (
    <div className="relative">
      {/* Avatar display */}
      <button
        onClick={() => setOpen(true)}
        className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white shrink-0 ring-2 ring-white/10 hover:ring-violet-500/50 transition-all group relative`}
        title="Mudar avatar"
      >
        {emoji ? (
          <span className="text-3xl">{emoji}</span>
        ) : (
          <span className="text-2xl font-black">{initial}</span>
        )}
        <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-xs font-semibold">Editar</span>
        </div>
      </button>

      {/* Picker modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4" onClick={() => setOpen(false)}>
          <div className="bg-[#0d1424] border border-white/12 rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-white font-bold text-lg mb-4">Escolha seu avatar</h3>

            {/* Preview */}
            <div className="flex justify-center mb-5">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${COLORS.find(c=>c.id===color)?.gradient} flex items-center justify-center text-2xl`}>
                {emoji || <span className="text-white text-xl font-black">{initial}</span>}
              </div>
            </div>

            {/* Emoji grid */}
            <p className="text-slate-500 text-xs mb-2 uppercase tracking-wider">Ícone</p>
            <div className="grid grid-cols-10 gap-1 mb-4">
              <button
                onClick={() => setEmoji("")}
                className={`h-8 rounded-lg text-sm flex items-center justify-center ${!emoji ? "bg-violet-600" : "bg-white/5 hover:bg-white/10"}`}
              >
                <span className="text-white text-xs font-bold">{initial}</span>
              </button>
              {EMOJIS.map((e) => (
                <button
                  key={e}
                  onClick={() => setEmoji(e)}
                  className={`h-8 rounded-lg text-lg flex items-center justify-center transition-all ${emoji === e ? "bg-violet-600 scale-110" : "bg-white/5 hover:bg-white/15"}`}
                >
                  {e}
                </button>
              ))}
            </div>

            {/* Color picker */}
            <p className="text-slate-500 text-xs mb-2 uppercase tracking-wider">Cor de fundo</p>
            <div className="flex gap-2 mb-5">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  className={`flex-1 h-8 rounded-lg bg-gradient-to-r ${c.gradient} transition-all ${color === c.id ? "ring-2 ring-white scale-105" : "opacity-60 hover:opacity-100"}`}
                  title={c.label}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button onClick={() => setOpen(false)} className="flex-1 py-2 rounded-xl bg-white/6 border border-white/10 text-slate-400 text-sm hover:text-white transition-colors">
                Cancelar
              </button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors disabled:opacity-50">
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
