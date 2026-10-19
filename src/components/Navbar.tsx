import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { OFFICIAL_LOGO_URL, SiteConfig } from '../data/seedProperties';

interface NavbarProps {
  siteConfig: SiteConfig;
  onNavigateHome: () => void;
  onSelectCategory: (category: 'Todos' | 'Minha Casa Minha Vida' | 'Alto Padrão') => void;
  onOpenSimulador: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  siteConfig,
  onNavigateHome,
  onSelectCategory,
  onOpenSimulador,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappHref = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    'Olá! Gostaria de um atendimento exclusivo com um consultor da Imobiliária Fonseca e Cândido.'
  )}`;

  const handleMobileNav = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0F14]/95 backdrop-blur-md border-b border-[#D4AF37]/20">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-2 sm:gap-6 px-3.5 sm:px-6 lg:px-12 h-16 sm:h-20">
        {/* Zone 1: Brand Wordmark + Official Logo */}
        <button
          type="button"
          onClick={() => handleMobileNav(onNavigateHome)}
          className="flex items-center gap-2 sm:gap-3.5 text-left group cursor-pointer min-w-0 focus:outline-none"
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg overflow-hidden border border-[#D4AF37]/40 bg-[#121820] shrink-0">
            <img
              src={OFFICIAL_LOGO_URL}
              alt="Imobiliária Fonseca e Cândido"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
            className="text-xs sm:text-lg lg:text-xl font-bold tracking-[0.08em] sm:tracking-[0.2em] bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(212,175,55,0.45)] group-hover:drop-shadow-[0_0_20px_rgba(252,246,186,0.75)] transition-all duration-300 leading-tight"
          >
            FONSECA &amp; CÂNDIDO
          </span>
        </button>

        {/* Zone 2: 4–5 Single-Line Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-300">
          <button
            type="button"
            onClick={() => {
              onNavigateHome();
              onSelectCategory('Todos');
            }}
            className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Empreendimentos
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigateHome();
              onSelectCategory('Alto Padrão');
            }}
            className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Alto Padrão
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigateHome();
              onSelectCategory('Minha Casa Minha Vida');
            }}
            className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Minha Casa Minha Vida
          </button>
          <a
            href="#diferenciais"
            onClick={onNavigateHome}
            className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0"
          >
            Diferenciais
          </a>
          <button
            type="button"
            onClick={onOpenSimulador}
            className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Simulador Caixa
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-shimmer px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-[#0B0F14] font-semibold text-[11px] sm:text-sm tracking-wide shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] transition-all whitespace-nowrap shrink-0"
          >
            Consultor Exclusivo
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Abrir Menu de Navegação"
            className="md:hidden w-9 h-9 rounded-lg bg-[#18202B] border border-[#D4AF37]/35 text-[#F3E5AB] flex items-center justify-center shrink-0 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0F14]/98 border-t border-[#D4AF37]/20 px-4 py-4 space-y-2">
          <button
            type="button"
            onClick={() =>
              handleMobileNav(() => {
                onNavigateHome();
                onSelectCategory('Todos');
              })
            }
            className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-[#F3E5AB]"
          >
            Todos os Empreendimentos
          </button>
          <button
            type="button"
            onClick={() =>
              handleMobileNav(() => {
                onNavigateHome();
                onSelectCategory('Alto Padrão');
              })
            }
            className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-[#F3E5AB]"
          >
            Alto Padrão &amp; Mansões
          </button>
          <button
            type="button"
            onClick={() =>
              handleMobileNav(() => {
                onNavigateHome();
                onSelectCategory('Minha Casa Minha Vida');
              })
            }
            className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-[#F3E5AB]"
          >
            Minha Casa Minha Vida
          </button>
          <a
            href="#diferenciais"
            onClick={() => handleMobileNav(onNavigateHome)}
            className="block w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-[#F3E5AB]"
          >
            Diferenciais Exclusivos
          </a>
          <button
            type="button"
            onClick={() => handleMobileNav(onOpenSimulador)}
            className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#D4AF37] hover:bg-white/5"
          >
            Simulador de Financiamento Caixa
          </button>
        </div>
      )}
    </header>
  );
};
