import Link from "next/link";

const LINKS = {
  Explorar: [
    { label: "Buscar Animes", href: "/anime" },
    { label: "Descobrir", href: "/descobrir" },
    { label: "Calendário", href: "/calendario" },
    { label: "Parecidos", href: "/parecidos" },
    { label: "Ranking BR", href: "/ranking" },
  ],
  Conteúdo: [
    { label: "Guias para Iniciantes", href: "/guias" },
    { label: "Quiz de Anime", href: "/quiz" },
    { label: "O que é Isekai?", href: "/guias/o-que-e-isekai" },
    { label: "O que é Shounen?", href: "/guias/o-que-e-shounen" },
    { label: "Ordem para Naruto", href: "/guias/ordem-naruto" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold font-display gradient-text">
              AnimeInfoBR
            </Link>
            <p className="text-slate-400 text-sm mt-3 max-w-xs leading-relaxed">
              O guia brasileiro de animes. Descubra, acompanhe e explore o universo dos animes
              sem spoilers, em português.
            </p>
            <div className="mt-4 p-3 rounded-lg bg-emerald-900/20 border border-emerald-800/30">
              <p className="text-emerald-400 text-xs font-medium">
                ✅ Conteúdo 100% legal. Não hospedamos episódios nem links piratas.
              </p>
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-white font-semibold text-sm mb-3">{group}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-violet-300 text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} AnimeInfoBR. Dados via{" "}
            <a
              href="https://anilist.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              AniList
            </a>
            . Imagens pertencem a seus respectivos detentores.
          </p>
          <p className="text-slate-500 text-xs">
            Assistir legal:{" "}
            <a href="https://www.crunchyroll.com" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300">Crunchyroll</a>
            {" · "}
            <a href="https://www.netflix.com" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300">Netflix</a>
            {" · "}
            <a href="https://www.primevideo.com" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300">Prime Video</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
