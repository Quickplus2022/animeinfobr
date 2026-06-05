"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "./AuthContext";
import Link from "next/link";
import AuthModal from "./AuthModal";
import { User, Heart, Clock, LogOut, ChevronDown, ListTodo, Dna } from "lucide-react";

const COLORS: Record<string, string> = {
  violet: "from-violet-600 to-indigo-700",
  cyan: "from-cyan-500 to-blue-600",
  rose: "from-rose-500 to-pink-700",
  amber: "from-amber-500 to-orange-600",
  emerald: "from-emerald-500 to-teal-700",
};

export default function UserMenu() {
  const { user, loading, logout } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (loading) return <div className="w-8 h-8 rounded-full bg-white/8 animate-pulse" />;

  if (!user) {
    return (
      <>
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-sm font-medium transition-all">
          <User size={15} /> Entrar
        </button>
        <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  const initial = (user.name || user.email || "U")[0].toUpperCase();
  const gradient = COLORS[user.avatarColor ?? "violet"] ?? COLORS.violet;

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/8 transition-colors">
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
          {user.avatarEmoji ? <span className="text-base">{user.avatarEmoji}</span> : initial}
        </div>
        <span className="hidden sm:block text-white text-sm font-medium max-w-[100px] truncate">
          {user.username ? `@${user.username}` : user.name || user.email.split("@")[0]}
        </span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
      </button>

      {menuOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[#0d1424] border border-white/12 shadow-2xl overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-white/8 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold shrink-0`}>
              {user.avatarEmoji ? <span className="text-lg">{user.avatarEmoji}</span> : initial}
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">{user.name || "Otaku"}</p>
              <p className="text-slate-500 text-xs truncate">{user.username ? `@${user.username}` : user.email}</p>
            </div>
          </div>
          <div className="p-1">
            <Link href="/perfil" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/8 text-sm transition-colors">
              <User size={15} /> Meu Perfil
            </Link>
            <Link href="/perfil?tab=dna" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/8 text-sm transition-colors">
              <Dna size={15} /> Anime DNA
            </Link>
            <Link href="/minha-lista" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/8 text-sm transition-colors">
              <ListTodo size={15} /> Minha Lista
            </Link>
            <Link href="/perfil?tab=favorites" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/8 text-sm transition-colors">
              <Heart size={15} /> Favoritos
            </Link>
            <Link href="/perfil?tab=watch-later" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/8 text-sm transition-colors">
              <Clock size={15} /> Assistir Depois
            </Link>
          </div>
          <div className="p-1 border-t border-white/8">
            <button onClick={() => { logout(); setMenuOpen(false); }} className="flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm transition-colors">
              <LogOut size={15} /> Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
