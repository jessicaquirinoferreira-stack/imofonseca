import React, { useState } from 'react';
import {
  ExternalLink,
  MessageSquare,
  MapPin,
  BedDouble,
  CarFront,
  Maximize,
  Sparkles,
  Check,
  CalendarClock,
  Images,
  BadgeCheck,
} from 'lucide-react';
import { Property, OFFICIAL_LOGO_URL } from '../data/seedProperties';
import { SmartPropertyImage } from './SmartPropertyImage';
import { preloadPropertyGallery } from '../utils/imagePreloader';

interface PropertyCardProps {
  property: Property;
  whatsappNumber: string;
  onOpenLandingPage: (slug: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  whatsappNumber,
  onOpenLandingPage,
}) => {
  const [showFullFicha, setShowFullFicha] = useState(false);

  const totalImages = property.images.length;
  const coverImageUrl = property.images[0];
  const isMCMV = property.category === 'Minha Casa Minha Vida';

  const whatsappMessage = `Olá! Vi o empreendimento *${property.title}* (${property.category} - ${property.priceLabel}) no site da Imobiliária Fonseca e Cândido e gostaria de receber simulação com entrada parcelada e financiamento Caixa.`;
  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const topAmenities = property.specs?.amenities?.slice(0, 4) || [
    'Lazer Completo Equipado',
    'Segurança & Portaria 24h',
    'Acabamento Diferenciado',
    'Localização Valorizada',
  ];

  const handleOpenProperty = () => {
    preloadPropertyGallery(property, 0);
    onOpenLandingPage(property.slug);
  };

  return (
    <article
      onMouseEnter={() => preloadPropertyGallery(property, 0)}
      onTouchStart={() => preloadPropertyGallery(property, 0)}
      className="group rounded-2xl bg-[#121820]/95 border border-[#D4AF37]/30 hover:border-[#D4AF37] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-[0_14px_45px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_60px_rgba(212,175,55,0.22)] hover:-translate-y-1 relative min-w-0"
    >
      {/* Dynamic diagonal hover sheen beam */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none z-20" />

      <div>
        {/* Featured Cover Image on Card — Click opens the Property Gallery & Details Page */}
        <div
          onClick={handleOpenProperty}
          className="relative aspect-[16/11] w-full overflow-hidden bg-[#080C10] cursor-pointer select-none"
        >
          <SmartPropertyImage
            src={coverImageUrl}
            alt={property.title}
            showWatermark={property.watermarked}
            priority
            fallbackImages={property.images}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          />

          {/* Gradients for legibility */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080C10] via-[#080C10]/80 to-transparent pointer-events-none" />

          {/* Top Bar Info over Image: Imobiliária Fonseca & Cândido Exclusivity Seal + Photos count */}
          <div className="absolute top-3 left-3.5 right-3.5 z-10 flex flex-wrap items-center justify-between gap-1.5 text-[11px] sm:text-xs font-semibold text-white pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-[#D4AF37]/50 text-[#F3E5AB] backdrop-blur-md shadow-sm">
              <img
                src={OFFICIAL_LOGO_URL}
                alt="Logo"
                className="w-3.5 h-3.5 rounded-full object-cover"
              />
              <span className="text-[10px] uppercase font-bold tracking-wider">
                Fonseca &amp; Cândido
              </span>
            </span>

            <span className="inline-flex items-center gap-1 font-mono tabular-nums bg-black/80 px-2.5 py-1 rounded-full border border-[#D4AF37]/40 text-[#F3E5AB] shrink-0 backdrop-blur-md">
              <Images className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{totalImages} fotos</span>
            </span>
          </div>

          {/* Bottom Price over Image */}
          <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex flex-wrap items-end justify-between gap-2 pointer-events-none">
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-slate-300">
                Valor de Investimento
              </span>
              <span className="font-mono tabular-nums text-lg sm:text-2xl font-black text-[#D4AF37] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                {property.priceLabel}
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-[#F3E5AB] group-hover:underline flex items-center gap-1">
              Ver galeria completa →
            </span>
          </div>
        </div>

        {/* Robust Architectural Content & Technical Details */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Key MCMV Special Condition Banner */}
          {isMCMV && (
            <div className="p-3 rounded-xl bg-gradient-to-r from-[#18202B] via-[#281D0B] to-[#18202B] border border-[#D4AF37]/60 shadow-[0_0_15px_rgba(212,175,55,0.18)]">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Condição Especial Minha Casa Minha Vida</span>
              </div>
              <p className="text-white text-xs font-bold mt-1 leading-snug">
                Parcelamos a entrada! O financiamento Caixa só começa quando termina o empreendimento.
              </p>
            </div>
          )}

          {/* Title & Location */}
          <div className="space-y-1.5">
            <div className="flex items-start gap-1.5 text-xs text-[#D4AF37] font-semibold">
              <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span className="break-words">{property.location}</span>
            </div>

            <h3
              onClick={handleOpenProperty}
              className="font-serif-luxury text-lg sm:text-2xl font-bold text-white group-hover:text-[#F3E5AB] transition-colors cursor-pointer leading-snug break-words"
            >
              {property.title}
            </h3>

            <div className="text-xs text-slate-400 leading-relaxed">
              Incorporação: <strong className="text-slate-200">{property.builder}</strong>
              {property.specs?.deliveryForecast && (
                <>
                  {' '}
                  · <span className="text-[#F3E5AB] font-semibold">{property.specs.deliveryForecast}</span>
                </>
              )}
            </div>
          </div>

          {/* Primary Architectural Metrics Grid — Zero Truncation */}
          <div className="grid grid-cols-3 gap-2 p-2.5 sm:p-3 rounded-xl bg-[#080C10]/90 border border-white/10">
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1">
                <BedDouble className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] shrink-0" />
                <span>Tipologia</span>
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-white mt-0.5 leading-snug break-words">
                {property.bedrooms}
              </span>
            </div>

            <div className="flex flex-col border-x border-white/10 px-2 min-w-0">
              <span className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1">
                <CarFront className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] shrink-0" />
                <span>Garagem</span>
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-white mt-0.5 leading-snug break-words">
                {property.parking}
              </span>
            </div>

            <div className="flex flex-col pl-1 min-w-0">
              <span className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1">
                <Maximize className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] shrink-0" />
                <span>Área Útil</span>
              </span>
              <span className="font-mono tabular-nums text-[11px] sm:text-xs font-bold text-[#F3E5AB] mt-0.5 leading-snug break-words">
                {property.area}
              </span>
            </div>
          </div>

          {/* Editorial Description — Completely visible without clipping */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {property.description}
          </p>

          {/* Key Amenities Checklist */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Destaques &amp; Infraestrutura</span>
              </span>
              <button
                type="button"
                onClick={() => setShowFullFicha((prev) => !prev)}
                className="text-xs font-bold text-[#F3E5AB] hover:underline cursor-pointer"
              >
                {showFullFicha ? 'Ocultar Ficha Técnica' : '+ Ver Ficha Técnica'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
              {topAmenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-start gap-2 text-xs text-slate-200 leading-snug"
                >
                  <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="break-words">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expandable Complete Technical Dossier */}
          {showFullFicha && property.specs && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#080C10] border border-[#D4AF37]/40 space-y-2.5 text-xs text-slate-300">
              <div className="font-serif-luxury text-xs font-bold text-[#F3E5AB] uppercase tracking-wider border-b border-white/10 pb-1.5 flex items-center gap-1.5">
                <BadgeCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Memorial Oficial Imobiliária Fonseca &amp; Cândido</span>
              </div>
              <div>
                <strong className="text-white">Suítes / Planta:</strong> {property.specs.suites}
              </div>
              <div>
                <strong className="text-white">Banheiros:</strong> {property.specs.bathrooms}
              </div>
              <div>
                <strong className="text-white">Acabamentos:</strong>{' '}
                {property.specs.flooringAndFinish}
              </div>
              <div>
                <strong className="text-white">Segurança:</strong>{' '}
                {property.specs.securityFeatures}
              </div>
              <div className="flex items-start gap-1.5 text-[#F3E5AB] pt-1">
                <CalendarClock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="font-medium">{property.specs.financingType}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        <button
          type="button"
          onClick={handleOpenProperty}
          className="flex items-center justify-center gap-2 py-3 px-3.5 rounded-xl bg-[#080C10] hover:bg-white/10 text-white border border-[#D4AF37]/45 text-xs font-bold transition-all cursor-pointer text-center group-hover:border-[#D4AF37]"
        >
          <span>Ver Galeria ({totalImages} Fotos)</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
        </button>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold-shimmer flex items-center justify-center gap-2 py-3 px-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-[#080C10] text-xs font-black transition-all text-center shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-102"
        >
          <MessageSquare className="w-3.5 h-3.5 shrink-0" />
          <span>Simular no WhatsApp</span>
        </a>
      </div>
    </article>
  );
};
