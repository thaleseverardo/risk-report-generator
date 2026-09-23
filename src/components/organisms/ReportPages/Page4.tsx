import React from 'react';
import PageFooter from "../../molecules/PageFooter";

interface Page4Props {
  pendenciasFonteIICount: number;
  totalPendencias: number;
  pendenciasRows: any[];
  showAllPendencias: boolean;
  setShowAllPendencias: (val: boolean) => void;
  restricoesFonteIIICount: number;
  totalRestricoes: number;
  restricoesRows: any[];
  showAllRestricoes: boolean;
  setShowAllRestricoes: (val: boolean) => void;
  cpf: string;
  highlight: (text: string) => React.ReactNode;
  formatBRL: (val: number) => string;
}

export default function Page4({
  pendenciasFonteIICount,
  totalPendencias,
  pendenciasRows,
  showAllPendencias,
  setShowAllPendencias,
  restricoesFonteIIICount,
  totalRestricoes,
  restricoesRows,
  showAllRestricoes,
  setShowAllRestricoes,
  cpf,
  highlight,
  formatBRL
}: Page4Props) {
  return (
    <div className="print-page w-[210mm] min-h-[297mm] bg-white text-slate-800 p-8 md:p-12 shadow-2xl relative border border-slate-100 flex flex-col justify-between print:shadow-none print:border-none print:p-10 page-break-after">
      <div>
        {/* DETALHAMENTO: PENDÊNCIAS FINANCEIRAS */}
        <div className="mb-8">
          <div className="flex justify-between items-center border-b border-rose-100 pb-2.5 mb-4 gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-4.5 bg-rose-500 rounded-none shrink-0"></div>
              <h2 className="text-xs font-display font-black tracking-wider text-rose-600 uppercase">
                Detalhamento de Pendências Financeiras
              </h2>
            </div>
            <div className="text-right text-xs font-mono shrink-0">
              <span className="text-slate-400">Ocorrências: <span className="font-bold text-slate-700">{pendenciasFonteIICount}</span> | Total: </span>
              <span className="font-bold text-rose-600">{formatBRL(totalPendencias)}</span>
            </div>
          </div>

          <div className="border border-slate-100 rounded-none overflow-hidden text-[9px] leading-tight">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-mono text-[8px] uppercase border-b border-slate-100">
                  <th className="py-2 px-3">Data</th>
                  <th className="py-2 px-3">Disponib.</th>
                  <th className="py-2 px-3">Informante</th>
                  <th className="py-2 px-3">Cidade</th>
                  <th className="py-2 px-3">Tipo</th>
                  <th className="py-2 px-3">Contrato</th>
                  <th className="py-2 px-3 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pendenciasRows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-4 text-center text-slate-400 italic">Nenhuma pendência financeira registrada</td>
                  </tr>
                ) : (
                  pendenciasRows.slice(0, showAllPendencias ? pendenciasRows.length : 5).map((row, idx) => (
                    <tr key={idx} className="hover:bg-rose-50/10">
                      <td className="py-2 px-3 font-mono text-slate-500">{row.data}</td>
                      <td className="py-2 px-3 font-mono text-slate-500">{row.disponib}</td>
                      <td className="py-2 px-3 font-semibold text-slate-800 line-clamp-1 max-w-32.5">{highlight(row.informante)}</td>
                      <td className="py-2 px-3 text-slate-600">{highlight(row.cidade)}</td>
                      <td className="py-2 px-3 text-slate-500 font-mono">{row.tipo}</td>
                      <td className="py-2 px-3 font-mono text-slate-400 text-[8px]">{row.contrato}</td>
                      <td className="py-2 px-3 font-mono font-bold text-rose-600 text-right">{formatBRL(row.valor)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {!showAllPendencias && pendenciasRows.length > 5 && (
              <div className="p-2 bg-slate-50 text-center border-t border-slate-100 no-print">
                <button 
                  onClick={() => setShowAllPendencias(true)} 
                  className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer text-xs"
                >
                  Ver mais ({pendenciasRows.length - 5} ocorrências restantes)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* DETALHAMENTO: RESTRIÇÕES FINANCEIRAS */}
        <div>
          <div className="flex justify-between items-center border-b border-rose-100 pb-2.5 mb-4 gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-4.5 bg-rose-500 rounded-none shrink-0"></div>
              <h2 className="text-xs font-display font-black tracking-wider text-rose-600 uppercase">
                Detalhamento de Restrições em Aberto
              </h2>
            </div>
            <div className="text-right text-xs font-mono shrink-0">
              <span className="text-slate-400">Ocorrências: <span className="font-bold text-slate-700">{restricoesFonteIIICount}</span> | Total: </span>
              <span className="font-bold text-rose-600">{formatBRL(totalRestricoes)}</span>
            </div>
          </div>

          <div className="border border-slate-100 rounded-none overflow-hidden text-[9px] leading-tight">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-mono text-[8px] uppercase border-b border-slate-100">
                  <th className="py-2 px-3">Data</th>
                  <th className="py-2 px-3">Disponib.</th>
                  <th className="py-2 px-3">Informante</th>
                  <th className="py-2 px-3">Cidade</th>
                  <th className="py-2 px-3">Tipo</th>
                  <th className="py-2 px-3">Contrato</th>
                  <th className="py-2 px-3 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {restricoesRows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-4 text-center text-slate-400 italic">Nenhuma restrição financeira registrada</td>
                  </tr>
                ) : (
                  restricoesRows.slice(0, showAllRestricoes ? restricoesRows.length : 5).map((row, idx) => (
                    <tr key={idx} className="hover:bg-rose-50/10">
                      <td className="py-2 px-3 font-mono text-slate-500">{row.data}</td>
                      <td className="py-2 px-3 font-mono text-slate-500">{row.disponib}</td>
                      <td className="py-2 px-3 font-semibold text-slate-800 line-clamp-1 max-w-32.5">{highlight(row.informante)}</td>
                      <td className="py-2 px-3 text-slate-600">{highlight(row.cidade)}</td>
                      <td className="py-2 px-3 text-slate-500 font-mono">—</td>
                      <td className="py-2 px-3 font-mono text-slate-400 text-[8px]">{row.contrato}</td>
                      <td className="py-2 px-3 font-mono font-bold text-rose-600 text-right">{formatBRL(row.valor)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {!showAllRestricoes && restricoesRows.length > 5 && (
              <div className="p-2 bg-slate-50 text-center border-t border-slate-100 no-print">
                <button 
                  onClick={() => setShowAllRestricoes(true)} 
                  className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer text-xs"
                >
                  Ver mais ({restricoesRows.length - 5} ocorrências restantes)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer da folha */}
      <PageFooter pageNumber={4} totalPages={8} documentId={cpf} />
    </div>
  );
}
