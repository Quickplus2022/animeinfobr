export type Archetype = "coracao" | "mente" | "forca" | "espirito" | "conexao";

export interface AnimeCharacter {
  id: string;
  name: string;
  anime: string;
  archetype: Archetype;
  archetypeLabel: string;
  age: string;
  ability: string;
  traits: string[];
  quote: string;
  description: string;
  fameLevel: "iconic" | "known" | "obscure";
  image: string | null; // emoji fallback
  similarTo: string[];
}

export const CHARACTERS: AnimeCharacter[] = [
  // ── CORAÇÃO ──
  {
    id: "naruto",
    name: "Naruto Uzumaki",
    anime: "Naruto / Naruto Shippuden",
    archetype: "coracao",
    archetypeLabel: "O Herói Inabalável",
    age: "17 anos (Shippuden)",
    ability: "Modo Sábio + Modo Kyuubi — poder colosseiro criado pela vontade pura",
    traits: ["Determinado", "Leal", "Emotivo", "Nunca desiste", "Inspira todos"],
    quote: "Eu nunca vou voltar atrás! Esse é meu caminho ninja!",
    description: "Cresceu sozinho, rejeitado por todos — e por isso entende a dor melhor que ninguém. Sua força não vem de talento, mas da recusa absoluta de desistir.",
    fameLevel: "iconic",
    image: "🍥",
    similarTo: ["Luffy (One Piece)", "Deku (My Hero Academia)"],
  },
  {
    id: "luffy",
    name: "Monkey D. Luffy",
    anime: "One Piece",
    archetype: "coracao",
    archetypeLabel: "O Herói Livre",
    age: "19 anos",
    ability: "Gomu Gomu no Mi — corpo de borracha com Haki do Rei",
    traits: ["Livre", "Instintivo", "Inesperado", "Magnético", "Sem limites"],
    quote: "Eu vou ser o Rei dos Piratas!",
    description: "Não é o mais inteligente nem o mais estratégico. É o mais livre. As pessoas o seguem não por lógica, mas porque ele as faz querer ser livres também.",
    fameLevel: "iconic",
    image: "🏴‍☠️",
    similarTo: ["Naruto (Naruto)", "Goku (Dragon Ball Z)"],
  },
  {
    id: "simon",
    name: "Simon",
    anime: "Gurren Lagann",
    archetype: "coracao",
    archetypeLabel: "O Determinado Que Perfura Céus",
    age: "14 → 21 anos",
    ability: "Core Drill — perfura impossibilidades com vontade pura",
    traits: ["Humilde no início", "Transformação épica", "Amor como força", "Supera o impossível"],
    quote: "Quem diacho você acha que eu sou? Eu sou Simon! Eu perfuro através do impossível!",
    description: "Começa como o otaku mais inseguro do universo. Termina como o ser que perfurou o próprio espaço-tempo com força de vontade. Crescimento humano mais épico da história.",
    fameLevel: "obscure",
    image: "🌀",
    similarTo: ["Deku (My Hero Academia)", "Naruto (Naruto)"],
  },

  // ── MENTE ──
  {
    id: "light",
    name: "Light Yagami",
    anime: "Death Note",
    archetype: "mente",
    archetypeLabel: "O Gênio Que Se Perdeu",
    age: "17 → 23 anos",
    ability: "Death Note — poder absoluto sobre a morte, mente que 14 passos à frente",
    traits: ["Genial", "Vaidoso", "Manipulador", "Idealista corrompido", "Perigoso"],
    quote: "Eu sou Kira. E sou o deus do novo mundo.",
    description: "Começou querendo um mundo melhor. Ficou tão fascinado com o poder que se tornou o que queria destruir. Um espelho: o que acontece quando inteligência não tem limites morais.",
    fameLevel: "iconic",
    image: "📓",
    similarTo: ["Lelouch (Code Geass)", "Ayanokoji (Classroom of the Elite)"],
  },
  {
    id: "lelouch",
    name: "Lelouch vi Britannia",
    anime: "Code Geass",
    archetype: "mente",
    archetypeLabel: "O Estrategista Sacrificial",
    age: "17 anos",
    ability: "Geass — força qualquer pessoa a obedecer uma única ordem absoluta",
    traits: ["Estratégico", "Carismático", "Sacrificial", "Orgulhoso", "Amor escondido"],
    quote: "Eu destruirei o mundo e o reconstruirei.",
    description: "Usa xadrez com vidas humanas, mas carrega o peso disso. Cada movimento brilhante esconde culpa enorme. Talvez o personagem mais trágico da ficção científica animada.",
    fameLevel: "known",
    image: "♟️",
    similarTo: ["Light Yagami (Death Note)", "L (Death Note)"],
  },
  {
    id: "ayanokoji",
    name: "Ayanokoji Kiyotaka",
    anime: "Classroom of the Elite",
    archetype: "mente",
    archetypeLabel: "O Gênio Invisível",
    age: "16 anos",
    ability: "Inteligência oculta de nível absurdo — parece mediano por escolha",
    traits: ["Calculista", "Inexpressivo", "Manipulação silenciosa", "Observador", "Sem ego aparente"],
    quote: "Não existe ato completamente altruísta. Tudo tem uma motivação.",
    description: "Não quer ser o número um. Quer ser o jogador invisível que move todos os outros. Assusta porque você nunca sabe o que ele realmente quer — ou se ele tem sentimentos de verdade.",
    fameLevel: "obscure",
    image: "🎯",
    similarTo: ["Light Yagami (Death Note)", "Shikamaru (Naruto)"],
  },

  // ── FORÇA ──
  {
    id: "levi",
    name: "Levi Ackerman",
    anime: "Attack on Titan",
    archetype: "forca",
    archetypeLabel: "O Guerreiro Sem Igual",
    age: "30+ anos",
    ability: "Poder do Clã Ackerman — reflexos e força sobre-humanos através de memória combativa",
    traits: ["Frio", "Disciplinado", "Leal até a morte", "Carrega o peso dos mortos", "Curto e direto"],
    quote: "Não tenha arrependimentos. Qualquer escolha que fizer, jure até o fim.",
    description: "Cresceu nas profundezas do submundo. Aprendeu que sobrevivência exige perfeição absoluta. Por isso cada movimento é limpo, cada palavra é precisa. Não é frio — é alguém que não pode se dar ao luxo de vacilar.",
    fameLevel: "iconic",
    image: "⚔️",
    similarTo: ["Killua (Hunter x Hunter)", "Itachi (Naruto)"],
  },
  {
    id: "killua",
    name: "Killua Zoldyck",
    anime: "Hunter x Hunter",
    archetype: "forca",
    archetypeLabel: "O Assassino Que Escolheu Ser Mais",
    age: "12 anos",
    ability: "Transmutação de Nen — transforma energia em eletricidade; velocidade assassina",
    traits: ["Instinto assassino", "Leal ao amigo", "Autocrítico extremo", "Humor seco", "Evolução constante"],
    quote: "A velocidade que supera os reflexos não pode ser esquivada.",
    description: "Nasceu para matar. Escolheu sentir. Cada capítulo com Gon é a luta de alguém que foi treinado para não ter sentimentos tentando descobrir o que significa ter um amigo.",
    fameLevel: "known",
    image: "⚡",
    similarTo: ["Levi (Attack on Titan)", "Hiei (Yu Yu Hakusho)"],
  },
  {
    id: "escanor",
    name: "Escanor",
    anime: "Seven Deadly Sins",
    archetype: "forca",
    archetypeLabel: "O Poderoso Que Carrega Solidão",
    age: "40 anos",
    ability: "Sunshine — durante o dia, poder cresce até ser literalmente o ser mais forte do mundo",
    traits: ["Humilde à noite", "Arrogante ao meio-dia", "Amor não correspondido", "Força que isola", "Trágico"],
    quote: "Quem decidiu que eu não posso ganhar? Sou eu quem decide isso.",
    description: "De dia: o ser mais poderoso do universo. À noite: um homem envergonhado que nunca se achou digno de amor. A dualidade mais humana em um personagem de fantasia.",
    fameLevel: "obscure",
    image: "☀️",
    similarTo: ["Endeavor (My Hero Academia)", "Roy Mustang (FMA)"],
  },

  // ── ESPÍRITO ──
  {
    id: "senku",
    name: "Senku Ishigami",
    anime: "Dr. Stone",
    archetype: "espirito",
    archetypeLabel: "O Cientista que Reconstrói o Mundo",
    age: "15 anos",
    ability: "Gênio científico — memória fotográfica + domínio de todo conhecimento humano",
    traits: ["Lógico", "Excêntrico", "Entusiasmado", "Nunca para de planejar", "Ciência = magia"],
    quote: "Dez bilhões por cento seguro!",
    description: "Para Senku, toda pergunta tem uma resposta e toda resposta leva a uma nova pergunta. Não é frio — está sempre explodindo de entusiasmo. Só que o entusiasmo dele é sobre reações químicas.",
    fameLevel: "known",
    image: "🧪",
    similarTo: ["Okabe (Steins;Gate)", "Edward Elric (FMA)"],
  },
  {
    id: "okabe",
    name: "Rintarou Okabe",
    anime: "Steins;Gate",
    archetype: "espirito",
    archetypeLabel: "O Viajante do Tempo Que Carrega Tudo",
    age: "18 anos",
    ability: "Reading Steiner — única pessoa que mantém memórias ao mudar de linha do tempo",
    traits: ["Teatral", "Ansioso por dentro", "Genialmente louco", "Carrega sacrifícios", "Vive entre linhas do tempo"],
    quote: "Eu sou um cientista louco! El Psy Kongroo.",
    description: "Faz pose de vilão para esconder que é o homem mais sensível do universo. Viu a pessoa que ama morrer centenas de vezes. E continuou tentando. Isso é loucura ou dedicação absoluta?",
    fameLevel: "known",
    image: "📡",
    similarTo: ["Senku (Dr. Stone)", "Dazai (Bungo Stray Dogs)"],
  },
  {
    id: "ginko",
    name: "Ginko",
    anime: "Mushishi",
    archetype: "espirito",
    archetypeLabel: "O Observador Eterno",
    age: "Adulto (indefinido)",
    ability: "Sentido especial para Mushi — criaturas entre a vida e a energia pura que ninguém mais vê",
    traits: ["Calmo absoluto", "Sem apego", "Observador", "Sábio sem arrogância", "Caminha entre mundos"],
    quote: "Os Mushi existem simplesmente para existir. Como todos nós.",
    description: "Não luta. Não grita. Não tem um objetivo grandioso. Apenas caminha, observa e ajuda. É o personagem mais zen da animação japonesa — e talvez o mais filosófico.",
    fameLevel: "obscure",
    image: "🌿",
    similarTo: ["Spike Spiegel (Cowboy Bebop)", "Holo (Spice and Wolf)"],
  },

  // ── CONEXÃO ──
  {
    id: "violet",
    name: "Violet Evergarden",
    anime: "Violet Evergarden",
    archetype: "conexao",
    archetypeLabel: "A Que Aprendeu a Sentir",
    age: "14 → 18 anos",
    ability: "Digitadora Auto-Memory Doll — escreve cartas que capturam emoções humanas com perfeição",
    traits: ["Aprende a sentir", "Literalmente fria no início", "Cartas que mudam vidas", "Amor como missão", "Crescimento lento e belo"],
    quote: "Eu quero entender o significado das palavras 'eu te amo'.",
    description: "Criada como arma. Aprendeu que a palavra mais poderosa que existe é 'eu te amo'. Sua jornada de aprender humanidade através das emoções dos outros é uma das mais belas da animação.",
    fameLevel: "known",
    image: "💌",
    similarTo: ["Tohru Honda (Fruits Basket)", "Naho (Orange)"],
  },
  {
    id: "gon",
    name: "Gon Freecss",
    anime: "Hunter x Hunter",
    archetype: "conexao",
    archetypeLabel: "O Puro Que Vê Todos",
    age: "12 anos",
    ability: "Nen de Reforço — poder de vida concentrado; a forma mais pura de Nen existente",
    traits: ["Puro", "Intuitivo", "Caça amizades", "Surpreendente", "Lado sombrio quando perde alguém"],
    quote: "Se você decidiu que vai ser meu amigo, então é para sempre.",
    description: "A pureza de Gon faz todos ao redor quererem protegê-lo. E quando ele quebra — quando perde quem ama — você entende que pureza sem limites também pode ser a coisa mais aterrorizante do universo.",
    fameLevel: "known",
    image: "🎣",
    similarTo: ["Naruto (Naruto)", "Luffy (One Piece)"],
  },
  {
    id: "tohru",
    name: "Tohru Honda",
    anime: "Fruits Basket",
    archetype: "conexao",
    archetypeLabel: "A Que Cura Só Existindo",
    age: "16 anos",
    ability: "Empatia absoluta — consegue ver o bem em qualquer pessoa, mesmo as mais quebradas",
    traits: ["Bondade sem limites", "Nunca guarda rancor", "Cura traumas", "Força silenciosa", "Amor incondicional"],
    quote: "Só de você existir, minha vida fica cheia.",
    description: "Não tem poder de luta. Não tem planos grandiosos. Ela cura as pessoas simplesmente sendo quem é. Uma família inteira de pessoas quebradas encontrou forma humana porque Tohru as amou sem pedir nada em troca.",
    fameLevel: "obscure",
    image: "🌸",
    similarTo: ["Violet Evergarden", "Hinata (Naruto)"],
  },
];

