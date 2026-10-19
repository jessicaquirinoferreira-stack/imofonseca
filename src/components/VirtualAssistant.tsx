import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  MessageCircle,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { Property } from '../data/seedProperties';
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
  'Quais são os imóveis Minha Casa Minha Vida?',
  'Como funciona a entrada e o FGTS?',
  'Quais são as mansões de Alto Padrão?',
  'Quero simular meu financiamento Caixa',
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
      text: 'Olá! Sou a Helena, Assistente Virtual da Imobiliária Fonseca e Cândido. Posso tirar dúvidas rápidas sobre nossos empreendimentos Minha Casa Minha Vida, Mansões de Alto Padrão, uso do FGTS ou simulação Caixa. Como posso ajudar você hoje?',
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
      q.includes('minha casa') ||
      q.includes('mcmv') ||
      q.includes('235') ||
      q.includes('parque 1453') ||
      q.includes('sonhos') ||
      q.includes('apartamento')
    ) {
      const names = mcmvList.map((p) => `${p.title} (${p.priceLabel})`).join(' e ');
      return {
        text: `No segmento Minha Casa Minha Vida, trabalhamos com destaque para: ${names}. Ambos oferecem subsídio do Governo Federal pela Caixa, uso do saldo de FGTS, entrada parcelada e condomínio fechado com área de lazer completa! Deseja receber a simulação exata das parcelas no seu WhatsApp?`,
        whatsappContext:
          'Olá! Estava conversando com a Assistente Virtual sobre os apartamentos Minha Casa Minha Vida (R$ 235.000,00) e quero fazer minha simulação no WhatsApp.',
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
      const names = luxuryList.map((p) => `${p.title} (${p.priceLabel})`).join(', ');
      return {
        text: `Nossa coleção Private de Alto Padrão conta com propriedades exclusivas: ${names}. São imóveis com suítes amplas, arquitetura autoral, lazer resort e segurança máxima. Posso transferir você agora para nosso corretor Private Broker agendar uma apresentação?`,
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
        text: 'A aprovação na Imobiliária Fonseca e Cândido é super rápida! Você pode usar seu FGTS para abater na entrada, parcelar o restante diretamente com a construtora e contar com as menores taxas da Caixa Econômica Federal. Clique no botão abaixo para enviar seus dados básicos e receber o cálculo oficial no WhatsApp de Vendas!',
        whatsappContext:
          'Olá! Vim pela Assistente Virtual e quero fazer uma simulação de financiamento Caixa usando meu FGTS/Renda.',
      };
    }

    if (
      q.includes('endereço') ||
      q.includes('endereco') ||
      q.includes('local') ||
      q.includes('onde fica') ||
      q.includes('visita') ||
      q.includes('telefone') ||
      q.includes('contato')
    ) {
      return {
        text: 'Nosso atendimento é realizado com hora marcada ou imediatamente pelo nosso WhatsApp Oficial de Vendas (+55 35 99716-4518). Clique abaixo para falar direto com nosso especialista e agendar sua visita ao decorado ou empreendimento!',
        whatsappContext:
          'Olá! Vim pela Assistente Virtual e gostaria de agendar uma visita / atendimento com a Imobiliária Fonseca e Cândido.',
      };
    }

    return {
      text: `Excelente pergunta! Temos opções desde o Minha Casa Minha Vida (a partir de R$ 235.000,00 com subsídio Caixa) até Empreendimentos de Alto Padrão (de R$ 1,85M a R$ 4,2M). Para te passar os valores exatos de entrada, parcelas e disponibilidade atualizada, clique abaixo para falar direto no nosso WhatsApp de Vendas!`,
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
    <div className="fixed bottom-4 left-3 sm:bottom-5 sm:left-5 z-40 flex flex-col items-start max-w-[calc(100vw-24px)]">
      {/* Chat Window — Responsive width that always fits 100% inside mobile viewport */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-24px)] sm:w-[375px] max-h-[75vh] rounded-2xl bg-[#121820]/98 backdrop-blur-xl border border-[#D4AF37]/45 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden">
          {/* Assistant Header */}
          <div className="px-3.5 sm:px-4 py-3 bg-gradient-to-r from-[#0B0F14] via-[#18202B] to-[#0B0F14] border-b border-[#D4AF37]/30 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#D4AF37] bg-[#0B0F14] shrink-0">
                <img
                  src={avatarSrc}
                  alt="Helena - Consultora Virtual Fonseca e Cândido"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => setAvatarSrc('/assistant-avatar.jpg')}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="font-serif-luxury text-xs font-bold text-white tracking-wider block">
                  HELENA · CONCIERGE
                </span>
                <span className="block text-[11px] text-[#F3E5AB]">
                  Assistente Fonseca &amp; Cândido
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

          {/* Messages Feed */}
          <div className="p-3.5 sm:p-4 space-y-3.5 overflow-y-auto max-h-[290px] sm:max-h-[340px] bg-[#0B0F14]/70">
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
                        ? 'bg-[#D4AF37] text-[#0B0F14] font-semibold rounded-br-xs'
                        : 'bg-[#18202B] text-slate-200 border border-[#D4AF37]/20 rounded-bl-xs'
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
                    className="mt-2 ml-8 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#F3E5AB] hover:text-[#0B0F14] border border-[#D4AF37]/40 text-[11px] font-bold transition-colors"
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

          {/* Quick Suggestion Chips — Wrapped so every question is 100% visible */}
          <div className="px-3.5 py-2.5 bg-[#121820] border-t border-white/10">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1.5">
              <Sparkles className="w-3 h-3 shrink-0" />
              <span>Dúvidas Frequentes (Toque para perguntar):</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#0B0F14] hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/40 text-[11px] text-slate-200 hover:text-[#F3E5AB] transition-colors text-left cursor-pointer"
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
            className="p-3 bg-[#0B0F14] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua dúvida sobre os imóveis..."
              className="flex-1 min-w-0 bg-[#18202B] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              type="submit"
              aria-label="Enviar pergunta"
              className="w-9 h-9 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0F14] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button on Bottom-Left with Real Human Portrait */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Abrir Assistente Virtual"
        className="group flex items-center gap-3 p-1.5 sm:p-2 sm:pr-4 rounded-full sm:rounded-2xl bg-[#18202B]/95 hover:bg-[#121820] border border-[#D4AF37]/60 shadow-[0_10px_30px_rgba(0,0,0,0.75)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
      >
        <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md shrink-0 bg-[#0B0F14]">
          <img
            src={avatarSrc}
            alt="Helena - Assistente Virtual"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            onError={() => setAvatarSrc('/assistant-avatar.jpg')}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="text-left hidden sm:block">
          <span className="block text-[10px] uppercase tracking-wider text-[#F3E5AB] font-semibold">
            Helena · Assistente Virtual
          </span>
          <span className="block text-xs font-bold text-white">
            {isOpen ? 'Fechar Atendimento' : 'Tirar Dúvidas Rápidas'}
          </span>
        </div>
      </button>
    </div>
  );
};
