"use client";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  return (
    <html>
      <body style={{ background: "#0d1424", color: "white", fontFamily: "monospace", padding: "2rem" }}>
        <h1 style={{ color: "#f87171" }}>Erro de Servidor</h1>
        <p><strong>Digest:</strong> {error.digest}</p>
        <p><strong>Message:</strong> {error.message}</p>
        <pre style={{ background: "#1e293b", padding: "1rem", borderRadius: "8px", overflow: "auto", fontSize: "12px", whiteSpace: "pre-wrap" }}>
          {error.stack}
        </pre>
        <button onClick={() => window.location.reload()} style={{ marginTop: "1rem", padding: "0.5rem 1rem", background: "#7c3aed", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
          Recarregar
        </button>
      </body>
    </html>
  );
}
