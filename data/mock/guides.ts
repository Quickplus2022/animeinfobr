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
    description: "Não sabe por onde começar? Esta lista tem os animes perfeitos para quem ainda não assistiu nada, ou quase nada.",
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

Um herói tão poderoso que derrota qualquer inimigo com um único soco, e está entediado com isso. Uma paródia inteligente e hilária do gênero de super-heróis.

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
1. Naruto Clássico: Filmes 1-3 (opcionais, não são canon)
2. Shippuden: Filme 4 "The Lost Tower" (após episódio 175)
3. Shippuden: Filme 6 "Road to Ninja" (após episódio 311) ⭐ Recomendado
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

1. **Temporada 1**: Demon Slayer: Kimetsu no Yaiba (26 eps, 2019)
2. **Filme**: Mugen Train (2020) ⭐ Obrigatório! É continuação direta da T1
3. **Temporada 2**: Entertainment District Arc (11 eps, 2021/2022)
   - Os primeiros 7 eps são uma versão estendida do filme Mugen Train
   - Você pode pular os 7 primeiros se já assistiu o filme
4. **Temporada 3**: Swordsmith Village Arc (11 eps, 2023)
5. **Temporada 4**: Hashira Training Arc (8 eps, 2024)

### Preciso assistir o filme no cinema?

Não. O filme está disponível em plataformas de streaming. Mas é altamente recomendado: é um dos maiores filmes de anime da história.

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

**Isekai** (異世界) significa literalmente "outro mundo" em japonês. É um gênero de anime onde o protagonista é transportado, reencarnado ou preso em outro mundo, geralmente um mundo de fantasia tipo RPG.

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

1. **Re:Zero**: drama intenso com protagonista que sofre consequências reais por cada morte
2. **Mushoku Tensei**: worldbuilding denso com sistema de magia entre os mais detalhados do gênero
3. **KonoSuba**: paródia do isekai com grupo de desajustados absolutamente incompetentes
4. **Overlord**: perspectiva invertida: o protagonista é o vilão do mundo que invadiu
5. **That Time I Got Reincarnated as a Slime**: ritmo leve, boa construção de mundo, divertido sem exigir esforço`,
  },
  {
    slug: "o-que-e-shounen",
    title: "O que é Shounen? Os Melhores Títulos",
    description: "Entenda o gênero shounen, o mais popular do mundo dos animes, e descubra os títulos obrigatórios.",
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

1. **Naruto**: ninja rejeitado pela aldeia que sonha em se tornar Hokage
2. **Bleach**: adolescente que adquire poderes de ceifador de almas para proteger sua família
3. **One Piece**: pirata com corpo de borracha em busca do maior tesouro do mundo

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

Esses animes têm entre 12 e 26 episódios, o tamanho perfeito para maratonar num fim de semana.

### 12-13 Episódios (1 dia)

- **One Punch Man**: herói que derrota qualquer inimigo com um soco e está existencialmente entediado com isso
- **Spy x Family**: espião, assassina e criança telepata formam uma família falsa sem saber uns dos segredos dos outros
- **Cyberpunk: Edgerunners**: drama cyberpunk visceral ambientado no universo do game Cyberpunk 2077
- **Violet Evergarden**: ex-soldada aprende a escrever cartas de amor enquanto descobre o que são emoções humanas

### 24-26 Episódios (fim de semana)

- **Fullmetal Alchemist: Brotherhood**: dois irmãos alquimistas pagam um preço alto por tentar ressuscitar a mãe
- **Death Note**: estudante genial tenta recriar o mundo eliminando criminosos com um caderno sobrenatural
- **Steins;Gate**: pesquisador amador descobre como enviar mensagens ao passado e desestabiliza a linha do tempo
- **Code Geass**: príncipe exilado usa poderes de controle mental para liderar uma revolução contra o próprio país
- **Neon Genesis Evangelion**: adolescentes pilotam robôs gigantes enquanto lidam com traumas e colapso psicológico

### Filmes (uma tarde)

- **Your Name** (1h52min): dois jovens trocam de corpo enquanto dormem e tentam se encontrar
- **Spirited Away** (2h5min): menina de 10 anos fica presa num mundo espiritual e precisa trabalhar para libertar os pais
- **A Silent Voice** (2h10min): jovem que intimidou uma colega surda tenta fazer as pazes anos depois`,
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

