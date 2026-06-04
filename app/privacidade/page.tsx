import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade do AnimeInfoBR. Saiba como coletamos, usamos e protegemos seus dados conforme a LGPD.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "04 de junho de 2026";

export default function PrivacidadePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black font-display text-white mb-2">
          Política de Privacidade
        </h1>
        <p className="text-slate-500 text-sm">Última atualização: {LAST_UPDATED}</p>
      </div>

      <div className="space-y-8 text-slate-300 leading-relaxed">
        <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-6 md:p-8 space-y-6">

          <section>
            <h2 className="text-lg font-bold text-white mb-3">1. Quem somos</h2>
            <p>
              O <strong className="text-white">AnimeInfoBR</strong> (<strong>www.animeinfobr.com.br</strong>) é um portal de informações e recomendações de anime para o público brasileiro. Não somos uma plataforma de streaming e não hospedamos conteúdo audiovisual.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">2. Dados que coletamos</h2>
            <p className="mb-3">Coletamos apenas dados necessários para o funcionamento do site:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">•</span><span><strong className="text-white">Dados de navegação:</strong> páginas visitadas, tempo de sessão e origem do tráfego, via Google Analytics 4.</span></li>
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">•</span><span><strong className="text-white">Dados técnicos:</strong> tipo de dispositivo, navegador e sistema operacional (não identificam o usuário).</span></li>
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">•</span><span><strong className="text-white">E-mail (opcional):</strong> apenas se você se cadastrar na nossa newsletter futura, com seu consentimento explícito.</span></li>
            </ul>
            <p className="mt-3">
              <strong className="text-white">Não coletamos:</strong> nome, CPF, endereço, cartão de crédito ou qualquer dado sensível.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">3. Como usamos seus dados</h2>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">•</span><span>Analisar o tráfego e melhorar a experiência do site</span></li>
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">•</span><span>Entender quais conteúdos são mais relevantes para os usuários</span></li>
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">•</span><span>Enviar comunicações (apenas com seu consentimento)</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">4. Cookies</h2>
            <p className="mb-3">Utilizamos cookies para:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">•</span><span><strong className="text-white">Cookies funcionais:</strong> necessários para o funcionamento do site</span></li>
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">•</span><span><strong className="text-white">Cookies analíticos:</strong> Google Analytics 4 para análise de tráfego anônimo</span></li>
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">•</span><span><strong className="text-white">Cookies de publicidade:</strong> Google AdSense (quando ativo) para exibir anúncios relevantes</span></li>
            </ul>
            <p className="mt-3">Você pode desativar cookies nas configurações do seu navegador, mas algumas funcionalidades podem ser afetadas.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">5. Google Analytics e AdSense</h2>
            <p className="mb-3">
              Utilizamos o <strong className="text-white">Google Analytics 4</strong> para análise de audiência. Os dados são processados pelo Google conforme a{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300">
                Política de Privacidade do Google
              </a>.
            </p>
            <p>
              Podemos utilizar o <strong className="text-white">Google AdSense</strong> para exibir anúncios. O Google pode usar cookies para exibir anúncios baseados em visitas anteriores ao nosso site ou a outros sites.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">6. Fontes de dados externas</h2>
            <p>
              As informações sobre animes (títulos, sinopses, imagens, notas) são fornecidas pela <strong className="text-white">AniList API</strong> (<a href="https://anilist.co" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300">anilist.co</a>), conforme seus termos de uso. O AnimeInfoBR não armazena essas informações em seu próprio banco de dados.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">7. Seus direitos (LGPD)</h2>
            <p className="mb-3">Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">•</span><span>Confirmar se tratamos seus dados pessoais</span></li>
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">•</span><span>Solicitar acesso, correção ou exclusão dos seus dados</span></li>
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">•</span><span>Revogar o consentimento para uso de e-mail</span></li>
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">•</span><span>Solicitar a portabilidade dos dados</span></li>
            </ul>
            <p className="mt-3">Para exercer esses direitos, entre em contato pelo nosso formulário de contato.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">8. Segurança</h2>
            <p>
              Utilizamos HTTPS em todo o site, hospedagem segura na Vercel e não armazenamos dados sensíveis de usuários. Nosso banco de dados não contém informações pessoais identificáveis.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">9. Menores de idade</h2>
            <p>
              O AnimeInfoBR não coleta intencionalmente dados de menores de 13 anos. O conteúdo do site é voltado para o público geral interessado em anime, sem conteúdo adulto.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">10. Alterações nesta política</h2>
            <p>
              Podemos atualizar esta política periodicamente. A data de última atualização sempre será indicada no topo desta página. O uso continuado do site após alterações constitui aceitação das novas condições.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">11. Contato</h2>
            <p>
              Dúvidas sobre esta política? Entre em contato através da nossa{" "}
              <a href="/contato" className="text-violet-400 hover:text-violet-300">página de contato</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
