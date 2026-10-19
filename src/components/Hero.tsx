import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, ShieldCheck, Building } from 'lucide-react';
import { Property, SiteConfig } from '../data/seedProperties';
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
    'https://i.postimg.cc/YCnD5dj1/Whats-App-Image-2026-10-19-at-16-26-30.jpg';

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    'Olá! Gostaria de falar com um Consultor Exclusivo da Imobiliária Fonseca e Cândido para conhecer as condições de financiamento e imóveis disponíveis.'
  )}`;

  const handleCategoryPick = (cat: 'Todos' | 'Minha Casa Minha Vida' | 'Alto Padrão') => {
    onSelectCategory(cat);
    const el = document.getElementById('vitrine-imoveis');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[82vh] sm:min-h-[86vh] w-full flex flex-col justify-between overflow-hidden border-b border-[#D4AF37]/20">
      {/* Background Ken Burns Immersive Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0B0F14]">
        <img
          key={activeBg}
          src={activeBg}
          alt={activeProperty?.title || 'Imobiliária Fonseca e Cândido'}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover animate-ken-burns opacity-55"
        />
        {/* Measured multi-layer architectural scrim for WCAG AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14] via-[#0B0F14]/85 to-[#0B0F14]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-transparent to-[#0B0F14]/70" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-14 pb-8 sm:pb-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <div className="lg:col-span-8 space-y-5 sm:space-y-6 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-medium tracking-wider sm:tracking-widest uppercase text-[#F3E5AB]">
              <span>Imobiliária Fonseca e Cândido</span>
              <span aria-hidden="true">·</span>
              <span>Curadoria Patrimonial &amp; Habitação</span>
            </div>

            <h1
              className="font-serif-luxury text-white font-bold tracking-tight leading-[1.16] sm:leading-[1.12] break-words"
              style={{
                fontSize: 'clamp(1.65rem, 4.8vw, 3.85rem)',
                textWrap: 'balance',
              }}
            >
              Conquiste Seu Imóvel: Do Alto Padrão ao Seu Minha Casa Minha Vida
            </h1>

            <p className="text-slate-200 sm:text-slate-300 text-sm sm:text-lg max-w-2xl leading-relaxed font-normal">
              Assessoria imobiliária completa com aprovação ágil junto à Caixa Econômica Federal,
              subsídios governamentais e portfólio rigorosamente selecionado de mansões e
              residenciais exclusivos.
            </p>

            {/* Categorized Quick Filter Selector */}
            <div className="pt-1 sm:pt-2 space-y-2.5">
              <span className="block text-[11px] sm:text-xs uppercase tracking-wider text-slate-400">
                Selecione o Perfil de Empreendimento:
              </span>
              <div className="flex flex-wrap sm:inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-[#18202B]/90 backdrop-blur-md border border-[#D4AF37]/30 w-full sm:w-auto">
                {(['Todos', 'Minha Casa Minha Vida', 'Alto Padrão'] as const).map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryPick(cat)}
                      className={`flex-1 sm:flex-initial text-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        active
                          ? 'bg-[#D4AF37] text-[#0B0F14] shadow-[0_0_20px_rgba(212,175,55,0.35)]'
                          : 'text-slate-200 hover:text-[#F3E5AB] hover:bg-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Metallic Gold CTA */}
            <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-4 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-[#0B0F14] font-bold text-xs sm:text-base text-center shadow-[0_0_35px_rgba(212,175,55,0.35)] hover:shadow-[0_0_45px_rgba(212,175,55,0.6)] transition-all"
              >
                <span>Falar com Consultor Exclusivo via WhatsApp</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              </a>
            </div>
          </div>

          {/* Active Slide Spotlight Card */}
          {activeProperty && (
            <div className="lg:col-span-4 min-w-0">
              <div className="rounded-2xl bg-[#18202B]/85 backdrop-blur-md border border-[#D4AF37]/25 p-4 sm:p-6 space-y-3.5 sm:space-y-4">
                <div className="flex items-center justify-between gap-2 text-xs text-[#F3E5AB]">
                  <span>Empreendimento em Destaque</span>
                  <span className="font-mono tabular-nums shrink-0">
                    0{currentSlide + 1} / 0{heroSlides.length}
                  </span>
                </div>

                <div>
                  <div className="text-xs text-slate-400">
                    {activeProperty.category} · {activeProperty.status}
                  </div>
                  <h2 className="font-serif-luxury text-lg sm:text-xl font-bold text-white mt-1 break-words">
                    {activeProperty.title}
                  </h2>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeProperty.highlight}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
                  <div>
                    <span className="block text-[11px] text-slate-400">Valor de Investimento</span>
                    <span className="font-mono tabular-nums text-base font-bold text-[#D4AF37]">
                      {activeProperty.priceLabel}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenProperty(activeProperty.slug)}
                    className="px-3.5 sm:px-4 py-2 rounded-lg bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#0B0F14] text-xs font-semibold transition-colors cursor-pointer shrink-0"
                  >
                    Ver Landing Page
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
                          ? 'w-8 bg-[#D4AF37]'
                          : 'w-3 bg-white/25 hover:bg-white/50'
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
      <div className="relative z-10 w-full bg-[#121820]/90 backdrop-blur-md border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300">
          <div className="flex items-start sm:items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong className="text-white font-semibold">Simulação &amp; Aprovação Caixa:</strong>{' '}
              Análise de crédito documental sem burocracia.
            </span>
          </div>
          <div className="flex items-start sm:items-center gap-3">
            <Building className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong className="text-white font-semibold font-mono tabular-nums">
                6 Empreendimentos Exclusivos:
              </strong>{' '}
              Opções na planta, em obras e prontas para morar.
            </span>
          </div>
          <div className="flex items-start sm:items-center gap-3">
            <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong className="text-white font-semibold">Atendimento Direto:</strong>{' '}
              Consultoria especializada via WhatsApp +55 35 99716-4518.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
