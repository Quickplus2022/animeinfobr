import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Omniscient Reader's Viewpoint — O Guia Definitivo | AnimeInfoBR",
  description:
    "Guia completo de Omniscient Reader's Viewpoint (ORV): história, personagens, sistema de poderes, constelações, onde ler e por que é uma obra-prima.",
  keywords: [
    "omniscient reader viewpoint",
    "ponto de vista do leitor onisciente",
    "ORV manhwa",
    "Kim Dokja",
    "Yoo Joonghyuk",
    "manhwa coreano",
    "web novel coreana",
  ],
  openGraph: {
    title: "Omniscient Reader's Viewpoint — Guia Definitivo",
    description:
      "Tudo sobre ORV: personagens, sistema de poderes, constelações e por que é considerado uma obra-prima.",
    type: "article",
  },
};

const CHARACTERS = [
  {
    name: "Kim Dokja",
    korean: "김독자",
    role: "Protagonista",
    color: "from-violet-600 to-indigo-700",
    badge: "Leitor Onisciente",
    badgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    emoji: "📖",
    description:
      "Funcionário comum que é o único leitor a terminar o web novel 'Three Ways to Survive the Apocalypse'. Usa seu conhecimento único para sobreviver e mudar o destino da história.",
    traits: ["Calculista", "Sacrificial", "Solitário", "Estrategista"],
    power: "Conhecimento absoluto do enredo + Companhia do Rei",
    quote: "\"Eu serei o único leitor desta história.\"",
  },
  {
    name: "Yoo Joonghyuk",
    korean: "유중혁",
    role: "Protagonista do Novel (dentro do novel)",
    color: "from-blue-600 to-cyan-700",
    badge: "Regressor Supremo",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    emoji: "⚔️",
    description:
      "O protagonista do web novel que se tornou realidade. Sobreviveu através de inúmeras regressões temporais, acumulando força absurda. Frio, eficiente e incrivelmente poderoso.",
    traits: ["Implacável", "Orgulhoso", "Obsessivo", "Protetor (secreto)"],
    power: "Regressão + Força física suprema + Espadas míticas",
    quote: "\"Só existe uma forma de sobreviver — ser o mais forte.\"",
  },
  {
    name: "Han Sooyoung",
    korean: "한수영",
    role: "Aliada Principal",
    color: "from-rose-600 to-pink-700",
    badge: "Escritora de Gênio",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    emoji: "✍️",
    description:
      "Uma escritora genial com língua afiada e mente brilhante. Sua relação com Kim Dokja é complexa e central para a narrativa. Esconde emoções por trás de cinismo.",
    traits: ["Sarcástica", "Genial", "Leal", "Complexa"],
    power: "Domínio de Histórias + Criação de narrativas reais",
    quote: "\"Você acha que pode enganar a mim? Sou escritora.\"",
  },
  {
    name: "Jung Heewon",
    korean: "정희원",
    role: "Combatente de Elite",
    color: "from-emerald-600 to-teal-700",
    badge: "Espada Caída",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    emoji: "🗡️",
    description:
      "Ex-especialista em artes marciais reconvertida em incarnação de elite. Direta, confiante e devastadora em combate. Um dos membros mais fortes da party.",
    traits: ["Direta", "Leal", "Feroz", "Protetora"],
    power: "Esgrima de nível supremo + Stigma de ataque",
    quote: "\"Se você vai lutar, lute com tudo.\"",
  },
  {
    name: "Yoo Sangah",
    korean: "유상아",
    role: "Suporte / Aliada",
    color: "from-amber-600 to-orange-700",
    badge: "Tradutora Cósmica",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    emoji: "🌐",
    description:
      "Colega de trabalho de Kim Dokja e uma das primeiras aliadas. Sua habilidade com idiomas transcende o humano — ela pode se comunicar com seres de outras dimensões.",
    traits: ["Gentil", "Resiliente", "Observadora", "Corajosa"],
    power: "Domínio absoluto de idiomas + Comunicação com entidades",
    quote: "\"Palavras têm poder — em qualquer língua.\"",
  },
  {
    name: "Lee Gilyoung",
    korean: "이길영",
    role: "Combatente / Menino-Rei",
    color: "from-lime-600 to-green-700",
    badge: "Rei dos Insetos",
    badgeColor: "bg-lime-500/20 text-lime-300 border-lime-500/30",
    emoji: "🦋",
    description:
      "Uma criança que recebe o poder de controlar insetos. Muito mais forte e estratégico do que aparenta. Sua lealdade a Kim Dokja é inabalável.",
    traits: ["Brincalhão", "Leal", "Surpreendentemente forte", "Curioso"],
    power: "Controle total de insetos + Enxame evolutivo",
    quote: "\"Dokja-hyung disse que eu sou importante. Então sou.\"",
  },
];

