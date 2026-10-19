import React, { useState } from 'react';
import { Landmark, Percent, Award, Scale, ArrowUpRight } from 'lucide-react';

interface SkillItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  icon: React.ReactNode;
}

const SKILLS: SkillItem[] = [
  {
    number: '01.',
    title: 'Aprovação Imediata Caixa',
    subtitle: 'Correspondente Habitacional Especializado',
    description:
      'Análise de crédito prioritária com simulação detalhada de parcelas, uso inteligente do saldo de FGTS e acompanhamento até a assinatura da escritura.',
    metric: 'Análise técnica em até 24h úteis',
    icon: <Landmark className="w-6 h-6 text-[#D4AF37]" />,
  },
  {
    number: '02.',
    title: 'Taxas Minha Casa Minha Vida',
    subtitle: 'Subsídio Federal & Entrada Parcelada',
    description:
      'Estruturação completa para enquadramento nas menores taxas de juros do mercado habitacional, com entrada facilitada diretamente com as construtoras.',
    metric: 'Unidades a partir de R$ 235.000,00',
    icon: <Percent className="w-6 h-6 text-[#D4AF37]" />,
  },
  {
    number: '03.',
    title: 'Atendimento VIP Personalizado',
    subtitle: 'Private Broker para Alto Padrão',
    description:
      'Visitas privativas agendadas, curadoria de mansões em condomínio fechado e negociação sigilosa conduzida diretamente pelos sócios.',
    metric: 'Portfólio Private de R$ 1,85M a R$ 4,2M',
    icon: <Award className="w-6 h-6 text-[#D4AF37]" />,
  },
  {
    number: '04.',
    title: 'Segurança Jurídica Total',
    subtitle: 'Due Diligence Imobiliária Rigorosa',
    description:
      'Auditoria preventiva de certidões, matrícula de incorporação, memorial descritivo e contratos para garantir blindagem patrimonial ao comprador.',
    metric: '100% dos empreendimentos auditados',
    icon: <Scale className="w-6 h-6 text-[#D4AF37]" />,
  },
];

export const SkillsSection: React.FC<{ whatsappNumber: string }> = ({ whatsappNumber }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="diferenciais"
      className="py-14 sm:py-20 lg:py-28 bg-[#0B0F14] border-b border-white/10 relative"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-10 sm:space-y-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
          <div className="space-y-2.5 sm:space-y-3 max-w-2xl min-w-0">
            <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Autoridade &amp; Excelência Operacional
            </div>
            <h2
              className="font-serif-luxury text-xl sm:text-4xl font-bold text-white tracking-tight break-words"
              style={{ textWrap: 'balance' }}
            >
              Engenharia Financeira e Curadoria Imobiliária de Ponta a Ponta
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md">
            Combinamos inteligência de financiamento habitacional com acesso exclusivo aos
            empreendimentos mais desejados da região.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {SKILLS.map((skill, idx) => {
            const isHovered = hoveredIdx === idx;
            const waLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
              `Olá! Gostaria de saber mais sobre: ${skill.title} na Imobiliária Fonseca e Cândido.`
            )}`;

            return (
              <div
                key={skill.title}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  transform: isHovered
                    ? 'perspective(900px) rotateX(2deg) rotateY(-2deg) translateY(-6px)'
                    : 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)',
                }}
                className="group rounded-2xl bg-[#18202B]/75 backdrop-blur-md border border-[#D4AF37]/20 hover:border-[#D4AF37]/70 p-5 sm:p-7 flex flex-col justify-between transition-all duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_35px_rgba(212,175,55,0.16)] min-w-0"
              >
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono tabular-nums text-xs font-semibold text-[#F3E5AB]">
                      {skill.number}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#0B0F14]/80 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                      {skill.icon}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-xs text-[#D4AF37] font-medium">{skill.subtitle}</div>
                    <h3 className="font-serif-luxury text-lg font-bold text-white group-hover:text-[#F3E5AB] transition-colors break-words">
                      {skill.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                <div className="pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono tabular-nums text-xs text-slate-400">
                    {skill.metric}
                  </span>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Consultar ${skill.title}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#D4AF37] group-hover:text-[#F3E5AB] transition-colors shrink-0"
                  >
                    <span>Consultar</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
