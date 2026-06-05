"use client";

import { useState } from "react";
import AvatarUploader from "./AvatarUploader";
import BioEditor from "./BioEditor";

interface Props {
  name: string | null;
  email: string;
  initial: string;
  bio: string | null;
  avatarEmoji: string | null;
  avatarColor: string | null;
  avatarUrl: string | null;
  username: string | null;
  stats: { favorites: number; watchLater: number; likes: number };
  onProfileUpdate: (data: Partial<{ bio: string | null; avatarEmoji: string | null; avatarColor: string | null; avatarUrl: string | null }>) => void;
}

export default function ProfileHeaderClient({ name, email, initial, bio: initialBio, avatarEmoji: initialEmoji, avatarColor: initialColor, avatarUrl: initialUrl, username, stats, onProfileUpdate }: Props) {
  const [bio, setBio] = useState(initialBio);
  const [emoji, setEmoji] = useState(initialEmoji);
  const [color, setColor] = useState(initialColor ?? "violet");
  const [avatarUrl, setAvatarUrl] = useState(initialUrl);

  async function saveAvatar(newEmoji: string, newColor: string) {
    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatarEmoji: newEmoji, avatarColor: newColor }),
    });
    if (res.ok) {
      setEmoji(newEmoji); setColor(newColor);
      onProfileUpdate({ avatarEmoji: newEmoji, avatarColor: newColor });
    }
  }

  async function saveBio(newBio: string) {
    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bio: newBio }),
    });
    if (res.ok) { setBio(newBio); onProfileUpdate({ bio: newBio }); }
  }

  return (
    <div className="p-6 rounded-2xl bg-[#0d1424] border border-white/8 mb-8">
      <div className="flex items-start gap-5">
        <AvatarUploader
          initial={initial}
          avatarUrl={avatarUrl}
          avatarEmoji={emoji}
          avatarColor={color}
          onAvatarChange={(url) => { setAvatarUrl(url); onProfileUpdate({ avatarUrl: url }); }}
          onEmojiColorChange={saveAvatar}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <h1 className="text-2xl font-black text-white">{name || "Otaku"}</h1>
            {username && <span className="text-slate-500 text-sm">@{username}</span>}
          </div>
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
