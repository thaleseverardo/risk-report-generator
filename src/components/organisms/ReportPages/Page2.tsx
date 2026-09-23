import React from 'react';
import { ShieldAlert, Info, Check } from "lucide-react";
import PageFooter from "../../molecules/PageFooter";
import { getDynamicRating } from "../../../utils/rating";

interface Page2Props {
  score: number;
  probabilidade: number;
  ratingGeral: string;
  cpf: string;
  pendenciasFonteIICount: number;
  totalPendencias: number;
  restricoesFonteIIICount: number;
  totalRestricoes: number;
  bancariasCount: number;
  protestosCount: number;
  totalProtestos: number;
  processosCount: number;
  totalProcessos: number;
  totalBancarias: number;
  chequesCount: number;
  highlight: (text: string) => React.ReactNode;
  formatBRL: (val: number) => string;
}

export default function Page2({
  score,
  probabilidade,
  ratingGeral,
  cpf,
  pendenciasFonteIICount,
  totalPendencias,
  restricoesFonteIIICount,
  totalRestricoes,
  bancariasCount,
  protestosCount,
  totalProtestos,
  processosCount,
  totalProcessos,
  totalBancarias,
  chequesCount,
  highlight,
  formatBRL
}: Page2Props) {
  // Dynamic calculations for occurrences
  const bacenVencidoOcorrencias = bancariasCount === 0 ? 0 : 1;
  const bacenVencidoValor = bancariasCount === 0 ? 0 : 1238396.00;

  const dynamicOcorrenciasCom = [
    {
      titulo: "Pendências Financeiras",
      totalOcorrencias: pendenciasFonteIICount,
      valorTotal: totalPendencias,
      fonte: "Fonte II",
      status: "Atencao" as const,
      detalhe: "Presença de restrições de pagamentos comerciais e duplicatas em aberto."
    },
    {
      titulo: "Restrições em aberto",
      totalOcorrencias: restricoesFonteIIICount,
      valorTotal: totalRestricoes,
      fonte: "Fonte III",
      status: "Atencao" as const,
      detalhe: "Restrições ativas em bureaus de proteção ao crédito."
    },
    {
      titulo: "Crédito Vencido - BACEN",
      totalOcorrencias: bacenVencidoOcorrencias,
      valorTotal: bacenVencidoValor,
      fonte: "Fonte II",
      status: "Atencao" as const,
      detalhe: "Relatório de empréstimos não pagos reportados ao SCR do BACEN."
    },
    {
      titulo: "Protestos",
      totalOcorrencias: protestosCount,
      valorTotal: totalProtestos,
      fonte: "Fonte III",
      status: "Atencao" as const,
      detalhe: "Títulos protestados em cartório de protesto."
    },
    {
      titulo: "Processos lesivos a crédito",
      totalOcorrencias: processosCount,
      valorTotal: totalProcessos,
      fonte: "Fonte III",
      status: "Atencao" as const,
      detalhe: "Ações judiciais ativas com polo passivo com impacto econômico alto."
    },
    {
      titulo: "Pendências Bancárias",
      totalOcorrencias: bancariasCount,
      valorTotal: totalBancarias,
      fonte: "Fonte IV",
      status: "Atencao" as const,
      detalhe: "Registros de inadimplência de crédito diretamente com instituições bancárias."
    },
    {
      titulo: "Cheques sem Fundos",
      totalOcorrencias: chequesCount,
      valorTotal: 0,
      fonte: "Fonte IV",
      status: "Atencao" as const,
      detalhe: "Registro de cheque sem provisão de fundos devolvido (Motivo 12)."
    }
  ].filter(x => x.totalOcorrencias > 0);

  const dynamicOcorrenciasSem = [
    ...(bacenVencidoOcorrencias === 0 ? [{ titulo: "Crédito Vencido - BACEN", status: "Ok" }] : []),
    { titulo: "Ações de falências", status: "Ok" },
    { titulo: "Ações civis e execuções", status: "Ok" },
    { titulo: "Busca e apreensão de bens", status: "Ok" },
    { titulo: "Crimes de sonegação fiscal", status: "Ok" },
    { titulo: "Crimes de estelionato/fraude", status: "Ok" },
    { titulo: "Dívida ativa da União", status: "Ok" },
    { titulo: "Dívida ativa do Estado", status: "Ok" },
    { titulo: "Inadimplência MEI/Simples", status: "Ok" },
    { titulo: "Interdições e tutelas", status: "Ok" },
    { titulo: "Recuperação judicial ativa", status: "Ok" },
    { titulo: "Execuções fiscais federais", status: "Ok" },
    { titulo: "Inquéritos civis públicos", status: "Ok" },
    { titulo: "Cheques sem Fundos", status: "Ok" }
  ].filter(sem => !dynamicOcorrenciasCom.some(com => com.titulo.toLowerCase().includes(sem.titulo.toLowerCase().slice(0, 10))));

  return (
    <div className="print-page w-[210mm] min-h-[297mm] bg-white text-slate-800 p-8 md:p-12 shadow-2xl relative border border-slate-100 flex flex-col justify-between print:shadow-none print:border-none print:p-10 page-break-after">
      <div>
        {/* AVALIAÇÃO PRELIMINAR DE CRÉDITO */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5 mb-3.5 border-b border-slate-100 pb-2">
            <div className="w-1.5 h-4.5 bg-nexa-blue rounded-none shrink-0"></div>
            <h2 className="text-xs font-display font-black tracking-wider text-nexa-blue uppercase">
              Avaliação Preliminar de Crédito
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-slate-100 bg-slate-50/20 p-4 rounded-none flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Score de Risco AI</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className={`text-3xl font-display font-black ${score >= 750 ? "text-emerald-500" : score >= 400 ? "text-amber-500" : "text-rose-500"
                    }`}>{score}</span>
                  <span className="text-[10px] text-slate-400 font-mono">escala de 0 a 1000</span>
                </div>
              </div>

              {/* Visual bar */}
              <div className="mt-3">
                <div className="w-full bg-slate-100 h-2 rounded-none relative overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${score >= 750 ? "bg-emerald-500" : score >= 400 ? "bg-amber-500" : "bg-rose-500"
                    }`} style={{ width: `${score / 10}%` }}></div>
                </div>
                <div className="flex justify-between text-[8px] text-slate-400 font-mono mt-1">
                  <span>Crítico (0)</span>
                  <span className={`font-bold ${score >= 750 ? "text-emerald-500" : score >= 400 ? "text-amber-500" : "text-rose-500"}`}>{score}</span>
                  <span>Excelente (1000)</span>
                </div>
              </div>
            </div>

            {/* Probabilidade de Inadimplência */}
            <div className="border border-slate-100 bg-slate-50/20 p-4 rounded-none flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Probabilidade de Inadimplência</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className={`text-3xl font-display font-black ${probabilidade < 15 ? "text-emerald-500" : probabilidade < 45 ? "text-amber-500" : "text-rose-500"
                    }`}>{probabilidade}%</span>
                  <span className="text-[10px] text-slate-400 font-mono">quanto menor, melhor</span>
                </div>
              </div>

              {/* Visual bar */}
              <div className="mt-3">
                <div className="w-full bg-slate-100 h-2 rounded-none relative overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${probabilidade < 15 ? "bg-emerald-500" : probabilidade < 45 ? "bg-amber-500" : "bg-rose-500"
                    }`} style={{ width: `${probabilidade}%` }}></div>
                </div>
                <div className="flex justify-between text-[8px] text-slate-400 font-mono mt-1">
                  <span>Seguro (0%)</span>
                  <span className={`font-bold ${probabilidade < 15 ? "text-emerald-500" : probabilidade < 45 ? "text-amber-500" : "text-rose-500"}`}>{probabilidade}%</span>
                  <span>Risco Alto (100%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RENDA PRESUMIDA & RATING */}
        <div className="mb-6">
          {(() => {
            let ratingData = getDynamicRating(score, probabilidade);
            if (ratingGeral && ratingGeral !== "AUTO") {
              if (ratingGeral === "E") {
                ratingData = {
                  index: 0,
                  letter: "E",
                  name: "E (Crítico)",
                  status: "Situação de Inadimplência",
                  desc: "Já em situação de inadimplência ou risco crítico.",
                  color: "rose",
                  textColor: "text-rose-500",
                  borderColor: "border-rose-500",
                  bgColor: "bg-rose-500/10",
                  ratingScaleText: "E (Crítico)"
                };
              } else if (ratingGeral === "D") {
                ratingData = {
                  index: 1,
                  letter: "D",
                  name: "D - C (Baixo)",
                  status: "Risco Alto de Inadimplência",
                  desc: "Risco elevado de atraso de pagamentos comerciais ou restrições.",
                  color: "amber",
                  textColor: "text-amber-500",
                  borderColor: "border-amber-500",
                  bgColor: "bg-amber-500/10",
                  ratingScaleText: "D - C (Baixo)"
                };
              } else if (ratingGeral === "C") {
                ratingData = {
                  index: 2,
                  letter: "C",
                  name: "CC - CCC (Médio)",
                  status: "Risco Médio de Inadimplência",
                  desc: "Risco moderado com comportamento de crédito mediano.",
                  color: "yellow",
                  textColor: "text-yellow-600",
                  borderColor: "border-yellow-500",
                  bgColor: "bg-yellow-500/10",
                  ratingScaleText: "CC - CCC (Médio)"
                };
              } else if (ratingGeral === "B") {
                ratingData = {
                  index: 3,
                  letter: "B",
                  name: "B - BB (Bom)",
                  status: "Risco Baixo de Inadimplência",
                  desc: "Bom histórico de crédito com probabilidade de default reduzida.",
                  color: "blue",
                  textColor: "text-indigo-500",
                  borderColor: "border-indigo-500",
                  bgColor: "bg-indigo-500/10",
                  ratingScaleText: "B - BB (Bom)"
                };
              } else if (ratingGeral === "A") {
                ratingData = {
                  index: 4,
                  letter: "A",
                  name: "AAA - AA (Excelente)",
                  status: "Excelente Saúde de Crédito",
                  desc: "Histórico impecável e risco de inadimplência virtualmente nulo.",
                  color: "emerald",
                  textColor: "text-emerald-500",
                  borderColor: "border-emerald-500",
                  bgColor: "bg-emerald-500/10",
                  ratingScaleText: "AAA - AA (Excelente)"
                };
              }
            }
            const getRatingCircleStyles = (idx: number) => {
              switch (idx) {
                case 0: return { border: "border-rose-500 text-rose-500 bg-rose-500/10", labelColor: "text-rose-300" };
                case 1: return { border: "border-amber-500 text-amber-500 bg-amber-500/10", labelColor: "text-amber-300" };
                case 2: return { border: "border-yellow-500 text-yellow-500 bg-yellow-500/10", labelColor: "text-yellow-300" };
                case 3: return { border: "border-indigo-400 text-indigo-400 bg-indigo-500/10", labelColor: "text-indigo-300" };
                case 4: return { border: "border-emerald-500 text-emerald-500 bg-emerald-500/10", labelColor: "text-emerald-300" };
                default: return { border: "border-slate-500 text-slate-500 bg-slate-500/10", labelColor: "text-slate-300" };
              }
            };
            const ratingCircleStyle = getRatingCircleStyles(ratingData.index);
            return (
              <>
                <div className="bg-slate-950 text-white rounded-none p-4.5 shadow-lg relative overflow-hidden mb-4 border border-slate-900">
                  <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-48 h-48 bg-indigo-600/10 rounded-none blur-3xl"></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-indigo-300 uppercase block mb-1">Modelo de Renda Estimada</span>
                      <h3 className="text-xl font-display font-extrabold tracking-tight">Acima de R$ 12.000,00</h3>
                      <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                        Renda estimada a partir de algoritmos comportamentais e inteligência cadastral consolidada do consumidor.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-none ">
                      <div className={`w-12 h-12 rounded-none border-2 flex items-center justify-center font-display font-black text-lg shrink-0 ${ratingCircleStyle.border}`}>
                        {ratingData.letter}
                      </div>
                      <div>
                        <span className={`text-[9px] font-mono uppercase tracking-wider block ${ratingCircleStyle.labelColor}`}>Rating Geral de Crédito</span>
                        <span className="text-xs font-bold block text-slate-100">{ratingData.status}</span>
                        <span className="text-[9px] text-slate-400 block mt-0.5 font-mono">Calculado de forma automatizada por IA</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Escala de Ratings */}
                <div className="bg-slate-50 p-3 rounded-none border border-slate-100 mb-6">
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2 text-center">Régua de Ratings de Crédito</span>

                  <div className="grid grid-cols-5 gap-1 text-center text-[9px] font-mono text-slate-400 mb-1">
                    <div className={ratingData.index === 0 ? "border border-rose-300 bg-rose-50 text-rose-700 p-1 rounded-none font-bold" : "border border-slate-200 bg-slate-100 p-1 rounded-none"}>E (Crítico)</div>
                    <div className={ratingData.index === 1 ? "border border-amber-300 bg-amber-50 text-amber-700 p-1 rounded-none font-bold" : "border border-slate-200 bg-slate-100 p-1 rounded-none"}>D - C (Baixo)</div>
                    <div className={ratingData.index === 2 ? "border border-yellow-300 bg-yellow-50 text-yellow-700 p-1 rounded-none font-bold" : "border border-slate-200 bg-slate-100 p-1 rounded-none"}>CC - CCC (Médio)</div>
                    <div className={ratingData.index === 3 ? "border border-indigo-300 bg-indigo-50 text-indigo-700 p-1 rounded-none font-bold" : "border border-slate-200 bg-slate-100 p-1 rounded-none"}>B - BB (Bom)</div>
                    <div className={ratingData.index === 4 ? "border border-emerald-300 bg-emerald-50 text-emerald-700 p-1 rounded-none font-bold" : "border border-slate-200 bg-slate-100 p-1 rounded-none"}>AAA - AA (Excelente)</div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>

        {/* SÍNTESE DE OCORRÊNCIAS FINANCEIRAS */}
        <div>
          <div className="flex items-center gap-2.5 mb-3.5 border-b border-slate-100 pb-2">
            <div className="w-1.5 h-4.5 bg-rose-500 rounded-none shrink-0"></div>
            <h2 className="text-xs font-display font-black tracking-wider text-rose-600 uppercase">
              Síntese de Ocorrências Financeiras
            </h2>
          </div>

          {/* Ocorrências */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-[10px] font-mono font-bold tracking-wider text-rose-600 uppercase flex items-center gap-1.5">
                <span className="bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-none font-mono text-[10px] font-bold">{dynamicOcorrenciasCom.length}</span>
                Ocorrências
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {dynamicOcorrenciasCom.slice(0, 6).map((item, idx) => (
                <div key={idx} className="border border-rose-100 bg-rose-50/20 p-2.5 rounded-none flex flex-col justify-between hover:bg-rose-50/40 transition-colors">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <span className="text-[11px] font-semibold text-slate-900 font-display line-clamp-1">{highlight(item.titulo)}</span>
                      <span className="text-[8px] font-mono text-rose-600 font-bold tracking-tight bg-rose-50 border border-rose-200 px-1 rounded-none uppercase">Atenção</span>
                    </div>
                    <p className="text-[9px] font-mono text-slate-500 mt-0.5">
                      {item.totalOcorrencias} ocorrências
                      {item.valorTotal ? ` / ${formatBRL(item.valorTotal)}` : ""}
                    </p>
                  </div>
                  <div className="mt-1.5 pt-1.5 border-t border-rose-100/50 flex justify-between items-center text-[8px] text-slate-400 font-mono">
                    <span>{item.fonte}</span>
                    <ShieldAlert className="w-3 h-3 text-rose-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nada consta */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <h3 className="text-[10px] font-mono font-bold tracking-wider text-emerald-600 uppercase flex items-center gap-1.5">
                <span className="bg-emerald-100/70 text-emerald-700 px-1.5 py-0.5 rounded-none font-mono text-[10px] font-bold">{dynamicOcorrenciasSem.length}</span>
                Nada Consta
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-y-2.5 gap-x-6 border border-emerald-100/30 bg-emerald-50/10 p-4 rounded-none">
              {dynamicOcorrenciasSem.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[9.5px] font-semibold text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-3 shrink-0" />
                  <span className="leading-tight">{highlight(item.titulo)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer da folha */}
      <PageFooter pageNumber={2} totalPages={8} documentId={cpf} />
    </div>
  );
}
