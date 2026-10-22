import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  MessageCircle,
  Sparkles,
  ArrowUpRight,
  BadgeCheck,
} from 'lucide-react';
import { Property, OFFICIAL_LOGO_URL, hasPropertyPrice } from '../data/seedProperties';
import assistantAvatarUrl from '../assets/images/assistant-avatar.jpg';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  whatsappContext?: string;
}

interface VirtualAssistantProps {
  whatsappNumber: string;
  properties: Property[];
  onOpenLandingPage?: (slug: string) => void;
}

const QUICK_QUESTIONS = [
  'Como funciona a entrada parcelada?',
  'Financiamento só no término da obra?',
  'Imóveis Minha Casa Minha Vida',
  'Simular financiamento Caixa com FGTS',
];

export const VirtualAssistant: React.FC<VirtualAssistantProps> = ({
  whatsappNumber,
  properties,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [avatarSrc, setAvatarSrc] = useState<string>(assistantAvatarUrl || '/assistant-avatar.jpg');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Olá! Sou a Helena, Concierge Virtual da Imobiliária Fonseca & Cândido. Temos uma condição exclusiva no Minha Casa Minha Vida: parcelamos a sua entrada e o financiamento Caixa só começa quando termina o empreendimento! Como posso te ajudar hoje?',
      whatsappContext:
        'Olá! Vim pela Assistente Virtual do site e gostaria de falar com um consultor de vendas da Imobiliária Fonseca e Cândido.',
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const generateSmartReply = (userQuestion: string): { text: string; whatsappContext: string } => {
    const q = userQuestion.toLowerCase();

    const mcmvList = properties.filter((p) => p.category === 'Minha Casa Minha Vida');
    const luxuryList = properties.filter((p) => p.category === 'Alto Padrão');

    if (
      q.includes('entrada parcelada') ||
      q.includes('parcelamos a entrada') ||
      q.includes('termina') ||
      q.includes('término') ||
      q.includes('obra') ||
      q.includes('quando começa')
    ) {
      return {
        text: 'Exatamente! Na Imobiliária Fonseca & Cândido, a facilidade no Minha Casa Minha Vida é incomparável: parcelamos toda a sua entrada diretamente com a construtora durante a fase de obra, e o financiamento habitacional da Caixa Econômica só começa quando o empreendimento termina e as chaves são entregues! Isso alivia seu orçamento durante a construção. Gostaria de receber uma simulação no WhatsApp?',
        whatsappContext:
          'Olá! Estava conversando com a Helena sobre a entrada parcelada e financiamento que só começa no término da obra. Quero fazer uma simulação personalizada!',
      };
    }

    if (
      q.includes('minha casa') ||
      q.includes('mcmv') ||
      q.includes('235') ||
      q.includes('parque 1453') ||
      q.includes('sonhos') ||
      q.includes('apartamento')
    ) {
      const names = mcmvList
        .map((p) => `${p.title} (${hasPropertyPrice(p) ? p.priceLabel : 'Sob Consulta'})`)
        .join(' e ');
      return {
        text: `No segmento Minha Casa Minha Vida, trabalhamos com: ${names}. Destaque especial: parcelamos toda a sua entrada durante a obra e seu financiamento Caixa só começa quando o empreendimento termina! Aceita FGTS e subsídio federal de até R$ 55 mil. Deseja receber a simulação exata no seu WhatsApp?`,
        whatsappContext:
          'Olá! Estava conversando com a Assistente Virtual sobre os apartamentos Minha Casa Minha Vida com entrada parcelada e financiamento no término da obra.',
      };
    }

    if (
      q.includes('alto padrão') ||
      q.includes('alto padrao') ||
      q.includes('mansão') ||
      q.includes('mansao') ||
      q.includes('luxo') ||
      q.includes('essence') ||
      q.includes('bela vista') ||
      q.includes('villa') ||
      q.includes('palace')
    ) {
      const names = luxuryList
        .map((p) => `${p.title} (${hasPropertyPrice(p) ? p.priceLabel : 'Sob Consulta'})`)
        .join(', ');
      return {
        text: `Nossa coleção Private de Alto Padrão da Imobiliária Fonseca & Cândido conta com propriedades exclusivas: ${names}. São residências com suítes master, lazer resort privativo e segurança máxima. Posso transferir você agora para nosso corretor Private Broker?`,
        whatsappContext:
          'Olá! Vim pela Assistente Virtual e tenho interesse no portfólio de Alto Padrão da Imobiliária Fonseca e Cândido.',
      };
    }

    if (
      q.includes('fgts') ||
      q.includes('entrada') ||
      q.includes('financiamento') ||
      q.includes('caixa') ||
      q.includes('parcela') ||
      q.includes('simular') ||
      q.includes('subsídio') ||
      q.includes('subsidio')
    ) {
      return {
        text: 'A aprovação na Imobiliária Fonseca & Cândido é super ágil! No Minha Casa Minha Vida você pode usar seu FGTS, parcelar toda a entrada durante as obras e começar a pagar o financiamento Caixa somente quando o empreendimento termina. Clique no botão abaixo para receber a simulação oficial no WhatsApp de Vendas!',
        whatsappContext:
          'Olá! Vim pela Assistente Virtual e quero fazer uma simulação oficial com entrada parcelada e financiamento Caixa.',
      };
    }

    return {
      text: `Excelente pergunta! Na Imobiliária Fonseca & Cândido temos desde o Minha Casa Minha Vida (entrada parcelada e financiamento iniciado só no término da obra) até Empreendimentos de Alto Padrão. Para tirar todas as suas dúvidas e receber valores em primeira mão, fale agora com nosso consultor no WhatsApp!`,
      whatsappContext: `Olá! Estava falando com a Assistente Virtual sobre: "${userQuestion}" e gostaria de atendimento no WhatsApp de Vendas.`,
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const cleanText = (textToSend ?? input).trim();
    if (!cleanText) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: cleanText,
    };

    const reply = generateSmartReply(cleanText);
    const botMsg: ChatMessage = {
      id: `bot-${Date.now() + 1}`,
      sender: 'assistant',
      text: reply.text,
      whatsappContext: reply.whatsappContext,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    if (!textToSend) setInput('');
  };

  const buildWhatsAppLink = (customMessage: string) =>
    `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(customMessage)}`;

  return (
    <div className="fixed bottom-4 left-3 sm:bottom-6 sm:left-6 z-40 flex flex-col items-start max-w-[calc(100vw-24px)]">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-24px)] sm:w-[380px] max-h-[76vh] rounded-2xl bg-[#10161F]/98 backdrop-blur-2xl border border-[#D4AF37]/50 shadow-[0_25px_70px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden animate-border-gleam">
          {/* Assistant Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#080C10] via-[#18202B] to-[#080C10] border-b border-[#D4AF37]/35 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#D4AF37] bg-[#080C10] shrink-0 shadow-md">
                <img
                  src={avatarSrc}
                  alt="Helena - Consultora Virtual Fonseca e Cândido"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => setAvatarSrc('/assistant-avatar.jpg')}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#080C10] animate-radar" />
              </div>

              <div className="min-w-0">
                <span className="font-serif-luxury text-xs font-bold text-white tracking-wider flex items-center gap-1.5">
                  <span>HELENA · CONCIERGE</span>
                  <BadgeCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                </span>
                <span className="block text-[11px] text-[#F3E5AB] truncate font-medium">
                  Imobiliária Fonseca &amp; Cândido
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar Assistente Virtual"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Announcement inside chat */}
          <div className="px-3.5 py-1.5 bg-[#D4AF37]/15 border-b border-[#D4AF37]/25 text-[10px] sm:text-[11px] text-[#F3E5AB] font-semibold leading-tight">
            ⭐ <strong>MCMV:</strong> Parcelamos sua entrada e o financiamento começa quando termina a obra!
          </div>

          {/* Messages Feed */}
          <div className="p-3.5 sm:p-4 space-y-3.5 overflow-y-auto max-h-[290px] sm:max-h-[340px] bg-[#080C10]/80">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-end gap-2 max-w-[94%]">
                  {msg.sender === 'assistant' && (
                    <img
                      src={avatarSrc}
                      alt="Helena"
                      loading="eager"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-6 h-6 rounded-full object-cover border border-[#D4AF37]/60 shrink-0 mb-0.5"
                    />
                  )}
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed break-words ${
                      msg.sender === 'user'
                        ? 'bg-[#D4AF37] text-[#080C10] font-bold rounded-br-xs'
                        : 'bg-[#18202B] text-slate-200 border border-[#D4AF37]/30 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>

                {msg.sender === 'assistant' && msg.whatsappContext && (
                  <a
                    href={buildWhatsAppLink(msg.whatsappContext)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 ml-8 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#080C10] font-extrabold text-[11px] transition-all shadow-md hover:scale-102"
                  >
                    <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Continuar no WhatsApp de Vendas</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3.5 py-2.5 bg-[#141C26] border-t border-white/10">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold mb-1.5">
              <Sparkles className="w-3 h-3 shrink-0" />
              <span>Dúvidas Frequentes (Toque para perguntar):</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#080C10] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/25 hover:border-[#D4AF37] text-[11px] text-slate-200 hover:text-[#F3E5AB] transition-colors text-left cursor-pointer font-medium"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#080C10] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua dúvida..."
              className="flex-1 min-w-0 bg-[#18202B] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              type="submit"
              aria-label="Enviar pergunta"
              className="w-9 h-9 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#080C10] flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button with Helena Portrait + Fonseca & Cândido Crest Badge */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Abrir Assistente Virtual"
        className="group relative flex items-center gap-3 p-1.5 sm:p-2 sm:pr-4 rounded-full sm:rounded-2xl bg-[#141C26]/95 hover:bg-[#18202B] border-2 border-[#D4AF37] shadow-[0_10px_35px_rgba(0,0,0,0.85)] transition-all duration-300 hover:scale-105 cursor-pointer animate-gold-radar"
      >
        <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-lg shrink-0 bg-[#080C10]">
          <img
            src={avatarSrc}
            alt="Helena - Assistente Virtual"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            onError={() => setAvatarSrc('/assistant-avatar.jpg')}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {/* Layered brand crest stamp */}
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full overflow-hidden border border-[#D4AF37] bg-[#080C10] shadow-sm">
            <img
              src={OFFICIAL_LOGO_URL}
              alt="Logo Fonseca e Cândido"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-left hidden sm:block">
          <span className="block text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold">
            Imobiliária Fonseca &amp; Cândido
          </span>
          <span className="block text-xs font-extrabold text-white">
            {isOpen ? 'Fechar Atendimento' : 'Helena · Concierge Virtual'}
          </span>
          <span className="block text-[10px] text-[#F3E5AB]">
            Tirar dúvidas sobre MCMV e Entrada
          </span>
        </div>
      </button>
    </div>
  );
};
