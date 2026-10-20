import React, { useState } from 'react';
import { Search, Sparkles, Building2, CheckCircle } from 'lucide-react';
import { Property, OFFICIAL_LOGO_URL } from '../data/seedProperties';
import { PropertyCard } from './PropertyCard';

interface PropertiesGridProps {
  properties: Property[];
  selectedCategory: 'Todos' | 'Minha Casa Minha Vida' | 'Alto Padrão';
  onSelectCategory: (cat: 'Todos' | 'Minha Casa Minha Vida' | 'Alto Padrão') => void;
  whatsappNumber: string;
  onOpenLandingPage: (slug: string) => void;
}

export const PropertiesGrid: React.FC<PropertiesGridProps> = ({
  properties,
  selectedCategory,
  onSelectCategory,
  whatsappNumber,
  onOpenLandingPage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = properties.filter((item) => {
    const matchesCat =
      selectedCategory === 'Todos' || item.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.highlight.toLowerCase().includes(q) ||
      item.builder.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <section id="vitrine-imoveis" className="py-14 sm:py-20 lg:py-28 bg-[#0B0F14] border-b border-white/10 relative overflow-hidden">
      {/* Dynamic Ambient Background Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-8 sm:space-y-12 relative z-10">
        {/* Header & Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
          <div className="space-y-3 min-w-0">
            {/* Prominent Fonseca & Cândido Seal */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#18202B] border border-[#D4AF37]/40 shadow-sm">
              <img
                src={OFFICIAL_LOGO_URL}
                alt="Logo Fonseca & Cândido"
                className="w-4 h-4 rounded-full object-cover"
              />
              <span className="text-[11px] uppercase tracking-wider text-[#F3E5AB] font-bold">
                Portfólio Oficial Imobiliária Fonseca &amp; Cândido
              </span>
            </div>

            <h2
              className="font-serif-luxury text-2xl sm:text-4xl font-extrabold text-white break-words"
              style={{ textWrap: 'balance' }}
            >
              Vitrine de Empreendimentos Selecionados
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Do Minha Casa Minha Vida com <strong className="text-[#F3E5AB]">entrada parcelada e financiamento no término</strong> às mais exclusivas propriedades de Alto Padrão.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:min-w-[260px]">
              <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar empreendimento ou bairro..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#18202B] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37] shadow-inner"
              />
            </div>

            {/* Category Segmented Control */}
            <div className="flex flex-wrap sm:inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-[#18202B] border border-[#D4AF37]/35 w-full sm:w-auto shadow-md">
              {(['Todos', 'Minha Casa Minha Vida', 'Alto Padrão'] as const).map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => onSelectCategory(cat)}
                    className={`flex-1 sm:flex-initial text-center px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? 'bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-[#080C10] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Minha Casa Minha Vida Interactive Feature Banner */}
        {selectedCategory !== 'Alto Padrão' && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#18202B] via-[#241B08] to-[#18202B] border border-[#D4AF37]/50 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-[#080C10] flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-white text-xs sm:text-sm font-bold flex items-center gap-2">
                  <span>Regra Especial Minha Casa Minha Vida</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#D4AF37] text-[#080C10] font-black">
                    CAIXA
                  </span>
                </div>
                <p className="text-slate-300 text-xs">
                  Parcelamos 100% da sua entrada durante o período de obra · <strong className="text-[#F3E5AB]">O financiamento bancário Caixa só começa quando o empreendimento termina!</strong>
                </p>
              </div>
            </div>

            <a
              href="#simulador-caixa"
              className="btn-gold-shimmer px-4 py-2 rounded-xl bg-[#D4AF37] text-[#080C10] text-xs font-bold shrink-0 self-stretch md:self-auto text-center"
            >
              Simular Financiamento
            </a>
          </div>
        )}

        {/* Properties Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                whatsappNumber={whatsappNumber}
                onOpenLandingPage={onOpenLandingPage}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-[#18202B]/60 border border-white/10 p-8 sm:p-12 text-center space-y-4">
            <p className="text-sm sm:text-base text-slate-300">
              Nenhum empreendimento encontrado para os filtros aplicados.
            </p>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('Todos');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-lg bg-[#D4AF37] text-[#080C10] text-xs font-bold cursor-pointer"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
