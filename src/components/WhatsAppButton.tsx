import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  whatsappNumber: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ whatsappNumber }) => {
  const defaultMessage =
    'Olá! Gostaria de uma simulação exclusiva de financiamento com a Imobiliária Fonseca e Cândido.';
  const href = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp Online Agora"
        className="group flex items-center gap-3 p-2.5 sm:px-4 sm:py-3 rounded-full sm:rounded-2xl bg-[#18202B]/95 hover:bg-[#121820] border border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(0,0,0,0.65)] transition-all duration-200 hover:-translate-y-0.5"
      >
        <div className="text-right hidden sm:block">
          <span className="block text-[10px] uppercase tracking-wider text-[#F3E5AB] font-semibold">
            Online Agora
          </span>
          <span className="block text-xs font-bold text-white">
            Simulação via WhatsApp
          </span>
        </div>
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full sm:rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA7C11] text-[#0B0F14] flex items-center justify-center shadow-md shrink-0">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
        </div>
      </a>
    </div>
  );
};
