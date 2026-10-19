import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Property } from '../data/seedProperties';
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
    <section id="vitrine-imoveis" className="py-14 sm:py-20 lg:py-28 bg-[#121820] border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-8 sm:space-y-12">
        {/* Header & Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
          <div className="space-y-2.5 sm:space-y-3 min-w-0">
            <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Portfólio Oficial Fonseca &amp; Cândido
            </div>
            <h2
              className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white break-words"
              style={{ textWrap: 'balance' }}
            >
              Empreendimentos Selecionados
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:min-w-[260px]">
              <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome ou localização..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B0F14] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Category Segmented Control — Wraps cleanly on narrow phones */}
            <div className="flex flex-wrap sm:inline-flex items-center gap-1 p-1.5 rounded-xl bg-[#0B0F14] border border-[#D4AF37]/25 w-full sm:w-auto">
              {(['Todos', 'Minha Casa Minha Vida', 'Alto Padrão'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className={`flex-1 sm:flex-initial text-center px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#D4AF37] text-[#0B0F14]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

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
              className="px-5 py-2.5 rounded-lg bg-[#D4AF37] text-[#0B0F14] text-xs font-bold cursor-pointer"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
