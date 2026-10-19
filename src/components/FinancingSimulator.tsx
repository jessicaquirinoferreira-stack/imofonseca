import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { Property } from '../data/seedProperties';

interface FinancingSimulatorProps {
  whatsappNumber: string;
  properties: Property[];
  defaultProperty?: Property;
}

export const FinancingSimulator: React.FC<FinancingSimulatorProps> = ({
  whatsappNumber,
  properties,
  defaultProperty,
}) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState(
    defaultProperty?.id || properties[0]?.id || ''
  );
  const activeProp =
    properties.find((p) => p.id === selectedPropertyId) || defaultProperty || properties[0];

  const [propertyValue, setPropertyValue] = useState<number>(
    activeProp?.priceValue || 235000
  );
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [years, setYears] = useState<number>(35);
  const [familyIncome, setFamilyIncome] = useState<number>(4500);

  const handlePropertyChange = (id: string) => {
    setSelectedPropertyId(id);
    const found = properties.find((p) => p.id === id);
    if (found) {
      setPropertyValue(found.priceValue);
      setDownPaymentPercent(found.category === 'Minha Casa Minha Vida' ? 15 : 25);
    }
  };

  const isMCMV = propertyValue <= 350000;
  const annualRate = isMCMV ? 0.0766 : 0.0989;
  const monthlyRate = annualRate / 12;
  const months = years * 12;

  // Estimate MCMV subsidy based on family income
  const estimatedSubsidy =
    isMCMV && familyIncome <= 4400
      ? Math.max(0, Math.round((4800 - familyIncome) * 11.5))
      : 0;

  const downPaymentAmount = Math.round((propertyValue * downPaymentPercent) / 100);
  const financedAmount = Math.max(
    0,
    propertyValue - downPaymentAmount - estimatedSubsidy
  );

  // Price / SAC hybrid approximation for initial monthly installment
  const monthlyInstallment =
    financedAmount > 0
      ? Math.round(
          (financedAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
        )
      : 0;

  const formatBRL = (val: number) =>
    val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const whatsappSimMessage = `Olá! Fiz uma simulação no site da Imobiliária Fonseca e Cândido:\n- Imóvel: *${
    activeProp?.title || 'Personalizado'
  }*\n- Valor do Imóvel: ${formatBRL(propertyValue)}\n- Entrada Estimada (${downPaymentPercent}%): ${formatBRL(
    downPaymentAmount
  )}\n- Renda Familiar: ${formatBRL(familyIncome)}\n- Prazo: ${years} anos\n- Parcela Estimada: *${formatBRL(
    monthlyInstallment
  )}/mês*\nGostaria de receber o laudo oficial de aprovação Caixa!`;

  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    whatsappSimMessage
  )}`;

  return (
    <section
      id="simulador-caixa"
      className="py-14 sm:py-20 lg:py-28 bg-[#0B0F14] border-b border-white/10"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="rounded-2xl sm:rounded-3xl bg-[#18202B]/85 border border-[#D4AF37]/30 p-4 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Controls */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 min-w-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                  <Calculator className="w-4 h-4 shrink-0" />
                  <span>Calculadora Interativa de Financiamento</span>
                </div>
                <h2 className="font-serif-luxury text-xl sm:text-3xl font-bold text-white break-words">
                  Simulador Caixa Econômica &amp; Alto Padrão
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Calcule instantaneamente sua parcela estimada, subsídio Minha Casa Minha Vida e
                  envie para validação oficial com nossos especialistas.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="sm:col-span-2 space-y-1.5 min-w-0">
                  <label className="block text-xs font-medium text-slate-300">
                    Empreendimento de Referência
                  </label>
                  <select
                    value={selectedPropertyId}
                    onChange={(e) => handlePropertyChange(e.target.value)}
                    className="w-full rounded-xl bg-[#0B0F14] border border-white/15 px-3 sm:px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {properties.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} — {p.priceLabel}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap justify-between gap-1 text-xs">
                    <span className="text-slate-300">Valor do Imóvel</span>
                    <span className="font-mono tabular-nums font-semibold text-[#F3E5AB]">
                      {formatBRL(propertyValue)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={180000}
                    max={4500000}
                    step={15000}
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap justify-between gap-1 text-xs">
                    <span className="text-slate-300">Entrada + FGTS ({downPaymentPercent}%)</span>
                    <span className="font-mono tabular-nums font-semibold text-[#F3E5AB]">
                      {formatBRL(downPaymentAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={60}
                    step={5}
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap justify-between gap-1 text-xs">
                    <span className="text-slate-300">Renda Bruta Familiar</span>
                    <span className="font-mono tabular-nums font-semibold text-[#F3E5AB]">
                      {formatBRL(familyIncome)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2200}
                    max={60000}
                    step={300}
                    value={familyIncome}
                    onChange={(e) => setFamilyIncome(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap justify-between gap-1 text-xs">
                    <span className="text-slate-300">Prazo de Financiamento</span>
                    <span className="font-mono tabular-nums font-semibold text-[#F3E5AB]">
                      {years} anos ({months} meses)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={35}
                    step={5}
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Financial Breakdown Box */}
            <div className="lg:col-span-5 rounded-2xl bg-[#0B0F14] border border-[#D4AF37]/35 p-5 sm:p-8 space-y-5 sm:space-y-6 min-w-0">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs uppercase tracking-wider text-slate-400">
                  Modalidade Enquadrada
                </span>
                <div className="text-sm sm:text-base font-bold text-[#F3E5AB] mt-0.5 break-words">
                  {isMCMV
                    ? 'Programa Minha Casa Minha Vida · Caixa'
                    : 'Linha Crédito Imobiliário Prime / SBPE'}
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 text-slate-300">
                  <span>Valor Total Financiado:</span>
                  <span className="font-mono tabular-nums font-semibold text-white">
                    {formatBRL(financedAmount)}
                  </span>
                </div>
                {estimatedSubsidy > 0 && (
                  <div className="flex flex-wrap items-center justify-between gap-2 text-emerald-400">
                    <span>Subsídio Governo Estimado:</span>
                    <span className="font-mono tabular-nums font-semibold">
                      - {formatBRL(estimatedSubsidy)}
                    </span>
                  </div>
                )}
                <div className="flex flex-wrap items-center justify-between gap-2 text-slate-300">
                  <span>Taxa Nominal Aplicada:</span>
                  <span className="font-mono tabular-nums text-[#F3E5AB]">
                    {(annualRate * 100).toFixed(2)}% a.a.
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#18202B] border border-[#D4AF37]/25">
                <span className="block text-xs text-slate-400">
                  1ª Parcela Mensal Estimada
                </span>
                <span className="font-mono tabular-nums text-2xl sm:text-3xl font-bold text-[#D4AF37] mt-1 block">
                  {formatBRL(monthlyInstallment)}
                </span>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-shimmer w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-[#0B0F14] font-bold text-xs sm:text-sm text-center transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)]"
              >
                <span>Aprovar Esta Simulação no WhatsApp</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
