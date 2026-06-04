import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimeCard from "@/components/anime/AnimeCard";
import Badge from "@/components/ui/Badge";
import {
  getAnimeById,
  getIdFromSlug,
  getDisplayTitle,
  formatStatus,
  formatSeason,
  formatFormat,
  stripHtml,
  truncate,
  createAnimeSlug,
} from "@/lib/anilist/services";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const id = getIdFromSlug(slug);
  if (isNaN(id)) return { title: "Anime não encontrado" };

  const anime = await getAnimeById(id);
  if (!anime) return { title: "Anime não encontrado" };

  const title = getDisplayTitle(anime.title);
  const description = truncate(stripHtml(anime.description), 160);

  return {
    title,
    description,
    openGraph: {
      title: `${title} | AnimeInfoBR`,
      description,
      images: anime.coverImage.large
        ? [{ url: anime.coverImage.large, width: 460, height: 690, alt: title }]
        : undefined,
    },
    twitter: {
      title: `${title} | AnimeInfoBR`,
      description,
      images: anime.coverImage.large ? [anime.coverImage.large] : undefined,
    },
  };
}

const STATUS_COLORS: Record<string, string> = {
  FINISHED: "text-slate-400 bg-slate-800/50 border-slate-700/50",
  RELEASING: "text-emerald-400 bg-emerald-900/30 border-emerald-800/50",
  NOT_YET_RELEASED: "text-yellow-400 bg-yellow-900/30 border-yellow-800/50",
  CANCELLED: "text-red-400 bg-red-900/30 border-red-800/50",
  HIATUS: "text-orange-400 bg-orange-900/30 border-orange-800/50",
};

const RELATION_LABELS: Record<string, string> = {
  SEQUEL: "Continuação",
  PREQUEL: "Anterior",
  ALTERNATIVE: "Alternativo",
  SPIN_OFF: "Spin-off",
  SIDE_STORY: "História paralela",
  SUMMARY: "Resumo",
  ADAPTATION: "Adaptação",
  PARENT: "Obra original",
  CHARACTER: "Mesmo personagem",
  OTHER: "Relacionado",
};

