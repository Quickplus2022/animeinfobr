import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Glossário do Mundo Anime | AnimeInfoBR",
  description:
    "Guia completo de termos do universo anime: formatos (TV, OVA, ONA, Movie), gêneros, termos japoneses, jargões da comunidade e muito mais.",
  keywords: ["glossário anime", "termos anime", "o que é OVA", "o que é ONA", "tipos de anime", "jargão otaku"],
};

const SECTIONS = [
  {
    id: "formatos",
    title: "📺 Formatos e Tipos",
    icon: "📺",
    desc: "O que significa cada formato de anime",
    terms: [
      { term: "TV", reading: "", def: "Série exibida em TV aberta ou por assinatura no Japão. Geralmente tem episódios de 20-24 minutos e segue um cronograma semanal. É o formato mais comum: Attack on Titan, Demon Slayer e Naruto são séries TV." },
      { term: "Movie", reading: "Filme", def: "Longa-metragem animado. Pode ser uma história independente ou uma continuação de uma série. Exemplos: Your Name (Kimi no Na wa), Dragon Ball Super: Broly, Demon Slayer: Mugen Train." },
      { term: "OVA", reading: "Original Video Animation", def: "Episódio ou série lançada diretamente em mídia física (DVD/Blu-ray), sem passar pela TV. Geralmente tem orçamento maior, episódios especiais ou histórias paralelas. Não seguem cronograma fixo." },
      { term: "ONA", reading: "Original Net Animation", def: "Anime lançado diretamente em plataformas de streaming (como Netflix ou Crunchyroll), sem exibição prévia na TV. Cyberpunk: Edgerunners e Arcane são exemplos de ONAs." },
      { term: "Special", reading: "Especial", def: "Episódio extra fora da numeração principal. Geralmente são episódios comemorativos, de Natal, recaps ou histórias curtas de personagens. Opcionais na maioria dos casos." },
      { term: "Short", reading: "Curto", def: "Episódios de menos de 10 minutos, às vezes apenas 2-3 minutos. Muito usados em animes com conceitos simples ou experimentais. Aggretsuko começou como um Short." },
      { term: "Music", reading: "Clipe Musical", def: "Vídeo animado de uma música, sem narrativa própria. Raramente aparece em listas de anime: é basicamente um videoclipe animado." },
      { term: "BD / Blu-ray", reading: "Versão Blu-ray", def: "Versão relançada com melhorias de animação, cenas estendidas ou cenas cortadas da exibição TV. Animes como Attack on Titan e Evangelion têm diferenças notáveis entre TV e BD." },
    ],
  },
  {
    id: "demograficos",
    title: "👥 Públicos-Alvo (Demográficos)",
    icon: "👥",
    desc: "Como a indústria japonesa categoriza anime por público",
    terms: [
      { term: "Shounen", reading: "少年", def: "Voltado para meninos jovens (12-18 anos). Foco em ação, amizade, superação e batalhas. Os maiores títulos do mundo, Naruto, Dragon Ball, One Piece, Demon Slayer, são shounen. Não significa que adultos não possam (e devam) assistir." },
      { term: "Shoujo", reading: "少女", def: "Voltado para meninas jovens (12-18 anos). Prioriza romance, emoções e relacionamentos interpessoais. Exemplos: Sailor Moon, Cardcaptor Sakura, Fruits Basket, Your Lie in April." },
      { term: "Seinen", reading: "青年", def: "Voltado para homens adultos (18+). Temas mais complexos, maduros e filosóficos. Pode ter violência, mortes de protagonistas e finais trágicos. Exemplos: Berserk, Vinland Saga, Monster, Parasyte." },
      { term: "Josei", reading: "女性", def: "Voltado para mulheres adultas (18+). Romance mais realista e maduro do que o shoujo. Exemplos: Nana, Paradise Kiss, Chihayafuru, Sekaiichi Hatsukoi." },
      { term: "Kodomomuke", reading: "子ども向け", def: "Voltado para crianças pequenas. Histórias simples, moralmente claras e sem violência. Exemplos: Doraemon, Pokémon (original), Chi's Sweet Home." },
    ],
  },
  {
    id: "generos",
    title: "🎭 Gêneros e Subgêneros",
    icon: "🎭",
    desc: "Os principais gêneros narrativos do anime",
    terms: [
      { term: "Isekai", reading: "異世界", def: "\"Outro mundo\". Protagonista transportado para um mundo diferente, geralmente de fantasia com elementos de RPG. O gênero mais popular dos últimos anos. Exemplos: Re:Zero, Mushoku Tensei, KonoSuba, Solo Leveling." },
      { term: "Mecha", reading: "メカ", def: "Robôs gigantes pilotados por humanos. Um dos gêneros mais tradicionais do anime. Divide-se em Super Robot (fantasia) e Real Robot (realismo). Exemplos: Evangelion, Gundam, Gurren Lagann, Code Geass." },
      { term: "Slice of Life", reading: "Fatia de vida", def: "Retrata o cotidiano sem grandes aventuras: escola, amizades, trabalho, família. Emocionante por sua autenticidade. Exemplos: Clannad, Anohana, Barakamon, Spy x Family." },
      { term: "Ecchi", reading: "エッチ", def: "Conteúdo sexual sugestivo mas não explícito. Fanservice elevado. Classificação acima de 14 anos. Categoria presente em muitos subgêneros." },
      { term: "Harem", reading: "", def: "Protagonista cercado por vários personagens (geralmente do sexo oposto) que têm interesse romântico nele. Muito comum em isekai. Exemplos: The Familiar of Zero, Sword Art Online." },
      { term: "Iyashikei", reading: "癒し系", def: "\"Que cura\". Sub-gênero de slice of life extremamente relaxante, sem conflito dramático. Existe para tranquilizar o espectador. Exemplos: Non Non Biyori, Mushishi, Aria." },
      { term: "Psychological", reading: "Psicológico", def: "Explora a mente humana, dilemas morais, realidades distorcidas. Exemplos: Death Note, Neon Genesis Evangelion, Monster, Steins;Gate, Serial Experiments Lain." },
      { term: "Ero-guro", reading: "", def: "Gênero extremo com violência gráfica e erotismo. Raramente adaptado para anime mainstream. Conteúdo adulto restrito." },
      { term: "Sports", reading: "Esportes", def: "Foco em modalidades esportivas com drama competitivo. Exemplos: Haikyuu!! (vôlei), Slam Dunk (basquete), Yuri on Ice (patinação), Kuroko no Basket." },
      { term: "Romance", reading: "", def: "Foco em relacionamentos afetivos. Muito presente em shoujo e josei. Exemplos: Toradora, Horimiya, Kaguya-sama, Clannad." },
    ],
  },
  {
    id: "producao",
    title: "🎬 Produção e Indústria",
    icon: "🎬",
    desc: "Termos do processo de criação e da indústria japonesa",
    terms: [
      { term: "Mangá", reading: "漫画", def: "Quadrinhos japoneses, a principal fonte de adaptação para anime. Lidos da direita para esquerda. Quando uma série fica popular, frequentemente ganha adaptação anime." },
      { term: "Light Novel", reading: "LN", def: "Novel japonesa ilustrada, com capítulos curtos e leitura leve. Muitos animes populares adaptam LNs: SAO, Re:Zero, Overlord, Mushoku Tensei, Slime Isekai." },
      { term: "Manhwa", reading: "만화", def: "Quadrinhos coreanos, geralmente em formato vertical colorido (webtoon). Solo Leveling e Omniscient Reader's Viewpoint são manhwas. Crescente fonte de adaptações anime." },
      { term: "Mangá Original", reading: "", def: "Anime sem source material (mangá ou LN). Roteiro criado diretamente para a animação. Exemplos: Code Geass, Gurren Lagann, Angel Beats." },
      { term: "Seiyuu", reading: "声優", def: "Dublador japonês de anime. Os seiyuu são celebridades no Japão: Mamoru Miyano (Light Yagami em Death Note), Yuki Kaji (Eren em AoT) são alguns dos mais famosos." },
      { term: "Mangaka", reading: "漫画家", def: "Autor de mangá. Akira Toriyama (Dragon Ball), Masashi Kishimoto (Naruto), Hajime Isayama (AoT) são mangakas conhecidos mundialmente." },
      { term: "Studio", reading: "Estúdio", def: "Empresa responsável pela animação. Os mais conhecidos: MAPPA (AoT final, JJK), Ufotable (Demon Slayer), Wit Studio (AoT 1-3), Kyoto Animation (Violet Evergarden, K-On), Madhouse (Death Note, Hunter x Hunter)." },
      { term: "Cours", reading: "クール", def: "Um bloco de 12-13 episódios correspondente a uma temporada do ano (3 meses). Uma série de 24 episódios tem 2 cours. A temporada de anime é dividida em: Inverno (jan), Primavera (abr), Verão (jul), Outono (out)." },
      { term: "Canon", reading: "", def: "Conteúdo oficial do autor/fonte original. Fillers não são canon. O mangá original é sempre a referência canon de uma franquia." },
      { term: "Filler", reading: "", def: "Episódio não baseado no material original (mangá/LN). Criado para o anime não ultrapassar o mangá. Naruto tem ~200 episódios filler; One Piece, dezenas. Podem ser pulados sem perda da história principal." },
    ],
  },
  {
    id: "narrativa",
    title: "📖 Termos de Narrativa",
    icon: "📖",
    desc: "Vocabulário sobre estrutura das histórias",
    terms: [
      { term: "Arc / Arco", reading: "", def: "Parte da história com começo, meio e fim próprios dentro de uma série maior. Demon Slayer tem o Arco do Trem Mugen, o Arco do Distrito do Entretenimento, etc." },
      { term: "Adaptation", reading: "Adaptação", def: "Quando uma obra (mangá, LN, game) é adaptada para anime. A qualidade varia muito: algumas adaptações são superiores ao original (FMA:B), outras decepcionam os fãs." },
      { term: "Power Scaling", reading: "", def: "Discussão sobre o nível de poder comparativo entre personagens. \"Quem venceria, Goku ou Saitama?\" é power scaling. Grande parte do debate da comunidade gira em torno disso." },
      { term: "Plot Armor", reading: "Armadura de Enredo", def: "Quando um personagem sobrevive ou vence situações impossíveis por ser o protagonista, sem justificativa narrativa adequada. Naruto e Goku são famosos por isso." },
      { term: "Deus ex Machina", reading: "", def: "Resolução abrupta e implausível de uma situação impossível. Considerado má escrita pela maioria dos fãs. \"De repente apareceu um poder novo.\"" },
      { term: "Nakama", reading: "仲間", def: "\"Companheiros de equipe\". O poder da amizade/lealdade entre personagens, elemento central do shounen. \"O nakama me deu força\" é um tropo famoso (e amado) do gênero." },
      { term: "Timeskip", reading: "Salto temporal", def: "Quando a história avança anos no tempo de uma só vez. Attack on Titan faz um timeskip de 4 anos na 4ª temporada. Comum para mostrar evolução dos personagens." },
      { term: "Redemption Arc", reading: "Arco de Redenção", def: "Quando um personagem vilão ou moralmente questionável muda de lado e busca fazer o bem. Zuko em Avatar (não é anime, mas exemplifica bem) é o padrão-ouro. Vegeta em Dragon Ball é um exemplo clássico." },
    ],
  },
  {
    id: "comunidade",
    title: "🌐 Cultura e Comunidade",
    icon: "🌐",
    desc: "Termos usados pela comunidade otaku no mundo todo",
    terms: [
      { term: "Otaku", reading: "おたく", def: "No Brasil: fã apaixonado por anime/mangá. No Japão o termo tem conotação levemente negativa (pessoa obcecada que não sai de casa). No Ocidente virou positivo e é usado com orgulho." },
      { term: "Waifu", reading: "", def: "Personagem feminino pelo qual o fã tem apego extremo, como se fosse uma \"esposa\" imaginária. Termo bem-humorado e onipresente na comunidade. \"Minha waifu é melhor que a sua.\"" },
      { term: "Husbando", reading: "", def: "Equivalente masculino de waifu. Personagem masculino de anime pelo qual alguém tem grande apego afetivo." },
      { term: "Ship", reading: "", def: "Querer que dois personagens fiquem juntos romanticamente. \"Eu shiopo Naruto e Hinata.\" Vem de \"relationship\". Shippers às vezes entram em conflito sobre casais preferidos." },
      { term: "Canon Ship", reading: "", def: "Par romântico que se concretizou oficialmente na obra. Naruto e Hinata são canon. Sasuke e Sakura são canon. Muitos ships adorados pela fandom não são canon." },
      { term: "Spoiler", reading: "", def: "Revelar elementos importantes da história antes que alguém tenha assistido. Crime gravíssimo na comunidade. \"Quem morre em AoT\" é o spoiler mais temido." },
      { term: "AMV", reading: "Anime Music Video", def: "Compilação de cenas de anime editada com uma música. Um dos formatos de conteúdo mais antigos da comunidade online." },
      { term: "Fanfic", reading: "Fan Fiction", def: "Histórias escritas por fãs usando os personagens e universo de uma obra. Existem desde histórias que continuam o canon até universos alternativos completamente diferentes." },
      { term: "Cosplay", reading: "コスプレ", def: "Fantasiar-se como um personagem de anime/mangá/game. De \"costume play\". Grande parte das convenções de anime giram em torno de cosplay." },
      { term: "Cour", reading: "", def: "Ver \"Cours\" na seção de produção." },
      { term: "GOAT", reading: "Greatest of All Time", def: "\"O melhor de todos os tempos\". Usado para elogiar uma obra ou personagem. \"FMA:B é o GOAT dos animes.\"" },
    ],
  },
  {
    id: "streaming",
    title: "📡 Streaming e Distribuição",
    icon: "📡",
    desc: "Onde e como assistir anime",
    terms: [
      { term: "Simulcast", reading: "", def: "Transmissão simultânea: quando o episódio é disponibilizado no streaming internacional no mesmo dia ou horas após a exibição no Japão. Crunchyroll e Netflix fazem simulcast de muitos títulos." },
      { term: "Dub", reading: "Dublagem", def: "Versão com áudio em outro idioma (no Brasil, em português). A dublagem BR de anime tem melhorado muito: Crunchyroll e Netflix têm catálogos extensos dublados." },
      { term: "Sub", reading: "Legendado", def: "Versão em japonês com legendas. Muitos fãs preferem o sub por preservar as nuances das performances dos seiyuu. Geralmente disponível antes do dub." },
      { term: "Fansub", reading: "", def: "Legenda feita por fãs voluntários, antes das plataformas oficiais chegarem ao Brasil. Ainda existe para títulos sem distribuição oficial em português." },
      { term: "Pirataria / Raw", reading: "", def: "Raw é o anime em japonês sem legendas, distribuído sem autorização. O AnimeInfoBR não apoia pirataria: indicamos sempre plataformas legais como Crunchyroll, Netflix, Prime Video e Funimation." },
      { term: "Crunchyroll", reading: "", def: "Maior plataforma de streaming de anime do mundo. Tem o maior catálogo com simulcast. Disponível no Brasil com planos pagos (e gratuito com anúncios)." },
    ],
  },
  {
    id: "sistemas",
    title: "⚡ Sistemas de Poder",
    icon: "⚡",
    desc: "Sistemas de magia, habilidades e poder dos universos anime",
    terms: [
      { term: "Chakra", reading: "チャクラ", def: "Sistema de energia do universo Naruto. Combina energia física e espiritual. Permite a criação de Jutsus (técnicas ninja). Cada pessoa nasce com uma quantidade diferente de chakra." },
      { term: "Haki", reading: "覇気", def: "Sistema de poder de One Piece. Divide-se em Observation Haki (percepção), Armament Haki (armadura/força) e Conqueror's Haki (força de vontade avassaladora, raridade extrema)." },
      { term: "Nen", reading: "念", def: "Sistema de energia vital de Hunter x Hunter. Um dos sistemas de poder mais elaborados do anime, com 6 tipos (Enhancer, Emitter, Transmuter, Conjurer, Manipulator, Specialist) e técnicas complexas." },
      { term: "Quirk", reading: "個性 / Kosei", def: "Superpoder inato de My Hero Academia. 80% da humanidade tem quirks. Alguns são simples (criar chamas), outros absurdamente complexos (rewind, alterar porcentagem do corpo)." },
      { term: "Cursed Energy", reading: "呪力 / Jujutsu", def: "Energia amaldiçoada de Jujutsu Kaisen. Gerada por emoções negativas humanas. Base de todas as técnicas de maldição. Gojo Satoru tem o maior domínio desse poder na série." },
      { term: "Alchemy", reading: "錬金術 / Renkin", def: "Sistema de Fullmetal Alchemist. \"Equivalência: para criar algo, algo de igual valor deve ser perdido.\" Baseia-se em entender a composição da matéria e reorganizá-la." },
      { term: "Demon Art", reading: "血鬼術 / Ketsuijutsu", def: "Habilidades únicas dos demônios em Demon Slayer. Cada demônio sênior tem uma Blood Demon Art personalizada. Os Hashira combatem com Estilos de Respiração (Breathing Styles)." },
      { term: "Breathing Style", reading: "全集中の呼吸", def: "Técnicas dos caçadores de demônios em Demon Slayer. Baseadas em concentração total da respiração, aumentam força e velocidade. Existem vários estilos: Água, Fogo, Trovão, Vento, Pedra, Sol (o original)." },
    ],
  },
];

