import Script from "next/script";

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID ?? "";

export default function GoogleAdSense() {
  if (!ADSENSE_ID || process.env.NODE_ENV !== "production") return null;
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

// Componente para anúncio inline - use nas páginas
interface AdUnitProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

export function AdUnit({ slot, format = "auto", className }: AdUnitProps) {
  if (!ADSENSE_ID || process.env.NODE_ENV !== "production") {
    return (
      <div className={`flex items-center justify-center bg-white/5 border border-dashed border-white/10 rounded-xl text-slate-600 text-xs ${className ?? "h-24"}`}>
        [Espaço para anúncio]
      </div>
    );
  }
  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <Script id={`adsense-${slot}`} strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  );
}
