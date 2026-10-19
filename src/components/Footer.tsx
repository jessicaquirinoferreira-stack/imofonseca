import React from 'react';
import { Lock, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { OFFICIAL_LOGO_URL, SiteConfig } from '../data/seedProperties';

interface FooterProps {
  siteConfig: SiteConfig;
  onOpenAdmin: () => void;
  onSelectCategory: (cat: 'Todos' | 'Minha Casa Minha Vida' | 'Alto Padrão') => void;
}

export const Footer: React.FC<FooterProps> = ({
  siteConfig,
  onOpenAdmin,
  onSelectCategory,
}) => {
  return (
    <footer className="bg-[#0B0F14] border-t border-[#D4AF37]/25 text-slate-400">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 pb-24 sm:pb-16 space-y-10 sm:space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4 min-w-0">
            <div className="flex items-center gap-3.5">
              <img
                src={OFFICIAL_LOGO_URL}
                alt="Imobiliária Fonseca e Cândido"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border border-[#D4AF37]/40 shrink-0"
              />
              <div className="min-w-0">
                <span className="font-serif-luxury text-base sm:text-lg font-bold text-white tracking-wider block break-words">
                  IMOBILIÁRIA FONSECA &amp; CÂNDIDO
                </span>
                <span className="text-xs text-[#D4AF37]">{siteConfig.creci}</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Especialistas em aprovação habitacional Minha Casa Minha Vida junto à Caixa
              Econômica Federal e curadoria de mansões e empreendimentos de Alto Padrão.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3 min-w-0">
            <h4 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider">
              Segmentos de Atuação
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Alto Padrão')}
                  className="hover:text-[#F3E5AB] transition-colors cursor-pointer text-left"
                >
                  Coleção Alto Padrão &amp; Mansões
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Minha Casa Minha Vida')}
                  className="hover:text-[#F3E5AB] transition-colors cursor-pointer text-left"
                >
                  Minha Casa Minha Vida (Subsídio Caixa)
                </button>
              </li>
              <li>
                <a href="#simulador-caixa" className="hover:text-[#F3E5AB] transition-colors">
                  Simulador de Financiamento Online
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="lg:col-span-4 space-y-3 min-w-0">
            <h4 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider">
              Atendimento &amp; Canais Oficiais
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="font-mono tabular-nums text-white">+55 35 99716-4518</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="break-all">{siteConfig.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                <span className="break-words">{siteConfig.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              {siteConfig.instagram && (
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg bg-[#18202B] hover:bg-[#D4AF37] text-slate-300 hover:text-[#0B0F14] flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {siteConfig.facebook && (
                <a
                  href={siteConfig.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-lg bg-[#18202B] hover:bg-[#D4AF37] text-slate-300 hover:text-[#0B0F14] flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {siteConfig.youtube && (
                <a
                  href={siteConfig.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-lg bg-[#18202B] hover:bg-[#D4AF37] text-slate-300 hover:text-[#0B0F14] flex items-center justify-center transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar with EXACT Center Restricted Admin Trigger */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-xs">
          <div className="text-center md:text-left text-slate-500">
            © {new Date().getFullYear()} Imobiliária Fonseca e Cândido. Todos os direitos reservados.
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-[#F3E5AB] hover:bg-white/5 border border-transparent hover:border-[#D4AF37]/30 transition-all cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>Área Administrativa | Acesso Restrito</span>
            </button>
          </div>

          <div className="text-center md:text-right text-slate-500">
            Alto Padrão &amp; Minha Casa Minha Vida
          </div>
        </div>
      </div>
    </footer>
  );
};
