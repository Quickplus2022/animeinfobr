import type { Metadata } from "next";
import MinhaListaClient from "./MinhaListaClient";

export const metadata: Metadata = {
  title: "Minha Lista de Animes | AnimeInfoBR",
  description: "Sua lista pessoal de animes: quero assistir, assistindo, já assisti e favoritos.",
};

export default function MinhaListaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black font-display text-white mb-2">📋 Minha Lista</h1>
        <p className="text-slate-400">Seus animes organizados por status. Salvo localmente no seu dispositivo.</p>
      </div>
      <MinhaListaClient />
    </div>
  );
}
