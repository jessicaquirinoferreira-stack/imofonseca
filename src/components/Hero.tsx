import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Building,
  Sparkles,
  BadgeCheck,
  CheckCircle2,
  CalendarCheck,
} from 'lucide-react';
import { Property, SiteConfig, OFFICIAL_LOGO_URL } from '../data/seedProperties';
import { preloadSingleImage } from '../utils/imagePreloader';

interface HeroProps {
  properties: Property[];
  selectedCategory: 'Todos' | 'Minha Casa Minha Vida' | 'Alto Padrão';
  onSelectCategory: (cat: 'Todos' | 'Minha Casa Minha Vida' | 'Alto Padrão') => void;
  siteConfig: SiteConfig;
  onOpenProperty: (slug: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  properties,
  selectedCategory,
  onSelectCategory,
  siteConfig,
  onOpenProperty,
}) => {
  const heroSlides = properties.length > 0 ? properties : [];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Preload all hero background covers immediately so slide transitions are 0ms
  useEffect(() => {
    heroSlides.forEach((slide) => {
      if (slide.images?.[0]) {
        preloadSingleImage(slide.images[0], true);
      }
    });
  }, [heroSlides]);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const activeProperty = heroSlides[currentSlide];
  const activeBg =
    activeProperty?.images?.[0] ||
    'https://i.postimg.cc/Rh57rHc1/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-6.jpg';

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    'Olá! Gostaria de falar com um Consultor Exclusivo da Imobiliária Fonseca e Cândido para conhecer as condições de entrada parcelada no Minha Casa Minha Vida (financiamento só no término) e imóveis de Alto Padrão.'
  )}`;

  const handleCategoryPick = (cat: 'Todos' | 'Minha Casa Minha Vida' | 'Alto Padrão') => {
    onSelectCategory(cat);
    const el = document.getElementById('vitrine-imoveis');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[85vh] sm:min-h-[88vh] w-full flex flex-col justify-between overflow-hidden border-b border-[#D4AF37]/30 bg-[#080C10]">
      {/* Dynamic Atmospheric Glow Orbs for Living Light Effects */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-[120px] pointer-events-none animate-ambient-pulse" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-amber-600/15 rounded-full blur-[130px] pointer-events-none animate-ambient-pulse [animation-delay:4s]" />

      {/* Background Ken Burns Immersive Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#080C10]">
        <img
          key={activeBg}
          src={activeBg}
          alt={activeProperty?.title || 'Imobiliária Fonseca e Cândido'}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover animate-ken-burns opacity-50"
        />
        {/* Measured multi-layer architectural scrim for WCAG AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C10] via-[#080C10]/85 to-[#080C10]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C10] via-transparent to-[#080C10]/75" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 pt-6 sm:pt-10 pb-8 sm:pb-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <div className="lg:col-span-8 space-y-5 sm:space-y-6 min-w-0">
            {/* Real Estate Exclusivity Seal with Official Logo */}
            <div className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-full bg-[#18202B]/90 border border-[#D4AF37]/45 shadow-[0_0_25px_rgba(212,175,55,0.25)] backdrop-blur-md animate-float">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-[#D4AF37] p-0.5 bg-[#080C10] shrink-0 shadow-xs">
                <img
                  src={OFFICIAL_LOGO_URL}
                  alt="Selo Imobiliária Fonseca e Cândido"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs">
                <span className="font-serif-luxury font-bold text-[#F3E5AB] tracking-wider uppercase">
                  IMOBILIÁRIA FONSECA &amp; CÂNDIDO
                </span>
                <span className="text-[#D4AF37] font-bold">·</span>
                <span className="text-slate-300 font-medium">Financiamento &amp; Crédito Caixa</span>
              </div>
            </div>

            {/* Main Editorial Headline */}
            <h1
              className="font-serif-luxury text-white font-extrabold tracking-tight leading-[1.12] sm:leading-[1.08] break-words"
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 4.1rem)',
                textWrap: 'balance',
              }}
            >
              Conquiste Seu Imóvel: Do Alto Padrão ao Seu{' '}
              <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(212,175,55,0.45)]">
                Minha Casa Minha Vida
              </span>
            </h1>

            {/* Subtitle conveying the value proposition and MCMV financing terms */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Realize o sonho da casa própria com assessoria exclusiva: no <strong className="text-[#F3E5AB]">Minha Casa Minha Vida</strong> parcelamos sua entrada durante a obra e o financiamento habitacional Caixa só começa quando termina o empreendimento! Também contamos com consultoria especializada para imóveis de <strong className="text-white">Alto Padrão</strong>.
            </p>

            {/* Categorized Quick Filter Selector */}
            <div className="pt-1 space-y-2.5">
              <span className="block text-[11px] sm:text-xs uppercase tracking-wider text-slate-300 font-semibold">
                Navegar por Categoria de Empreendimento:
              </span>
              <div className="flex flex-wrap sm:inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-[#18202B]/90 backdrop-blur-md border border-[#D4AF37]/35 w-full sm:w-auto shadow-md">
                {(['Todos', 'Minha Casa Minha Vida', 'Alto Padrão'] as const).map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryPick(cat)}
                      className={`flex-1 sm:flex-initial text-center px-3.5 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        active
                          ? 'bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-[#080C10] shadow-[0_0_22px_rgba(212,175,55,0.5)] scale-102'
                          : 'text-slate-300 hover:text-[#F3E5AB] hover:bg-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Metallic Gold CTA + Live Plantão Badge */}
            <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-[#080C10] font-extrabold text-xs sm:text-base text-center shadow-[0_0_35px_rgba(212,175,55,0.45)] hover:shadow-[0_0_50px_rgba(252,246,186,0.7)] hover:scale-102 transition-all uppercase tracking-wider"
              >
                <span>Falar com Consultor Exclusivo no WhatsApp</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              </a>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#121820]/90 border border-white/10 text-xs text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-radar shrink-0" />
                <span>Simulação gratuita Caixa em até 24 horas</span>
              </div>
            </div>
          </div>

          {/* Active Slide Spotlight Card with Living Golden Border */}
          {activeProperty && (
            <div className="lg:col-span-4 min-w-0">
              <div className="rounded-2xl bg-[#141C26]/95 backdrop-blur-xl border border-[#D4AF37]/45 hover:border-[#D4AF37] p-4 sm:p-6 space-y-3.5 sm:space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_0_35px_rgba(212,175,55,0.25)] transition-all duration-300 relative group">
                {/* Brand Seal on Card */}
                <div className="flex items-center justify-between gap-2 text-xs text-[#F3E5AB]">
                  <span className="flex items-center gap-1.5 font-bold tracking-wider uppercase text-[10px] text-[#D4AF37]">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Seleção Fonseca &amp; Cândido
                  </span>
                  <span className="font-mono tabular-nums px-2 py-0.5 rounded bg-black/60 border border-[#D4AF37]/30 text-white shrink-0">
                    0{currentSlide + 1} / 0{heroSlides.length}
                  </span>
                </div>

                <div>
                  <div className="text-xs text-slate-300 flex items-center gap-1.5">
                    <span className="font-semibold text-[#F3E5AB]">{activeProperty.category}</span>
                    <span>·</span>
                    <span className="text-slate-400">{activeProperty.status}</span>
                  </div>
                  <h2 className="font-serif-luxury text-lg sm:text-2xl font-bold text-white mt-1 break-words leading-tight group-hover:text-[#F3E5AB] transition-colors">
                    {activeProperty.title}
                  </h2>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed">
                  {activeProperty.highlight}
                </p>

                {/* Clear condition label if MCMV */}
                {activeProperty.category === 'Minha Casa Minha Vida' && (
                  <div className="p-2.5 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[11px] text-[#F3E5AB] leading-snug">
                    <strong className="text-white">Pagamento Facilitado:</strong> Entrada parcelada e financiamento Caixa iniciado somente no término da obra.
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-slate-400">Valor de Investimento</span>
                    <span className="font-mono tabular-nums text-lg sm:text-xl font-extrabold text-[#D4AF37]">
                      {activeProperty.priceLabel}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenProperty(activeProperty.slug)}
                    className="btn-gold-shimmer px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#080C10] text-xs font-bold transition-all cursor-pointer shrink-0 shadow-md"
                  >
                    Ver Detalhes →
                  </button>
                </div>

                {/* Slide selector bars */}
                <div className="flex items-center gap-1.5 pt-1">
                  {heroSlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      aria-label={`Ver ${slide.title}`}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === currentSlide
                          ? 'w-9 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]'
                          : 'w-3 bg-white/20 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full-width Architectural Proof Strip below Hero */}
      <div className="relative z-10 w-full bg-[#10161F]/95 backdrop-blur-xl border-t border-[#D4AF37]/25 shadow-lg">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-5 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300">
          <div className="flex items-start gap-3 p-2 rounded-xl bg-black/20 border border-white/5">
            <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-bold block">Entrada Parcelada &amp; Caixa no Final:</strong>
              <span className="text-slate-300">
                No Minha Casa Minha Vida, a entrada é parcelada durante as obras e o financiamento só começa quando o empreendimento termina.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2 rounded-xl bg-black/20 border border-white/5">
            <Building className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-bold block">Imobiliária Fonseca &amp; Cândido:</strong>
              <span className="text-slate-300">
                Credenciamento direto e consultoria para o melhor enquadramento de taxas na Caixa e Alto Padrão.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2 rounded-xl bg-black/20 border border-white/5">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-bold block">Plantão de Atendimento Oficial:</strong>
              <span className="text-slate-300">
                Atendimento humanizado com consultores certificados pelo WhatsApp oficial +55 35 99716-4518.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
