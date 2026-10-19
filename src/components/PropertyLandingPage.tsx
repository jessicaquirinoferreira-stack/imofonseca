import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Share2,
  Check,
  MapPin,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  BedDouble,
  CarFront,
  Maximize,
  Building2,
  Sparkles,
  FileCheck2,
  Lock,
} from 'lucide-react';
import { Property, SiteConfig, OFFICIAL_LOGO_URL } from '../data/seedProperties';
import { SmartPropertyImage } from './SmartPropertyImage';
import { FinancingSimulator } from './FinancingSimulator';
import { preloadPropertyGallery, preloadSingleImage } from '../utils/imagePreloader';

interface PropertyLandingPageProps {
  property: Property;
  allProperties: Property[];
  siteConfig: SiteConfig;
  onBack: () => void;
}

export const PropertyLandingPage: React.FC<PropertyLandingPageProps> = ({
  property,
  allProperties,
  siteConfig,
  onBack,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const totalImages = property.images.length;

  useEffect(() => {
    setActiveImageIdx(0);
    setLightboxIndex(null);
    preloadPropertyGallery(property, 0);
  }, [property]);

  // Preload adjacent images whenever active slide or lightbox changes
  useEffect(() => {
    if (!totalImages) return;
    const targetIdx = lightboxIndex !== null ? lightboxIndex : activeImageIdx;
    const neighborIndices = [
      (targetIdx + 1) % totalImages,
      (targetIdx + 2) % totalImages,
      (targetIdx - 1 + totalImages) % totalImages,
    ];
    neighborIndices.forEach((idx) => {
      const url = property.images[idx];
      if (url) preloadSingleImage(url, true);
    });
  }, [activeImageIdx, lightboxIndex, property.images, totalImages]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % totalImages : 0
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + totalImages) % totalImages : 0
        );
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, totalImages]);

  const shareUrl = `${window.location.origin}/imovel/${property.slug}`;

  const handleCopyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const whatsappDirectMsg = `Olá! Estou analisando o dossiê completo do empreendimento *${property.title}* (${property.priceLabel}) no site da Imobiliária Fonseca e Cândido e gostaria de agendar uma visita ou receber uma simulação personalizada.`;
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    whatsappDirectMsg
  )}`;

  const handlePrevHeroImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleNextHeroImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % totalImages);
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-white w-full overflow-x-hidden">
      {/* Dedicated Conversion Header */}
      <div className="sticky top-0 z-40 bg-[#0B0F14]/95 backdrop-blur-md border-b border-[#D4AF37]/25">
        <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-12 py-2.5 sm:py-0 sm:h-20 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-slate-200 hover:text-[#F3E5AB] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>Voltar aos Imóveis</span>
          </button>

          <div className="hidden md:flex items-center gap-3 min-w-0">
            <img
              src={OFFICIAL_LOGO_URL}
              alt="Fonseca e Cândido"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded object-cover border border-[#D4AF37]/40 shrink-0"
            />
            <span className="font-serif-luxury text-sm text-[#F3E5AB] tracking-wider">
              {property.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyShareUrl}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg bg-[#18202B] hover:bg-white/10 border border-[#D4AF37]/30 text-[11px] sm:text-xs font-medium text-[#F3E5AB] transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Link Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Compartilhar</span>
                </>
              )}
            </button>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-shimmer px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#D4AF37] text-[#0B0F14] text-[11px] sm:text-xs font-bold"
            >
              Falar com Especialista
            </a>
          </div>
        </div>
      </div>

      {/* Main Architectural Showcase & Interactive Photo Stage */}
      <section className="py-8 sm:py-10 lg:py-14 border-b border-white/10 bg-gradient-to-b from-[#121820] to-[#0B0F14]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-6 sm:space-y-8">
          {/* Top Title & Price Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6 pb-6 border-b border-white/10">
            <div className="space-y-2 min-w-0">
              <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold break-words">
                {property.category} · {property.status} · {property.builder}
              </div>
              <h1
                className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight break-words"
                style={{ textWrap: 'balance' }}
              >
                {property.title}
              </h1>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="break-words">{property.location}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#18202B] p-4 sm:p-5 rounded-2xl border border-[#D4AF37]/35 w-full lg:w-auto">
              <div>
                <span className="block text-xs uppercase tracking-wider text-slate-400">
                  Valor de Investimento
                </span>
                <span className="font-mono tabular-nums text-xl sm:text-3xl font-bold text-[#D4AF37]">
                  {property.priceLabel}
                </span>
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-[#0B0F14] font-bold text-xs sm:text-sm text-center"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Agendar Visita / Proposta</span>
              </a>
            </div>
          </div>

          {/* Interactive Main Photo Viewer + Executive Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Large Interactive Stage (8 cols) */}
            <div className="lg:col-span-8 min-w-0">
              <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full h-full rounded-2xl overflow-hidden border border-[#D4AF37]/35 bg-[#0B0F14] group select-none">
                <div
                  onClick={handleNextHeroImage}
                  title="Clique para avançar para a próxima foto do empreendimento"
                  className="w-full h-full cursor-pointer"
                >
                  <SmartPropertyImage
                    src={property.images[activeImageIdx]}
                    alt={`${property.title} - Imagem ${activeImageIdx + 1}`}
                    showWatermark={property.watermarked}
                    priority
                    fallbackImages={property.images}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Prev / Next Controls on Main Stage */}
                {totalImages > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevHeroImage}
                      aria-label="Foto Anterior"
                      className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0B0F14]/85 hover:bg-[#D4AF37] text-white hover:text-[#0B0F14] border border-[#D4AF37]/40 flex items-center justify-center shadow-xl transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextHeroImage}
                      aria-label="Próxima Foto"
                      className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0B0F14]/85 hover:bg-[#D4AF37] text-white hover:text-[#0B0F14] border border-[#D4AF37]/40 flex items-center justify-center shadow-xl transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </>
                )}

                {/* Top Counter & Fullscreen Button */}
                <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                  <span className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg bg-black/80 border border-[#D4AF37]/40 font-mono tabular-nums text-[11px] sm:text-xs font-semibold text-[#F3E5AB]">
                    Foto {activeImageIdx + 1} de {totalImages}
                  </span>

                  <button
                    type="button"
                    onClick={() => setLightboxIndex(activeImageIdx)}
                    className="pointer-events-auto inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg bg-black/80 hover:bg-[#D4AF37] text-white hover:text-[#0B0F14] border border-[#D4AF37]/40 text-[11px] sm:text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Ampliar Tela Cheia</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Executive Architectural Summary (4 cols) */}
            <div className="lg:col-span-4 rounded-2xl bg-[#18202B]/90 border border-[#D4AF37]/30 p-4 sm:p-6 flex flex-col justify-between space-y-6 min-w-0">
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                    Ficha Técnica Executiva
                  </span>
                  <h2 className="font-serif-luxury text-lg sm:text-xl font-bold text-white mt-1">
                    Especificações do Imóvel
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-[#0B0F14] border border-white/10 min-w-0">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <BedDouble className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Dormitórios</span>
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white mt-1 block break-words">
                      {property.bedrooms}
                    </span>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-[#0B0F14] border border-white/10 min-w-0">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <CarFront className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Vagas</span>
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white mt-1 block break-words">
                      {property.parking}
                    </span>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-[#0B0F14] border border-white/10 min-w-0">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <Maximize className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Metragem</span>
                    </span>
                    <span className="font-mono tabular-nums text-xs sm:text-sm font-bold text-[#F3E5AB] mt-1 block break-words">
                      {property.area}
                    </span>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-[#0B0F14] border border-white/10 min-w-0">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Estágio</span>
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white mt-1 block break-words">
                      {property.status}
                    </span>
                  </div>
                </div>

                {property.specs && (
                  <div className="space-y-3 pt-2 border-t border-white/10 text-xs text-slate-300">
                    <div>
                      <strong className="text-white block">Configuração de Suítes:</strong>
                      <span className="break-words">{property.specs.suites}</span>
                    </div>
                    <div>
                      <strong className="text-white block">Banheiros &amp; Lavabos:</strong>
                      <span className="break-words">{property.specs.bathrooms}</span>
                    </div>
                    <div>
                      <strong className="text-white block">Padrão de Acabamento:</strong>
                      <span className="break-words">{property.specs.flooringAndFinish}</span>
                    </div>
                    <div>
                      <strong className="text-white block">Segurança Condominial:</strong>
                      <span className="break-words">{property.specs.securityFeatures}</span>
                    </div>
                    <div>
                      <strong className="text-white block">Modalidade de Aquisição:</strong>
                      <span className="text-[#F3E5AB] break-words">
                        {property.specs.financingType}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-start gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="break-all">
                  Link direto:{' '}
                  <code className="font-mono text-[#F3E5AB]">/imovel/{property.slug}</code>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Description & Complete Amenities Section */}
      <section className="py-12 sm:py-16 bg-[#0B0F14] border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          <div className="lg:col-span-6 space-y-4 min-w-0">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              <FileCheck2 className="w-4 h-4 shrink-0" />
              <span>Memorial Descritivo &amp; Conceito Arquitetônico</span>
            </div>
            <h2 className="font-serif-luxury text-xl sm:text-3xl font-bold text-white break-words">
              Por que escolher o {property.title}?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {property.description}
            </p>
            <p className="text-xs sm:text-sm text-[#F3E5AB] bg-[#18202B] p-4 rounded-xl border border-[#D4AF37]/25 leading-relaxed">
              Destaque Comercial: {property.highlight}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-5 min-w-0">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Infraestrutura de Lazer, Conforto &amp; Tecnologia</span>
            </div>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
              Diferenciais Exclusivos do Empreendimento
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(
                property.specs?.amenities || [
                  'Área de Lazer Completa Equipada',
                  'Portaria e Controle de Acesso 24h',
                  'Acabamento de Alta Durabilidade',
                  'Localização de Alta Valorização',
                ]
              ).map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#18202B]/75 border border-white/10 text-xs sm:text-sm text-slate-200"
                >
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="break-words">{item}</span>
                </div>
              ))}
            </div>

            {property.specs?.securityFeatures && (
              <div className="p-4 rounded-xl bg-[#121820] border border-white/10 flex items-start gap-3 text-xs text-slate-300">
                <Lock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="break-words">
                  <strong className="text-white">Sistema de Segurança: </strong>
                  {property.specs.securityFeatures}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Normal Gallery Grid Section */}
      <section className="py-12 sm:py-16 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-6 sm:space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Galeria Oficial do Empreendimento
            </span>
            <h2 className="font-serif-luxury text-xl sm:text-3xl font-bold text-white mt-1 break-words">
              Fotos de {property.title} ({totalImages} imagens)
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Toque ou clique em qualquer imagem para ampliar e navegar pelas fotos
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {property.images.map((imgUrl, idx) => (
            <div
              key={`${property.id}-img-${idx}`}
              onClick={() => {
                setActiveImageIdx(idx);
                setLightboxIndex(idx);
              }}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 hover:border-[#D4AF37] cursor-pointer bg-[#121820]"
            >
              <SmartPropertyImage
                src={imgUrl}
                alt={`${property.title} - Imagem ${idx + 1}`}
                showWatermark={property.watermarked}
                priority={idx < 8}
                fallbackImages={property.images}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-black/75 font-mono tabular-nums text-[11px] text-[#F3E5AB]">
                Foto {idx + 1}/{totalImages}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dedicated Caixa Simulator for this Property */}
      <FinancingSimulator
        whatsappNumber={siteConfig.whatsapp}
        properties={allProperties}
        defaultProperty={property}
      />

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6">
          <div className="flex items-center justify-between gap-2 max-w-6xl w-full mx-auto">
            <div className="text-xs sm:text-sm font-serif-luxury text-[#F3E5AB] min-w-0 break-words">
              {property.title} —{' '}
              <span className="font-mono tabular-nums text-white">
                Foto {lightboxIndex + 1} de {totalImages}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#0B0F14] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-3 sm:my-4 max-w-6xl w-full mx-auto overflow-hidden">
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((lightboxIndex - 1 + totalImages) % totalImages)
              }
              className="absolute left-2 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 hover:bg-[#D4AF37] text-white hover:text-[#0B0F14] border border-[#D4AF37]/40 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div
              onClick={() => setLightboxIndex((lightboxIndex + 1) % totalImages)}
              title="Toque para avançar para a próxima foto"
              className="w-full h-full max-h-[82vh] rounded-2xl overflow-hidden border border-[#D4AF37]/30 cursor-pointer"
            >
              <SmartPropertyImage
                src={property.images[lightboxIndex]}
                alt={`${property.title} Ampliada ${lightboxIndex + 1}`}
                showWatermark={property.watermarked}
                priority
                fallbackImages={property.images}
                className="w-full h-full object-contain bg-black"
              />
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex((lightboxIndex + 1) % totalImages)}
              className="absolute right-2 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 hover:bg-[#D4AF37] text-white hover:text-[#0B0F14] border border-[#D4AF37]/40 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
