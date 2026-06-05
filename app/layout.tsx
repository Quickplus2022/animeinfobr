import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/seo/GoogleAnalytics";
import GoogleAdSense from "@/components/seo/GoogleAdSense";
import { AuthProvider } from "@/components/auth/AuthContext";
import RadioPlayer from "@/components/radio/RadioPlayer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.animeinfobr.com.br"),
  title: {
    default: "AnimeInfoBR — Descubra seu próximo anime",
    template: "%s | AnimeInfoBR",
  },
  description:
    "Descubra seu próximo anime em menos de 1 minuto. Recomendações personalizadas, calendário da temporada, guias e rankings para o público brasileiro.",
  keywords: ["anime", "animes", "recomendação de anime", "anime brasil", "assistir anime", "calendário anime", "animes 2025", "animes dublados"],
  authors: [{ name: "AnimeInfoBR" }],
  creator: "AnimeInfoBR",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.animeinfobr.com.br",
    siteName: "AnimeInfoBR",
    title: "AnimeInfoBR — Descubra seu próximo anime",
    description: "O guia brasileiro de animes. Recomendações inteligentes, calendário e muito mais.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AnimeInfoBR" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnimeInfoBR",
    description: "Descubra seu próximo anime em menos de 1 minuto.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  other: {
    "google-adsense-account": "ca-pub-7129245850691372",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen flex flex-col">
        <GoogleAnalytics measurementId={GA_ID} />
        <GoogleAdSense />
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <RadioPlayer />
        </AuthProvider>
      </body>
    </html>
  );
}