const SYSTEM_ELEMENTS = [
  {
    title: "Cenários",
    icon: "🎭",
    color: "border-violet-500/30 bg-violet-500/5",
    titleColor: "text-violet-300",
    description:
      "Desafios mortais impostos ao mundo pelos Dokkaebis. Cada cenário tem condições de vitória, recompensas e penalidades. A humanidade deve completá-los para continuar existindo.",
    examples: ["Cenário 0 — Começo do Fim", "Cenário das Bestas", "Cenário da Torre", "Cenário Final"],
  },
  {
    title: "Constelações",
    icon: "⭐",
    color: "border-amber-500/30 bg-amber-500/5",
    titleColor: "text-amber-300",
    description:
      "Seres extraordinariamente poderosos que assistem os cenários como entretenimento. Eles patrocinam incarnações humanas em troca de 'Fama' — a energia gerada pelas histórias dos humanos.",
    examples: ["Maquinador Secreto", "Dragão de Chama Negra Abissal", "Prometeu", "Rei Demônio da Salvação"],
  },
  {
    title: "Stigmas",
    icon: "✨",
    color: "border-cyan-500/30 bg-cyan-500/5",
    titleColor: "text-cyan-300",
    description:
      "Habilidades especiais concedidas pelas Constelações às suas incarnações. Cada stigma tem níveis e pode evoluir. São a base do sistema de poderes do universo de ORV.",
    examples: ["Olho do Julgamento", "Espada de Julgamento", "Enciclopédia dos Dokkaebis", "Domínio de Histórias"],
  },
  {
    title: "Histórias",
    icon: "📜",
    color: "border-rose-500/30 bg-rose-500/5",
    titleColor: "text-rose-300",
    description:
      "A fonte primordial de poder no universo de ORV. Qualquer ser vivo acumula 'histórias' através de suas experiências. Histórias suficientemente poderosas podem literalmente reescrever a realidade.",
    examples: ["A História do Único Leitor", "A História do Regressor", "A História da Escritora Caída", "Histórias Míticas"],
  },
  {
    title: "Incarnações",
    icon: "👤",
    color: "border-emerald-500/30 bg-emerald-500/5",
    titleColor: "text-emerald-300",
    description:
      "Humanos que recebem patrocínio de Constelações. Possuem stigmas e participam dos cenários com vantagens sobrenaturais. Kim Dokja e seus aliados são incarnações.",
    examples: ["Incarnação Suprema", "Incarnação Eleita", "Incarnação Maldita", "Incarnação Sem Constelação"],
  },
  {
    title: "Dokkaebis",
    icon: "👹",
    color: "border-orange-500/30 bg-orange-500/5",
    titleColor: "text-orange-300",
    description:
      "Criaturas míticas coreanas que gerenciam e anunciam os cenários. São mensageiros entre o sistema cósmico e a humanidade. Alguns têm personalidades distintas — como o Dokkaebi Bihyung.",
    examples: ["Dokkaebi Bihyung", "Dokkaebi Secreto", "Dokkaebis de Cenário", "Grande Dokkaebi"],
  },
];

const READING_GUIDE = [
  {
    step: "01",
    format: "Web Novel Original",
    icon: "📱",
    lang: "Coreano / Inglês (tradução fan)",
    status: "Completo",
    statusColor: "text-emerald-400",
    chapters: "~560 capítulos + extras",
    where: "Munpia (KR) · Wuxiaworld (EN fan-trad)",
    note: "A experiência mais completa. A tradução oficial em inglês existe, mas muitos preferem a fan-translation pela qualidade.",
    recommended: false,
  },
  {
    step: "02",
    format: "Manhwa (Adaptação)",
    icon: "🎨",
    lang: "Coreano / Inglês / Português (fan)",
    status: "Em andamento",
    statusColor: "text-amber-400",
    chapters: "200+ capítulos publicados",
    where: "LINE Webtoon (oficial) · Kakao Webtoon",
    note: "Arte espetacular por Sleepy-C. Fiel ao novel, com visualizações impressionantes das batalhas e das constelações. Recomendado para começar.",
    recommended: true,
  },
];

