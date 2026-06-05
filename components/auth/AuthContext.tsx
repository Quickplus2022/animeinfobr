"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  username: string | null;
  avatarEmoji: string | null;
  avatarColor: string | null;
}

interface AuthCtx {
  user: AuthUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string | null, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const Ctx = createContext<AuthCtx>({
  user: null, loading: true,
  refresh: async () => {}, login: async () => {}, register: async () => {}, logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();
      setUser(data ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.toLowerCase().trim(), password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erro ao entrar.");
    setUser({ id: data.id, email: data.email, name: data.name ?? null, username: data.username ?? null, avatarEmoji: data.avatarEmoji ?? null, avatarColor: data.avatarColor ?? null });
  }, []);

  const register = useCallback(async (name: string | null, email: string, password: string) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email: email.toLowerCase().trim(), password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erro ao criar conta.");
    setUser({ id: data.id, email: data.email, name: data.name ?? null, username: null, avatarEmoji: null, avatarColor: null });
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return (
    <Ctx.Provider value={{ user, loading, refresh, login, register, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() { return useContext(Ctx); }
