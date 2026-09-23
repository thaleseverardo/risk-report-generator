import React, { useState } from "react";
import { Person } from "../data/peopleBank";

// Import Atomic Design components
import Page1 from "./organisms/ReportPages/Page1";
import Page2 from "./organisms/ReportPages/Page2";
import Page3 from "./organisms/ReportPages/Page3";
import Page4 from "./organisms/ReportPages/Page4";
import Page5 from "./organisms/ReportPages/Page5";
import Page6 from "./organisms/ReportPages/Page6";
import Page7 from "./organisms/ReportPages/Page7";
import Page8 from "./organisms/ReportPages/Page8";

import { useCreditReport } from "../state/CreditReportContext";

export default function A4Pages() {
  const {
    searchQuery,
    clientName,
    score,
    probabilidade,
    cpf,
    notaFaturas,
    notaContratos,
    currentPerson,
    protestosCount,
    bancariasCount,
    processosCount,
    consultasCount,
    pendenciasRows,
    restricoesRows,
    protestosRows,
    bancariasRows,
    processosRows,
    consultasRows,
    totalPendencias,
    totalRestricoes,
    totalProtestos,
    totalBancarias,
    totalProcessos,
    bacenCount,
    bacenCreditoAVencerRows,
    bacenOperacoesRows,
    tipoPessoa,
    ratingGeral,
    pendenciasFonteIICount,
    restricoesFonteIIICount,
    chequesCount,
    scoreBacenScr,
  } = useCreditReport();
  // Local state for interactive buttons in A4 representation
  const [showAllProtestos, setShowAllProtestos] = useState(false);
  const [showAllProcessos, setShowAllProcessos] = useState(false);
  const [showAllBacenOperacoes, setShowAllBacenOperacoes] = useState(false);
  const [showAllConsultas, setShowAllConsultas] = useState(false);
  const [showAllPendencias, setShowAllPendencias] = useState(false);
  const [showAllRestricoes, setShowAllRestricoes] = useState(false);
  const [showAllBancarias, setShowAllBancarias] = useState(false);

  // Dynamic calculations for occurrences based on slide counts & sums
  const totalPoloAtivo = processosRows.filter((_, i) => i % 6 === 0).length;
  const totalPoloPassivo = processosRows.length - totalPoloAtivo;
  const valorPoloAtivo = processosRows.reduce((acc, row, i) => i % 6 === 0 ? acc + (row.valor || 0) : acc, 0);
  const valorPoloPassivo = totalProcessos - valorPoloAtivo;
  
  const lesivosImagemCount = processosCount > 0 ? Math.max(1, Math.round(processosCount * 0.03)) : 0;
  const criminalOcorrenciasCount = processosRows.filter(row => row.assunto === "CRIMINAL").length;

  // Format currency
  const formatBRL = (val: number) => {
    return val.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Helper to highlight matching text
  const highlight = (text: string) => {
    if (!searchQuery) return <>{text}</>;
    const parts = text.toString().split(new RegExp(`(${searchQuery})`, "gi"));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <mark key={i} className="bg-amber-100 text-amber-950 px-0.5 rounded-none font-medium">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col gap-8 items-center bg-slate-900/40 p-4 md:p-8 overflow-y-auto w-full print:p-0 print:bg-white print:overflow-visible animate-fade-in">
      
      {/* PAGE 1: RESUMO DO DOCUMENTO E IDENTIFICAÇÃO DO SUJEITO */}
      <Page1 
        clientName={clientName}
        cpf={cpf}
        currentPerson={currentPerson}
        highlight={highlight}
        tipoPessoa={tipoPessoa}
      />

      {/* PAGE 2: AVALIAÇÃO PRELIMINAR, RENDA PRESUMIDA & RATING SCALE, ALERTA DE OCORRÊNCIAS */}
      <Page2 
        score={score}
        probabilidade={probabilidade}
        ratingGeral={ratingGeral}
        cpf={cpf}
        pendenciasFonteIICount={pendenciasFonteIICount}
        totalPendencias={totalPendencias}
        restricoesFonteIIICount={restricoesFonteIIICount}
        totalRestricoes={totalRestricoes}
        bancariasCount={bancariasCount}
        protestosCount={protestosCount}
        totalProtestos={totalProtestos}
        processosCount={processosCount}
        totalProcessos={totalProcessos}
        totalBancarias={totalBancarias}
        chequesCount={chequesCount}
        highlight={highlight}
        formatBRL={formatBRL}
      />

      {/* PAGE 3: FATURAS, CONTRATOS E CONSULTAS */}
      <Page3 
        notaFaturas={notaFaturas}
        notaContratos={notaContratos}
        consultasRows={consultasRows}
        consultasCount={consultasCount}
        showAllConsultas={showAllConsultas}
        setShowAllConsultas={setShowAllConsultas}
        cpf={cpf}
        highlight={highlight}
      />

      {/* PAGE 4: DETALHAMENTO DE PENDÊNCIAS & RESTRIÇÕES FINANCEIRAS */}
      <Page4 
        pendenciasFonteIICount={pendenciasFonteIICount}
        totalPendencias={totalPendencias}
        pendenciasRows={pendenciasRows}
        showAllPendencias={showAllPendencias}
        setShowAllPendencias={setShowAllPendencias}
        restricoesFonteIIICount={restricoesFonteIIICount}
        totalRestricoes={totalRestricoes}
        restricoesRows={restricoesRows}
        showAllRestricoes={showAllRestricoes}
        setShowAllRestricoes={setShowAllRestricoes}
        cpf={cpf}
        highlight={highlight}
        formatBRL={formatBRL}
      />

      {/* PAGE 5: TÍTULOS PROTESTADOS, PENDÊNCIAS BANCÁRIAS & CHEQUES */}
      <Page5 
        protestosCount={protestosCount}
        totalProtestos={totalProtestos}
        protestosRows={protestosRows}
        showAllProtestos={showAllProtestos}
        setShowAllProtestos={setShowAllProtestos}
        bancariasCount={bancariasCount}
        totalBancarias={totalBancarias}
        bancariasRows={bancariasRows}
        showAllBancarias={showAllBancarias}
        setShowAllBancarias={setShowAllBancarias}
        chequesCount={chequesCount}
        cpf={cpf}
        highlight={highlight}
        formatBRL={formatBRL}
      />

      {/* PAGE 6: AÇÕES E PROCESSOS JUDICIAIS */}
      <Page6 
        processosCount={processosCount}
        totalProcessos={totalProcessos}
        lesivosImagemCount={lesivosImagemCount}
        criminalOcorrenciasCount={criminalOcorrenciasCount}
        totalPoloAtivo={totalPoloAtivo}
        totalPoloPassivo={totalPoloPassivo}
        valorPoloPassivo={valorPoloPassivo}
        processosRows={processosRows}
        showAllProcessos={showAllProcessos}
        setShowAllProcessos={setShowAllProcessos}
        cpf={cpf}
        formatBRL={formatBRL}
      />

      {/* PAGE 7: DADOS BACEN (RESUMO SCR, COMPROMETIMENTO E LIMITE) */}
      <Page7 
        bacenCount={bacenCount}
        cpf={cpf}
        scoreBacenScr={scoreBacenScr}
        bacenCreditoAVencerRows={bacenCreditoAVencerRows}
        formatBRL={formatBRL}
      />

      {/* PAGE 8: DETALHAMENTO DAS OPERAÇÕES BACEN E MINUTA DE DECLARAÇÃO */}
      <Page8 
        bacenOperacoesRows={bacenOperacoesRows}
        showAllBacenOperacoes={showAllBacenOperacoes}
        setShowAllBacenOperacoes={setShowAllBacenOperacoes}
        cpf={cpf}
        formatBRL={formatBRL}
      />

    </div>
  );
}
