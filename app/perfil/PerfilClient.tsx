"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProfileHeaderClient from "./ProfileHeaderClient";
import CharacterTest from "./CharacterTest";
import CharacterSlotSelector from "./CharacterSlotSelector";
import ProfileEditForm from "./ProfileEditForm";
import ProfileCompletion from "./ProfileCompletion";

interface SessionUser { id: string; name: string | null; email: string; }

interface ProfileData {
  bio: string | null;
  avatarEmoji: string | null;
  avatarColor: string | null;
  avatarUrl: string | null;
  username: string | null;
  favoriteAnimeTitle: string | null;
  profileVisibility: string;
  animeDnaJson: string | null;
}

interface ListItem { id: string; slug: string; title: string; cover: string | null; }

interface RpgCharacterData {
  name: string;
  avatarEmoji: string;
  classType: string;
  elementType: string;
  level: number;
  xp: number;
}

interface BadgeData { id: string; badgeName: string; description: string; }

interface Props {
  activeTab: string;
  session: SessionUser;
  profile: ProfileData | null;
  favorites: ListItem[];
  watchLater: ListItem[];
  likesCount: number;
  hasTestResult: boolean;
  slotCount: number;
  rpgCharacter: RpgCharacterData | null;
  rpgBadges: BadgeData[];
}

const TABS = (favCount: number, wlCount: number) => [
  { id: "overview", label: "Visão Geral", emoji: "👤" },
  { id: "dna", label: "DNA", emoji: "🧬" },
  { id: "team", label: "Time", emoji: "🎭" },
  { id: "edit", label: "Editar", emoji: "✏️" },
  { id: "guilds", label: "Guilds", emoji: "⚔️" },
  { id: "favorites", label: "Favoritos", emoji: "❤️", count: favCount },
  { id: "watch-later", label: "Ver Depois", emoji: "🕐", count: wlCount },
];

