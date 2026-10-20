import React, { useState } from 'react';
import { Menu, X, Sparkles, Building2, ShieldCheck } from 'lucide-react';
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
    'Olá! Gostaria de um atendimento exclusivo com um consultor da Imobiliária Fonseca e Cândido para conhecer as condições do Minha Casa Minha Vida (entrada parcelada e financiamento no término) e Alto Padrão.'
  )}`;

  const handleMobileNav = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080C10]/95 backdrop-blur-xl border-b border-[#D4AF37]/35 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      {/* Dynamic Golden Announcement Ribbon — Minha Casa Minha Vida & Fonseca e Cândido */}
      <div className="w-full bg-gradient-to-r from-[#18202B] via-[#221808] to-[#18202B] border-b border-[#D4AF37]/30 py-1.5 px-3 sm:px-6 overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between text-[11px] sm:text-xs">
          {/* Animated Marquee Strip */}
          <div className="flex items-center gap-3 overflow-hidden flex-1 select-none">
            <div className="flex items-center gap-2 shrink-0 bg-[#0B0F14]/90 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-radar shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-bold text-[#F3E5AB] tracking-wider uppercase">
                Plantão de Vendas Ativo
              </span>
            </div>

            <div className="overflow-hidden relative w-full mask-linear">
              <div className="animate-marquee whitespace-nowrap text-slate-200 font-medium flex items-center gap-8">
                <span className="inline-flex items-center gap-2 text-[#F3E5AB]">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <strong className="text-white font-bold">MINHA CASA MINHA VIDA:</strong> Parcelamos toda a sua entrada direto com a construtora! O financiamento Caixa começa apenas quando o empreendimento termina.
                </span>
                <span className="text-[#D4AF37] font-serif-luxury">✦</span>
                <span className="inline-flex items-center gap-2 text-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <strong className="text-white font-bold">IMOBILIÁRIA FONSECA &amp; CÂNDIDO:</strong> Credenciamento oficial Caixa Econômica Federal e Consultoria Private de Alto Padrão.
                </span>
                <span className="text-[#D4AF37] font-serif-luxury">✦</span>
                <span className="inline-flex items-center gap-2 text-[#F3E5AB]">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <strong className="text-white font-bold">MINHA CASA MINHA VIDA:</strong> Entrada 100% Parcelada durante a obra · Financiamento Caixa só na entrega das chaves.
                </span>
                <span className="text-[#D4AF37] font-serif-luxury">✦</span>
                <span className="inline-flex items-center gap-2 text-slate-200">
                  <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Aproveite seu FGTS + Subsídios de até R$ 55 mil · Atendimento VIP imediato.
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 shrink-0 pl-4 border-l border-white/10 text-slate-300 font-mono text-[11px]">
            <span>WhatsApp:</span>
            <span className="text-[#D4AF37] font-bold">+55 35 99716-4518</span>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-2 sm:gap-6 px-3.5 sm:px-6 lg:px-12 h-18 sm:h-22">
        {/* Zone 1: Maximum Prominence Brand Logo & Crest */}
        <button
          type="button"
          onClick={() => handleMobileNav(onNavigateHome)}
          className="flex items-center gap-3 sm:gap-4.5 text-left group cursor-pointer min-w-0 focus:outline-none py-1"
        >
          {/* Glowing Golden Crest Frame - Maximized size within navbar without expanding menu height */}
          <div className="relative w-14 h-14 sm:w-[74px] sm:h-[74px] rounded-xl p-0.5 bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] to-[#AA7C11] shadow-[0_0_22px_rgba(212,175,55,0.5)] group-hover:shadow-[0_0_32px_rgba(252,246,186,0.75)] group-hover:scale-102 transition-all duration-300 shrink-0">
            <div className="w-full h-full rounded-[10px] overflow-hidden bg-[#080C10] flex items-center justify-center p-0.5">
              <img
                src={OFFICIAL_LOGO_URL}
                alt="Imobiliária Fonseca e Cândido"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Subtle corner sparkle dot */}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FCF6BA] shadow-[0_0_8px_#FCF6BA]" />
          </div>

          {/* Expanded Brand Typography without span:nth-of-type(3) */}
          <div className="flex flex-col min-w-0 justify-center">
            <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase leading-none drop-shadow-xs">
              Imobiliária
            </span>
            <span
              style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
              className="text-base sm:text-xl lg:text-2xl font-extrabold tracking-[0.05em] sm:tracking-[0.14em] bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(212,175,55,0.55)] group-hover:drop-shadow-[0_0_22px_rgba(252,246,186,0.85)] transition-all duration-300 leading-tight mt-0.5"
            >
              FONSECA &amp; CÂNDIDO
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs lg:text-sm font-semibold text-slate-300">
          <button
            type="button"
            onClick={() => {
              onNavigateHome();
              onSelectCategory('Todos');
            }}
            className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 cursor-pointer relative py-1 group"
          >
            <span>Empreendimentos</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
          </button>

          <button
            type="button"
            onClick={() => {
              onNavigateHome();
              onSelectCategory('Minha Casa Minha Vida');
            }}
            className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 cursor-pointer relative py-1 group flex items-center gap-1.5"
          >
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/40 font-mono">
              MCMV
            </span>
            <span>Minha Casa Minha Vida</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
          </button>

          <button
            type="button"
            onClick={() => {
              onNavigateHome();
              onSelectCategory('Alto Padrão');
            }}
            className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 cursor-pointer relative py-1 group"
          >
            <span>Alto Padrão</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
          </button>

          <a
            href="#diferenciais"
            onClick={onNavigateHome}
            className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 relative py-1 group"
          >
            <span>Diferenciais</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
          </a>

          <button
            type="button"
            onClick={onOpenSimulador}
            className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 cursor-pointer relative py-1 group"
          >
            <span>Simulador Caixa</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-shimmer px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-[#0B0F14] font-bold text-[11px] sm:text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(252,246,186,0.65)] hover:scale-102 transition-all whitespace-nowrap shrink-0"
          >
            Consultor Exclusivo
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Abrir Menu de Navegação"
            className="md:hidden w-10 h-10 rounded-xl bg-[#18202B] border border-[#D4AF37]/45 text-[#F3E5AB] flex items-center justify-center shrink-0 cursor-pointer shadow-md"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080C10]/98 border-t border-[#D4AF37]/30 px-4 py-4 space-y-2.5 shadow-2xl">
          {/* Prominent Real Estate Stamp in Mobile Menu */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#18202B] to-[#0B0F14] border border-[#D4AF37]/35 flex items-center gap-3 mb-2">
            <img
              src={OFFICIAL_LOGO_URL}
              alt="Logo Fonseca e Cândido"
              className="w-10 h-10 rounded-lg object-cover border border-[#D4AF37]/50 shrink-0"
            />
            <div className="min-w-0">
              <span className="text-[10px] uppercase text-[#D4AF37] font-bold block">
                Atendimento Oficial
              </span>
              <span className="font-serif-luxury text-sm font-bold text-white block">
                Imobiliária Fonseca &amp; Cândido
              </span>
            </div>
          </div>

          {/* Quick Notice in Drawer */}
          <div className="p-2.5 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[11px] text-[#F3E5AB] leading-snug">
            <strong>Condição Especial MCMV:</strong> Entrada 100% parcelada durante a obra e financiamento Caixa só começa quando o empreendimento termina!
          </div>

          <button
            type="button"
            onClick={() =>
              handleMobileNav(() => {
                onNavigateHome();
                onSelectCategory('Todos');
              })
            }
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-[#F3E5AB]"
          >
            Todos os Empreendimentos
          </button>

          <button
            type="button"
            onClick={() =>
              handleMobileNav(() => {
                onNavigateHome();
                onSelectCategory('Minha Casa Minha Vida');
              })
            }
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#F3E5AB] bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-between"
          >
            <span>Minha Casa Minha Vida (Entrada Parcelada)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#D4AF37] text-[#0B0F14] font-bold">
              CAIXA
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleMobileNav(() => {
                onNavigateHome();
                onSelectCategory('Alto Padrão');
              })
            }
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-[#F3E5AB]"
          >
            Coleção Alto Padrão &amp; Mansões
          </button>

          <button
            type="button"
            onClick={() =>
              handleMobileNav(() => {
                onNavigateHome();
                const el = document.getElementById('diferenciais');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              })
            }
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-[#F3E5AB]"
          >
            Diferenciais &amp; Segurança Jurídica
          </button>

          <button
            type="button"
            onClick={() =>
              handleMobileNav(() => {
                onOpenSimulador();
              })
            }
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#18202B] border border-white/10 hover:border-[#D4AF37]/50"
          >
            Simulador de Financiamento Caixa
          </button>

          <div className="pt-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-shimmer w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-[#0B0F14] font-bold text-xs uppercase tracking-wider text-center"
            >
              Falar no WhatsApp Oficial
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
