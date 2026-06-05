"use client";

import { useState, useRef } from "react";
import { Camera, Trash2, Loader } from "lucide-react";

const COLORS: Record<string, string> = {
  violet: "from-violet-600 to-indigo-700",
  cyan: "from-cyan-500 to-blue-600",
  rose: "from-rose-500 to-pink-700",
  amber: "from-amber-500 to-orange-600",
  emerald: "from-emerald-500 to-teal-700",
};
const EMOJIS = ["🦊","🐉","⚡","🌸","🔥","❄️","⚔️","🌙","🎌","💜","🌊","🦋","👁️","🎭","🏯","🌀","🎯","🧬","🌑","🌟"];
const COLOR_LIST = [
  { id: "violet", gradient: "from-violet-600 to-indigo-700" },
  { id: "cyan", gradient: "from-cyan-500 to-blue-600" },
  { id: "rose", gradient: "from-rose-500 to-pink-700" },
  { id: "amber", gradient: "from-amber-500 to-orange-600" },
  { id: "emerald", gradient: "from-emerald-500 to-teal-700" },
];

async function compressAvatar(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > 3 * 1024 * 1024) { reject(new Error("Arquivo maior que 3 MB. Escolha uma foto menor.")); return; }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 256; canvas.height = 256;
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("Canvas não suportado")); return; }
      const size = Math.min(img.width, img.height);
      const x = (img.width - size) / 2;
      const y = (img.height - size) / 2;
      ctx.drawImage(img, x, y, size, size, 0, 0, 256, 256);
      URL.revokeObjectURL(url);
      const dataUrl = canvas.toDataURL("image/webp", 0.75);
      if (dataUrl.length > 120_000) {
        const dataUrl2 = canvas.toDataURL("image/webp", 0.5);
        resolve(dataUrl2);
      } else {
        resolve(dataUrl);
      }
    };
    img.onerror = () => reject(new Error("Não foi possível carregar a imagem."));
    img.src = url;
  });
}

interface Props {
  initial: string;
  avatarUrl: string | null;
  avatarEmoji: string | null;
  avatarColor: string | null;
  onAvatarChange: (url: string | null) => void;
  onEmojiColorChange: (emoji: string, color: string) => Promise<void>;
}

export default function AvatarUploader({ initial, avatarUrl, avatarEmoji, avatarColor, onAvatarChange, onEmojiColorChange }: Props) {
  const [preview, setPreview] = useState<string | null>(avatarUrl);
  const [emoji, setEmoji] = useState(avatarEmoji ?? "");
  const [color, setColor] = useState(avatarColor ?? "violet");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"photo" | "emoji">(avatarUrl ? "photo" : "emoji");
  const [pickerOpen, setPickerOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const gradient = COLORS[color] ?? COLORS.violet;

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(""); setUploading(true);
    try {
      const dataUrl = await compressAvatar(file);
      setPreview(dataUrl);
      const res = await fetch("/api/user/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onAvatarChange(dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar foto.");
      setPreview(avatarUrl);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleRemove() {
    setUploading(true);
    await fetch("/api/user/avatar", { method: "DELETE" });
    setPreview(null);
    onAvatarChange(null);
    setUploading(false);
  }

  async function handleSaveEmoji() {
    setUploading(true);
    await onEmojiColorChange(emoji, color);
    setPickerOpen(false);
    setUploading(false);
  }

  return (
    <div className="relative">
      {/* Avatar display */}
      <button onClick={() => setPickerOpen(true)} className="group relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-white/10 hover:ring-violet-500/60 transition-all">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white`}>
            {emoji ? <span className="text-3xl">{emoji}</span> : <span className="text-2xl font-black">{initial}</span>}
          </div>
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
          {uploading ? <Loader size={18} className="text-white animate-spin" /> : <Camera size={18} className="text-white" />}
        </div>
      </button>

      {/* Picker modal */}
      {pickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4" onClick={() => setPickerOpen(false)}>
          <div className="bg-[#0d1424] border border-white/12 rounded-2xl p-5 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-white font-bold text-lg mb-4">Editar avatar</h3>

            {/* Tabs */}
            <div className="flex gap-1 bg-white/5 rounded-xl p-1 mb-4">
              {(["photo", "emoji"] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${tab === t ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"}`}>
                  {t === "photo" ? "📸 Foto" : "🎨 Emoji"}
                </button>
              ))}
            </div>

            {tab === "photo" ? (
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-white/20">
                    {preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl font-black`}>{initial}</div>
                    )}
                  </div>
                </div>
                <p className="text-slate-500 text-xs text-center">JPG, PNG ou WebP · máx 3 MB · reduzido para 256×256 automaticamente</p>
                {error && <p className="text-red-400 text-xs text-center bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>}
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFile} />
                <button onClick={() => fileRef.current?.click()} disabled={uploading} className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold disabled:opacity-50 transition-colors">
                  {uploading ? "Processando..." : "Escolher foto"}
                </button>
                {preview && (
                  <button onClick={handleRemove} disabled={uploading} className="w-full py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-sm transition-colors flex items-center justify-center gap-1.5">
                    <Trash2 size={14} /> Remover foto
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-center mb-2">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${COLOR_LIST.find(c=>c.id===color)?.gradient} flex items-center justify-center text-2xl`}>
                    {emoji || <span className="text-white text-xl font-black">{initial}</span>}
                  </div>
                </div>
                <p className="text-slate-500 text-xs uppercase tracking-wider">Ícone</p>
                <div className="grid grid-cols-10 gap-1">
                  <button onClick={() => setEmoji("")} className={`h-8 rounded-lg text-sm flex items-center justify-center ${!emoji ? "bg-violet-600" : "bg-white/5 hover:bg-white/10"}`}>
                    <span className="text-white text-xs font-bold">{initial}</span>
                  </button>
                  {EMOJIS.map(e => (
                    <button key={e} onClick={() => setEmoji(e)} className={`h-8 rounded-lg text-lg flex items-center justify-center transition-all ${emoji === e ? "bg-violet-600 scale-110" : "bg-white/5 hover:bg-white/15"}`}>{e}</button>
                  ))}
                </div>
                <p className="text-slate-500 text-xs uppercase tracking-wider">Cor de fundo</p>
                <div className="flex gap-2">
                  {COLOR_LIST.map(c => (
                    <button key={c.id} onClick={() => setColor(c.id)} className={`flex-1 h-8 rounded-lg bg-gradient-to-r ${c.gradient} transition-all ${color === c.id ? "ring-2 ring-white scale-105" : "opacity-60 hover:opacity-100"}`} />
                  ))}
                </div>
                <button onClick={handleSaveEmoji} disabled={uploading} className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold disabled:opacity-50 transition-colors">
                  {uploading ? "Salvando..." : "Salvar avatar"}
                </button>
              </div>
            )}

            <button onClick={() => setPickerOpen(false)} className="w-full mt-2 py-2 rounded-xl bg-white/6 text-slate-400 text-sm hover:text-white transition-colors">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
