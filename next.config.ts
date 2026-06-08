import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  // Scripts: próprio site + Google Analytics/AdSense (necessários)
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google-analytics.com https://googletagservices.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://adservice.google.com",
  // Estilos + Google Fonts
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Fontes
  "font-src 'self' https://fonts.gstatic.com",
  // Imagens: CDNs de anime + RSS news images + data URIs
  "img-src 'self' data: blob: https:",
  // Conexões: APIs usadas
  "connect-src 'self' https://graphql.anilist.co https://api.jikan.moe https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net",
  // Frames: AdSense
  "frame-src https://pagead2.googlesyndication.com https://www.google.com https://googleads.g.doubleclick.net",
  // Proibido embeder este site em iframes externos
  "frame-ancestors 'none'",
  // Sem plugins (Flash etc.)
  "object-src 'none'",
  // Base URL restrita
  "base-uri 'self'",
  // Formulários só para o próprio site
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "s4.anilist.co" },
      { protocol: "https", hostname: "img.anili.st" },
      { protocol: "https", hostname: "media.kitsu.app" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Anti-sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Anti-clickjacking (redundante com frame-ancestors no CSP)
          { key: "X-Frame-Options", value: "DENY" },
          // Referrer controlado
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // HSTS: 1 ano, incluindo subdomínios
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          // Desabilita recursos desnecessários
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          // Content Security Policy
          { key: "Content-Security-Policy", value: CSP },
          // Evita que o browser detecte XSS em navegadores legados
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
};

export default nextConfig;