export default function PerfilClient({
  activeTab: initialTab,
  session,
  profile,
  favorites,
  watchLater,
  likesCount,
  hasTestResult,
  slotCount,
  rpgCharacter,
  rpgBadges,
}: Props) {
  const [tab, setTab] = useState(initialTab);
  const [localProfile, setLocalProfile] = useState(profile);
  const [editFocus, setEditFocus] = useState<"name" | "username" | "bio" | "favorite" | undefined>(undefined);

  const initial = (session.name || session.email || "U")[0].toUpperCase();
  const tabs = TABS(favorites.length, watchLater.length);
  const currentList = tab === "favorites" ? favorites : tab === "watch-later" ? watchLater : [];

  function handleProfileUpdate(data: Partial<ProfileData>) {
    setLocalProfile(p => p ? { ...p, ...data } : p);
  }

  function handleCompletionAction(stepId: string) {
    const focusMap: Record<string, "name" | "username" | "bio" | "favorite"> = {
      name: "name", username: "username", bio: "bio", favorite: "favorite", avatar: "name",
    };
    const tabMap: Record<string, string> = {
      name: "edit", username: "edit", bio: "edit", favorite: "edit", avatar: "edit",
      test: "dna", team: "team",
    };
    const focus = focusMap[stepId];
    const nextTab = tabMap[stepId] ?? "edit";
    setEditFocus(focus);
    setTab(nextTab);
  }

  function handleTabChange(newTab: string) {
    if (newTab !== "edit") setEditFocus(undefined);
    setTab(newTab);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <ProfileHeaderClient
        name={session.name}
        email={session.email}
        initial={initial}
        bio={localProfile?.bio ?? null}
        avatarEmoji={localProfile?.avatarEmoji ?? null}
        avatarColor={localProfile?.avatarColor ?? null}
        avatarUrl={localProfile?.avatarUrl ?? null}
        username={localProfile?.username ?? null}
        stats={{ favorites: favorites.length, watchLater: watchLater.length, likes: likesCount }}
        onProfileUpdate={handleProfileUpdate}
      />

      {/* Tabs */}
      <div className="flex gap-1.5 mb-6 overflow-x-auto pb-2 flex-wrap">
        {tabs.map((t) => (
          <Link
            key={t.id}
            href={`/perfil?tab=${t.id}`}
            onClick={() => handleTabChange(t.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              tab === t.id
                ? "bg-violet-600 text-white"
                : "bg-white/6 border border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            {t.emoji} {t.label}
            {"count" in t && t.count !== undefined && (
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${tab === t.id ? "bg-white/20" : "bg-white/8"}`}>
                {t.count}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div className="space-y-6">
          <ProfileCompletion
            name={!!session.name}
            username={!!localProfile?.username}
            bio={!!localProfile?.bio}
            avatar={!!(localProfile?.avatarEmoji || localProfile?.avatarUrl)}
            testDone={hasTestResult}
            favoriteAnime={!!localProfile?.favoriteAnimeTitle}
            slotFilled={slotCount > 0}
            onAction={handleCompletionAction}
          />
          {localProfile?.favoriteAnimeTitle && (
            <div className="bg-[#0d1424] rounded-xl border border-white/8 p-4 flex items-center gap-3">
              <span className="text-2xl">🎌</span>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider">Anime favorito</p>
                <p className="text-white font-semibold">{localProfile.favoriteAnimeTitle}</p>
              </div>
            </div>
          )}
          {localProfile?.username && (
            <div className="bg-[#0d1424] rounded-xl border border-white/8 p-4 flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-xs">Perfil público</p>
                <p className="text-violet-400 text-sm font-semibold">animeinfobr.com.br/u/{localProfile.username}</p>
              </div>
              <Link
                href={`/u/${localProfile.username}`}
                target="_blank"
                className="px-3 py-1.5 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-medium hover:bg-violet-600/30 transition-colors"
              >
                Ver →
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Guilds */}
      {tab === "guilds" && (
        <div className="space-y-6">
          {rpgCharacter ? (
            <div className="bg-[#0d1424] rounded-xl border border-white/8 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Meu Personagem RPG</h3>
                <Link href="/personagem" className="text-xs text-violet-400 hover:text-violet-300">Editar</Link>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-4xl w-14 h-14 flex items-center justify-center bg-slate-800 rounded-xl border border-slate-700">
                  {rpgCharacter.avatarEmoji}
                </span>
                <div>
                  <div className="font-bold text-white">{rpgCharacter.name}</div>
                  <div className="text-sm text-slate-400">{rpgCharacter.classType} · {rpgCharacter.elementType}</div>
                  <div className="text-xs text-violet-400 mt-1">Lv.{rpgCharacter.level} · {rpgCharacter.xp} XP</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#0d1424] rounded-xl border border-white/8 p-5 text-center">
              <div className="text-4xl mb-3">🧙</div>
              <p className="text-slate-400 mb-4">Você ainda não tem um personagem RPG.</p>
              <Link href="/personagem" className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors">
                Criar Personagem
              </Link>
            </div>
          )}
          {rpgBadges.length > 0 && (
            <div className="bg-[#0d1424] rounded-xl border border-white/8 p-5">
              <h3 className="font-bold text-white mb-3">Badges ({rpgBadges.length})</h3>
              <div className="flex flex-wrap gap-2">
                {rpgBadges.map(b => (
                  <div key={b.id} title={b.description} className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-center">
                    <div className="text-2xl mb-1">🏅</div>
                    <div className="text-xs text-white font-medium">{b.badgeName}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="grid grid-cols-3 gap-3">
            <Link href="/amigos" className="bg-[#0d1424] rounded-xl border border-white/8 p-4 text-center hover:border-violet-500/40 transition-colors">
              <div className="text-2xl mb-2">🤝</div>
              <div className="text-xs text-slate-400">Amigos</div>
            </Link>
            <Link href="/party" className="bg-[#0d1424] rounded-xl border border-white/8 p-4 text-center hover:border-violet-500/40 transition-colors">
              <div className="text-2xl mb-2">🏰</div>
              <div className="text-xs text-slate-400">Party</div>
            </Link>
            <Link href="/missoes" className="bg-[#0d1424] rounded-xl border border-white/8 p-4 text-center hover:border-violet-500/40 transition-colors">
              <div className="text-2xl mb-2">⚔️</div>
              <div className="text-xs text-slate-400">Missões RPG</div>
            </Link>
          </div>
        </div>
      )}

      {/* DNA */}
      {tab === "dna" && <CharacterTest username={localProfile?.username ?? null} />}

      {/* Team */}
      {tab === "team" && <CharacterSlotSelector />}

      {/* Edit */}
      {tab === "edit" && (
        <ProfileEditForm
          initialName={session.name}
          initialUsername={localProfile?.username ?? null}
          initialBio={localProfile?.bio ?? null}
          initialFavoriteAnime={localProfile?.favoriteAnimeTitle ?? null}
          initialVisibility={localProfile?.profileVisibility ?? "public"}
          focusField={editFocus}
          onSaved={(data) => {
            handleProfileUpdate({
              username: data.username !== undefined ? data.username : localProfile?.username ?? null,
              bio: data.bio !== undefined ? data.bio : localProfile?.bio ?? null,
              favoriteAnimeTitle: data.favoriteAnimeTitle !== undefined ? data.favoriteAnimeTitle : localProfile?.favoriteAnimeTitle ?? null,
              profileVisibility: data.profileVisibility ?? localProfile?.profileVisibility ?? "public",
            });
          }}
        />
      )}

      {/* Lists */}
      {(tab === "favorites" || tab === "watch-later") && (
        currentList.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">{tab === "favorites" ? "❤️" : "🕐"}</div>
            <p className="text-lg font-medium text-slate-400">Lista vazia</p>
            <Link href="/anime" className="inline-block mt-4 px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold">
              Explorar animes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {currentList.map((item) => (
              <Link
                key={item.id}
                href={`/anime/${item.slug}`}
                className="group flex flex-col rounded-xl overflow-hidden bg-[#0d1424] border border-white/8 hover:border-violet-500/40 transition-all card-3d"
              >
                <div className="relative aspect-[2/3] bg-[#152038]">
                  {item.cover ? (
                    <Image src={item.cover} alt={item.title} fill sizes="200px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-20">🎌</div>
                  )}
                </div>
                <div className="p-2">
                  <h3 className="text-white text-xs font-medium line-clamp-2 group-hover:text-violet-300 transition-colors">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        )
      )}
    </div>
  );
}
