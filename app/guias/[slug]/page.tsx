import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GUIDES, getGuideBySlug } from "@/data/mock/guides";
import JsonLd, { articleJsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.animeinfobr.com.br";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guia não encontrado" };

  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: `${guide.title} | AnimeInfoBR`,
      description: guide.description,
      type: "article",
    },
  };
}

function renderMarkdown(content: string): React.ReactNode {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-lg font-bold text-white mt-6 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-xl font-bold text-white mt-8 mb-3">{line.slice(3)}</h2>);
    } else if (line.startsWith("# ")) {
      elements.push(<h1 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.slice(2)}</h1>);
    } else if (line.startsWith("- **")) {
      const match = line.match(/^- \*\*(.+?)\*\*:? ?(.*)$/);
      if (match) {
        elements.push(
          <li key={i} className="text-slate-300 text-sm mb-1 ml-4">
            <strong className="text-white">{match[1]}:</strong>{" "}{match[2]}
          </li>
        );
      } else {
        elements.push(<li key={i} className="text-slate-300 text-sm mb-1 ml-4">{line.slice(2)}</li>);
      }
    } else if (line.startsWith("- ")) {
      elements.push(<li key={i} className="text-slate-300 text-sm mb-1 ml-4 list-disc list-inside">{line.slice(2)}</li>);
    } else if (line.startsWith("|")) {
      // Skip table for simplicity
      i++;
      continue;
    } else if (line.match(/^\d+\. /)) {
      elements.push(<li key={i} className="text-slate-300 text-sm mb-1 ml-4 list-decimal list-inside">{line.replace(/^\d+\. /, "")}</li>);
    } else {
      const html = line
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
      elements.push(
        <p key={i} className="text-slate-300 text-sm leading-relaxed mb-3"
          dangerouslySetInnerHTML={{ __html: html }} />
      );
    }
    i++;
  }

  return <>{elements}</>;
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const related = GUIDES.filter(
    (g) => g.slug !== guide.slug && (g.category === guide.category || g.tags.some((t) => guide.tags.includes(t)))
  ).slice(0, 3);

  const guideUrl = `${SITE_URL}/guias/${guide.slug}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <JsonLd data={articleJsonLd({ title: guide.title, description: guide.description, url: guideUrl, siteUrl: SITE_URL })} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "Início", url: SITE_URL },
        { name: "Guias", url: `${SITE_URL}/guias` },
        { name: guide.title, url: guideUrl },
      ])} />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <span>/</span>
        <Link href="/guias" className="hover:text-white transition-colors">Guias</Link>
        <span>/</span>
        <span className="text-slate-300 line-clamp-1">{guide.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="text-5xl mb-4">{guide.icon}</div>
        <h1 className="text-3xl md:text-4xl font-black font-display text-white mb-3">
          {guide.title}
        </h1>
        <p className="text-slate-400 text-lg">{guide.description}</p>
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <span className="text-slate-500 text-sm">⏱ {guide.readTime} min de leitura</span>
          <div className="flex flex-wrap gap-1">
            {guide.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-white/8 text-slate-400 border border-white/10">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="bg-[#0d1424] rounded-2xl border border-white/8 p-6 md:p-8 mb-10">
        {renderMarkdown(guide.content)}
      </article>

      {/* Related guides */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Guias Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((g) => (
              <Link
                key={g.slug}
                href={`/guias/${g.slug}`}
                className="group p-4 rounded-xl bg-[#0d1424] border border-white/8 hover:border-violet-500/40 transition-all"
              >
                <div className="text-2xl mb-2">{g.icon}</div>
                <h3 className="text-white font-semibold text-sm group-hover:text-violet-300 transition-colors line-clamp-2">
                  {g.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
