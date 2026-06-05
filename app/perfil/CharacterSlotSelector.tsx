"use client";

import { useState, useEffect, useCallback } from "react";
import { CHARACTERS } from "@/data/mock/characters";
import { X, Search } from "lucide-react";
import { searchCharacters, type AniListCharacter } from "@/lib/anilist/characters";

const SLOTS = [
  { id: "ESPELHO", label: "Espelho", icon: "🪞", description: "O personagem que mais se parece com você" },
  { id: "FAVORITO", label: "Favorito", icon: "❤️", description: "Seu personagem preferido de todos os tempos" },
  { id: "MENTOR", label: "Mentor", icon: "👑", description: "O personagem de quem você mais aprenderia" },
  { id: "RIVAL", label: "Rival", icon: "⚔️", description: "O personagem que te desafiaria" },
  { id: "VILAO", label: "Vilão Favorito", icon: "💀", description: "O antagonista que você mais admira" },
  { id: "CONFORTO", label: "Conforto", icon: "🌸", description: "O personagem que te acalma" },
  { id: "EU_EM_OUTRO_MUNDO", label: "Eu em Outro Mundo", icon: "🌌", description: "Quem você seria em outro universo" },
];

interface Slot { slotType: string; characterId: string; characterName: string; characterImage: string | null; mediaTitle: string | null; }

export default function CharacterSlotSelector() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [editingSlot, setEditingSlot] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AniListCharacter[]>([]);
  const [searching, setSearching] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/user/character-slots").then(r => r.json()).then(setSlots).catch(() => {});
  }, []);

  const handleSearch = useCallback(async (q: string) => {
    setQuery(q);
    if (!q.trim()) { setResults([]); return; }
    setSearching(true);
    const found = await searchCharacters(q);
    setResults(found);
    setSearching(false);
  }, []);

  function getSlot(id: string) { return slots.find(s => s.slotType === id) ?? null; }

  async function selectCharacter(slotType: string, char: { id: string; name: string; image: string | null; anime: string }) {
    setSaving(true);
    const res = await fetch("/api/user/character-slots", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slotType, characterId: char.id, characterName: char.name, characterImage: char.image, mediaTitle: char.anime }),
    });
    if (res.ok) {
      const updated = await res.json();
      setSlots(prev => {
        const next = prev.filter(s => s.slotType !== slotType);
        return [...next, updated];
      });
    }
    setSaving(false);
    setEditingSlot(null);
    setQuery(""); setResults([]);
  }

  async function removeSlot(slotType: string) {
    await fetch(`/api/user/character-slots?slotType=${slotType}`, { method: "DELETE" });
    setSlots(prev => prev.filter(s => s.slotType !== slotType));
  }

  const curatedOptions = CHARACTERS.map(c => ({ id: c.id, name: c.name, image: null, anime: c.anime }));
  const anilistOptions: { id: string; name: string; image: string | null; anime: string }[] = results.map(r => ({
    id: String(r.id),
    name: r.name.full,
    image: r.image?.large ?? null,
    anime: r.media?.nodes?.[0]?.title?.english ?? r.media?.nodes?.[0]?.title?.romaji ?? "",
  }));
  const displayOptions = query.trim() ? anilistOptions : curatedOptions;

  return (
    <div>
      <h3 className="text-white font-bold text-lg mb-2">🎭 Time de Personagens</h3>
      <p className="text-slate-500 text-sm mb-4">Escolha os personagens que te definem em cada papel.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SLOTS.map(slot => {
          const filled = getSlot(slot.id);
          return (
            <div key={slot.id} className={`rounded-xl border p-3 transition-all ${filled ? "bg-violet-500/8 border-violet-500/25" : "bg-[#0d1424] border-white/8"}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl shrink-0">{slot.icon}</span>
                  <div className="min-w-0">
                    <p className="text-white text-xs font-bold">{slot.label}</p>
                    {filled ? (
                      <p className="text-violet-300 text-xs truncate">{filled.characterName}</p>
                    ) : (
                      <p className="text-slate-600 text-xs">{slot.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  {filled && (
                    <button onClick={() => removeSlot(slot.id)} className="p-1 rounded-lg text-slate-600 hover:text-red-400 transition-colors">
                      <X size={12} />
                    </button>
                  )}
                  <button onClick={() => { setEditingSlot(slot.id); setQuery(""); setResults([]); }} className="px-2 py-1 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-medium hover:bg-violet-600/30 transition-colors">
                    {filled ? "Trocar" : "Escolher"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Character picker modal */}
      {editingSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4" onClick={() => setEditingSlot(null)}>
          <div className="bg-[#0d1424] border border-white/12 rounded-2xl p-5 w-full max-w-md shadow-2xl max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-bold">
                {SLOTS.find(s => s.id === editingSlot)?.icon} {SLOTS.find(s => s.id === editingSlot)?.label}
              </h4>
              <button onClick={() => setEditingSlot(null)} className="text-slate-500 hover:text-white"><X size={18} /></button>
            </div>

            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={e => handleSearch(e.target.value)}
                placeholder="Buscar personagem (qualquer anime)..."
                className="w-full pl-8 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
            {!query && <p className="text-slate-600 text-xs mb-2">Lista curada · Digite para buscar qualquer personagem</p>}
            {searching && <p className="text-slate-500 text-xs mb-2 text-center">Buscando...</p>}

            <div className="overflow-y-auto flex-1 space-y-1.5">
              {displayOptions.map(char => (
                <button
                  key={char.id}
                  disabled={saving}
                  onClick={() => selectCharacter(editingSlot, char)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-violet-500/15 border border-white/8 hover:border-violet-500/30 text-left transition-all"
                >
                  {char.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={char.image} alt={char.name} className="w-9 h-9 rounded-lg object-cover shrink-0" />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-violet-900/30 flex items-center justify-center text-lg shrink-0">🎌</div>
                  )}
                  <div className="min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{char.name}</p>
                    <p className="text-slate-500 text-xs truncate">{char.anime}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
