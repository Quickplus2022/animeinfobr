// Coloque a meta tag de verificação do Google Search Console aqui
// Pegue em: search.google.com/search-console → Add property → HTML tag

interface GoogleSearchConsoleProps {
  verificationCode: string;
}

export default function GoogleSearchConsole({ verificationCode }: GoogleSearchConsoleProps) {
  if (!verificationCode) return null;
  return <meta name="google-site-verification" content={verificationCode} />;
}