export default async function AnimeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const id = getIdFromSlug(slug);

  if (isNaN(id)) notFound();

  const anime = await getAnimeById(id);
  if (!anime) notFound();

  const title = getDisplayTitle(anime.title);
  const description = stripHtml(anime.description);
  const score = anime.averageScore ? (anime.averageScore / 10).toFixed(1) : null;

  const recommendations = (anime.recommendations?.nodes ?? [])
    .filter((n) => n.mediaRecommendation && n.mediaRecommendation.format !== "MANGA")
    .slice(0, 6)
    .map((n) => n.mediaRecommendation!);

  const relations = (anime.relations?.edges ?? []).filter(
    (e) => ["SEQUEL", "PREQUEL", "ALTERNATIVE", "SIDE_STORY"].includes(e.relationType) &&
      ["TV", "MOVIE", "OVA", "ONA"].includes(e.node.format)
  );

  const trailerUrl =
    anime.trailer?.site === "youtube"
      ? `https://www.youtube.com/embed/${anime.trailer.id}`
      : anime.trailer?.site === "dailymotion"
      ? `https://www.dailymotion.com/embed/video/${anime.trailer.id}`
      : null;

  return (
    <>
      {/* Banner */}
      {anime.bannerImage && (
        <div className="relative h-48 md:h-64 overflow-hidden">
          <Image
            src={anime.bannerImage}
            alt={`Banner de ${title}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070c1b] via-[#070c1b]/60 to-transparent" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Início</Link>
          <span>/</span>
          <Link href="/anime" className="hover:text-white transition-colors">Animes</Link>
          <span>/</span>
          <span className="text-slate-300 line-clamp-1">{title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Poster */}
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5)]">
              {anime.coverImage.large ? (
                <Image
                  src={anime.coverImage.large}
                  alt={`Capa de ${title}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="280px"
                />
              ) : (
                <div className="absolute inset-0 bg-[#152038] flex items-center justify-center text-6xl opacity-20">🎌</div>
              )}
            </div>

            {/* Stats */}
            <div className="bg-[#0d1424] rounded-xl border border-white/8 p-4 space-y-3">
              {score && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Nota</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-white font-bold">{score}</span>
                    <span className="text-slate-500 text-xs">/10</span>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Status</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_COLORS[anime.status] ?? "text-slate-400"}`}>
                  {formatStatus(anime.status)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Formato</span>
                <span className="text-slate-300 text-sm">{formatFormat(anime.format)}</span>
              </div>
              {anime.episodes && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Episódios</span>
                  <span className="text-slate-300 text-sm">{anime.episodes}</span>
                </div>
              )}
              {anime.duration && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Duração</span>
                  <span className="text-slate-300 text-sm">{anime.duration} min/ep</span>
                </div>
              )}
              {(anime.season || anime.seasonYear) && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Temporada</span>
                  <span className="text-slate-300 text-sm">{formatSeason(anime.season, anime.seasonYear)}</span>
                </div>
              )}
              {anime.studios?.nodes[0] && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Estúdio</span>
                  <span className="text-slate-300 text-sm">{anime.studios.nodes[0].name}</span>
                </div>
              )}
              {anime.popularity > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Popularidade</span>
                  <span className="text-slate-300 text-sm">#{anime.popularity.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Legal streaming notice */}
            <div className="bg-emerald-900/20 border border-emerald-800/30 rounded-xl p-4">
              <h3 className="text-emerald-400 text-sm font-semibold mb-2">✅ Assista Legalmente</h3>
              <p className="text-slate-400 text-xs mb-3">Apoie a indústria e os criadores assistindo em plataformas oficiais.</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Crunchyroll", url: "https://www.crunchyroll.com" },
                  { name: "Netflix", url: "https://www.netflix.com" },
                  { name: "Prime Video", url: "https://www.primevideo.com" },
                ].map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-colors"
                  >
                    {p.name}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="space-y-8">
            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-black font-display text-white leading-tight mb-2">
                {title}
              </h1>
              {anime.title.romaji !== title && (
                <p className="text-slate-500 text-sm">{anime.title.romaji}</p>
              )}
              {anime.title.native && (
                <p className="text-slate-600 text-sm">{anime.title.native}</p>
              )}

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mt-4">
                {anime.genres.map((g) => (
                  <Link key={g} href={`/anime?genres=${g}`}>
                    <Badge genre className="cursor-pointer hover:opacity-80 transition-opacity">
                      {g}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sinopse */}
            {description && (
              <div>
                <h2 className="text-lg font-bold text-white mb-3">Sinopse</h2>
                <div className="bg-[#0d1424] rounded-xl border border-white/8 p-5">
                  <p className="text-slate-300 leading-relaxed">{description}</p>
                  <p className="text-xs text-slate-600 mt-3">
                    ⚠️ Esta sinopse é baseada nos dados da AniList e foi verificada para evitar spoilers importantes.
                  </p>
                </div>
              </div>
            )}

            {/* Trailer */}
            {trailerUrl && (
              <div>
                <h2 className="text-lg font-bold text-white mb-3">Trailer Oficial</h2>
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <iframe
                    src={trailerUrl}
                    title={`Trailer de ${title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Characters */}
            {anime.characters?.nodes && anime.characters.nodes.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-white mb-3">Personagens Principais</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {anime.characters.nodes.slice(0, 8).map((char) => (
                    <div
                      key={char.id}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#0d1424] border border-white/8 text-center"
                    >
                      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#152038]">
                        {char.image.large && (
                          <Image
                            src={char.image.large}
                            alt={char.name.full}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        )}
                      </div>
                      <span className="text-slate-300 text-xs font-medium line-clamp-2 leading-tight">
                        {char.name.full}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Relations */}
            {relations.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-white mb-3">Títulos Relacionados</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {relations.map((edge) => (
                    <div key={edge.node.id} className="space-y-1">
                      <p className="text-xs text-violet-400 font-medium">
                        {RELATION_LABELS[edge.relationType] ?? edge.relationType}
                      </p>
                      <AnimeCard anime={edge.node} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-white">Animes Parecidos</h2>
                  <Link
                    href={`/parecidos/${createAnimeSlug(anime.id, anime.title)}`}
                    className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Ver mais →
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {recommendations.map((rec) => (
                    <AnimeCard key={rec.id} anime={rec} />
                  ))}
                </div>
              </div>
            )}

            {/* Piracy warning */}
            <div className="bg-red-900/15 border border-red-800/25 rounded-xl p-4">
              <p className="text-red-400 text-sm font-medium mb-1">🚫 Aviso Anti-pirataria</p>
              <p className="text-slate-400 text-xs">
                O AnimeInfoBR é um portal de informações e não hospeda episódios nem links para sites piratas.
                Baixar ou assistir animes por meios não autorizados prejudica os criadores. Use plataformas legais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
