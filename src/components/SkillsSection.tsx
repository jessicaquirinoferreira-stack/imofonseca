import React, { useState } from 'react';
import { Landmark, Percent, Award, Scale, Sparkles, CheckCircle2 } from 'lucide-react';
import { OFFICIAL_LOGO_URL } from '../data/seedProperties';

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
    subtitle: 'Correspondente Habitacional Credenciado',
    description:
      'Análise de crédito prioritária com simulação documental detalhada, uso do saldo de FGTS e acompanhamento integral até a assinatura oficial do contrato.',
    metric: 'Análise técnica em até 24h úteis',
    icon: <Landmark className="w-6 h-6 text-[#D4AF37]" />,
  },
  {
    number: '02.',
    title: 'Minha Casa Minha Vida Exclusivo',
    subtitle: 'Entrada Parcelada & Financiamento na Entrega',
    description:
      'Condição especial estruturada pela Fonseca & Cândido: parcelamos 100% da sua entrada durante a obra. O financiamento bancário Caixa só começa quando termina o empreendimento!',
    metric: 'Zero financiamento durante a construção',
    icon: <Percent className="w-6 h-6 text-[#D4AF37]" />,
  },
  {
    number: '03.',
    title: 'Atendimento VIP Personalizado',
    subtitle: 'Private Broker para Alto Padrão',
    description:
      'Visitas privativas aos decorados e obras, seleção de mansões em condomínio fechado e negociação conduzida diretamente pelos diretores da imobiliária.',
    metric: 'Portfólio Private de R$ 1,85M a R$ 4,2M',
    icon: <Award className="w-6 h-6 text-[#D4AF37]" />,
  },
  {
    number: '04.',
    title: 'Segurança Jurídica Total',
    subtitle: 'Due Diligence Imobiliária Rigorosa',
    description:
      'Auditoria preventiva de certidões, registro de incorporação, memorial descritivo e garantia de entrega Caixa para blindar 100% o patrimônio do comprador.',
    metric: '100% dos empreendimentos auditados',
    icon: <Scale className="w-6 h-6 text-[#D4AF37]" />,
  },
];

export const SkillsSection: React.FC<{ whatsappNumber: string }> = ({ whatsappNumber }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="diferenciais"
      className="py-14 sm:py-20 lg:py-28 bg-[#080C10] border-b border-white/10 relative overflow-hidden"
    >
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-10 sm:space-y-14 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
          <div className="space-y-3 max-w-2xl min-w-0">
            {/* Prominent Fonseca & Cândido Credential Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#18202B] border border-[#D4AF37]/45 shadow-sm">
              <img
                src={OFFICIAL_LOGO_URL}
                alt="Logo Fonseca e Cândido"
                className="w-4 h-4 rounded-full object-cover"
              />
              <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-bold">
                Autoridade Imobiliária Fonseca &amp; Cândido
              </span>
            </div>

            <h2
              className="font-serif-luxury text-2xl sm:text-4xl font-extrabold text-white tracking-tight break-words"
              style={{ textWrap: 'balance' }}
            >
              Engenharia Financeira e Segurança Patrimonial de Ponta a Ponta
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-300 max-w-md leading-relaxed">
            Combinamos inteligência habitacional Caixa com facilidades inéditas de pagamento: entrada parcelada durante as obras e início do financiamento apenas na entrega do empreendimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {SKILLS.map((skill, idx) => {
            const isHovered = hoveredIdx === idx;
            const waLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
              `Olá! Gostaria de saber mais sobre o diferencial: "${skill.title}" na Imobiliária Fonseca e Cândido.`
            )}`;

            return (
              <div
                key={skill.title}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  transform: isHovered
                    ? 'perspective(900px) rotateX(2deg) rotateY(-2deg) translateY(-8px)'
                    : 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)',
                }}
                className="group rounded-2xl bg-[#121820]/90 backdrop-blur-md border border-[#D4AF37]/25 hover:border-[#D4AF37] p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_45px_rgba(212,175,55,0.22)] min-w-0 relative overflow-hidden"
              >
                {/* Subtle sheen highlight on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                <div className="space-y-4 sm:space-y-5 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono tabular-nums text-xs font-bold text-[#F3E5AB]">
                      {skill.number}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#080C10] border border-[#D4AF37]/35 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-[#080C10] transition-colors shadow-sm">
                      {skill.icon}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-white group-hover:text-[#F3E5AB] transition-colors leading-snug break-words">
                      {skill.title}
                    </h3>
                    <span className="block text-[11px] font-semibold text-[#D4AF37] mt-0.5">
                      {skill.subtitle}
                    </span>
                  </div>

                  <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                <div className="pt-4 sm:pt-5 border-t border-white/10 mt-5 relative z-10 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#F3E5AB] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="break-words">{skill.metric}</span>
                  </div>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-white group-hover:text-[#D4AF37] font-semibold transition-colors pt-1"
                  >
                    Consultar com especialista →
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
