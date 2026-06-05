"use client";

import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";

interface Props {
  initial: string | null;
  onSave: (bio: string) => Promise<void>;
}

export default function BioEditor({ initial, onSave }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initial ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await onSave(value);
    setSaving(false);
    setEditing(false);
  }

  if (!editing) {
    return (
      <div className="flex items-start gap-2 group">
        <p className="text-slate-400 text-sm flex-1">
          {value || <span className="text-slate-600 italic">Sem biografia ainda. Clique para adicionar.</span>}
        </p>
        <button
          onClick={() => setEditing(true)}
          className="shrink-0 p-1 rounded-lg text-slate-600 hover:text-violet-400 hover:bg-violet-500/10 transition-all opacity-0 group-hover:opacity-100"
        >
          <Pencil size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={500}
        rows={3}
        autoFocus
        placeholder="Conte um pouco sobre você como otaku..."
        className="w-full px-3 py-2 bg-white/5 border border-violet-500/40 rounded-xl text-white text-sm placeholder-slate-600 resize-none focus:outline-none focus:border-violet-500 transition-colors"
      />
      <div className="flex items-center justify-between">
        <span className="text-slate-600 text-xs">{value.length}/500</span>
        <div className="flex gap-2">
          <button onClick={() => { setValue(initial ?? ""); setEditing(false); }} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 transition-colors">
            <X size={14} />
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold disabled:opacity-50 transition-colors">
            <Check size={12} />
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
