import type { Metadata } from "next";
import RecommenderClient from "./RecommenderClient";

export const metadata: Metadata = {
  title: "Descobrir Animes — Recomendador Inteligente",
  description:
    "Responda 5 perguntas e descubra o anime perfeito para você hoje. Sem cadastro, sem spoilers. Recomendações personalizadas em português.",
};

export default function DescrobrirPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] hero-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="text-3xl md:text-4xl font-black font-display text-white mb-3">
            Recomendador Inteligente
          </h1>
          <p className="text-slate-400 text-lg">
            Responda 5 perguntas rápidas e receba recomendações personalizadas. Sem cadastro, sem spoilers.
          </p>
        </div>
        <RecommenderClient />
      </div>
    </div>
  );
}