export type ArchetypeScore = Record<Archetype, number>;

export interface TestQuestion {
  id: string;
  question: string;
  emoji: string;
  options: { label: string; scores: Partial<ArchetypeScore> }[];
}

export const TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "motivation",
    question: "O que te move acima de tudo?",
    emoji: "🔥",
    options: [
      { label: "Proteger quem amo, custe o que custar", scores: { coracao: 3, conexao: 1 } },
      { label: "Alcançar meu objetivo com precisão total", scores: { mente: 3, forca: 1 } },
      { label: "Ser o melhor na minha arte, sem exceção", scores: { forca: 3, mente: 1 } },
      { label: "Entender o porquê de tudo existir", scores: { espirito: 3, mente: 1 } },
    ],
  },
  {
    id: "problem",
    question: "Como você resolve um problema difícil?",
    emoji: "🧩",
    options: [
      { label: "Enfrento de frente com tudo que tenho", scores: { coracao: 2, forca: 1 } },
      { label: "Planejo cada detalhe antes de agir", scores: { mente: 3 } },
      { label: "Treino até dominar a solução", scores: { forca: 2, coracao: 1 } },
      { label: "Observo e entendo antes de qualquer coisa", scores: { espirito: 2, mente: 1 } },
    ],
  },
  {
    id: "group",
    question: "Em grupo, você costuma:",
    emoji: "👥",
    options: [
      { label: "Liderar pelo exemplo e energia", scores: { coracao: 2, conexao: 1 } },
      { label: "Planejar nos bastidores", scores: { mente: 2, espirito: 1 } },
      { label: "Executar com excelência", scores: { forca: 2 } },
      { label: "Conectar as pessoas e resolver conflitos", scores: { conexao: 3 } },
    ],
  },
  {
    id: "defeat",
    question: "Quando você perde, sua reação é:",
    emoji: "💢",
    options: [
      { label: "Fico mais determinado. Ninguém vai me deter", scores: { coracao: 3 } },
      { label: "Analiso o erro e refaço o plano completo", scores: { mente: 2, espirito: 1 } },
      { label: "Processo em silêncio e volto mais forte", scores: { forca: 2, mente: 1 } },
      { label: "Busco apoio e supero junto com alguém", scores: { conexao: 3 } },
    ],
  },
  {
    id: "strength",
    question: "Sua maior força segundo você mesmo:",
    emoji: "💪",
    options: [
      { label: "Minha vontade nunca quebra", scores: { coracao: 3 } },
      { label: "Minha inteligência estratégica", scores: { mente: 3 } },
      { label: "Minha disciplina e domínio técnico", scores: { forca: 3 } },
      { label: "Minha capacidade de entender as pessoas", scores: { conexao: 2, espirito: 1 } },
    ],
  },
  {
    id: "philosophy",
    question: "Sobre regras e sistemas:",
    emoji: "⚖️",
    options: [
      { label: "Sigo meu próprio código. Regras externas são secundárias", scores: { coracao: 2, espirito: 1 } },
      { label: "Uso as regras quando me convém. São ferramentas", scores: { mente: 3 } },
      { label: "Respeito profundamente a estrutura e o código", scores: { forca: 2, mente: 1 } },
      { label: "Regras existem para proteger — mas conexões humanas vêm primeiro", scores: { conexao: 2, coracao: 1 } },
    ],
  },
  {
    id: "ideal",
    question: "Qual cenário te representa melhor?",
    emoji: "🌌",
    options: [
      { label: "Superar o impossível sozinho pelo que acredito", scores: { coracao: 2, forca: 1 } },
      { label: "Mover as peças do tabuleiro enquanto ninguém percebe", scores: { mente: 3 } },
      { label: "Descobrir verdades escondidas sobre o mundo", scores: { espirito: 3 } },
      { label: "Ser a razão pela qual alguém não desistiu", scores: { conexao: 3 } },
    ],
  },
];

export function getCharacterResult(scores: ArchetypeScore): {
  primary: AnimeCharacter;
  medium: AnimeCharacter;
  hidden: AnimeCharacter;
  archetype: Archetype;
  archetypeLabel: string;
} {
  const sorted = (Object.entries(scores) as [Archetype, number][]).sort((a, b) => b[1] - a[1]);
  const topArchetype = sorted[0][0];

  const pool = CHARACTERS.filter((c) => c.archetype === topArchetype);
  const iconic = pool.find((c) => c.fameLevel === "iconic") ?? pool[0];
  const known = pool.find((c) => c.fameLevel === "known") ?? pool[1];
  const obscure = pool.find((c) => c.fameLevel === "obscure") ?? pool[2];

  const archetypeLabels: Record<Archetype, string> = {
    coracao: "Coração — O Herói que Sente",
    mente: "Mente — O Estrategista Calculista",
    forca: "Força — O Guerreiro Disciplinado",
    espirito: "Espírito — O Observador Curioso",
    conexao: "Conexão — O Que Une as Pessoas",
  };

  return {
    primary: iconic,
    medium: known,
    hidden: obscure,
    archetype: topArchetype,
    archetypeLabel: archetypeLabels[topArchetype],
  };
}
