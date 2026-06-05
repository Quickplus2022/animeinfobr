"use client";

import { useState } from "react";
import AvatarPicker from "./AvatarPicker";
import BioEditor from "./BioEditor";

const COLORS: Record<string, string> = {
  violet: "from-violet-600 to-indigo-700",
  cyan: "from-cyan-500 to-blue-600",
  rose: "from-rose-500 to-pink-700",
  amber: "from-amber-500 to-orange-600",
  emerald: "from-emerald-500 to-teal-700",
};

interface Props {
  name: string | null;
  email: string;
  initial: string;
  bio: string | null;
  avatarEmoji: string | null;
  avatarColor: string | null;
  stats: { favorites: number; watchLater: number; likes: number };
}

export default function ProfileHeaderClient({ name, email, initial, bio: initialBio, avatarEmoji: initialEmoji, avatarColor: initialColor, stats }: Props) {
  const [bio, setBio] = useState(initialBio);
  const [emoji, setEmoji] = useState(initialEmoji);
  const [color, setColor] = useState(initialColor ?? "violet");

  async function saveAvatar(newEmoji: string, newColor: string) {
    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatarEmoji: newEmoji, avatarColor: newColor }),
    });
    if (res.ok) { setEmoji(newEmoji); setColor(newColor); }
  }

  async function saveBio(newBio: string) {
    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bio: newBio }),
    });
    if (res.ok) setBio(newBio);
  }

  const gradient = COLORS[color] ?? COLORS.violet;

  return (
    <div className="p-6 rounded-2xl bg-[#0d1424] border border-white/8 mb-8">
      <div className="flex items-start gap-5">
        <AvatarPicker
          currentEmoji={emoji}
          currentColor={color}
          initial={initial}
          onSave={saveAvatar}
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-black text-white mb-0.5">{name || "Otaku"}</h1>
          <p className="text-slate-500 text-sm mb-3">{email}</p>
          <BioEditor initial={bio} onSave={saveBio} />
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">
            <span><strong className="text-white">{stats.favorites}</strong> favoritos</span>
            <span><strong className="text-white">{stats.watchLater}</strong> para assistir</span>
            <span><strong className="text-white">{stats.likes}</strong> curtidos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
