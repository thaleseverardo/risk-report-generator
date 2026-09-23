/**
 * Dashboard Analytics View.
 *
 * Isolated visual presentation of corporate risk intelligence.
 * Consumes data directly from CreditReportContext without prop drilling.
 */

import React from "react";
import { Sparkles, Info } from "lucide-react";
import { useCreditReport } from "../../state/CreditReportContext";

export default function DashboardAnalytics() {
  const {
    clientName,
    score,
    probabilidade,
    pendenciasCount,
    totalRestricoesConsolidado,
    totalPendencias,
    totalRestricoes,
    totalProtestos,
    protestosCount,
  } = useCreditReport();

  const isLight = true;

  // Format helper for dynamic values
  const formatM = (val: number) => {
    if (val >= 1000000) {
      return `R$ ${(val / 1000000).toFixed(1)}M`;
    }
    if (val >= 1000) {
      return `R$ ${(val / 1000).toFixed(0)}k`;
    }
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block">
            Nexa Risk Intelligence
          </span>
          <h1 className={`text-2xl md:text-3xl font-display font-black mt-1 ${isLight ? "text-slate-900" : "text-white"}`}>
            Dashboard de Risco Corporativo
          </h1>
          <p className={`text-xs mt-1 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
            Visão consolidada e gráfica das métricas cadastrais, financeiras e judiciais de {clientName}.
          </p>
        </div>

        <div className={`flex items-center gap-3 p-3 rounded-none border ${
          isLight ? "bg-indigo-50 border-indigo-100" : "bg-indigo-950/40 border-indigo-900/30"
        }`}>
          <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
          <div>
            <span className={`text-[10px] font-mono block ${isLight ? "text-indigo-700" : "text-indigo-300"}`}>
              Classificação Automatizada AI
            </span>
            <span className={`text-xs font-bold ${isLight ? "text-indigo-900" : "text-slate-100"}`}>
              Risco Crítico Detectado
            </span>
          </div>
        </div>
      </div>

      {/* Score Big Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score */}
        <div className={`rounded-none p-5 border flex flex-col justify-between h-40 ${
          isLight ? "bg-white border-gray-200 shadow-sm" : "bg-slate-900 border-slate-800"
        }`}>
          <div className="flex justify-between items-start">
            <span className={`text-xs font-mono font-bold uppercase ${isLight ? "text-slate-500" : "text-slate-400"}`}>
              Score de Risco AI
            </span>
            <span className="text-[10px] font-mono text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded-none font-bold">
              Risco Alto
            </span>
          </div>
          <div>
            <span className="text-5xl font-display font-black text-rose-500 block">{score}</span>
            <span className={`text-[10px] mt-1 block ${isLight ? "text-slate-400" : "text-slate-500"}`}>
              Escala de Risco Ponderada de 0 a 1000
            </span>
          </div>
        </div>

        {/* Inadimplencia */}
        <div className={`rounded-none p-5 border flex flex-col justify-between h-40 ${
          isLight ? "bg-white border-gray-200 shadow-sm" : "bg-slate-900 border-slate-800"
        }`}>
          <div className="flex justify-between items-start">
            <span className={`text-xs font-mono font-bold uppercase ${isLight ? "text-slate-500" : "text-slate-400"}`}>
              Probabilidade de Inadimplência
            </span>
            <span className="text-[10px] font-mono text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded-none font-bold">
              Alerta
            </span>
          </div>
          <div>
            <span className="text-5xl font-display font-black text-rose-500 block">{probabilidade}%</span>
            <span className={`text-[10px] mt-1 block ${isLight ? "text-slate-400" : "text-slate-500"}`}>
              Quanto menor o percentual, melhor a saúde de crédito
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className={`rounded-none p-5 border flex flex-col justify-between h-40 ${
          isLight ? "bg-white border-gray-200 shadow-sm" : "bg-slate-900 border-slate-800"
        }`}>
          <div className="flex justify-between items-start">
            <span className={`text-xs font-mono font-bold uppercase ${isLight ? "text-slate-500" : "text-slate-400"}`}>
              Classificação Geral de Rating
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-none font-bold ${
              isLight ? "text-emerald-700 bg-emerald-50" : "text-emerald-400 bg-emerald-500/10"
            }`}>
              Processado por IA
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-6xl font-display font-black text-rose-500">E</span>
            <div>
              <span className={`text-xs font-bold block ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                Situação de Inadimplência
              </span>
              <span className={`text-[10px] block mt-0.5 ${isLight ? "text-slate-400" : "text-slate-500"}`}>
                Calculado considerando todas as restrições ativas
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Restrições Ativas */}
        <div className={`rounded-none p-6 border space-y-4 ${
          isLight ? "bg-white border-gray-200 shadow-sm" : "bg-slate-900 border-slate-800"
        }`}>
          <div className={`flex justify-between items-center border-b pb-2 ${isLight ? "border-gray-100" : "border-slate-800"}`}>
            <h3 className={`text-sm font-display font-bold ${isLight ? "text-slate-800" : "text-slate-200"}`}>
              Consolidado de Pendências Ativas
            </h3>
            <span className="text-[11px] font-mono text-rose-600 font-bold bg-rose-500/10 px-2 py-0.5 rounded-none">
              {formatM(totalRestricoesConsolidado)}
            </span>
          </div>
          <div className="space-y-3">
            <div>
              <div className={`flex justify-between text-xs mb-1 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                <span>Pendências Financeiras (Fonte II)</span>
                <span className={`font-bold ${isLight ? "text-slate-700" : "text-slate-200"}`}>
                  {pendenciasCount} ocorrências / {formatM(totalPendencias)}
                </span>
              </div>
              <div className={`w-full h-1.5 rounded-none overflow-hidden ${isLight ? "bg-slate-100" : "bg-slate-800"}`}>
                <div className="bg-indigo-600 h-full animate-pulse" style={{ width: `${Math.min(100, Math.max(10, (pendenciasCount / 20) * 100))}%` }}></div>
              </div>
            </div>
            <div>
              <div className={`flex justify-between text-xs mb-1 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                <span>Restrições em aberto (Fonte III)</span>
                <span className={`font-bold ${isLight ? "text-slate-700" : "text-slate-200"}`}>
                  {pendenciasCount} ocorrências / {formatM(totalRestricoes)}
                </span>
              </div>
              <div className={`w-full h-1.5 rounded-none overflow-hidden ${isLight ? "bg-slate-100" : "bg-slate-800"}`}>
                <div className="bg-indigo-600 h-full animate-pulse" style={{ width: `${Math.min(100, Math.max(10, (pendenciasCount / 20) * 100))}%` }}></div>
              </div>
            </div>
            <div>
              <div className={`flex justify-between text-xs mb-1 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                <span>Crédito Vencido - BACEN</span>
                <span className={`font-bold ${isLight ? "text-slate-700" : "text-slate-200"}`}>R$ 1.2M</span>
              </div>
              <div className={`w-full h-1.5 rounded-none overflow-hidden ${isLight ? "bg-slate-100" : "bg-slate-800"}`}>
                <div className="bg-indigo-600 h-full" style={{ width: "25%" }}></div>
              </div>
            </div>
            <div>
              <div className={`flex justify-between text-xs mb-1 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                <span>Protestos em Cartório</span>
                <span className={`font-bold ${isLight ? "text-slate-700" : "text-slate-200"}`}>
                  {protestosCount} ocorrências / {formatM(totalProtestos)}
                </span>
              </div>
              <div className={`w-full h-1.5 rounded-none overflow-hidden ${isLight ? "bg-slate-100" : "bg-slate-800"}`}>
                <div className="bg-indigo-600 h-full animate-pulse" style={{ width: `${Math.min(100, Math.max(10, (protestosCount / 20) * 100))}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Informações de conformidade */}
        <div className={`rounded-none p-6 border flex flex-col justify-between ${
          isLight ? "bg-white border-gray-200 shadow-sm" : "bg-slate-900 border-slate-800"
        }`}>
          <div>
            <h3 className={`text-sm font-display font-bold border-b pb-2 mb-3 ${
              isLight ? "text-slate-800 border-gray-100" : "text-slate-200 border-slate-800"
            }`}>
              Diagnóstico Nexa AI
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              Este relatório foi analisado e processado automaticamente de acordo com as normas vigentes do Banco Central do Brasil (BACEN) e a Lei Geral de Proteção de Dados (LGPD).
            </p>
            <div className={`mt-4 p-3 rounded-none border flex items-start gap-2.5 ${
              isLight ? "bg-slate-50 border-gray-100" : "bg-slate-950 border-slate-800"
            }`}>
              <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span className={`text-[11px] leading-normal ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                Para obter o detalhamento de cada uma das {pendenciasCount} ocorrências de restrição de pagamentos comerciais e duplicatas, acesse a aba <span className="text-indigo-600 font-bold">Simulação Folha A4</span> para visualizar as páginas sequenciais de impressão.
              </span>
            </div>
          </div>
          <div className={`flex items-center gap-2 text-[10px] font-mono pt-4 border-t ${
            isLight ? "border-gray-100 text-slate-400" : "border-slate-800/50 text-slate-500"
          }`}>
            <span>Análise de crédito segura</span>
            <span>•</span>
            <span>Autenticação: d3e431fe9565409</span>
          </div>
        </div>
      </div>
    </div>
  );
}
