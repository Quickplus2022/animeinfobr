"use client";

import { useState, useRef, useEffect } from "react";
import { Check, Loader } from "lucide-react";

interface Props {
  initialName: string | null;
  initialUsername: string | null;
  initialBio: string | null;
  initialFavoriteAnime: string | null;
  initialVisibility: string;
  focusField?: "name" | "username" | "bio" | "favorite";
  onSaved: (data: { name?: string; username?: string; bio?: string; favoriteAnimeTitle?: string; profileVisibility?: string }) => void;
}

export default function ProfileEditForm({
  initialName, initialUsername, initialBio, initialFavoriteAnime, initialVisibility, focusField, onSaved,
}: Props) {
  const [name, setName] = useState(initialName ?? "");
  const [username, setUsername] = useState(initialUsername ?? "");
  const [bio, setBio] = useState(initialBio ?? "");
  const [favoriteAnime, setFavoriteAnime] = useState(initialFavoriteAnime ?? "");
  const [visibility, setVisibility] = useState(initialVisibility);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const favoriteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!focusField) return;
    const map = { name: nameRef, username: usernameRef, bio: bioRef, favorite: favoriteRef };
    const el = map[focusField]?.current;
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus();
    }
  }, [focusField]);

  async function handleSave() {
    setSaving(true); setError(""); setSuccess(false);
    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim() || null,
        username: username.trim() || null,
        bio: bio.trim() || null,
        favoriteAnimeTitle: favoriteAnime.trim() || null,
        profileVisibility: visibility,
      }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Erro ao salvar."); setSaving(false); return; }
    setSuccess(true);
    onSaved({
      username: username.trim() || undefined,
      bio: bio.trim() || undefined,
      favoriteAnimeTitle: favoriteAnime.trim() || undefined,
      profileVisibility: visibility,
    });
    setTimeout(() => setSuccess(false), 3000);
    setSaving(false);
  }

  return (
    <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-5 space-y-4">
      <h3 className="text-white font-bold">✏️ Editar Perfil</h3>

      <div>
        <label className="block text-slate-400 text-xs mb-1.5">Nome de exibição</label>
        <input ref={nameRef} value={name} onChange={e => setName(e.target.value)} maxLength={100}
          placeholder="Seu nome de otaku"
          className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors" />
      </div>

      <div>
        <label className="block text-slate-400 text-xs mb-1.5">Username <span className="text-slate-600">(único · 3-30 chars · letras, números, ponto, _ e -)</span></label>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-sm">@</span>
          <input ref={usernameRef} value={username}
            onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ""))} maxLength={30}
            placeholder="seu_username"
            className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors" />
        </div>
        {username && <p className="text-slate-600 text-xs mt-1">Perfil público em: animeinfobr.com.br/u/{username}</p>}
      </div>

      <div>
        <label className="block text-slate-400 text-xs mb-1.5">Biografia</label>
        <textarea ref={bioRef} value={bio} onChange={e => setBio(e.target.value)} maxLength={500} rows={3}
          placeholder="Conte um pouco sobre você como otaku..."
          className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors resize-none" />
        <p className="text-slate-600 text-xs mt-0.5 text-right">{bio.length}/500</p>
      </div>

      <div>
        <label className="block text-slate-400 text-xs mb-1.5">Anime favorito</label>
        <input ref={favoriteRef} value={favoriteAnime} onChange={e => setFavoriteAnime(e.target.value)} maxLength={200}
          placeholder="Ex: Fullmetal Alchemist: Brotherhood"
          className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors" />
      </div>

      <div>
        <label className="block text-slate-400 text-xs mb-1.5">Visibilidade do perfil</label>
        <div className="flex gap-2">
          {[{ id: "public", label: "🌍 Público" }, { id: "private", label: "🔒 Privado" }].map(v => (
            <button key={v.id} onClick={() => setVisibility(v.id)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${visibility === v.id ? "bg-violet-600 text-white" : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"}`}>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-red-400 text-xs bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>}

      <button onClick={handleSave} disabled={saving}
        className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
        {saving ? <Loader size={14} className="animate-spin" /> : success ? <><Check size={14} /> Salvo!</> : "Salvar alterações"}
      </button>
    </div>
  );
}
