import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

interface PageProps { params: Promise<{ username: string }>; }

const COLORS: Record<string, string> = {
  violet: "from-violet-600 to-indigo-700",
  cyan: "from-cyan-500 to-blue-600",
  rose: "from-rose-500 to-pink-700",
  amber: "from-amber-500 to-orange-600",
  emerald: "from-emerald-500 to-teal-700",
};

const SLOT_LABELS: Record<string, { label: string; icon: string }> = {
  ESPELHO: { label: "Espelho", icon: "🪞" },
  FAVORITO: { label: "Favorito", icon: "❤️" },
  MENTOR: { label: "Mentor", icon: "👑" },
  RIVAL: { label: "Rival", icon: "⚔️" },
  VILAO: { label: "Vilão Favorito", icon: "💀" },
  CONFORTO: { label: "Conforto", icon: "🌸" },
  EU_EM_OUTRO_MUNDO: { label: "Outro Mundo", icon: "🌌" },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const user = await prisma.user.findUnique({ where: { username }, select: { name: true, bio: true } });
  if (!user) return { title: "Perfil não encontrado" };
  return {
    title: `${user.name || username} | AnimeInfoBR`,
    description: user.bio || `Perfil otaku de ${username} no AnimeInfoBR`,
  };
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true, name: true, username: true, bio: true,
      avatarEmoji: true, avatarColor: true, avatarUrl: true,
      profileVisibility: true, favoriteAnimeTitle: true, animeDnaJson: true,
      createdAt: true,
    },
  });

  if (!user || user.profileVisibility === "private") notFound();

  const [slots, favorites, testResult] = await Promise.all([
    prisma.userCharacterSlot.findMany({ where: { userId: user.id } }),
    prisma.userFavorite.findMany({ where: { userId: user.id }, orderBy: { addedAt: "desc" }, take: 8 }),
    prisma.characterTestResult.findFirst({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
  ]);

  const initial = (user.name || user.username || "U")[0].toUpperCase();
  const gradient = COLORS[user.avatarColor ?? "violet"] ?? COLORS.violet;

  const dna = user.animeDnaJson ? (() => { try { return JSON.parse(user.animeDnaJson!); } catch { return null; } })() : null;
  const dnaEntries = dna ? Object.entries(dna as Record<string, number>).sort((a, b) => b[1] - a[1]).slice(0, 5) : [];

  const DNA_LABELS: Record<string, string> = {
    action: "Ação", romance: "Romance", mystery: "Mistério", comedy: "Comédia",
    fantasy: "Fantasia", drama: "Drama", psychological: "Psicológico",
    adventure: "Aventura", sliceOfLife: "Slice of Life", sciFi: "Sci-Fi",
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-6 mb-6">
        <div className="flex items-start gap-5">
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white shrink-0 ring-2 ring-white/10 overflow-hidden`}>
            {user.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
            ) : user.avatarEmoji ? (
              <span className="text-3xl">{user.avatarEmoji}</span>
            ) : (
              <span className="text-2xl font-black">{initial}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-black text-white mb-0.5">{user.name || user.username}</h1>
            <p className="text-slate-500 text-sm mb-2">@{user.username}</p>
            {user.bio && <p className="text-slate-300 text-sm leading-relaxed mb-3">{user.bio}</p>}
            {user.favoriteAnimeTitle && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">🎌 Favorito:</span>
                <span className="text-violet-300 font-medium">{user.favoriteAnimeTitle}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-2 flex-wrap">
          <a href={`https://wa.me/?text=${encodeURIComponent(`Confira o perfil otaku de ${user.name || user.username} no AnimeInfoBR → https://www.animeinfobr.com.br/u/${user.username}`)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium hover:bg-emerald-600/30 transition-colors">
            📲 Compartilhar perfil
          </a>
        </div>
      </div>

      {/* Character test result */}
      {testResult && (
        <div className="bg-[#0d1424] rounded-2xl border border-violet-500/20 p-5 mb-6">
          <h2 className="text-white font-bold mb-3">🧬 Anime Character DNA</h2>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-violet-900/30 flex items-center justify-center text-2xl">{testResult.primaryCharacterImage ?? "🎌"}</div>
            <div>
              <p className="text-white font-semibold">{testResult.primaryCharacterName}</p>
              <p className="text-slate-500 text-xs">Personagem espelho</p>
            </div>
          </div>
          {dnaEntries.length > 0 && (
            <div className="mt-4 space-y-2">
              {dnaEntries.map(([key, val]) => (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-slate-400">{DNA_LABELS[key] ?? key}</span>
                    <span className="text-slate-500">{val}%</span>
                  </div>
                  <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: `${val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Character team */}
      {slots.length > 0 && (
        <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-5 mb-6">
          <h2 className="text-white font-bold mb-4">🎭 Time de Personagens</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {slots.map(slot => {
              const info = SLOT_LABELS[slot.slotType] ?? { label: slot.slotType, icon: "🎌" };
              return (
                <div key={slot.id} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/8">
                  <span className="text-xl shrink-0">{slot.characterImage ?? info.icon}</span>
                  <div className="min-w-0">
                    <p className="text-white text-xs font-bold truncate">{slot.characterName}</p>
                    <p className="text-slate-500 text-[10px]">{info.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-5">
          <h2 className="text-white font-bold mb-4">❤️ Animes Favoritos</h2>
          <div className="grid grid-cols-4 gap-3">
            {favorites.map(item => (
              <Link key={item.id} href={`/anime/${item.slug}`} className="group relative aspect-[2/3] rounded-xl overflow-hidden bg-[#152038]">
                {item.cover
                  ? <Image src={item.cover} alt={item.title} fill sizes="100px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  : <div className="absolute inset-0 flex items-center justify-center text-2xl opacity-20">🎌</div>
                }
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-1.5">
                  <p className="text-white text-[10px] font-medium line-clamp-2">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <p className="text-center text-slate-700 text-xs mt-8">
        <Link href="/perfil" className="hover:text-slate-500 transition-colors">Crie o seu perfil → AnimeInfoBR</Link>
      </p>
    </div>
  );
}