1. **Berserk**: mercenário de espada enorme busca vingança contra seu ex-companheiro que o sacrificou por poder. Dark fantasy brutal e influente
2. **Vinland Saga**: filho de guerreiro viking busca vingança enquanto questiona se a violência tem algum sentido
3. **Vagabond**: adaptação da vida de Miyamoto Musashi, samurai que busca ser o melhor de espada e descobre que a batalha real é interior
4. **Monster**: neurocirurgião alemão salva a vida de um menino e anos depois descobre que ele se tornou um assassino serial; decide corrigi-lo
5. **Parasyte**: parasita alienígena toma o braço de um adolescente e os dois são forçados a conviver enquanto outros parasitas devoram humanos
6. **Hellsing Ultimate**: organização britânica usa o vampiro Alucard para combater ameaças sobrenaturais. Violento, estiloso e sem freio`,
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

- **My Neighbor Totoro**: duas irmãs que se mudam para o campo fazem amizade com uma criatura mágica da floresta
- **Spirited Away**: menina de 10 anos fica presa num mundo espiritual e precisa trabalhar para libertar os pais
- **Kiki's Delivery Service**: bruxa jovem se instala numa cidade desconhecida e começa um serviço de entregas para ganhar independência
- **Castle in the Sky**: dois jovens perseguidos por piratas e pelo exército buscam uma ilha voadora lendária
- **Howl's Moving Castle**: jovem amaldiçoada com corpo de velha encontra abrigo no castelo ambulante de um feiticeiro excêntrico

### Séries Apropriadas para Crianças

- **Pokémon**: garoto de 10 anos sai de casa para se tornar mestre Pokémon com seu parceiro Pikachu, clássico de múltiplas gerações
- **Doraemon**: robô gato do século 22 volta ao passado para ajudar um menino azarado com gadgets tecnológicos
- **Chi's Sweet Home**: a vida cotidiana de uma gatinha perdida adotada por uma família. Curto, tranquilo e fofo
- **Yotsuba&!**: não é anime (só mangá), mas vale mencionar: menina de 5 anos descobre o mundo com entusiasmo genuíno e sem filtros

### Para Crianças Mais Velhas (10+)

- **Fullmetal Alchemist: Brotherhood**: aventura de dois irmãos alquimistas com temas de consequência, sacrifício e o preço de brincar de deus
- **Spy x Family**: espião, assassina e criança telepata formam família falsa, com humor leve e personagens irresistíveis para todas as idades
- **Violet Evergarden**: ex-soldada aprende a escrever cartas enquanto entende o que significa sentir. Emocionante sem ser manipulador`,
  },
  {
    slug: "ordem-para-assistir-dragon-ball",
    title: "Ordem Certa para Assistir Dragon Ball Completo",
    description: "Do clássico ao Super: a ordem cronológica correta para assistir toda a franquia Dragon Ball sem se perder.",
    icon: "⚡",
    category: "franquia",
    readTime: 7,
    tags: ["dragon ball", "ordem", "super", "z"],
    content: `## Dragon Ball: A Franquia Completa em Ordem

Dragon Ball é uma das franquias mais longas e complexas do mundo dos animes. Veja a ordem correta:

### Ordem Cronológica Recomendada

#### 1. Dragon Ball (1986–1989)
- 153 episódios
- A infância de Goku, o encontro com Bulma e a busca pelas esferas
- **Pode pular?** Sim, se quiser ir direto para a ação, mas recomendamos assistir

#### 2. Dragon Ball Z (1989–1996)
- 291 episódios (com fillers) / ~200 sem fillers
- A história principal: Saiyajins, Freeza, Cell, Majin Boo
- **Essencial!** A espinha dorsal da franquia

#### 3. Dragon Ball Z Kai (2009–2015)
- Versão remasterizada de DBZ sem fillers
- **Alternativa ao DBZ original**: versão mais curta e sem fillers, com ritmo mais próximo do mangá

#### 4. Dragon Ball GT (1996–1997)
- 64 episódios
- Não é canon: história original, não baseada no mangá
- **Opinião dividida:** muitos fãs pulam

#### 5. Dragon Ball Super (2015–2018)
- 131 episódios
- Canon! Escrito pelo Toriyama. Arcos: Battle of Gods, Frieza, Universe 6, Black Goku, Tournament of Power
- **Obrigatório para fãs modernos**

#### 6. Dragon Ball Super: Broly (2018) - Filme
- Canon! Apresenta o novo Broly
- Assista após o episódio 131 do Super

#### 7. Dragon Ball Super: Super Hero (2022) - Filme
- Canon! Foco em Gohan e Piccolo
- O filme mais recente da franquia

### Filmes Não-Canon (Opcionais)
- DBZ tem 13 filmes clássicos; não são canon mas são divertidos
- Broly Lendário (1993), Fusion (1995) e Battle of Gods (2013) são os mais populares

### Qual ordem para iniciantes?
**Caminho mais fácil:** Dragon Ball Z Kai → Dragon Ball Super → filmes canon`,
  },
  {
    slug: "ordem-para-assistir-attack-on-titan",
    title: "Ordem para Assistir Attack on Titan (Shingeki no Kyojin)",
    description: "A ordem correta para assistir Attack on Titan sem spoilers, incluindo todas as temporadas e o final.",
    icon: "👾",
    category: "franquia",
    readTime: 5,
    tags: ["attack on titan", "shingeki no kyojin", "ordem", "final"],
    content: `## Attack on Titan: Ordem Simples e Sem Spoiler

Attack on Titan (SnK) é linear e sem fillers. Simples de acompanhar:

### Ordem de Exibição

1. **Temporada 1** (25 eps, 2013): apresentação do mundo murado, os titãs e o despertar de Eren
2. **Temporada 2** (12 eps, 2017): revelações sobre a natureza dos titãs e traições dentro das muralhas
3. **Temporada 3 Parte 1** (12 eps, 2018): conspiração política interna e o verdadeiro inimigo dentro do governo
4. **Temporada 3 Parte 2** (10 eps, 2019): o porão de Eren e as revelações que redefinem tudo que veio antes
5. **Temporada 4 Parte 1** (16 eps, 2020/2021): salto temporal. O mundo além das muralhas e a perspectiva de Marley
6. **Temporada 4 Parte 2** (12 eps, 2022): o Rumbling começa e as escolhas impossíveis se multiplicam
7. **Temporada 4 Parte 3** (2 especiais, 2023): final da série

### Total: ~87 episódios + 2 especiais finais

### Tem OVAs?
Sim! Os OVAs são opcionais mas recomendados:
- **No Regrets**: origem do Capitão Levi antes de entrar no Esquadrão de Reconhecimento ⭐ Recomendado
- **Lost Girls**: histórias paralelas de Mikasa e Annie, indicado assistir após a T2

### Devo assistir em ordem de lançamento?
**Sim, absolutamente.** Attack on Titan tem uma narrativa construída com cuidado e cada temporada depende da anterior. Nunca pule episódios.

### Aviso de conteúdo
Attack on Titan tem conteúdo pesado: violência gráfica, morte de personagens importantes e temas sombrios. Não recomendado para menores de 14 anos.`,
  },
  {
    slug: "ordem-para-assistir-jujutsu-kaisen",
    title: "Ordem para Assistir Jujutsu Kaisen",
    description: "A ordem correta para assistir Jujutsu Kaisen incluindo o filme Jujutsu Kaisen 0 e todas as temporadas.",
    icon: "👁️",
    category: "franquia",
    readTime: 4,
    tags: ["jujutsu kaisen", "jjk", "ordem", "filme"],
    content: `## Jujutsu Kaisen: Ordem Correta

Jujutsu Kaisen tem uma ordem simples, mas tem um filme que confunde muita gente:

### Ordem Recomendada

1. **Temporada 1** (24 episódios, 2020/2021)
   - Apresenta Yuji Itadori e o mundo das maldições
   - Obrigatório como primeiro passo

2. **Jujutsu Kaisen 0: O Filme** (2021)
   - Prequel: acontece ANTES da T1 cronologicamente
   - Mas recomendamos assistir DEPOIS da T1 para curtir melhor
   - Apresenta Yuta Okkotsu, personagem importante na T2

3. **Temporada 2** (23 episódios, 2023)
   - Arco Passado de Gojo + Shibuya Incident
   - Considerada uma das melhores temporadas de anime recentes

### Posso assistir o filme antes da T1?
Cronologicamente sim, mas o impacto é maior após a T1. Recomendamos T1 → Filme → T2.

### Devo ler o mangá?
O mangá está adiantado e o anime está em produção. Se quiser continuar após a T2, o mangá é o caminho.

### Sobre a T2: Shibuya Incident
A T2 é intensa e tem mortes importantes. Se você se apegou aos personagens, separe lencinhos.`,
  },
  {
    slug: "melhores-animes-de-acao",
    title: "20 Melhores Animes de Ação de Todos os Tempos",
    description: "Lista definitiva dos melhores animes de ação: de clássicos a lançamentos recentes, com notas e onde assistir.",
    icon: "⚔️",
    category: "lista",
    readTime: 8,
    tags: ["acao", "top", "lista", "melhores"],
    content: `## Os 20 Melhores Animes de Ação

### Top 5: Absolutos
1. **Fullmetal Alchemist: Brotherhood** (★ 9.1): dois irmãos alquimistas enfrentam verdades terríveis sobre o mundo e a si mesmos
2. **Attack on Titan** (★ 9.0): humanidade sobrevive atrás de muros enquanto titãs devoram tudo por fora, mas os segredos reais são muito piores
3. **Demon Slayer** (★ 8.7): animação com padrão cinematográfico, especialmente nas sequências de batalha
4. **Jujutsu Kaisen** (★ 8.6): estudante engole um dedo de demônio e passa a conviver com a maldição mais poderosa da história
5. **Hunter x Hunter (2011)** (★ 9.0): subverte expectativas do shounen: o protagonista não é o mais forte e a série não tem medo de ficar sombria

### Top 6-10: Clássicos Obrigatórios
6. **Naruto Shippuden** (★ 8.6): continuação de Naruto com arcos épicos e uma das melhores batalhas finais do gênero
7. **One Piece** (★ 8.9): franquia de 25 anos com worldbuilding que cresce a cada arco. Quanto mais você assiste, melhor fica
8. **Dragon Ball Z** (★ 8.0): definiu a linguagem visual e narrativa dos animes de batalha nos anos 90
9. **Bleach: TYBW** (★ 8.9): retorno de Bleach após anos, com animação impecável que faz jus ao arco final do mangá
10. **My Hero Academia** (★ 8.5): mundo onde 80% da população tem superpoderes e um garoto sem nenhum sonha em ser herói

### Top 11-20: Para Não Parar de Assistir
11. **Vinland Saga** (★ 8.8): viking dinamarquês busca vingança pela morte do pai enquanto questiona o sentido da guerra
12. **Black Clover** (★ 8.2): garoto sem magia em mundo onde todos têm. Começo lento, mas a segunda metade compensa
13. **Sword Art Online** (★ 7.7): o isekai que popularizou o gênero, com arcos variados em qualidade mas sempre entretenimento garantido
14. **Solo Leveling** (★ 8.5): caçador fraco se torna o mais forte do mundo, com ritmo acelerado e batalhas visualmente impressionantes
15. **Chainsaw Man** (★ 8.5): jovem fusionado com um demônio motosserra trabalha como caçador de demônios em mundo brutal e imprevisível
16. **Mob Psycho 100** (★ 8.8): menino com poderes psíquicos absurdos que prefere não usá-los, com foco no crescimento pessoal
17. **Samurai Champloo** (★ 8.5): dois samurais rivais com estilos opostos protegem uma garota que busca o pai por todo o Japão
18. **Gurren Lagann** (★ 8.7): dois jovens saem do subsolo para enfrentar exércitos alienígenas, com escalada de epicidade progressiva
19. **Noragami** (★ 8.3): deus menor sem templo aceita trabalhos pagos por moedas para ganhar seguidores no Japão contemporâneo
20. **Re:Zero** (★ 8.3): jovem preso num mundo de fantasia revive o mesmo dia repetidamente, carregando memórias de todas as mortes

### Dica de Ordem para Iniciantes em Ação
Comece por: Demon Slayer → Fullmetal Alchemist: Brotherhood → Jujutsu Kaisen`,
  },
  {
    slug: "melhores-animes-de-romance",
    title: "15 Melhores Animes de Romance para se Apaixonar",
    description: "Os animes de romance mais emocionantes e bem avaliados: para chorar, sorrir e se apaixonar junto com os personagens.",
    icon: "💕",
    category: "lista",
    readTime: 6,
    tags: ["romance", "lista", "drama", "top"],
    content: `## Os Melhores Animes de Romance

### Para Chorar (Aviso: tenha lenços)
1. **Violet Evergarden** (★ 8.9): ex-soldada sem braços aprende o significado das palavras "eu te amo" escrevendo cartas para estranhos
2. **Clannad: After Story** (★ 9.1): a vida adulta de Tomoya depois do colégio; começa como romance e termina como tragédia familiar
3. **Your Lie in April** (★ 8.7): pianista que perdeu a capacidade de ouvir as próprias notas reencontra a música por causa de uma violinista
4. **A Silent Voice** (★ 8.9): jovem que intimidou uma colega surda tenta pedir desculpas anos depois. Filme, não série
5. **Anohana** (★ 8.5): grupo de amigos de infância se reúne quando o fantasma de uma deles pede para ter um desejo realizado

### Para Sorrir e Se Sentir Bem
6. **Toradora** (★ 8.4): dois estudantes com má fama ajudam um ao outro a conquistar quem gostam, e acabam se aproximando
7. **Horimiya** (★ 8.3): a garota popular e o garoto estranho descobrem que ambos escondem lados que não mostram na escola
8. **Kaguya-sama: Love is War** (★ 8.5): dois estudantes geniais que se gostam recusam ser os primeiros a confessar, numa batalha de orgulho
9. **Spy x Family** (★ 8.7): não é romance central, mas a dinâmica entre o casal falso tem mais química que a maioria dos animes do gênero
10. **My Dress-Up Darling** (★ 8.3): garoto que faz bonecas ajuda a garota mais popular da escola a criar fantasias de cosplay

### Filmes de Romance Obrigatórios
11. **Your Name (Kimi no Na wa)** (★ 9.0): dois jovens de cidades diferentes trocam de corpo enquanto dormem e tentam se encontrar
12. **Weathering With You** (★ 8.5): adolescente foragido em Tóquio conhece uma garota que consegue abrir clarões no céu chuvoso
13. **The Girl Who Leapt Through Time** (★ 8.2): estudante descobre que pode voltar no tempo e usa o poder em coisas pequenas, até entender o custo disso
14. **5 Centimeters Per Second** (★ 7.9): três histórias sobre distância, saudade e a dificuldade de seguir em frente
15. **I Want to Eat Your Pancreas** (★ 8.5): garoto reservado descobre o diário de uma colega terminal e passa os últimos meses dela com ela`,
  },
  {
    slug: "melhores-animes-isekai",
    title: "Os 15 Melhores Animes Isekai: Guia Completo",
    description: "Lista dos melhores animes isekai de todos os tempos: de clássicos a lançamentos recentes, com sinopse e avaliação.",
    icon: "🌍",
    category: "lista",
    readTime: 7,
    tags: ["isekai", "lista", "top", "recomendacao"],
    content: `## Os Melhores Animes Isekai

### O que é Isekai?
Isekai (異世界 = "outro mundo") são animes onde o protagonista é transportado para um mundo diferente, geralmente de fantasia com elementos de RPG.

### Top 5 Essenciais
1. **Re:Zero** (★ 8.3): protagonista que morre e volta no tempo carrega o trauma de cada morte. O isekai que leva consequências a sério
2. **Mushoku Tensei** (★ 8.5): reencarnação com worldbuilding detalhado, sistema de magia coerente e desenvolvimento de personagem lento mas sólido
3. **That Time I Got Reincarnated as a Slime** (★ 8.1): protagonista reencarna como um slime fraco e, aos poucos, constrói uma nação de monstros
4. **KonoSuba** (★ 8.2): paródia dos tropos do isekai. O grupo é formado por incompetentes que de algum jeito sobrevivem
5. **Overlord** (★ 7.9): jogador fica preso no próprio personagem mago-esqueleto e passa a governar o mundo como o vilão que todos temem

### Para Fãs de Ação
6. **Sword Art Online** (★ 7.7): jogadores presos num RPG virtual morrem de verdade se morrerem no jogo
7. **Log Horizon** (★ 7.8): foco em política, economia e estratégia em vez de batalhas. Como construir uma sociedade dentro de um MMO
8. **The Rising of the Shield Hero** (★ 7.9): herói invocado é traído logo no primeiro dia e precisa reconstruir sua reputação do zero

### Mais Recentes e Populares
9. **Solo Leveling** (★ 8.5): adaptação do manhwa coreano. Caçador fraco que se torna o mais forte, com visual entre os melhores da temporada
10. **Frieren: Beyond Journey's End** (★ 9.2): elfa imortal retorna aos lugares que visitou décadas atrás com antigos companheiros já mortos
11. **Dungeon Meshi** (★ 8.7): aventureiros sem dinheiro resolvem o problema de provisões cozinhando os próprios monstros da dungeon

### Mais Leves / Slice of Life Isekai
12. **The Saint's Magic Power is Omnipotent** (★ 7.5): mulher adulta reencarna como santa em mundo de fantasia e vai com calma. Romance isekai sem pressa
13. **In Another World With My Smartphone** (★ 6.5): isekai sem pretensão, para quando você quer se desligar sem pensar muito
14. **Ascendance of a Bookworm** (★ 8.3): apaixonada por livros reencarna em mundo medieval sem impressão e decide criar livros do zero
15. **Reincarnated as a Sword** (★ 7.2): perspectiva invertida. A história é contada pela espada, não pelo herói`,
  },
  {
    slug: "melhores-animes-psicologicos",
    title: "10 Melhores Animes Psicológicos que Vão Mexer com sua Cabeça",
    description: "Os animes psicológicos mais perturbadores e fascinantes: para quem quer ser desafiado e questionar a realidade.",
    icon: "🧠",
    category: "lista",
    readTime: 6,
    tags: ["psicologico", "thriller", "lista", "mentes"],
    content: `## Animes que Vão Mexer com Sua Cabeça

### O que é anime psicológico?
Animes que exploram a mente humana, realidades alternativas, dilemas morais e questionamentos filosóficos. Geralmente têm reviravoltas inesperadas e personagens complexos.

### Top 10 Psicológicos

1. **Death Note** (★ 8.6): estudante encontra caderno capaz de matar qualquer pessoa e decide usá-lo para "purificar" o mundo, com um detetive gênio tentando pará-lo
2. **Neon Genesis Evangelion** (★ 8.5): adolescente com problemas de abandono pilota robô gigante enquanto o mundo e sua sanidade desmoronam ao redor
3. **Monster** (★ 8.7): médico alemão salva a vida de um menino e anos depois descobre que ele se tornou um assassino serial; decide corrigi-lo
4. **Steins;Gate** (★ 9.1): pesquisador amador cria máquina de mensagens no tempo e desestabiliza a realidade. O custo emocional cresce a cada salto
5. **Paranoia Agent** (★ 8.2): Satoshi Kon investiga a mente coletiva de uma sociedade japonesa que inventou um agressor para fugir das próprias responsabilidades
6. **Serial Experiments Lain** (★ 8.1): adolescente começa a se dissolver entre o mundo real e uma rede virtual. Sobre identidade e presença em 1998, antes da internet ser o que é
7. **Promised Neverland** (★ 8.5): crianças num orfanato descobrem para que são realmente criadas e planejam uma fuga impossível
8. **Made in Abyss** (★ 8.8): começa como aventura de exploração e se transforma em horror existencial conforme os personagens descem para camadas mais profundas do abismo
9. **Psycho-Pass** (★ 8.4): futuro onde um sistema detecta potencial criminoso antes do crime acontecer, e as pessoas que mantêm esse sistema funcionando
10. **Higurashi: When They Cry** (★ 8.0): mesma vila, mesmos personagens, mesmos dias, mas cada arco termina em tragédia diferente e ninguém sabe por quê

### Para Iniciantes no Gênero
Comece com **Death Note**: é acessível e viciante. Depois vá para **Steins;Gate**.`,
  },
  {
    slug: "animes-completos-para-maratonar",
    title: "Animes 100% Completos para Maratonar Sem Parar",
    description: "Lista de animes já finalizados que você pode maratonar do início ao fim sem esperar novos episódios.",
    icon: "📺",
    category: "lista",
    readTime: 5,
    tags: ["completo", "maratona", "finalizado", "lista"],
    content: `## Animes Completos: Sem Espera!

Nada pior que se apaixonar por um anime e descobrir que está incompleto. Esses você pode maratonar agora mesmo:

### Curtos (1 fim de semana)
- **Death Note** (37 eps): thriller psicológico sobre um estudante que tenta dominar o mundo com um caderno sobrenatural
- **Code Geass** (50 eps): príncipe exilado lidera revolução com poder de dar ordens irresistíveis
- **Steins;Gate** (24 eps): pesquisador descobre como enviar mensagens ao passado e desestabiliza a linha do tempo
- **No Game No Life** (12 eps): irmão e irmã gênios em jogos são transportados para um mundo onde tudo se resolve em apostas
- **Gurren Lagann** (27 eps): dois jovens saem do subsolo para enfrentar exércitos alienígenas. A escala cresce absurdamente

### Médios (1-2 semanas)
- **Fullmetal Alchemist: Brotherhood** (64 eps): dois irmãos alquimistas pagam um preço alto por tentar ressuscitar a mãe e tentam corrigi-lo
- **Hunter x Hunter (2011)** (148 eps): menino busca o pai que é um caçador lendário. Os arcos ficam progressivamente mais sombrios e complexos
- **Clannad + After Story** (49 eps): romance de colegial que se transforma em drama familiar pesado na segunda parte
- **Cowboy Bebop** (26 eps): caçadores de recompensas pelo sistema solar em episódios que misturam gêneros sem se fixar em nenhum
- **Samurai Champloo** (26 eps): dois samurais rivais com estilos opostos percorrem o Japão em busca de um homem que cheira a girassol

### Longos (para os dedicados)
- **Gintama** (367 eps): feudal japonês com alienígenas. Comédia que parodia outros animes e raramente erra
- **Fairy Tail** (328 eps): aventura de guilda de magos com laços de amizade no centro de tudo
- **Inuyasha** (193 eps): garota moderna cai num poço e acorda no Japão feudal com um meio-demônio
- **Yu Yu Hakusho** (112 eps): adolescente morre salvando uma criança e é recrutado como detetive do mundo espiritual

### Filmes para Uma Tarde
- **Your Name** (1h52): dois jovens de cidades diferentes trocam de corpo enquanto dormem
- **Spirited Away** (2h5): menina fica presa num mundo espiritual e precisa trabalhar para libertar os pais
- **Akira** (2h4): motoqueiro de gangue de Tóquio enfrenta uma experiência governamental que deu errado. O filme que apresentou anime ao ocidente`,
  },
  {
    slug: "melhores-animes-2024-2025",
    title: "Melhores Animes de 2024 e 2025",
    description: "Os animes mais elogiados e assistidos dos anos 2024 e 2025. Novidades imperdíveis da temporada.",
    icon: "🆕",
    category: "lista",
    readTime: 5,
    tags: ["2024", "2025", "novidades", "lancamentos"],
    content: `## Os Melhores Animes de 2024 e 2025

### Destaques de 2024

#### Primavera 2024
- **Dungeon Meshi (Delicious in Dungeon)** (★ 8.7): aventureiros sem dinheiro resolvem o problema das provisões cozinhando os monstros da dungeon. Mais criativo que parece
- **Frieren: Beyond Journey's End** (continuação) (★ 9.2): elfa imortal percorre os caminhos da antiga jornada e revisita o que ficou. Concluiu em 2024
- **Solo Leveling** (★ 8.5): adaptação do manhwa coreano mais aguardada dos anos recentes, com visual impecável

#### Verão/Outono 2024
- **Bleach: TYBW Parte 3** (★ 8.9): a saga final de Bleach com animação que supera o original em todos os aspectos
- **Dandadan** (★ 8.5): garota que acredita em fantasmas e garoto que acredita em aliens descobrem que os dois estão certos. Romance no meio do caos
- **Demon Slayer: Hashira Training Arc** (★ 8.4): arco de transição que prepara os personagens para o confronto final com Muzan

### Destaques de 2025

- **Demon Slayer: Infinity Castle Arc**: o arco final da série, o mais esperado desde a conclusão do mangá
- **Bleach: Final Arc**: conclusão animada do Thousand-Year Blood War com o mesmo padrão da TYBW
- **Solo Leveling Temporada 2**: Sung Jin-Woo enfrenta ameaças de escala global após os eventos da primeira temporada
- **Dragon Ball Daima**: nova série criada pelo próprio Toriyama antes de sua morte em 2024

### Como acompanhar lançamentos?
Acesse nosso **Calendário da Temporada** para ver todos os animes em exibição agora com datas de episódios.`,
  },
  {
    slug: "melhores-animes-dublados-portugues",
    title: "Melhores Animes Dublados em Português",
    description: "Lista dos melhores animes com dublagem em português brasileiro: para quem prefere assistir sem legendas.",
    icon: "🇧🇷",
    category: "lista",
    readTime: 5,
    tags: ["dublado", "portugues", "brasil", "lista"],
    content: `## Melhores Animes Dublados em Português Brasileiro

### Por que dublado?
Muitos brasileiros preferem assistir sem legendas, especialmente crianças e quem está começando. A dublagem brasileira de anime tem alto nível técnico!

### Clássicos com Ótima Dublagem
- **Dragon Ball Z**: a dublagem que definiu como uma geração de brasileiros ouve a voz do Goku. Lendária e nostálgica
- **Naruto**: dublagem sólida que acompanhou o crescimento do anime no Brasil nos anos 2000
- **Pokémon**: muitos brasileiros conheceram o anime dublado na TV aberta. Voz da Misty e do Ash são icônicas por aqui
- **Cavaleiros do Zodíaco**: uma das dublagens mais marcantes da TV brasileira, com falas que viraram meme
- **Yu-Gi-Oh!**: geração inteira aprendeu as regras do card game ouvindo a dublagem em português

### Modernos Bem Dublados
- **Demon Slayer**: dublagem de alto nível disponível na Crunchyroll, com elenco bem escalado
- **My Hero Academia**: dub BR consistente ao longo de todas as temporadas
- **Attack on Titan**: dublagem dramática que captura bem a tensão do original
- **One Piece**: uma das mais longas dublagens em andamento no Brasil, mantendo qualidade ao longo dos anos
- **Jujutsu Kaisen**: disponível dublado na Crunchyroll BR com boa qualidade de elenco

### Onde assistir dublado?
- **Crunchyroll**: maior catálogo de dub BR para animes em exibição e lançamentos recentes
- **Netflix**: vários animes populares com dublagem, especialmente os que eles co-produzem
- **Amazon Prime Video**: seleção menor, mas com títulos selecionados bem dublados

### Dica
Mesmo amando dublagem, vale experimentar o original em japonês com legenda em português. A performance dos seiyuu (dubladores japoneses) é parte da experiência!`,
  },
  {
    slug: "o-que-e-slice-of-life",
    title: "O que é Slice of Life? Os Melhores Títulos",
    description: "Entenda o gênero slice of life e descubra os animes mais relaxantes e emocionantes sobre a vida cotidiana.",
    icon: "🌸",
    category: "genero",
    readTime: 5,
    tags: ["slice of life", "genero", "cotidiano", "relaxante"],
    content: `## O que é Slice of Life?

**Slice of Life** (fatia de vida) é um gênero que retrata situações cotidianas: escola, amizades, família, trabalho, sem grandes aventuras ou batalhas épicas.

### Por que assistir?
- Relaxante e reconfortante
- Personagens muito bem desenvolvidos
- Emoções autênticas e humanas
- Ótimo para descansar de animes intensos

### Os Melhores Slice of Life

#### Comédia + Escola
- **Nichijou**: situações cotidianas levadas ao absurdo máximo com animação expressiva e ritmo de comédia afiado
- **Azumanga Daioh**: o clássico do gênero. Grupo de amigas do colégio em situações simples e hilárias
- **K-On!**: meninas formam uma banda de rock quase por acidente e passam mais tempo tomando chá do que ensaiando

#### Drama + Emoção
- **Clannad**: romance de colégio que evolui para drama familiar pesado. A segunda parte (After Story) é onde a série realmente acontece
- **Anohana**: grupo de amigos de infância se reúne quando o fantasma de uma delas pede para ter um desejo realizado
- **March Comes in Like a Lion**: jovem enxadrista profissional lida com solidão e depressão enquanto encontra acolhimento numa família vizinha

#### Adulto + Trabalho
- **Shirobako**: bastidores realistas de uma produtora de anime. Cinco amigas que prometeram fazer um anime juntas tentam cumprir a promessa
- **Barakamon**: calígrafo premiado é mandado para ilha remota após agredir um crítico, e aprende sobre simplicidade com os moradores locais
- **Yotsuba&!**: não é anime (só mangá), mas vale mencionar. O slice of life mais puro já feito, sobre uma criança que se maravilha com tudo

#### Moderno e Popular
- **Spy x Family**: espião monta família falsa com uma assassina e uma telepata. Comédia familiar com coração no lugar certo
- **Komi Can't Communicate**: garota com aparência perfeita tem ansiedade social severa e decide tentar fazer 100 amigos com ajuda de um colega paciente`,
  },
  {
    slug: "o-que-e-mecha",
    title: "O que é Mecha? Os Melhores Animes de Robôs Gigantes",
    description: "Entenda o gênero mecha e descubra os melhores animes com robôs gigantes, desde os clássicos ao modernos.",
    icon: "🤖",
    category: "genero",
    readTime: 5,
    tags: ["mecha", "robos", "genero", "evangelion"],
    content: `## O que é Mecha?

**Mecha** (メカ) vem de "mechanical": são animes com robôs gigantes pilotados por humanos. Um dos gêneros mais tradicionais do anime.

### Tipos de Mecha

- **Super Robot**: robôs com poderes mágicos ou absurdos, ênfase em espetáculo e emoção (Gurren Lagann, Mazinger Z)
- **Real Robot**: robôs com física mais plausível, foco em guerra, estratégia e custo humano (Gundam)
- **Eva-type**: mecha como metáfora, com foco em temas psicológicos profundos, identidade e trauma (Evangelion)

### Os Melhores Mecha de Todos os Tempos

#### Clássicos Obrigatórios
1. **Neon Genesis Evangelion** (★ 8.5): adolescentes pilotam robôs gigantes enquanto a humanidade lida com traumas e colapso psicológico coletivo
2. **Mobile Suit Gundam (original)**: o pai do real robot. Robôs com física plausível, foco em guerra e custo humano do conflito
3. **Tengen Toppa Gurren Lagann** (★ 8.7): dois jovens saem do subsolo para enfrentar exércitos alienígenas. A escala de epicidade cresce a cada arco
4. **Code Geass** (★ 8.7): príncipe exilado usa poder de controle mental para liderar uma revolução, jogando xadrez com vidas humanas

#### Modernos Imperdíveis
5. **Darling in the FranXX** (★ 7.3): pilotos pós-apocalípticos operam mechas em pares, com forte carga emocional e relações entre os tripulantes
6. **86: Eighty Six** (★ 8.3): soldados de etnia discriminada pilotam mechas sem nome nem patente, em contato por rádio com comandante que nunca os viu
7. **Aldnoah.Zero** (★ 7.5): guerra entre Terra e colonos de Marte com mechas de tecnologias radicalmente diferentes

#### Para Iniciantes
Comece com **Gurren Lagann**: é o mais acessível e emocionante para quem nunca assistiu mecha.`,
  },
  {
    slug: "animes-baseados-em-jogos",
    title: "Melhores Animes Baseados em Jogos e Games",
    description: "Animes inspirados em videogames, de Pokémon a Cyberpunk: lista dos melhores e onde assistir.",
    icon: "🎮",
    category: "lista",
    readTime: 5,
    tags: ["games", "jogos", "videogame", "lista"],
    content: `## Animes Baseados em Games

### Adaptações Icônicas

#### Franquias Clássicas
- **Pokémon**: anime derivado da franquia de games mais vendida da história. 25+ anos de episódios e ainda em produção
- **Digimon**: série com crianças que entram no mundo digital e criam vínculos com monstros parceiros. Narrativa mais densa que Pokémon
- **Persona 4 / Persona 5**: adaptações dos JRPGs da Atlus. Persona 4 Golden Animation e Persona 5 The Animation mantêm o espírito dos games
- **Tales of Zestiria**: adaptação do RPG de ação da Bandai Namco com o herói Sorey e seus serafins

#### Recentes e Elogiados
- **Cyberpunk: Edgerunners** (★ 8.7): 10 episódios ambientados no universo de Cyberpunk 2077. Garoto de favela tenta sobreviver em Night City
- **Arcane** (não é anime, mas vale): baseada em League of Legends, venceu o Emmy. História de duas irmãs em lados opostos de uma guerra
- **Castlevania** (★ 8.4): Drácula declara guerra à humanidade após sua esposa ser queimada pela Igreja. Adaptação sombria e violenta dos games da Konami
- **The Witcher: Nightmare of the Wolf**: prequel animado focado no mentor de Geralt, antes dos eventos do game

#### Animes com Estética de Game (não baseados, mas com RPG)
- **Sword Art Online**: jogadores presos num RPG virtual onde morrer no jogo significa morrer de verdade
- **Log Horizon**: jogadores presos num MMO que constroem uma sociedade dentro do jogo usando as regras do game a seu favor
- **KonoSuba**: isekai que parodia as mecânicas de RPG. O protagonista chega ao outro mundo com um grupo de aliados absolutamente inúteis`,
  },
  {
    slug: "melhores-animes-curtos-12-episodios",
    title: "Melhores Animes Curtos: 12 Episódios para Assistir Hoje",
    description: "Lista dos melhores animes com apenas 12 episódios: completos, rápidos e impactantes. Perfeitos para maratonar em um dia.",
    icon: "⚡",
    category: "lista",
    readTime: 4,
    tags: ["curto", "12 episodios", "rapido", "maratona"],
    content: `## Animes de 12 Episódios: Qualidade Máxima em Pouco Tempo

12 episódios = aproximadamente 4-5 horas de conteúdo. Você consegue terminar em um dia!

### Os Melhores de 12 Episódios

#### Para Rir
- **KonoSuba**: grupo de desajustados completamente incompetentes sobrevive em mundo de fantasia por pura sorte e caos
- **Daily Lives of High School Boys**: comédia de sketches sobre o cotidiano de três amigos do ensino médio. Sem enredo, só situações absurdas
- **Sabagebu!**: meninas em clube de airsoft resolvem conflitos do dia a dia com violência imaginária e sem remorso

#### Para Chorar
- **Violet Evergarden: Gaiden**: filme spin-off que conta uma história paralela à série. Emocionante mesmo para quem não assistiu tudo
- **Anohana**: 11 episódios sobre um grupo de amigos de infância que se reúne pelo pedido de uma amiga morta

#### Para se Empolgar
- **One Punch Man T1** (★ 8.7): herói que derrota qualquer inimigo com um soco e está existencialmente entediado com o próprio poder
- **Mob Psycho 100 T1** (★ 8.7): menino com poderes psíquicos absurdos que prefere viver normalmente e cresce como pessoa ao longo da série
- **Demon Slayer T1**: os primeiros 26 episódios que mudaram o padrão de animação do gênero, especialmente os episódios finais do arco do Monte Natagumo

#### Para Pensar
- **Erased** (★ 8.3): ilustrador adulto é enviado ao passado toda vez que algo ruim está prestes a acontecer, e usa isso para evitar o assassinato de uma colega de infância
- **The Promised Neverland T1** (★ 8.5): crianças de orfanato descobrem para que são realmente criadas e planejam uma fuga impossível
- **Terror in Resonance** (★ 8.0): dois adolescentes cometem atos terroristas calculados enquanto desafiam a polícia a descobrir seus motivos reais

#### Sci-Fi e Cyberpunk
- **Cyberpunk: Edgerunners** (★ 8.7): 10 episódios no universo de Cyberpunk 2077. O mais visceral e impactante desta lista`,
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
