"use client";

// metadata exportada em layout separado - client components não exportam metadata
import Link from "next/link";


export default function ContatoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">📬</div>
        <h1 className="text-3xl font-black font-display text-white mb-3">
          Fale Conosco
        </h1>
        <p className="text-slate-400">
          Sugestões de conteúdo, parcerias, erros ou dúvidas? Estamos aqui!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: "💡", title: "Sugestão de anime", desc: "Sugira um anime para adicionarmos aos guias ou rankings" },
          { icon: "🤝", title: "Parceria", desc: "Canais, criadores e marcas relacionadas ao universo anime" },
          { icon: "🐛", title: "Reportar erro", desc: "Encontrou informação errada ou bug no site?" },
        ].map((item) => (
          <div key={item.title} className="p-4 rounded-xl bg-[#0d1424] border border-white/8 text-center">
            <div className="text-3xl mb-2">{item.icon}</div>
            <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
            <p className="text-slate-500 text-xs">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Formulário */}
      <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-6 md:p-8">
        <h2 className="text-lg font-bold text-white mb-6">Enviar mensagem</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-sm mb-1.5">Nome</label>
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-violet-500 rounded-xl text-white placeholder-slate-600 text-sm outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-1.5">E-mail</label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-violet-500 rounded-xl text-white placeholder-slate-600 text-sm outline-none transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1.5">Assunto</label>
            <select className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-violet-500 rounded-xl text-white text-sm outline-none transition-colors">
              <option value="" className="bg-[#0d1424]">Selecione...</option>
              <option value="sugestao" className="bg-[#0d1424]">Sugestão de conteúdo</option>
              <option value="parceria" className="bg-[#0d1424]">Parceria</option>
              <option value="erro" className="bg-[#0d1424]">Reportar erro</option>
              <option value="outro" className="bg-[#0d1424]">Outro</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1.5">Mensagem</label>
            <textarea
              rows={5}
              placeholder="Escreva sua mensagem..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-violet-500 rounded-xl text-white placeholder-slate-600 text-sm outline-none transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 btn-primary text-white font-semibold rounded-xl transition-all"
          >
            Enviar mensagem
          </button>
          <p className="text-slate-600 text-xs text-center">
            Respondemos em até 48 horas úteis. Ao enviar, você concorda com nossa{" "}
            <Link href="/privacidade" className="text-violet-400 hover:text-violet-300">
              Política de Privacidade
            </Link>.
          </p>
        </form>
      </div>
    </div>
  );
}
