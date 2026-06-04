import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre o AnimeInfoBR",
  description:
    "Conheça o AnimeInfoBR, o portal brasileiro de descoberta e recomendação de animes. Nossa missão, como funciona e por que criamos este projeto.",
};

export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🎌</div>
        <h1 className="text-3xl md:text-4xl font-black font-display text-white mb-4">
          Sobre o <span className="gradient-text">AnimeInfoBR</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          O guia brasileiro de animes, criado para ajudar você a descobrir, entender e acompanhar o universo dos animes em português.
        </p>
      </div>

      <div className="space-y-8">
        {/* Missão */}
        <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            🎯 Nossa Missão
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            O AnimeInfoBR nasceu com uma missão simples: <strong className="text-white">ajudar o público brasileiro a descobrir seu próximo anime em menos de 1 minuto</strong>, sem spoilers e com recomendações personalizadas em português.
          </p>
          <p className="text-slate-300 leading-relaxed">
            O Brasil é um dos maiores mercados de anime do mundo, mas faltava um portal em português que reunisse informações completas, recomendações inteligentes e guias acessíveis para todos os níveis: do iniciante total ao otaku experiente.
          </p>
        </div>

        {/* O que oferecemos */}
        <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            ✨ O que oferecemos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "🔍", title: "Busca inteligente", desc: "Encontre qualquer anime com filtros por gênero, formato e status" },
              { icon: "🎯", title: "Recomendador", desc: "Responda 5 perguntas e receba sugestões personalizadas" },
              { icon: "📅", title: "Calendário", desc: "Acompanhe os lançamentos da temporada atual" },
              { icon: "🔗", title: "Animes parecidos", desc: "Encontre títulos similares ao seu favorito" },
              { icon: "📚", title: "Guias em português", desc: "Ordem de franquias, explicações de gêneros e listas" },
              { icon: "🏆", title: "Ranking BR", desc: "Os animes mais populares entre os brasileiros" },
              { icon: "🎌", title: "Quiz", desc: "Descubra qual anime combina com sua personalidade" },
              { icon: "✅", title: "100% legal", desc: "Apenas plataformas oficiais. Zero pirataria" },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-4 rounded-xl bg-white/5 border border-white/8">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Como funciona */}
        <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-4">🛠️ Como funciona</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            O AnimeInfoBR utiliza a <strong className="text-white">AniList API</strong>, uma das maiores bases de dados de anime do mundo, para fornecer informações atualizadas sobre títulos, personagens, temporadas e recomendações.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            Todos os dados de anime (títulos, sinopses, imagens, notas) são fornecidos pela AniList e pertencem aos seus respectivos criadores e distribuidoras.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Os guias, textos editoriais e recomendações contextuais são produzidos pela equipe do AnimeInfoBR exclusivamente em português brasileiro.
          </p>
        </div>

        {/* Compromisso anti-pirataria */}
        <div className="bg-emerald-900/20 border border-emerald-800/30 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-emerald-400 mb-4">✅ Compromisso com o conteúdo legal</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            O AnimeInfoBR é um portal de <strong className="text-white">informações e recomendações</strong>. Não hospedamos, distribuímos nem linkamos episódios de anime por meios não autorizados.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Sempre indicamos plataformas legais como Crunchyroll, Netflix, Amazon Prime Video e outras para assistir anime de forma legal, apoiando os criadores e a indústria.
          </p>
        </div>

        {/* Contato */}
        <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-6 md:p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-3">📬 Fale Conosco</h2>
          <p className="text-slate-400 mb-4">Sugestões, parcerias ou dúvidas?</p>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 px-6 py-3 btn-primary text-white font-semibold rounded-xl"
          >
            Entrar em contato
          </Link>
        </div>
      </div>
    </div>
  );
}
