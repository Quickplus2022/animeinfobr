import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Meu Perfil | AnimeInfoBR",
  description: "Seus favoritos, lista de 'assistir depois' e preferências de anime.",
};

export default async function PerfilPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  const { tab } = await searchParams;
  const activeTab = tab || "favorites";

  const [favorites, watchLater, likes] = await Promise.all([
    prisma.userFavorite.findMany({ where: { userId: session.user.id }, orderBy: { addedAt: "desc" } }),
    prisma.userWatchLater.findMany({ where: { userId: session.user.id }, orderBy: { addedAt: "desc" } }),
    prisma.userLike.findMany({ where: { userId: session.user.id }, orderBy: { addedAt: "desc" } }),
  ]);

  const initial = (session.user.name || session.user.email || "U")[0].toUpperCase();

  const TABS = [
    { id: "favorites", label: "❤️ Favoritos", count: favorites.length },
    { id: "watch-later", label: "🕐 Assistir Depois", count: watchLater.length },
    { id: "likes", label: "👍 Curtidos", count: likes.length },
  ];

  const currentList = activeTab === "favorites" ? favorites : activeTab === "watch-later" ? watchLater : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header do perfil */}
      <div className="flex items-center gap-5 mb-10 p-6 rounded-2xl bg-[#0d1424] border border-white/8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-white text-2xl font-black shrink-0">
          {initial}
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">
            {session.user.name || "Otaku Anônimo"}
          </h1>
          <p className="text-slate-400 text-sm">{session.user.email}</p>
          <div className="flex gap-4 mt-2 text-xs text-slate-500">
            <span><strong className="text-white">{favorites.length}</strong> favoritos</span>
            <span><strong className="text-white">{watchLater.length}</strong> para assistir</span>
            <span><strong className="text-white">{likes.length}</strong> curtidos</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {TABS.map((t) => (
          <Link
            key={t.id}
            href={`/perfil?tab=${t.id}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === t.id
                ? "bg-violet-600 text-white"
                : "bg-white/6 border border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            {t.label}
            <span className={`px-1.5 py-0.5 rounded-full text-xs ${activeTab === t.id ? "bg-white/20" : "bg-white/8"}`}>
              {t.count}
            </span>
          </Link>
        ))}
      </div>

      {/* Grid de animes */}
      {currentList.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <div className="text-5xl mb-4">
            {activeTab === "favorites" ? "❤️" : "🕐"}
          </div>
          <p className="text-lg font-medium text-slate-400">Lista vazia</p>
          <p className="text-sm mt-1">
            {activeTab === "favorites"
              ? "Favorite animes nas páginas de detalhes para aparecerem aqui."
              : "Salve animes para assistir depois e eles aparecerão aqui."}
          </p>
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
                <h3 className="text-white text-xs font-medium line-clamp-2 group-hover:text-violet-300 transition-colors">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Likes count only */}
      {activeTab === "likes" && (
        <div className="text-center py-16 text-slate-500">
          <div className="text-5xl mb-4">👍</div>
          <p className="text-lg font-medium text-slate-400">{likes.length} animes curtidos</p>
          <p className="text-sm mt-1">Os likes ficam registrados no banco de dados.</p>
        </div>
      )}
    </div>
  );
}