export default function GlossarioPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">📚</span>
          <div>
            <h1 className="text-3xl md:text-4xl font-black font-display text-white">
              Glossário do Mundo Anime
            </h1>
            <p className="text-slate-400 mt-1">
              Todos os termos, formatos, gêneros e jargões da cultura otaku, em português, com explicações completas.
            </p>
          </div>
        </div>

        {/* Quick index */}
        <div className="flex flex-wrap gap-2 mt-6">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-1.5 rounded-xl border border-white/12 bg-white/5 hover:bg-violet-500/15 hover:border-violet-500/40 text-slate-400 hover:text-violet-300 text-xs font-medium transition-all"
            >
              {s.icon} {s.title.replace(/^[^\s]+ /, "")}
            </a>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-12">
        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id}>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-black font-display text-white">{section.title}</h2>
            </div>
            <p className="text-slate-500 text-sm mb-5">{section.desc}</p>

            <div className="space-y-3">
              {section.terms.map((item) => (
                <div
                  key={item.term}
                  className="group flex gap-4 p-4 rounded-xl bg-[#0d1424] border border-white/8 hover:border-violet-500/25 transition-all"
                >
                  <div className="shrink-0 w-32 sm:w-40">
                    <span className="text-white font-bold text-sm">{item.term}</span>
                    {item.reading && (
                      <p className="text-slate-500 text-xs mt-0.5">{item.reading}</p>
                    )}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed flex-1">{item.def}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-br from-violet-900/30 to-[#0d1424] border border-violet-500/20">
        <h3 className="text-xl font-bold text-white mb-2">Faltou algum termo?</h3>
        <p className="text-slate-400 text-sm mb-4">
          O glossário está sempre crescendo. Sugira termos pelo contato.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contato" className="px-5 py-2.5 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-500 transition-colors">
            Sugerir termo
          </Link>
          <Link href="/guias" className="px-5 py-2.5 rounded-xl border border-white/15 text-slate-300 font-semibold text-sm hover:bg-white/5 transition-colors">
            Ver Guias
          </Link>
        </div>
      </div>
    </div>
  );
}
