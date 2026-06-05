import type { AniListMedia } from "@/lib/anilist/services";

interface Props {
  anime: AniListMedia;
}

export default function AnimeCuriosities({ anime }: Props) {
  const facts: { icon: string; text: string }[] = [];

  const score = anime.averageScore ? (anime.averageScore / 10).toFixed(1) : null;
  if (score && Number(score) >= 8.5) {
    facts.push({ icon: "⭐", text: `Com nota ${score}/10, está entre os animes mais bem avaliados de todos os tempos.` });
  }

  if (anime.popularity && anime.popularity <= 100) {
    facts.push({ icon: "🏆", text: `Está no top ${anime.popularity} dos animes mais populares do mundo segundo o AniList.` });
  } else if (anime.popularity && anime.popularity <= 500) {
    facts.push({ icon: "📈", text: `Ocupa a posição #${anime.popularity.toLocaleString("pt-BR")} em popularidade global.` });
  }

  const studio = anime.studios?.nodes?.[0];
  if (studio) {
    facts.push({ icon: "🎬", text: `Produzido pelo estúdio ${studio.name}, responsável por outras obras icônicas do anime.` });
  }

  if (anime.episodes && anime.episodes >= 100) {
    facts.push({ icon: "📺", text: `Com ${anime.episodes} episódios, é considerado um anime longo. Maratonar levaria mais de ${Math.round(anime.episodes * (anime.duration || 24) / 60)} horas.` });
  } else if (anime.episodes && anime.episodes <= 13) {
    facts.push({ icon: "⚡", text: `É um anime curto com apenas ${anime.episodes} episódios, perfeito para maratonar em um final de semana.` });
  }

  if (anime.duration) {
    const totalMin = (anime.episodes || 1) * anime.duration;
    if (totalMin >= 60) {
      facts.push({ icon: "⏱", text: `Assistir todos os episódios leva aproximadamente ${Math.round(totalMin / 60)} horas.` });
    }
  }

  if (anime.characters?.nodes && anime.characters.nodes.length > 0) {
    const total = anime.characters.nodes.length;
    facts.push({ icon: "👥", text: `O elenco conta com pelo menos ${total} personagens com vozes próprias cadastrados no AniList.` });
  }

  if (anime.season && anime.seasonYear) {
    const seasons: Record<string, string> = { WINTER: "Inverno", SPRING: "Primavera", SUMMER: "Verão", FALL: "Outono" };
    facts.push({ icon: "📅", text: `Estreou na temporada de ${seasons[anime.season] || anime.season} de ${anime.seasonYear}.` });
  }

  const formats: Record<string, string> = {
    OVA: "É um OVA (Original Video Animation), lançado direto em mídia física sem passar pela TV.",
    ONA: "É um ONA (Original Net Animation), lançado diretamente em plataformas de streaming.",
    MOVIE: "É um filme de anime, com produção cinematográfica.",
    SPECIAL: "É um especial, geralmente um episódio extra fora da temporada principal.",
  };
  if (anime.format && formats[anime.format]) {
    facts.push({ icon: "🎞", text: formats[anime.format] });
  }

  if (anime.genres?.includes("Psychological")) {
    facts.push({ icon: "🧠", text: "Classificado como anime psicológico, explora temas complexos da mente humana." });
  }
  if (anime.genres?.includes("Mecha")) {
    facts.push({ icon: "🤖", text: "Pertence ao gênero Mecha, um dos mais tradicionais e influentes na história do anime." });
  }
  if (anime.genres?.includes("Isekai")) {
    facts.push({ icon: "🌍", text: "É um isekai — o protagonista é transportado para outro mundo. Gênero em alta desde os anos 2010." });
  }
  if (anime.genres?.includes("Sports")) {
    facts.push({ icon: "🏅", text: "É um anime esportivo. Este gênero é famoso por criar fãs de esportes reais entre quem não os acompanhava." });
  }

  if (anime.trailer?.site === "youtube") {
    facts.push({ icon: "▶️", text: "Possui trailer oficial disponível no YouTube." });
  }

  if (facts.length === 0) {
    facts.push({ icon: "📌", text: "Este anime ainda não possui curiosidades cadastradas. Em breve teremos mais informações!" });
  }

  const shown = facts.slice(0, 6);

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">🔍 Curiosidades</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {shown.map((fact, i) => (
          <div key={i} className="flex gap-3 p-4 rounded-xl bg-[#0d1424] border border-white/8 hover:border-violet-500/20 transition-colors">
            <span className="text-xl shrink-0">{fact.icon}</span>
            <p className="text-slate-300 text-sm leading-relaxed">{fact.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
