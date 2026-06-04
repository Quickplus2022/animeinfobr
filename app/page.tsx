import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/home/SearchBar";
import AnimeCard from "@/components/anime/AnimeCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import JsonLd, { websiteJsonLd, itemListJsonLd } from "@/components/seo/JsonLd";
import {
  getTrendingAnime,
  getSeasonalAnime,
  getPopularAnime,
  getCurrentSeason,
  createAnimeSlug,
  getDisplayTitle,
} from "@/lib/anilist/services";
import { GUIDES } from "@/data/mock/guides";

export const metadata: Metadata = {
  title: "AnimeInfoBR — Descubra seu próximo anime",
  description:
    "Descubra seu próximo anime em menos de 1 minuto. Recomendações inteligentes, calendário da temporada e guias em português para o público brasileiro.",
};

const MOODS = [
  { label: "Ação", icon: "⚔️", genre: "Action" },
  { label: "Romance", icon: "💕", genre: "Romance" },
  { label: "Comédia", icon: "😂", genre: "Comedy" },
  { label: "Terror", icon: "👻", genre: "Horror" },
  { label: "Drama", icon: "🎭", genre: "Drama" },
  { label: "Fantasia", icon: "🔮", genre: "Fantasy" },
  { label: "Aventura", icon: "🗺️", genre: "Adventure" },
  { label: "Mistério", icon: "🕵️", genre: "Mystery" },
];

