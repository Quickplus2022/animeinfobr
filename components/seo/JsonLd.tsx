interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function websiteJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AnimeInfoBR",
    url: siteUrl,
    description: "Portal brasileiro de descoberta e recomendação de animes",
    inLanguage: "pt-BR",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/anime?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleJsonLd({
  title,
  description,
  url,
  datePublished,
  siteUrl,
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  siteUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    inLanguage: "pt-BR",
    datePublished: datePublished ?? new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: { "@type": "Organization", name: "AnimeInfoBR", url: siteUrl },
    publisher: {
      "@type": "Organization",
      name: "AnimeInfoBR",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/og-image.png` },
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function itemListJsonLd({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: Array<{ name: string; url: string; image?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    url,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
      ...(item.image ? { image: item.image } : {}),
    })),
  };
}

export function videoObjectJsonLd({
  name,
  description,
  embedUrl,
}: {
  name: string;
  description: string;
  embedUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    embedUrl,
  };
}
