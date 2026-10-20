import React from 'react';
import { Lock, Phone, Mail, MapPin, Instagram, Facebook, Youtube, Sparkles, ShieldCheck } from 'lucide-react';
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
    <footer className="bg-[#080C10] border-t-2 border-[#D4AF37]/35 text-slate-300 relative overflow-hidden">
      {/* Background Subtle Luxury Light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-60 bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-14 sm:py-18 pb-26 sm:pb-18 space-y-12 sm:space-y-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Brand Pavilion Column — Maximum Prominence */}
          <div className="lg:col-span-6 space-y-5 min-w-0">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-0.5 bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] to-[#AA7C11] shadow-[0_0_25px_rgba(212,175,55,0.4)] shrink-0">
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#080C10]">
                  <img
                    src={OFFICIAL_LOGO_URL}
                    alt="Imobiliária Fonseca e Cândido"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase block leading-none">
                  Imobiliária Oficial
                </span>
                <span
                  style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
                  className="text-base sm:text-2xl font-black tracking-[0.08em] bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent block break-words mt-1"
                >
                  FONSECA &amp; CÂNDIDO
                </span>
                <span className="text-[10px] sm:text-xs text-slate-300 font-medium block mt-0.5">
                  Negócios Imobiliários · {siteConfig.creci}
                </span>
              </div>
            </div>

            {/* Minha Casa Minha Vida Commitment Box */}
            <div className="p-4 rounded-xl bg-[#141C26] border border-[#D4AF37]/35 space-y-1.5 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F3E5AB]">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Facilidade Exclusiva Minha Casa Minha Vida</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Parcelamos a sua entrada diretamente com a construtora durante a fase de obra e o <strong className="text-white">financiamento Caixa só começa quando termina o empreendimento!</strong>
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
              Consultoria imobiliária de alta performance. Estruturação documental completa, aprovação de crédito ágil junto à Caixa Econômica Federal e atendimento com discrição absoluta para residenciais de Alto Padrão.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4 min-w-0">
            <h4 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Segmentos &amp; Serviços</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Minha Casa Minha Vida')}
                  className="hover:text-[#F3E5AB] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="text-[#D4AF37]">✦</span>
                  <span>Minha Casa Minha Vida (Entrada Parcelada)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Alto Padrão')}
                  className="hover:text-[#F3E5AB] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="text-[#D4AF37]">✦</span>
                  <span>Coleção Mansões &amp; Alto Padrão</span>
                </button>
              </li>
              <li>
                <a href="#simulador-caixa" className="hover:text-[#F3E5AB] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D4AF37]">✦</span>
                  <span>Simulador Oficial Caixa Online</span>
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-[#F3E5AB] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D4AF37]">✦</span>
                  <span>Segurança Jurídica &amp; Due Diligence</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="lg:col-span-3 space-y-4 min-w-0">
            <h4 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider">
              Atendimento Oficial
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="font-mono tabular-nums text-white font-bold">+55 35 99716-4518</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="break-all text-slate-300">{siteConfig.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                <span className="break-words text-slate-300">{siteConfig.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              {siteConfig.instagram && (
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram da Imobiliária Fonseca e Cândido"
                  className="w-10 h-10 rounded-xl bg-[#141C26] hover:bg-[#D4AF37] text-slate-300 hover:text-[#080C10] flex items-center justify-center transition-all shadow-sm hover:scale-110"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {siteConfig.facebook && (
                <a
                  href={siteConfig.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook da Imobiliária Fonseca e Cândido"
                  className="w-10 h-10 rounded-xl bg-[#141C26] hover:bg-[#D4AF37] text-slate-300 hover:text-[#080C10] flex items-center justify-center transition-all shadow-sm hover:scale-110"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {siteConfig.youtube && (
                <a
                  href={siteConfig.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Canal no YouTube da Imobiliária Fonseca e Cândido"
                  className="w-10 h-10 rounded-xl bg-[#141C26] hover:bg-[#D4AF37] text-slate-300 hover:text-[#080C10] flex items-center justify-center transition-all shadow-sm hover:scale-110"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()}{' '}
            <strong className="text-white">Imobiliária Fonseca &amp; Cândido</strong>. Todos os direitos reservados.
          </p>

          <button
            type="button"
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 text-slate-400 hover:text-[#F3E5AB] text-xs transition-colors cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Acesso Administrativo</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
