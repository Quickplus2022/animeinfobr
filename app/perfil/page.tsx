import type { Metadata } from "next";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import ProfileHeaderClient from "./ProfileHeaderClient";
import CharacterTest from "./CharacterTest";
import CharacterSlotSelector from "./CharacterSlotSelector";
import ProfileEditForm from "./ProfileEditForm";
import ProfileCompletion from "./ProfileCompletion";

export const metadata: Metadata = {
  title: "Meu Perfil | AnimeInfoBR",
  description: "Seu perfil otaku — DNA de personagem, lista, favoritos e muito mais.",
};

export default async function PerfilPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const session = await getSession();
  if (!session) redirect("/");

  const { tab } = await searchParams;
  const activeTab = tab || "overview";
  const userId = session.user.id;

  const [user, favorites, watchLater, likes, testResult, slots, rpgCharacter, rpgBadges] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { bio: true, avatarEmoji: true, avatarColor: true, avatarUrl: true, username: true, favoriteAnimeTitle: true, profileVisibility: true, animeDnaJson: true },
    }).catch(() => null),
    prisma.userFavorite.findMany({ where: { userId }, orderBy: { addedAt: "desc" } }).catch(() => []),
    prisma.userWatchLater.findMany({ where: { userId }, orderBy: { addedAt: "desc" } }).catch(() => []),
    prisma.userLike.findMany({ where: { userId }, orderBy: { addedAt: "desc" } }).catch(() => []),
    prisma.characterTestResult.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } }).catch(() => null),
    prisma.userCharacterSlot.findMany({ where: { userId } }).catch(() => []),
    prisma.rpgCharacter.findUnique({ where: { userId } }).catch(() => null),
    prisma.rpgBadge.findMany({ where: { userId }, orderBy: { unlockedAt: "desc" } }).catch(() => []),
  ]);

  const initial = (session.user.name || session.user.email || "U")[0].toUpperCase();

  const TABS = [
    { id: "overview", label: "Visão Geral", emoji: "👤" },
    { id: "dna", label: "DNA", emoji: "🧬" },
    { id: "team", label: "Time", emoji: "🎭" },
    { id: "edit", label: "Editar", emoji: "✏️" },
    { id: "guilds", label: "Guilds", emoji: "⚔️" },
    { id: "favorites", label: "Favoritos", emoji: "❤️", count: favorites.length },
    { id: "watch-later", label: "Ver Depois", emoji: "🕐", count: watchLater.length },
  ];

  const currentList = activeTab === "favorites" ? favorites : activeTab === "watch-later" ? watchLater : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <ProfileHeaderClient
        name={session.user.name}
        email={session.user.email}
        initial={initial}
        bio={user?.bio ?? null}
        avatarEmoji={user?.avatarEmoji ?? null}
        avatarColor={user?.avatarColor ?? null}
        avatarUrl={user?.avatarUrl ?? null}
        username={user?.username ?? null}
        stats={{ favorites: favorites.length, watchLater: watchLater.length, likes: likes.length }}
        onProfileUpdate={() => {}}
      />

      {/* Tabs */}
      <div className="flex gap-1.5 mb-6 overflow-x-auto pb-2 flex-wrap">
        {TABS.map((t) => (
          <Link key={t.id} href={`/perfil?tab=${t.id}`}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === t.id ? "bg-violet-600 text-white" : "bg-white/6 border border-white/10 text-slate-400 hover:text-white"
            }`}>
            {t.emoji} {t.label}
            {"count" in t && t.count !== undefined && (
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${activeTab === t.id ? "bg-white/20" : "bg-white/8"}`}>{t.count}</span>
            )}
          </Link>
        ))}
      </div>

      {/* Overview tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <ProfileCompletion
            name={!!session.user.name}
            username={!!user?.username}
            bio={!!user?.bio}
            avatar={!!(user?.avatarEmoji || user?.avatarUrl)}
            testDone={!!testResult}
            favoriteAnime={!!user?.favoriteAnimeTitle}
            slotFilled={slots.length > 0}
          />
          {user?.favoriteAnimeTitle && (
            <div className="bg-[#0d1424] rounded-xl border border-white/8 p-4 flex items-center gap-3">
              <span className="text-2xl">🎌</span>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider">Anime favorito</p>
                <p className="text-white font-semibold">{user.favoriteAnimeTitle}</p>
              </div>
            </div>
          )}
          {user?.username && (
            <div className="bg-[#0d1424] rounded-xl border border-white/8 p-4 flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-xs">Perfil público</p>
                <p className="text-violet-400 text-sm font-semibold">animeinfobr.com.br/u/{user.username}</p>
              </div>
              <Link href={`/u/${user.username}`} target="_blank" className="px-3 py-1.5 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-medium hover:bg-violet-600/30 transition-colors">
                Ver →
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Guilds tab */}
      {activeTab === "guilds" && (
        <div className="space-y-6">
          {rpgCharacter ? (
            <div className="bg-[#0d1424] rounded-xl border border-white/8 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Meu Personagem RPG</h3>
                <Link href="/personagem" className="text-xs text-violet-400 hover:text-violet-300">Editar</Link>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-4xl w-14 h-14 flex items-center justify-center bg-slate-800 rounded-xl border border-slate-700">{rpgCharacter.avatarEmoji}</span>
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
              <Link href="/personagem" className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors">Criar Personagem</Link>
            </div>
          )}

          {rpgBadges.length > 0 && (
            <div className="bg-[#0d1424] rounded-xl border border-white/8 p-5">
              <h3 className="font-bold text-white mb-3">Badges de Guilds ({rpgBadges.length})</h3>
              <div className="flex flex-wrap gap-2">
                {rpgBadges.map(b => (
                  <div key={b.id} title={b.description} className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-center cursor-default">
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

      {/* DNA tab */}
      {activeTab === "dna" && <CharacterTest username={user?.username ?? null} />}

      {/* Team tab */}
      {activeTab === "team" && <CharacterSlotSelector />}

      {/* Edit tab */}
      {activeTab === "edit" && (
        <ProfileEditForm
          initialName={session.user.name}
          initialUsername={user?.username ?? null}
          initialFavoriteAnime={user?.favoriteAnimeTitle ?? null}
          initialVisibility={user?.profileVisibility ?? "public"}
          onSaved={() => {}}
        />
      )}

      {/* List tabs */}
      {(activeTab === "favorites" || activeTab === "watch-later") && (
        currentList.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">{activeTab === "favorites" ? "❤️" : "🕐"}</div>
            <p className="text-lg font-medium text-slate-400">Lista vazia</p>
            <Link href="/anime" className="inline-block mt-4 px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold">Explorar animes</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {currentList.map((item) => (
              <Link key={item.id} href={`/anime/${item.slug}`} className="group flex flex-col rounded-xl overflow-hidden bg-[#0d1424] border border-white/8 hover:border-violet-500/40 transition-all card-3d">
                <div className="relative aspect-[2/3] bg-[#152038]">
                  {item.cover ? <Image src={item.cover} alt={item.title} fill sizes="200px" className="object-cover group-hover:scale-105 transition-transform duration-500" /> : <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-20">🎌</div>}
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
