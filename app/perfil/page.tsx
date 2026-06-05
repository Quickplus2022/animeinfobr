import type { Metadata } from "next";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import ProfileHeaderClient from "./ProfileHeaderClient";
import CharacterTest from "./CharacterTest";

export const metadata: Metadata = {
  title: "Meu Perfil | AnimeInfoBR",
  description: "Seus favoritos, lista de animes, DNA de personagem e muito mais.",
};

export default async function PerfilPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const session = await getSession();
  if (!session) redirect("/");

  const { tab } = await searchParams;
  const activeTab = tab || "favorites";
  const userId = session.user.id;

  const [user, favorites, watchLater, likes] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { bio: true, avatarEmoji: true, avatarColor: true },
    }),
    prisma.userFavorite.findMany({ where: { userId }, orderBy: { addedAt: "desc" } }),
    prisma.userWatchLater.findMany({ where: { userId }, orderBy: { addedAt: "desc" } }),
    prisma.userLike.findMany({ where: { userId }, orderBy: { addedAt: "desc" } }),
  ]);

  const initial = (session.user.name || session.user.email || "U")[0].toUpperCase();

  const TABS = [
    { id: "favorites", label: "Favoritos", emoji: "❤️", count: favorites.length },
    { id: "watch-later", label: "Assistir Depois", emoji: "🕐", count: watchLater.length },
    { id: "likes", label: "Curtidos", emoji: "👍", count: likes.length },
    { id: "dna", label: "DNA de Personagem", emoji: "🧬", count: null },
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
        stats={{ favorites: favorites.length, watchLater: watchLater.length, likes: likes.length }}
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {TABS.map((t) => (
          <Link key={t.id} href={`/perfil?tab=${t.id}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === t.id ? "bg-violet-600 text-white" : "bg-white/6 border border-white/10 text-slate-400 hover:text-white"
            }`}>
            {t.emoji} {t.label}
            {t.count !== null && (
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${activeTab === t.id ? "bg-white/20" : "bg-white/8"}`}>
                {t.count}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* DNA tab */}
      {activeTab === "dna" && <CharacterTest />}

      {/* Likes tab */}
      {activeTab === "likes" && (
        <div className="text-center py-16 text-slate-500">
          <div className="text-5xl mb-4">👍</div>
          <p className="text-lg font-medium text-slate-400">{likes.length} animes curtidos</p>
          {likes.length === 0 && <p className="text-sm mt-1">Curta animes nas páginas de detalhes.</p>}
        </div>
      )}

      {/* Favorites / watch-later list */}
      {(activeTab === "favorites" || activeTab === "watch-later") && (
        currentList.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <div className="text-5xl mb-4">{activeTab === "favorites" ? "❤️" : "🕐"}</div>
            <p className="text-lg font-medium text-slate-400">Lista vazia</p>
            <p className="text-sm mt-1">
              {activeTab === "favorites" ? "Favorite animes nas páginas de detalhes." : "Salve animes para assistir depois."}
            </p>
            <Link href="/anime" className="inline-block mt-4 px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold">
              Explorar animes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {currentList.map((item) => (
              <Link key={item.id} href={`/anime/${item.slug}`}
                className="group flex flex-col rounded-xl overflow-hidden bg-[#0d1424] border border-white/8 hover:border-violet-500/40 transition-all card-3d">
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
