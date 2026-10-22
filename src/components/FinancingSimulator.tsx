import React, { useState } from 'react';
import { Calculator, ArrowRight, Sparkles, CalendarCheck, ShieldCheck, MessageSquare } from 'lucide-react';
import {
  Property,
  OFFICIAL_LOGO_URL,
  hasPropertyPrice,
  buildPropertyWhatsAppSummary,
  getPropertyWhatsAppLink,
} from '../data/seedProperties';

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

  const activeHasPrice = activeProp ? hasPropertyPrice(activeProp) : true;

  const [propertyValue, setPropertyValue] = useState<number>(
    activeProp && activeProp.priceValue > 0 ? activeProp.priceValue : 235000
  );
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [years, setYears] = useState<number>(35);
  const [familyIncome, setFamilyIncome] = useState<number>(4500);

  const handlePropertyChange = (id: string) => {
    setSelectedPropertyId(id);
    const found = properties.find((p) => p.id === id);
    if (found) {
      if (found.priceValue > 0) {
        setPropertyValue(found.priceValue);
      }
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

  // Complete property summary included in WhatsApp message in both cases
  const propSummary = activeProp ? buildPropertyWhatsAppSummary(activeProp) : '';

  const whatsappSimMessage = activeHasPrice
    ? `🏛️ *IMOBILIÁRIA FONSECA & CÂNDIDO*
Olá! Fiz uma simulação de financiamento no site para o seguinte empreendimento:

${propSummary}

📊 *DADOS DA MINHA SIMULAÇÃO:*
- Valor Base Simulado: ${formatBRL(propertyValue)}
- Entrada: ${formatBRL(downPaymentAmount)} (${downPaymentPercent}%)
- Renda Familiar: ${formatBRL(familyIncome)}
- Prazo: ${years} anos
- 1ª Parcela Estimada: *${formatBRL(monthlyInstallment)}/mês* (Inicia somente no término da obra!)

Gostaria de receber a aprovação de crédito oficial da Caixa Econômica e agendar uma apresentação!`
    : activeProp
    ? getPropertyWhatsAppLink(activeProp, whatsappNumber, 'consulta')
    : `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
        'Olá! Gostaria de uma simulação exclusiva de financiamento com a Imobiliária Fonseca e Cândido.'
      )}`;

  const whatsappUrl = activeHasPrice
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
        whatsappSimMessage
      )}`
    : activeProp
    ? getPropertyWhatsAppLink(activeProp, whatsappNumber, 'consulta')
    : `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`;

  return (
    <section
      id="simulador-caixa"
      className="py-14 sm:py-20 lg:py-28 bg-[#080C10] border-b border-white/10 relative overflow-hidden"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="rounded-2xl sm:rounded-3xl bg-[#121820]/95 border border-[#D4AF37]/40 p-4 sm:p-10 lg:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Controls */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 min-w-0">
              <div className="space-y-2.5">
                {/* Brand Seal Header */}
                <div className="flex items-center gap-2.5">
                  <img
                    src={OFFICIAL_LOGO_URL}
                    alt="Logo Fonseca e Cândido"
                    className="w-6 h-6 rounded-md object-cover border border-[#D4AF37]/50"
                  />
                  <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                    Simulador Oficial · Imobiliária Fonseca &amp; Cândido
                  </span>
                </div>

                <h2 className="font-serif-luxury text-xl sm:text-3xl lg:text-4xl font-extrabold text-white break-words">
                  Simulação Caixa Econômica Federal &amp; Financiamento Prime
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Calcule em tempo real sua parcela estimada, subsídio do Minha Casa Minha Vida e envie diretamente para a nossa assessoria habitacional credenciada.
                </p>
              </div>

              {/* Minha Casa Minha Vida Payment Terms Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#18202B] via-[#241B08] to-[#18202B] border border-[#D4AF37]/50 flex items-start gap-3">
                <CalendarCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="text-xs text-slate-200 space-y-1">
                  <strong className="text-white block font-bold">
                    Condição Exclusiva Minha Casa Minha Vida:
                  </strong>
                  <span>
                    Parcelamos 100% da sua entrada durante a construção! <strong className="text-[#F3E5AB]">O financiamento bancário Caixa só começa quando o empreendimento termina</strong>, proporcionando total alívio financeiro para você.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="sm:col-span-2 space-y-1.5 min-w-0">
                  <label className="block text-xs font-bold text-slate-300">
                    Selecione o Empreendimento
                  </label>
                  <select
                    value={selectedPropertyId}
                    onChange={(e) => handlePropertyChange(e.target.value)}
                    className="w-full rounded-xl bg-[#080C10] border border-white/20 px-3 sm:px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] shadow-inner"
                  >
                    {properties.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} — {hasPropertyPrice(p) ? p.priceLabel : 'Sob Consulta'} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap justify-between gap-1 text-xs">
                    <span className="text-slate-300">Valor do Imóvel</span>
                    <span className="font-mono tabular-nums font-bold text-[#F3E5AB]">
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
                    <span className="font-mono tabular-nums font-bold text-[#F3E5AB]">
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
                  <span className="block text-[10px] text-[#D4AF37] font-semibold">
                    * Entrada parcelada facilitada durante o período de obra!
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap justify-between gap-1 text-xs">
                    <span className="text-slate-300">Renda Bruta Familiar</span>
                    <span className="font-mono tabular-nums font-bold text-[#F3E5AB]">
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
                    <span className="font-mono tabular-nums font-bold text-[#F3E5AB]">
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
            <div className="lg:col-span-5 rounded-2xl bg-[#080C10] border border-[#D4AF37]/45 p-5 sm:p-8 space-y-5 sm:space-y-6 min-w-0 shadow-2xl relative">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Modalidade de Financiamento
                </span>
                <div className="text-sm sm:text-base font-extrabold text-[#F3E5AB] mt-0.5 break-words">
                  {isMCMV
                    ? 'Programa Minha Casa Minha Vida · Caixa Econômica'
                    : 'Crédito Imobiliário Prime / SBPE Caixa'}
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 text-slate-300">
                  <span>Valor Financiado:</span>
                  <span className="font-mono tabular-nums font-bold text-white">
                    {formatBRL(financedAmount)}
                  </span>
                </div>
                {estimatedSubsidy > 0 && (
                  <div className="flex flex-wrap items-center justify-between gap-2 text-emerald-400">
                    <span>Subsídio Caixa Estimado:</span>
                    <span className="font-mono tabular-nums font-bold">
                      - {formatBRL(estimatedSubsidy)}
                    </span>
                  </div>
                )}
                <div className="flex flex-wrap items-center justify-between gap-2 text-slate-300">
                  <span>Início do Financiamento:</span>
                  <span className="font-semibold text-[#F3E5AB]">
                    Quando termina o empreendimento
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-slate-300">
                  <span>Taxa Nominal Estimada:</span>
                  <span className="font-mono tabular-nums text-[#F3E5AB]">
                    {(annualRate * 100).toFixed(2)}% a.a.
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#141C26] border border-[#D4AF37]/35 shadow-inner">
                <span className="block text-xs text-slate-400 font-medium">
                  1ª Parcela Estimada (Inicia apenas na Conclusão da Obra)
                </span>
                <span className="font-mono tabular-nums text-2xl sm:text-3xl font-black text-[#D4AF37] mt-1 block">
                  {formatBRL(monthlyInstallment)}
                </span>
              </div>

              {!activeHasPrice && (
                <div className="p-3.5 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/45 text-xs text-[#F3E5AB] flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>
                    Este empreendimento está com <strong>tabela sob consulta</strong>. Para receber a tabela oficial de preços e disponibilidade, clique no botão abaixo.
                  </span>
                </div>
              )}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-shimmer w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-[#080C10] font-black text-xs sm:text-sm text-center uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-102"
              >
                <span>
                  {activeHasPrice
                    ? 'Aprovar Simulação no WhatsApp'
                    : 'Consultar Preço e Tabela no WhatsApp'}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
