export interface Guide {
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: "iniciante" | "franquia" | "genero" | "lista";
  readTime: number;
  content: string;
  tags: string[];
}

export const GUIDES: Guide[] = [
  {
    slug: "melhores-animes-para-iniciantes",
    title: "Melhores Animes para Iniciantes",
    description: "Não sabe por onde começar? Esta lista tem os animes perfeitos para quem ainda não assistiu nada — ou quase nada.",
    icon: "🌟",
    category: "iniciante",
    readTime: 5,
    tags: ["iniciante", "top", "classicos"],
    content: `## Por que começar com os certos?

Começar com o anime errado pode afastar qualquer um do hobby. Por isso, selecionamos títulos que são acessíveis, envolventes e não exigem conhecimento prévio do gênero.

### 1. Fullmetal Alchemist: Brotherhood (2009)

Considerado por muitos o melhor anime de todos os tempos, FMA:B tem uma história completa, bem estruturada, com personagens memoráveis e um ritmo que prende do início ao fim.

- **Episódios**: 64
- **Gênero**: Ação, Aventura, Drama
- **Por que assistir**: História completa, personagens inesquecíveis, sem enrolação

### 2. Death Note (2006)

Um thriller psicológico sobre um estudante genial que encontra um caderno sobrenatural capaz de matar qualquer pessoa. Extremamente acessível para não-otakus.

- **Episódios**: 37
- **Gênero**: Thriller, Suspense, Psicológico
- **Por que assistir**: Série curta, história tensa e sem necessidade de contexto anterior

### 3. Sword Art Online (2012)

Jogadores ficam presos num RPG virtual e precisam completar o jogo para sobreviver. Conceito fácil de entender, ação constante.

- **Episódios**: 25 (1ª temporada)
- **Gênero**: Ação, Fantasia, Romance
- **Por que assistir**: Premissa moderna e acessível

### 4. Demon Slayer (2019)

Um dos animes mais bonitos já produzidos. A história de Tanjiro, um jovem que busca salvar sua irmã transformada em demônio, com animação espetacular.

- **Episódios**: 26 (1ª temporada)
- **Gênero**: Ação, Sobrenatural
- **Por que assistir**: Animação impressionante, história envolvente

### 5. One Punch Man (2015)

Um herói tão poderoso que derrota qualquer inimigo com um único soco — e está entediado com isso. Uma paródia inteligente e hilária do gênero de super-heróis.

- **Episódios**: 12 (1ª temporada)
- **Gênero**: Ação, Comédia
- **Por que assistir**: Curto, engraçado e com ação espetacular

## Dica extra

Evite começar com animes muito longos como Naruto ou One Piece (500+ episódios) antes de ter certeza que você gosta do formato. Comece com séries completas e curtas!`,
  },
  {
    slug: "ordem-para-assistir-naruto",
    title: "Ordem Certa para Assistir Naruto",
    description: "Guia completo da ordem cronológica de Naruto, incluindo Shippuden, filmes e Boruto, sem spoilers.",
    icon: "🍥",
    category: "franquia",
    readTime: 8,
    tags: ["naruto", "ordem", "shippuden", "boruto"],
    content: `## Naruto: A Ordem Correta

A franquia Naruto é uma das maiores do mundo dos animes. Com centenas de episódios e vários filmes, saber a ordem certa é essencial.

### Ordem Recomendada

#### 1. Naruto Clássico (2002–2007)
- **Episódios**: 220 (com fillers)
- **Essenciais**: 1-5, 19-23, 29-58, 67-96, 107-135, 143-220
- **Fillers para pular**: 136-142, 162-196

#### 2. Naruto: Shippuden (2007–2017)
- **Episódios**: 500 (com fillers)
- **Essenciais**: Segue o arco principal
- **Fillers para pular**: Episódios 57-71, 91-112, 144-151, 170-171, 176-196...

#### Filmes (assistir quando indicado)
1. Naruto Clássico — Filmes 1-3 (opcionais, não são canon)
2. Shippuden — Filme 4: "The Lost Tower" (após episódio 175)
3. Shippuden — Filme 6: "Road to Ninja" (após episódio 311) ⭐ Recomendado
4. "The Last: Naruto the Movie" (após o episódio 479) ⭐ Canon!

#### 3. Boruto: Naruto Next Generations
- Continuação com o filho de Naruto
- Assista somente após terminar Shippuden

## Sobre os Fillers

Filler é conteúdo não baseado no mangá original. São episódios opcionais que não avançam a história principal. Você pode pular sem perder nada essencial.

## Dica Importante

Se quiser a experiência completa sem fillers, use a lista no site naruto-original.com (externo).`,
  },
  {
    slug: "ordem-para-assistir-demon-slayer",
    title: "Ordem para Assistir Demon Slayer",
    description: "A ordem correta para assistir Kimetsu no Yaiba sem se perder entre temporadas e filmes.",
    icon: "⚔️",
    category: "franquia",
    readTime: 4,
    tags: ["demon slayer", "kimetsu no yaiba", "ordem", "filme"],
    content: `## Demon Slayer: Ordem Simples

Demon Slayer é uma franquia pequena e bem organizada. Não tem fillers nem confusão de timeline.

### Ordem Cronológica

1. **Temporada 1** — Demon Slayer: Kimetsu no Yaiba (26 eps, 2019)
2. **Filme** — Mugen Train (2020) ⭐ Obrigatório! É continuação direta da T1
3. **Temporada 2** — Entertainment District Arc (11 eps, 2021/2022)
   - Os primeiros 7 eps são uma versão estendida do filme Mugen Train
   - Você pode pular os 7 primeiros se já assistiu o filme
4. **Temporada 3** — Swordsmith Village Arc (11 eps, 2023)
5. **Temporada 4** — Hashira Training Arc (8 eps, 2024)

### Preciso assistir o filme no cinema?

Não. O filme está disponível em plataformas de streaming. Mas é altamente recomendado — é um dos maiores filmes de anime da história.

### Tem filler?

Não! Toda Demon Slayer é baseada diretamente no mangá. Sem episódios de enrolação.`,
  },
  {
    slug: "o-que-e-isekai",
    title: "O que é Isekai? Guia Completo",
    description: "Entenda o gênero isekai, como surgiu, por que faz tanto sucesso e quais são os melhores títulos.",
    icon: "🌍",
    category: "genero",
    readTime: 6,
    tags: ["isekai", "genero", "explicacao"],
    content: `## O que é Isekai?

**Isekai** (異世界) significa literalmente "outro mundo" em japonês. É um gênero de anime onde o protagonista é transportado, reencarnado ou preso em outro mundo — geralmente um mundo de fantasia tipo RPG.

### Como funciona?

O herói normalmente sai do mundo real (geralmente Japão contemporâneo) e acaba em um mundo medieval com magia, monstros e sistemas de nível como nos videogames.

### Por que faz tanto sucesso?

- **Fantasia de escapismo**: O espectador se projeta facilmente no protagonista
- **Mecânicas de RPG**: Sistemas de nível, habilidades e inventário agradam fãs de games
- **Mundo novo para explorar**: Permite worldbuilding criativo

### Tipos de Isekai

- **Reencarnação**: Protagonista morre e renasce no outro mundo (Re:Zero, Mushoku Tensei)
- **Invocação**: Protagonista é chamado por habitants do outro mundo (Overlord, Shield Hero)
- **Transferência**: Protagonista é sugado para dentro de um jogo/livro (SAO, Konosuba)

### Melhores Isekai para Começar

1. **Re:Zero** — Drama intenso, protagonista não-invencível
2. **Mushoku Tensei** — Melhor worldbuilding do gênero
3. **KonoSuba** — Paródia hilária e perfeita
4. **Overlord** — Protagonista é o vilão (invertido!)
5. **That Time I Got Reincarnated as a Slime** — Leve e divertido`,
  },
  {
    slug: "o-que-e-shounen",
    title: "O que é Shounen? Os Melhores Títulos",
    description: "Entenda o gênero shounen — o mais popular do mundo dos animes — e descubra os títulos obrigatórios.",
    icon: "💥",
    category: "genero",
    readTime: 5,
    tags: ["shounen", "genero", "naruto", "dragon ball"],
    content: `## O que é Shounen?

**Shounen** (少年) significa "jovem" ou "menino" em japonês. É a categoria demográfica de mangá/anime voltada para o público masculino jovem (12-18 anos), embora seja adorada por pessoas de todas as idades.

### Características do Shounen

- **Protagonista determinado**: O herói nunca desiste, mesmo diante do impossível
- **Poder da amizade**: Laços entre personagens são centrais para a trama
- **Progressão de poder**: O protagonista fica mais forte ao longo da história
- **Batalhas épicas**: Confrontos intensos são marca registrada
- **Humor equilibrado**: A leveza alivia momentos tensos

### O Trio Clássico (Os "Big Three")

1. **Naruto** — Ninja que sonha em se tornar o líder da sua aldeia
2. **Bleach** — Adolescente que vira um ceifador de almas
3. **One Piece** — Pirata em busca do maior tesouro do mundo

### Shounen Modernos Obrigatórios

- **Demon Slayer**: Animação incrível, história emocionante
- **My Hero Academia**: Super-heróis num mundo onde poderes são comuns
- **Jujutsu Kaisen**: Batalhas contra maldições usando energia amaldiçoada
- **Attack on Titan**: Drama sombrio e reviravoltas constantes (mais seinen na proposta)

### Shounen vs. Seinen vs. Shoujo

- **Shounen**: Para jovens, ação e amizade
- **Seinen**: Para adultos, mais complexo e sombrio
- **Shoujo**: Para meninas jovens, mais romance e emoção`,
  },
  {
    slug: "animes-curtos-para-maratonar",
    title: "Animes Curtos para Maratonar no Final de Semana",
    description: "Lista com animes de 12 a 26 episódios que você consegue terminar num fim de semana.",
    icon: "⚡",
    category: "lista",
    readTime: 4,
    tags: ["curto", "maratona", "lista"],
    content: `## Maratona Garantida

Esses animes têm entre 12 e 26 episódios — o tamanho perfeito para maratonar num fim de semana.

### 12-13 Episódios (1 dia)

- **One Punch Man** — Herói invencível existencialmente entediado. Ação + comédia perfeita
- **Spy x Family** — Espião monta família falsa com telepatia e assassina. Adorável
- **Cyberpunk: Edgerunners** — Drama cyberpunk visceral (relacionado ao game)
- **Violet Evergarden** — Obra-prima sobre emoções humanas, animação linda

### 24-26 Episódios (fim de semana)

- **Fullmetal Alchemist: Brotherhood** — Considerado o melhor anime de todos os tempos
- **Death Note** — Thriller psicológico eletrizante
- **Steins;Gate** — Ficção científica sobre viagem no tempo
- **Code Geass** — Estratégia e poder em anime político épico
- **Neon Genesis Evangelion** — O anime que redefiniu o gênero mecha

### Filmes (uma tarde)

- **Your Name** (1h52min) — Romance + fantasia, um dos maiores da história
- **Spirited Away** (2h5min) — Obra-prima do Studio Ghibli
- **A Silent Voice** (2h10min) — Drama sobre bullying, muito emocionante`,
  },
  {
    slug: "o-que-e-seinen",
    title: "O que é Seinen? Os Melhores Títulos para Adultos",
    description: "Entenda o gênero seinen e descubra os animes mais maduros e complexos para o público adulto.",
    icon: "🎭",
    category: "genero",
    readTime: 5,
    tags: ["seinen", "genero", "adultos", "maduro"],
    content: `## O que é Seinen?

**Seinen** (青年) significa "jovem adulto" em japonês. É a categoria de mangá/anime voltada para o público masculino adulto (18+). Os temas são mais complexos, sombrios e maduros do que o shounen.

### Diferenças do Shounen

| Característica | Shounen | Seinen |
|---|---|---|
| Público-alvo | 12-18 anos | 18+ anos |
| Temas | Amizade, superação | Política, filosofia, trauma |
| Protagonista | Determinado, otimista | Complexo, questionável |
| Violência | Moderada | Pode ser intensa |
| Final | Geralmente positivo | Variado, pode ser trágico |

### Seinen Essenciais

1. **Berserk** — Dark fantasy brutal sobre um mercenário em busca de vingança
2. **Vinland Saga** — Guerra, filosofia e redenção na era Viking
3. **Vagabond** — Jornada do samurai Miyamoto Musashi em busca de si mesmo
4. **Monster** — Suspense sobre um médico que salva um assassino em série
5. **Parasyte** — Ficção científica sobre parasitas alienígenas e humanidade
6. **Hellsing Ultimate** — Vampiros e horror com estética sombria`,
  },
  {
    slug: "animes-para-assistir-com-filhos",
    title: "Animes para Assistir com seus Filhos",
    description: "Lista segura e divertida de animes apropriados para crianças e para assistir em família.",
    icon: "👨‍👧",
    category: "lista",
    readTime: 4,
    tags: ["familia", "criancas", "seguro", "studio ghibli"],
    content: `## Anime em Família

O anime não é só para adultos! Muitos títulos são perfeitos para crianças e para assistir junto com a família.

### Filmes do Studio Ghibli (Recomendados para Todas as Idades)

- **My Neighbor Totoro** — Duas irmãs fazem amizade com uma criatura mágica da floresta
- **Spirited Away** — Uma menina precisa resgatar seus pais num mundo espiritual
- **Kiki's Delivery Service** — Uma jovem bruxa começa sua vida independente
- **Castle in the Sky** — Aventura épica de dois jovens e uma ilha voadora
- **Howl's Moving Castle** — Magia, guerra e um castelo que caminha

### Séries Apropriadas para Crianças

- **Pokémon** — Clássico atemporal sobre batalhas e amizades com criaturas
- **Doraemon** — Robô gato do futuro com gadgets mágicos
- **Chi's Sweet Home** — A vida adorável de uma gatinha
- **Yotsuba&!** — Slice of life sobre uma criança curiosa descobrindo o mundo

### Para Crianças Mais Velhas (10+)

- **Fullmetal Alchemist: Brotherhood** — Aventura com lições sobre consequências e sacrifício
- **Spy x Family** — Família falsa muito fofa com humor para todas as idades
- **Violet Evergarden** — Emocionante, com temas de perda e crescimento pessoal`,
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
