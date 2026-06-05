"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import UserMenu from "@/components/auth/UserMenu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { href: "/anime", label: "Buscar" },
  { href: "/descobrir", label: "Descobrir" },
  { href: "/calendario", label: "Calendário" },
  { href: "/parecidos", label: "Parecidos" },
  { href: "/ranking", label: "Ranking" },
  { href: "/guias", label: "Guias" },
  { href: "/glossario", label: "Glossário" },
  { href: "/minha-lista", label: "Minha Lista" },
];

const INTERATIVO_LINKS = [
  { href: "/quiz", label: "🎯 Quiz", description: "Descubra seu anime ideal" },
  { href: "/jogo", label: "🎮 Jogo", description: "Adivinhe o anime", badge: "🔐 Exclusivo" },
  { href: "/duelos", label: "⚔️ Duelos", description: "Vote nos melhores" },
  { href: "/missoes", label: "🗓️ Missões", description: "Ganhe XP diariamente" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isInterativoActive = INTERATIVO_LINKS.some((l) => pathname.startsWith(l.href));

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 bg-white rounded-xl px-2 py-1">
            <Image src="/logo.png" alt="AnimeInfoBR" width={180} height={50} className="h-8 w-auto object-contain" priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  pathname.startsWith(link.href)
                    ? "bg-violet-500/20 text-violet-300"
                    : "text-slate-400 hover:text-white hover:bg-white/8"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Interativo dropdown */}
            <div ref={dropRef} className="relative">
              <button
                onClick={() => setDropOpen((v) => !v)}
                className={cn(
                  "flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  isInterativoActive || dropOpen
                    ? "bg-violet-500/20 text-violet-300"
                    : "text-slate-400 hover:text-white hover:bg-white/8"
                )}
              >
                Interativo
                <ChevronDown size={14} className={cn("transition-transform", dropOpen && "rotate-180")} />
              </button>

              {dropOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-[#0d1424] border border-white/12 rounded-xl shadow-2xl overflow-hidden z-50">
                  {INTERATIVO_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setDropOpen(false)}
                      className={cn(
                        "flex flex-col px-4 py-3 hover:bg-white/8 transition-colors border-b border-white/6 last:border-0",
                        pathname.startsWith(link.href) && "bg-violet-500/10"
                      )}
                    >
                      <span className="text-white text-sm font-semibold">{link.label}</span>
                      <span className="text-slate-500 text-xs">{link.description}</span>
                      {link.badge && <span className="text-amber-500 text-[10px] font-bold mt-0.5">{link.badge}</span>}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right: user + mobile toggle */}
          <div className="flex items-center gap-2">
            <UserMenu />
            <button
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/8 bg-[#0d1424]">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname.startsWith(link.href)
                    ? "bg-violet-500/20 text-violet-300"
                    : "text-slate-400 hover:text-white hover:bg-white/8"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/8 mt-2 pt-2">
              <p className="text-slate-600 text-xs px-3 mb-1 uppercase tracking-wider">Interativo</p>
              {INTERATIVO_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between",
                    pathname.startsWith(link.href)
                      ? "bg-violet-500/20 text-violet-300"
                      : "text-slate-400 hover:text-white hover:bg-white/8"
                  )}
                >
                  <span>{link.label}</span>
                  {link.badge && <span className="text-amber-500 text-[10px] font-bold">{link.badge}</span>}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