const THEMES = [
  {
    icon: "📖",
    title: "O Peso de Ser Leitor",
    description:
      "ORV questiona: o que significa conhecer toda a história mas não poder controlá-la? Kim Dokja é um meta-comentário sobre a experiência de ler ficção.",
  },
  {
    icon: "🎭",
    title: "Protagonista vs. Coadjuvante",
    description:
      "A obra desconstrói o conceito de 'protagonista'. Quem merece ser o herói? Quem decide isso? E o que custa para alguém que nunca foi o escolhido tentar ser?",
  },
  {
    icon: "💔",
    title: "Solidão e Conexão",
    description:
      "Kim Dokja passou anos lendo em silêncio, sozinho. Seu arco é aprender que conexões genuínas valem mais do que qualquer conhecimento ou poder.",
  },
  {
    icon: "✍️",
    title: "Autoria e Responsabilidade",
    description:
      "Quem escreve uma história é responsável pelo que acontece com seus personagens? ORV explora a relação entre autor, narrativa e leitor de forma profunda.",
  },
  {
    icon: "⭐",
    title: "O Poder das Histórias",
    description:
      "No universo de ORV, histórias são literalmente poder. É uma metáfora para como narrativas moldam identidades, culturas e o próprio sentido da vida.",
  },
  {
    icon: "🔄",
    title: "Sacrifício e Redenção",
    description:
      "Vários personagens carregam culpa e buscam redenção. ORV trata disso com nuance rara: nem todo sacrifício é heroico, nem toda redenção é possível.",
  },
];

const QUOTES = [
  {
    text: "Não importa como a história termina — o que importa é que você a viveu.",
    character: "Kim Dokja",
    context: "Sobre o significado de existir dentro de uma narrativa",
  },
  {
    text: "Eu regredi centenas de vezes. Mas desta vez é diferente. Desta vez há alguém que conhece minha história.",
    character: "Yoo Joonghyuk",
    context: "Reconhecendo Kim Dokja como algo além de um obstáculo",
  },
  {
    text: "Uma história só termina quando o último leitor a abandona.",
    character: "Han Sooyoung",
    context: "Sobre a natureza das narrativas e sua imortalidade",
  },
  {
    text: "Eu não sou o protagonista. Eu nunca fui. Mas isso não me impede de salvar todos eles.",
    character: "Kim Dokja",
    context: "No momento de maior sacrifício da obra",
  },
];

const FAQS = [
  {
    q: "Preciso ler o novel para entender o manhwa?",
    a: "Não. O manhwa é fiel ao novel e apresenta tudo que você precisa saber. Mas se quiser a experiência completa (mais detalhes, cenas internas de Kim Dokja), o novel é insubstituível.",
  },
  {
    q: "ORV tem anime?",
    a: "Até o momento não há anime confirmado. O projeto mais próximo é o manhwa. Há muito pedido da fandom por uma adaptação anime, mas nada oficial.",
  },
  {
    q: "Qual a relação de ORV com outros web novels coreanos?",
    a: "ORV é frequentemente comparado com 'Solo Leveling' pelo impacto na cena de manhwa, mas são obras muito diferentes. ORV tem mais profundidade narrativa e temática, enquanto SL foca em power fantasy.",
  },
  {
    q: "A obra está completa?",
    a: "O web novel original está completamente finalizado. O manhwa ainda está em andamento, adaptando o novel capítulo a capítulo.",
  },
  {
    q: "ORV é triste?",
    a: "Tem momentos devastadores, sim. Mas é principalmente uma história sobre conexão, esperança e o que significa existir. Emocionalmente intenso, não apenas triste.",
  },
  {
    q: "Onde ler em português?",
    a: "Não há tradução oficial em PT-BR. Existem grupos de fãs que traduziram partes do manhwa. A melhor forma legal é o LINE Webtoon em inglês.",
  },
];

