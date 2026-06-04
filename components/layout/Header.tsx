"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/anime", label: "Buscar" },
  { href: "/descobrir", label: "Descobrir" },
  { href: "/calendario", label: "Calendário" },
  { href: "/parecidos", label: "Parecidos" },
  { href: "/ranking", label: "Ranking" },
  { href: "/guias", label: "Guias" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="AnimeInfoBR"
              width={200}
              height={56}
              className="h-10 w-auto object-contain"
              style={{ mixBlendMode: "screen" }}
              priority
            />
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
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <Link
              href="/quiz"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl btn-primary text-white text-sm font-semibold"
            >
              🎯 Quiz
            </Link>
            <button
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-colors"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
            >
              {open ? (
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
      {open && (
        <div className="md:hidden border-t border-white/8 bg-[#0d1424]">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
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
            <Link
              href="/quiz"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-2 rounded-xl btn-primary text-white text-sm font-semibold text-center"
            >
              🎯 Fazer Quiz
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