const SEASON_NAMES: Record<string, string> = {
  WINTER: "Inverno",
  SPRING: "Primavera",
  SUMMER: "Verão",
  FALL: "Outono",
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.animeinfobr.com.br";

export default async function HomePage() {
  const [trending, seasonal, popular] = await Promise.all([
    getTrendingAnime(12),
    getSeasonalAnime(8),
    getPopularAnime(5),
  ]);

  const { season, year } = getCurrentSeason();

  const trendingListLd = itemListJsonLd({
    name: "Animes em Alta — AnimeInfoBR",
    description: "Os animes mais assistidos do momento",
    url: `${SITE_URL}/anime?sort=trending`,
    items: trending.slice(0, 10).map((a) => ({
      name: getDisplayTitle(a.title),
      url: `${SITE_URL}/anime/${createAnimeSlug(a.id, a.title)}`,
      image: a.coverImage.large ?? undefined,
    })),
  });

  return (
    <>
      <JsonLd data={websiteJsonLd(SITE_URL)} />
      <JsonLd data={trendingListLd} />
      {/* ── HERO ─────────────────────────────────── */}
      <section className="hero-bg py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            {SEASON_NAMES[season]} {year} • Temporada ao vivo
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-display text-white leading-tight tracking-tight">
            Descubra seu{" "}
            <span className="gradient-text">próximo anime</span>
            <br />
            em menos de 1 minuto
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl">
            Recomendações inteligentes, sem spoiler, em português. O guia brasileiro do universo anime.
          </p>

          <SearchBar />

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/descobrir"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-base"
            >
              🎯 Recomendador Inteligente
            </Link>
            <Link
              href="/calendario"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/8 border border-white/12 hover:border-white/25 text-white font-semibold text-base transition-all"
            >
              📅 Ver Calendário
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-12">
        {/* ── MOOD QUICK PICK ─────────────────────── */}
        <section>
          <SectionHeader
            title="O que você quer ver hoje?"
            subtitle="Clique no humor e veja recomendações na hora"
          />
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {MOODS.map((mood) => (
              <Link
                key={mood.genre}
                href={`/anime?genres=${mood.genre}`}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#0d1424] border border-white/8 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all group"
              >
                <span className="text-2xl">{mood.icon}</span>
                <span className="text-xs text-slate-400 group-hover:text-violet-300 font-medium transition-colors">
                  {mood.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── TRENDING ─────────────────────────────── */}
        {trending.length > 0 && (
          <section>
            <SectionHeader
              title="Em Alta Agora"
              subtitle="Os animes mais assistidos do momento"
              viewAllHref="/anime?sort=trending"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {trending.map((anime, i) => (
                <AnimeCard key={anime.id} anime={anime} priority={i < 6} />
              ))}
            </div>
          </section>
        )}

        {/* ── SEASON ───────────────────────────────── */}
        {seasonal.length > 0 && (
          <section>
            <SectionHeader
              title={`Temporada de ${SEASON_NAMES[season]} ${year}`}
              subtitle="Acompanhe os lançamentos desta temporada"
              viewAllHref="/calendario"
              viewAllLabel="Ver calendário"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {seasonal.map((anime, i) => (
                <AnimeCard key={anime.id} anime={anime} priority={i < 4} />
              ))}
            </div>
          </section>
        )}

        {/* ── RECOMMENDER CTA ─────────────────────── */}
        <section>
          <div className="relative overflow-hidden rounded-2xl p-8 md:p-12 bg-gradient-to-br from-violet-900/50 via-[#0d1424] to-blue-900/30 border border-violet-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-cyan-600/10" />
            <div className="relative max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-white mb-3">
                🎯 Não sabe o que assistir?
              </h2>
              <p className="text-slate-300 mb-6 text-lg">
                Responda 5 perguntas rápidas e receba recomendações personalizadas. Sem cadastro, sem spoilers.
              </p>
              <Link
                href="/descobrir"
                className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-base"
              >
                Descobrir meu próximo anime →
              </Link>
            </div>
          </div>
        </section>

        {/* ── POPULAR / RANKING PREVIEW ───────────── */}
        {popular.length > 0 && (
          <section>
            <SectionHeader
              title="🏆 Ranking AnimeInfoBR"
              subtitle="Os mais populares de todos os tempos"
              viewAllHref="/ranking"
              viewAllLabel="Ver ranking completo"
            />
            <div className="space-y-3">
              {popular.map((anime, i) => {
                const slug = createAnimeSlug(anime.id, anime.title);
                const title = getDisplayTitle(anime.title);
                const score = anime.averageScore
                  ? (anime.averageScore / 10).toFixed(1)
                  : null;
                return (
                  <Link
                    key={anime.id}
                    href={`/anime/${slug}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#0d1424] border border-white/8 hover:border-violet-500/30 transition-all group"
                  >
                    <span
                      className={`text-2xl font-black w-10 text-center shrink-0 ${
                        i === 0
                          ? "text-yellow-400"
                          : i === 1
                          ? "text-slate-300"
                          : i === 2
                          ? "text-orange-400"
                          : "text-slate-600"
                      }`}
                    >
                      #{i + 1}
                    </span>
                    {anime.coverImage.large && (
                      <Image
                        src={anime.coverImage.large}
                        alt={title}
                        width={48}
                        height={64}
                        className="rounded-lg object-cover shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold group-hover:text-violet-300 transition-colors line-clamp-1">
                        {title}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {anime.genres.slice(0, 3).map((g) => (
                          <Badge key={g} genre>{g}</Badge>
                        ))}
                      </div>
                    </div>
                    {score && (
                      <div className="shrink-0 flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-white font-bold">{score}</span>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ── GUIDES ───────────────────────────────── */}
        <section>
          <SectionHeader
            title="📚 Guias para Iniciantes"
            subtitle="Tudo o que você precisa saber para começar"
            viewAllHref="/guias"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GUIDES.slice(0, 3).map((guide) => (
              <Link
                key={guide.slug}
                href={`/guias/${guide.slug}`}
                className="p-5 rounded-xl bg-[#0d1424] border border-white/8 hover:border-violet-500/30 transition-all group"
              >
                <div className="text-3xl mb-3">{guide.icon}</div>
                <h3 className="text-white font-semibold group-hover:text-violet-300 transition-colors mb-1">
                  {guide.title}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2">{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── SIMILAR ANIMES CTA ──────────────────── */}
        <section>
          <SectionHeader
            title="🔍 Procurando algo parecido?"
            subtitle="Encontre animes similares ao seu favorito"
            viewAllHref="/parecidos"
          />
          <div className="flex flex-wrap gap-3">
            {[
              { slug: "20-naruto", label: "Naruto" },
              { slug: "21-one-piece", label: "One Piece" },
              { slug: "101922-demon-slayer", label: "Demon Slayer" },
              { slug: "108725-solo-leveling", label: "Solo Leveling" },
              { slug: "2904-death-note", label: "Death Note" },
              { slug: "11061-hunter-x-hunter", label: "Hunter x Hunter" },
            ].map((item) => (
              <Link
                key={item.slug}
                href={`/parecidos/${item.slug}`}
                className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:border-violet-500/40 hover:bg-violet-500/10 text-slate-300 hover:text-violet-300 text-sm font-medium transition-all"
              >
                Parecido com {item.label}
              </Link>
            ))}
          </div>
        </section>

        {/* ── QUIZ CTA ─────────────────────────────── */}
        <section>
          <div className="text-center py-10 px-6 rounded-2xl bg-[#0d1424] border border-white/8">
            <div className="text-5xl mb-4">🎌</div>
            <h2 className="text-2xl font-bold font-display text-white mb-2">
              Qual anime combina com você?
            </h2>
            <p className="text-slate-400 mb-6">
              Faça o quiz e descubra. Resultado compartilhável em 2 minutos.
            </p>
            <Link
              href="/quiz"
              className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-base"
            >
              Fazer o Quiz
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