export default function ORVPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-[#0d1424] to-violet-950 opacity-80" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <span>/</span>
            <Link href="/guias" className="hover:text-white transition-colors">Guias</Link>
            <span>/</span>
            <span className="text-slate-300">ORV</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
              ★ EXTRA
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/15 text-violet-300 border border-violet-500/25">
              Manhwa · Web Novel
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/8 text-slate-300 border border-white/12">
              Coreia do Sul
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
              Novel Completo
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-display text-white mb-4 leading-tight">
            Omniscient
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Reader&apos;s Viewpoint
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-3 font-medium">
            전지적 독자 시점 · Ponto de Vista do Leitor Onisciente
          </p>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
            O que acontece quando o mundo começa a seguir o roteiro de um web novel — e você é o único que leu até o fim?
            A obra que redefiniu o manhwa moderno e transformou leitores em fãs apaixonados.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
            {[
              { label: "Autor", value: "sing N song" },
              { label: "Arte (manhwa)", value: "Sleepy-C" },
              { label: "Capítulos", value: "560+ (novel)" },
              { label: "Nota Fandom", value: "9.9 / 10" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div className="text-white font-bold text-sm">{stat.value}</div>
                <div className="text-slate-500 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

        {/* Synopsis */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">📖</span>
            <h2 className="text-2xl md:text-3xl font-black font-display text-white">A História</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#0d1424] border border-white/8 rounded-2xl p-6 md:p-8">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-xs text-violet-300 font-bold">1</span>
                O Mundo Antes
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Kim Dokja é um funcionário comum, solitário e quieto. Seu único escapismo é um obscuro web novel chamado{" "}
                <strong className="text-white">&ldquo;Three Ways to Survive the Apocalypse&rdquo;</strong> — uma obra que ninguém mais leu até o fim porque era longa demais, dark demais, e estranha demais.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mt-3">
                Ele passou anos acompanhando a história do protagonista Yoo Joonghyuk sobrevivendo ao apocalipse através de regressões temporais. Dokja era o único leitor fiel, o único que continuou até o último capítulo.
              </p>
            </div>
            <div className="bg-[#0d1424] border border-white/8 rounded-2xl p-6 md:p-8">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xs text-amber-300 font-bold">2</span>
                O Apocalipse Real
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Em um dia comum, o mundo começa a seguir o roteiro exato do novel. Cenários mortais surgem, monstros aparecem, e um sistema sobrenatural força a humanidade a sobreviver ou morrer em desafios impossíveis.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mt-3">
                Mas Dokja tem uma vantagem que ninguém mais no mundo possui:{" "}
                <strong className="text-white">ele conhece a história completa.</strong> Cada cenário, cada traição, cada morte — ele já leu tudo. Agora precisa usar esse conhecimento para sobreviver e, talvez, reescrever o destino.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-violet-900/30 to-indigo-900/30 border border-violet-500/20 rounded-2xl p-6 md:p-8">
            <h3 className="text-white font-bold text-lg mb-3">O Núcleo da Narrativa</h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-4xl">
              ORV é simultaneamente uma obra de ação apocalíptica e uma reflexão profunda sobre narrativas, leitores e autores. Kim Dokja não é um protagonista convencional — ele é quieto, calculista, e constantemente se coloca em segundo plano. Mas sua jornada de descobrir o que significa ser parte de uma história, e não apenas observá-la, é o coração emocional de toda a obra.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Apocalipse", "Sistemas de Poderes", "Regressão Temporal", "Meta-narrativa", "Drama Emocional", "Épico"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full text-xs bg-white/8 text-slate-400 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Characters */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">👥</span>
            <h2 className="text-2xl md:text-3xl font-black font-display text-white">Personagens Principais</h2>
          </div>
          <p className="text-slate-400 text-sm mb-8 ml-10">Um elenco construído com camadas. Cada personagem tem contradições, arcos e momentos que ficam na memória.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHARACTERS.map((char) => (
              <div key={char.name} className="bg-[#0d1424] border border-white/8 rounded-2xl overflow-hidden hover:border-white/15 transition-all group">
                <div className={`h-2 w-full bg-gradient-to-r ${char.color}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{char.emoji}</span>
                        <h3 className="text-white font-bold text-lg">{char.name}</h3>
                      </div>
                      <p className="text-slate-500 text-xs">{char.korean}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{char.role}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${char.badgeColor} shrink-0 ml-2`}>
                      {char.badge}
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed mb-4">{char.description}</p>

                  <div className="space-y-2">
                    <div>
                      <span className="text-slate-500 text-xs uppercase tracking-wider">Traços</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {char.traits.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-md text-xs bg-white/6 text-slate-400 border border-white/8">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs uppercase tracking-wider">Poder</span>
                      <p className="text-slate-300 text-xs mt-1">{char.power}</p>
                    </div>
                    <div className="pt-2 border-t border-white/6">
                      <p className="text-slate-400 text-xs italic">{char.quote}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">⚙️</span>
            <h2 className="text-2xl md:text-3xl font-black font-display text-white">O Sistema do Universo</h2>
          </div>
          <p className="text-slate-400 text-sm mb-8 ml-10">ORV tem um dos sistemas de poder mais elaborados do gênero. Aqui está o que você precisa saber.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SYSTEM_ELEMENTS.map((elem) => (
              <div key={elem.title} className={`rounded-2xl border p-5 ${elem.color} transition-all hover:scale-[1.01]`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{elem.icon}</span>
                  <h3 className={`font-bold text-lg ${elem.titleColor}`}>{elem.title}</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{elem.description}</p>
                <div>
                  <span className="text-slate-500 text-xs uppercase tracking-wider">Exemplos</span>
                  <ul className="mt-2 space-y-1">
                    {elem.examples.map((ex) => (
                      <li key={ex} className="text-slate-400 text-xs flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* How the system works diagram */}
          <div className="mt-6 bg-[#0d1424] border border-white/8 rounded-2xl p-6 md:p-8">
            <h3 className="text-white font-bold text-lg mb-4">Como o Sistema Funciona (simplificado)</h3>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              {[
                { label: "Cenários ocorrem", icon: "🎭", color: "bg-violet-500/15 border-violet-500/30 text-violet-300" },
                { label: "→", color: "text-slate-600", noBox: true },
                { label: "Incarnações competem", icon: "👤", color: "bg-blue-500/15 border-blue-500/30 text-blue-300" },
                { label: "→", color: "text-slate-600", noBox: true },
                { label: "Geram Fama", icon: "✨", color: "bg-amber-500/15 border-amber-500/30 text-amber-300" },
                { label: "→", color: "text-slate-600", noBox: true },
                { label: "Constelações assistem", icon: "⭐", color: "bg-rose-500/15 border-rose-500/30 text-rose-300" },
                { label: "→", color: "text-slate-600", noBox: true },
                { label: "Patrocinam Stigmas", icon: "🔮", color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300" },
              ].map((item, i) =>
                item.noBox ? (
                  <span key={i} className="text-slate-600 font-bold text-lg">→</span>
                ) : (
                  <div key={i} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium ${item.color}`}>
                    <span>{item.icon}</span>
                    {item.label}
                  </div>
                )
              )}
            </div>
            <p className="text-slate-500 text-xs text-center mt-4">
              O ciclo de poder em ORV — humans geram entretenimento para constelações, que em troca os tornam mais poderosos.
            </p>
          </div>
        </section>

        {/* Reading Guide */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🗺️</span>
            <h2 className="text-2xl md:text-3xl font-black font-display text-white">Por Onde Começar</h2>
          </div>
          <p className="text-slate-400 text-sm mb-8 ml-10">Duas formas de entrar no universo de ORV. Ambas valem muito a pena.</p>

          <div className="grid md:grid-cols-2 gap-5">
            {READING_GUIDE.map((guide) => (
              <div
                key={guide.format}
                className={`relative bg-[#0d1424] rounded-2xl border p-6 md:p-7 ${guide.recommended ? "border-violet-500/40 ring-1 ring-violet-500/20" : "border-white/8"}`}
              >
                {guide.recommended && (
                  <div className="absolute -top-3 left-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-600 text-white">
                      ★ Recomendado para começar
                    </span>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{guide.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-slate-600 text-sm font-mono">#{guide.step}</span>
                      <h3 className="text-white font-bold">{guide.format}</h3>
                    </div>
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-xs w-16 shrink-0">Status</span>
                        <span className={`text-xs font-medium ${guide.statusColor}`}>{guide.status}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-xs w-16 shrink-0">Capítulos</span>
                        <span className="text-slate-300 text-xs">{guide.chapters}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-slate-500 text-xs w-16 shrink-0 mt-0.5">Onde ler</span>
                        <span className="text-slate-300 text-xs">{guide.where}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-xs w-16 shrink-0">Idioma</span>
                        <span className="text-slate-300 text-xs">{guide.lang}</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl ${guide.recommended ? "bg-violet-500/10 border border-violet-500/20" : "bg-white/5 border border-white/8"}`}>
                      <p className="text-slate-300 text-xs leading-relaxed">{guide.note}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Themes */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">💡</span>
            <h2 className="text-2xl md:text-3xl font-black font-display text-white">Por Que ORV é Único</h2>
          </div>
          <p className="text-slate-400 text-sm mb-8 ml-10">Os temas que fazem desta obra muito mais do que ação e poderes.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {THEMES.map((theme) => (
              <div key={theme.title} className="bg-[#0d1424] border border-white/8 rounded-xl p-5 hover:border-white/15 transition-all">
                <div className="text-2xl mb-3">{theme.icon}</div>
                <h3 className="text-white font-bold text-sm mb-2">{theme.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{theme.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quotes */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">💬</span>
            <h2 className="text-2xl md:text-3xl font-black font-display text-white">Frases Marcantes</h2>
          </div>
          <p className="text-slate-400 text-sm mb-8 ml-10">ORV é cheio de momentos que ficam na mente por dias.</p>

          <div className="grid md:grid-cols-2 gap-4">
            {QUOTES.map((quote, i) => (
              <div key={i} className="bg-[#0d1424] border border-white/8 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-4 left-4 text-6xl text-white/5 font-serif leading-none select-none">&ldquo;</div>
                <blockquote className="relative z-10">
                  <p className="text-white text-sm font-medium leading-relaxed italic mb-4">{quote.text}</p>
                  <footer>
                    <span className="text-violet-400 font-bold text-xs">— {quote.character}</span>
                    <p className="text-slate-500 text-xs mt-0.5">{quote.context}</p>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">❓</span>
            <h2 className="text-2xl md:text-3xl font-black font-display text-white">Dúvidas Frequentes</h2>
          </div>
          <p className="text-slate-400 text-sm mb-8 ml-10">Tudo que novos leitores perguntam antes de começar.</p>

          <div className="space-y-3 max-w-3xl">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-[#0d1424] border border-white/8 rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-2 flex items-start gap-2">
                  <span className="text-violet-400 shrink-0 mt-0.5">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed pl-5">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Verdict */}
        <section>
          <div className="bg-gradient-to-br from-violet-900/40 via-[#0d1424] to-indigo-900/40 border border-violet-500/25 rounded-2xl p-8 md:p-10 text-center">
            <div className="text-5xl mb-4">⭐</div>
            <h2 className="text-2xl md:text-3xl font-black font-display text-white mb-3">O Veredicto</h2>
            <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto mb-6">
              Omniscient Reader&apos;s Viewpoint não é apenas uma história de apocalipse ou de poderes. É uma carta de amor para leitores — para todos que já se perderam em uma história, que choraram por personagens fictícios, que desejaram que as histórias fossem reais.
            </p>
            <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto mb-8">
              Kim Dokja começa como alguém que apenas observa histórias de longe. E termina — bem, você precisa descobrir por conta própria. Mas é um dos finais mais impactantes da ficção moderna.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-white/8 border border-white/12 text-center">
                <div className="text-2xl font-black text-amber-400">9.9</div>
                <div className="text-slate-500 text-xs">Nota Geral</div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/8 border border-white/12 text-center">
                <div className="text-2xl font-black text-violet-400">10</div>
                <div className="text-slate-500 text-xs">Escrita</div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/8 border border-white/12 text-center">
                <div className="text-2xl font-black text-cyan-400">10</div>
                <div className="text-slate-500 text-xs">Personagens</div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/8 border border-white/12 text-center">
                <div className="text-2xl font-black text-rose-400">10</div>
                <div className="text-slate-500 text-xs">Impacto Emocional</div>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🎯</span>
            <h2 className="text-2xl font-black font-display text-white">Se Curtiu ORV, Leia Também</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Solo Leveling", emoji: "⚔️", reason: "Sistema de poderes épico, protagonista insano", tag: "Manhwa" },
              { title: "The Beginning After the End", emoji: "👑", reason: "Reencarnação com profundidade emocional rara", tag: "Manhwa" },
              { title: "A Returner's Magic Should Be Special", emoji: "🔮", reason: "Volta ao passado com conhecimento do futuro", tag: "Manhwa" },
              { title: "The Novel's Extra", emoji: "📚", reason: "Protagonista que também conhece o 'roteiro'", tag: "Web Novel" },
            ].map((rec) => (
              <div key={rec.title} className="bg-[#0d1424] border border-white/8 rounded-xl p-4 hover:border-white/15 transition-all">
                <div className="text-2xl mb-2">{rec.emoji}</div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-white font-bold text-sm leading-tight">{rec.title}</h3>
                  <span className="px-1.5 py-0.5 rounded text-xs bg-white/8 text-slate-400 shrink-0">{rec.tag}</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{rec.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Back nav */}
        <div className="flex items-center justify-between pt-4 border-t border-white/8">
          <Link href="/guias" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
            <span>←</span> Voltar para Guias
          </Link>
          <Link href="/anime" className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors text-sm font-medium">
            Buscar Animes <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
