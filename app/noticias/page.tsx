import type { Metadata } from "next";
import Link from "next/link";
import { fetchAllNews, formatRelativeDate, type NewsArticle } from "@/lib/news/rss";

export const revalidate = 21600; // 6 horas

export const metadata: Metadata = {
  title: "Notícias de Anime e RPG",
  description: "Fique por dentro das últimas notícias do mundo dos animes, RPG e cultura otaku — atualizadas automaticamente todos os dias.",
};

const CURIOSIDADES = [
  { emoji: "🎌", text: "O anime mais antigo do mundo é 'Namakura Gatana', criado no Japão em 1917 — tem apenas 2 minutos." },
  { emoji: "🎙️", text: "Hayao Miyazaki do Studio Ghibli desenhava pessoalmente os storyboards de seus filmes quadro a quadro." },
  { emoji: "🐱", text: "A voz original de Pikachu (Ikue Otani) ainda dubla o personagem há mais de 25 anos ininterruptos." },
  { emoji: "📺", text: "Dragon Ball Z tem 291 episódios, mas estima-se que metade seja cenas de power-up e flashbacks." },
  { emoji: "⚔️", text: "O RPG de mesa 'Dungeons & Dragons' foi criado em 1974 por Gary Gygax e Dave Arneson. A palavra 'dungeon' não existia no inglês antes." },
  { emoji: "🌐", text: "O termo 'isekai' (異世界) literalmente significa 'outro mundo' em japonês. O gênero existe desde os anos 80 com 'Inuyasha'." },
  { emoji: "🎲", text: "O d20 (dado de 20 lados) tem 2.400 anos de história — foi inventado pelos egípcios no século IV a.C." },
  { emoji: "💙", text: "Re:Zero foi originalmente publicado no Shōsetsuka ni Narō, um site de fanfics gratuito japonês." },
  { emoji: "🏯", text: "O Studio Ghibli guarda um parque temático em Nagoya, Japão, com réplicas perfeitas das casas e cenários de seus filmes." },
  { emoji: "🐉", text: "Em Dungeons & Dragons, o dragão vermelho é o mais poderoso dos dragões cromáticos — e o mais famoso do jogo desde 1974." },
  { emoji: "📚", text: "One Piece é o mangá mais vendido de todos os tempos, com mais de 530 milhões de volumes." },
  { emoji: "🔮", text: "O termo 'avatar' como identidade virtual vem do sânscrito 'avatāra', que significa 'descida de um deus à Terra'." },
  { emoji: "🌸", text: "A palavra 'otaku' era pejorativa nos anos 80 no Japão. Foi reapropriada pela cultura pop global como orgulho." },
  { emoji: "🎮", text: "O jogo de cartas Magic: The Gathering, lançado em 1993, inspirou diretamente a criação do TCG de Pokémon." },
  { emoji: "🧙", text: "J.R.R. Tolkien inventou 3 línguas completas (Quenya, Sindarin e Khuzdul) antes de escrever O Senhor dos Anéis." },
  { emoji: "🌊", text: "A trilha sonora de One Piece tem mais de 400 faixas originais compostas ao longo de 25 anos." },
  { emoji: "⚡", text: "Fullmetal Alchemist: Brotherhood tem 64 episódios e é frequentemente citado como o anime mais bem avaliado do MyAnimeList." },
  { emoji: "🏰", text: "O maior LARP (RPG ao vivo) do mundo acontece na Alemanha com mais de 7.000 participantes por edição." },
  { emoji: "🎴", text: "Kimetsu no Yaiba (Demon Slayer) quebrou o recorde de mangá mais vendido em um único ano, ultrapassando 150 milhões de cópias em 2020." },
  { emoji: "🌌", text: "Neon Genesis Evangelion foi criado com orçamento reduzido. A icônica cena final com slides foi improvisada por falta de verba." },
];

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-[#0d1424] border border-white/8 rounded-2xl overflow-hidden hover:border-violet-500/40 transition-all hover:-translate-y-0.5"
    >
      {article.imageUrl && (
        <div className="relative w-full aspect-video overflow-hidden bg-slate-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${
            article.category === "anime" ? "bg-violet-900/40 text-violet-300 border border-violet-500/30"
            : article.category === "rpg" ? "bg-amber-900/30 text-amber-300 border border-amber-500/30"
            : "bg-slate-700/60 text-slate-400 border border-slate-600/30"
          }`}>
            {article.category === "anime" ? "🎌 Anime" : article.category === "rpg" ? "🎲 RPG" : "🌐 Cultura"}
          </span>
          {article.sourceLang === "en" && (
            <span className="text-[10px] text-slate-500">🇺🇸 EN</span>
          )}
          <span className="text-[10px] text-slate-500 ml-auto">{formatRelativeDate(article.isoDate)}</span>
        </div>
        <h3 className="text-white font-bold text-sm leading-snug group-hover:text-violet-300 transition-colors line-clamp-3 flex-1">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-slate-500 text-xs mt-2 line-clamp-2">{article.description}</p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-600">{article.source}</span>
          <span className="text-xs text-violet-400 group-hover:text-violet-300 transition-colors">Ler →</span>
        </div>
      </div>
    </a>
  );
}

function CuriosidadeCard({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="bg-[#0d1424] border border-white/8 rounded-xl p-4 flex gap-3 items-start hover:border-cyan-500/30 transition-colors">
      <span className="text-2xl shrink-0">{emoji}</span>
      <p className="text-slate-300 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

export default async function NoticiasPage() {
  const articles = await fetchAllNews().catch(() => [] as NewsArticle[]);
  const ptArticles = articles.filter(a => a.sourceLang === "pt");
  const intlArticles = articles.filter(a => a.sourceLang === "en");

  const shuffledCuriosidades = [...CURIOSIDADES].sort(() => Math.random() - 0.5).slice(0, 9);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-violet-600/20 border border-violet-500/30 rounded-full px-4 py-1.5 text-violet-300 text-xs font-bold uppercase tracking-wider mb-4">
          🗞️ Atualizado automaticamente
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Notícias do Universo Otaku</h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          Últimas notícias de anime, RPG e cultura nerd — do Brasil e do mundo. Atualizado a cada 6 horas.
        </p>
      </div>

      {/* Últimas notícias em destaque */}
      {articles.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-violet-500 rounded-full inline-block"></span>
            Em destaque
          </h2>
          {/* Card grande para a notícia principal */}
          {articles[0] && (
            <a
              href={articles[0].link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-[#0d1424] border border-white/8 rounded-2xl overflow-hidden hover:border-violet-500/40 transition-all mb-6"
            >
              <div className="flex flex-col sm:flex-row">
                {articles[0].imageUrl && (
                  <div className="relative sm:w-64 aspect-video sm:aspect-auto overflow-hidden bg-slate-900 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={articles[0].imageUrl} alt={articles[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                )}
                <div className="p-5 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide bg-violet-900/40 text-violet-300 border border-violet-500/30">
                      🎌 Destaque
                    </span>
                    <span className="text-xs text-slate-500">{formatRelativeDate(articles[0].isoDate)}</span>
                  </div>
                  <h3 className="text-white font-black text-lg sm:text-xl leading-tight group-hover:text-violet-300 transition-colors mb-2">
                    {articles[0].title}
                  </h3>
                  {articles[0].description && (
                    <p className="text-slate-400 text-sm line-clamp-2">{articles[0].description}</p>
                  )}
                  <div className="mt-3 text-xs text-slate-500">{articles[0].source}</div>
                </div>
              </div>
            </a>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.slice(1, 7).map(a => <NewsCard key={a.id} article={a} />)}
          </div>
        </section>
      )}

      {/* Notícias nacionais */}
      {ptArticles.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span>
            🇧🇷 Brasil
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ptArticles.slice(0, 9).map(a => <NewsCard key={a.id} article={a} />)}
          </div>
        </section>
      )}

      {/* Notícias internacionais */}
      {intlArticles.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span>
            🌐 Mundo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {intlArticles.slice(0, 9).map(a => <NewsCard key={a.id} article={a} />)}
          </div>
        </section>
      )}

      {/* Todas as notícias */}
      {articles.length > 7 && (
        <section>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-slate-500 rounded-full inline-block"></span>
            Todas as notícias
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {articles.slice(7).map(a => <NewsCard key={a.id} article={a} />)}
          </div>
        </section>
      )}

      {/* Nenhuma notícia */}
      {articles.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📡</div>
          <p className="text-slate-400 font-medium">Carregando notícias do mundo otaku...</p>
          <p className="text-slate-600 text-sm mt-2">Verifique sua conexão ou tente novamente em alguns instantes.</p>
        </div>
      )}

      {/* ── SEÇÃO: CURIOSIDADES ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-cyan-500 rounded-full inline-block"></span>
            💡 Curiosidades do Universo Otaku
          </h2>
          <span className="text-xs text-slate-500">seleção aleatória</span>
        </div>
        <p className="text-slate-500 text-sm mb-5">Fatos surpreendentes sobre anime, mangá, RPG e cultura japonesa.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {shuffledCuriosidades.map((c, i) => <CuriosidadeCard key={i} emoji={c.emoji} text={c.text} />)}
        </div>
      </section>

      {/* Footer da página */}
      <div className="border-t border-white/8 pt-6 text-center">
        <p className="text-slate-600 text-xs">
          Notícias coletadas automaticamente de fontes públicas via RSS. AnimeInfoBR não produz ou edita o conteúdo das notícias.
        </p>
        <p className="text-slate-700 text-xs mt-1">
          Atualização automática a cada 6 horas · <Link href="/" className="text-violet-700 hover:text-violet-500">Voltar ao início</Link>
        </p>
      </div>
    </div>
  );
}
