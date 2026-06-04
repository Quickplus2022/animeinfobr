import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato — AnimeInfoBR",
  description: "Entre em contato com a equipe do AnimeInfoBR. Sugestões, parcerias, dúvidas ou reportar problemas.",
};

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
