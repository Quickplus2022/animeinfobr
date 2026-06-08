export interface NewsArticle {
  id: string;
  title: string;
  link: string;
  description: string;
  pubDate: string;
  isoDate: string;
  source: string;
  sourceLang: "pt" | "en";
  category: "anime" | "rpg" | "cultura" | "curiosidade";
  imageUrl?: string;
}

const RSS_SOURCES = [
  {
    url: "https://www.animenewsnetwork.com/newsroom/rss.xml",
    name: "Anime News Network",
    lang: "en" as const,
    category: "anime" as const,
  },
  {
    url: "https://www.siliconera.com/feed/",
    name: "Siliconera",
    lang: "en" as const,
    category: "anime" as const,
  },
  {
    url: "https://www.nerdbunker.com.br/feed/",
    name: "NerdBunker",
    lang: "pt" as const,
    category: "cultura" as const,
  },
  {
    url: "https://omelete.uol.com.br/rss/todas-as-noticias",
    name: "Omelete",
    lang: "pt" as const,
    category: "cultura" as const,
  },
];

function extractText(raw: string): string {
  return raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/<[^>]+>/g, "").trim();
}

function extractCDATA(raw: string, tagStart: string, tagEnd: string): string {
  const match = raw.match(new RegExp(`${tagStart}([\\s\\S]*?)${tagEnd}`));
  return match ? extractText(match[1]) : "";
}

function extractImage(itemText: string): string | undefined {
  const enclosure = itemText.match(/enclosure[^>]+url="([^"]+)"/i)?.[1];
  if (enclosure && /\.(jpg|jpeg|png|webp)/i.test(enclosure)) return enclosure;
  const mediaThumbnail = itemText.match(/media:thumbnail[^>]+url="([^"]+)"/i)?.[1];
  if (mediaThumbnail) return mediaThumbnail;
  const mediaContent = itemText.match(/media:content[^>]+url="([^"]+)"/i)?.[1];
  if (mediaContent && /\.(jpg|jpeg|png|webp)/i.test(mediaContent)) return mediaContent;
  const imgSrc = itemText.match(/<img[^>]+src="([^"]+)"/i)?.[1];
  if (imgSrc && /\.(jpg|jpeg|png|webp)/i.test(imgSrc)) return imgSrc;
  return undefined;
}

function parseDate(raw: string): string {
  if (!raw) return new Date().toISOString();
  try { return new Date(raw).toISOString(); } catch { return new Date().toISOString(); }
}

async function fetchFeed(source: (typeof RSS_SOURCES)[0]): Promise<NewsArticle[]> {
  try {
    const res = await fetch(source.url, {
      next: { revalidate: 21600 },
      headers: { "User-Agent": "AnimeInfoBR/1.0 (+https://www.animeinfobr.com.br)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const text = await res.text();

    const items: NewsArticle[] = [];

    // RSS 2.0 — match <item>...</item>
    const rssMatches = [...text.matchAll(/<item>([\s\S]*?)<\/item>/g)];
    for (const m of rssMatches) {
      const t = m[1];
      const title = extractCDATA(t, "<title>", "<\\/title>");
      const link =
        extractCDATA(t, "<link>", "<\\/link>") ||
        t.match(/<guid[^>]*>(https?:\/\/[^\s<]+)<\/guid>/)?.[1] ||
        "";
      if (!title || !link) continue;
      const desc = extractCDATA(t, "<description>", "<\\/description>");
      const pubDate = extractCDATA(t, "<pubDate>", "<\\/pubDate>");
      items.push({
        id: Buffer.from(link).toString("base64").slice(0, 16),
        title: title.slice(0, 120),
        link,
        description: desc.slice(0, 200),
        pubDate,
        isoDate: parseDate(pubDate),
        source: source.name,
        sourceLang: source.lang,
        category: source.category,
        imageUrl: extractImage(t),
      });
    }

    // Atom 1.0 — match <entry>...</entry>
    if (items.length === 0) {
      const atomMatches = [...text.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
      for (const m of atomMatches) {
        const t = m[1];
        const title = extractCDATA(t, "<title[^>]*>", "<\\/title>");
        const link = t.match(/href="(https?:\/\/[^"]+)"/)?.[1] || "";
        if (!title || !link) continue;
        const summary = extractCDATA(t, "<summary[^>]*>", "<\\/summary>");
        const published = extractCDATA(t, "<published>", "<\\/published>");
        items.push({
          id: Buffer.from(link).toString("base64").slice(0, 16),
          title: title.slice(0, 120),
          link,
          description: summary.slice(0, 200),
          pubDate: published,
          isoDate: parseDate(published),
          source: source.name,
          sourceLang: source.lang,
          category: source.category,
          imageUrl: extractImage(t),
        });
      }
    }

    return items.slice(0, 15);
  } catch {
    return [];
  }
}

export async function fetchAllNews(): Promise<NewsArticle[]> {
  const results = await Promise.allSettled(RSS_SOURCES.map(s => fetchFeed(s)));
  const all: NewsArticle[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") all.push(...r.value);
  }
  all.sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime());
  // Deduplicate by link
  const seen = new Set<string>();
  return all.filter(a => { if (seen.has(a.link)) return false; seen.add(a.link); return true; });
}

export function formatRelativeDate(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `há ${mins}min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `há ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `há ${days}d`;
  return new Date(isoDate).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}
