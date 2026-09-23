/**
 * Credit Report Global State & Computed Risk Context.
 *
 * Replaces the messy prop drilling passing 30+ props through App -> A4Pages -> SubPages.
 * Now each child page or sidebar control connects directly at this context.
 */

import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { PEOPLE_BANK, Person } from "../data/peopleBank";
import {
  PENDENCIAS_FINANCEIRAS_ROWS,
  RESTRICOES_FINANCEIRAS_ROWS,
  TITULOS_PROTESTADOS_ROWS,
  PENDENCIAS_BANCARIAS_ROWS,
  PROCESSOS_JUDICIAIS,
  HISTORICO_CONSULTAS,
  BACEN_CREDITO_A_VENCER,
} from "../data/reportData";
import {
  generateDynamicRows,
  buildBacenOperations,
  scaleBacenDueCredits,
} from "../domain/services/credit-simulation.service";
import { 
  OperacaoResumo, 
  BacenCredito, 
  ProcessoJudicial, 
  HistoricoConsulta 
} from "../types";

export interface CreditReportContextData {
  // Cadastral states
  currentPerson: Person;
  setCurrentPerson: (person: Person) => void;
  clientName: string;
  setClientName: (name: string) => void;
  cpf: string;
  setCpf: (cpf: string) => void;
  tipoPessoa: "PF" | "PJ";
  setTipoPessoa: (tipo: "PF" | "PJ") => void;

  // Credit scoring & notes
  score: number;
  setScore: (score: number) => void;
  probabilidade: number;
  setProbabilidade: (prob: number) => void;
  notaFaturas: string;
  setNotaFaturas: (nota: string) => void;
  notaContratos: string;
  setNotaContratos: (nota: string) => void;
  ratingGeral: string;
  setRatingGeral: (rating: string) => void;
  scoreBacenScr: number;
  setScoreBacenScr: (score: number) => void;

  // Occurrence sliders count
  pendenciasCount: number;
  pendenciasFonteIICount: number;
  setPendenciasFonteIICount: (val: number) => void;
  restricoesFonteIIICount: number;
  setRestricoesFonteIIICount: (val: number) => void;
  protestosCount: number;
  setProtestosCount: (val: number) => void;
  bancariasCount: number;
  setBancariasCount: (val: number) => void;
  chequesCount: number;
  setChequesCount: (val: number) => void;
  processosCount: number;
  setProcessosCount: (val: number) => void;
  consultasCount: number;
  setConsultasCount: (val: number) => void;
  bacenCount: number;
  setBacenCount: (val: number) => void;

  // Search filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Computed data rows
  pendenciasRows: any[];
  restricoesRows: any[];
  protestosRows: any[];
  bancariasRows: any[];
  processosRows: ProcessoJudicial[];
  consultasRows: HistoricoConsulta[];
  bacenOperacoesRows: OperacaoResumo[];
  bacenCreditoAVencerRows: BacenCredito[];

  // Aggregated totals
  totalPendencias: number;
  totalRestricoes: number;
  totalProtestos: number;
  totalBancarias: number;
  totalProcessos: number;
  totalBacenCredito: number;
  totalRestricoesConsolidado: number;

  // Actions
  resetAllFilters: () => void;
}

const CreditReportContext = createContext<CreditReportContextData | null>(null);

export const CreditReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPerson, setCurrentPerson] = useState<Person>(PEOPLE_BANK[0]);
  const [clientName, setClientName] = useState<string>(PEOPLE_BANK[0].dadosCadastrais.nome);
  const [cpf, setCpf] = useState<string>(PEOPLE_BANK[0].dadosCadastrais.cpf);
  const [tipoPessoa, setTipoPessoa] = useState<"PF" | "PJ">("PF");

  // Simulated metrics
  const [score, setScore] = useState<number>(289);
  const [probabilidade, setProbabilidade] = useState<number>(18);
  const [notaFaturas, setNotaFaturas] = useState<string>("D");
  const [notaContratos, setNotaContratos] = useState<string>("A");
  const [ratingGeral, setRatingGeral] = useState<string>("AUTO");
  const [scoreBacenScr, setScoreBacenScr] = useState<number>(289);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Granular slider counts
  const [pendenciasFonteIICount, setPendenciasFonteIICount] = useState<number>(12);
  const [restricoesFonteIIICount, setRestricoesFonteIIICount] = useState<number>(8);
  const [protestosCount, setProtestosCount] = useState<number>(13);
  const [bancariasCount, setBancariasCount] = useState<number>(7);
  const [chequesCount, setChequesCount] = useState<number>(1);
  const [processosCount, setProcessosCount] = useState<number>(46);
  const [consultasCount, setConsultasCount] = useState<number>(13);
  const [bacenCount, setBacenCount] = useState<number>(10);

  // Sync state when selected person changes from the 10 citizens dropdown
  useEffect(() => {
    setClientName(currentPerson.dadosCadastrais.nome);
    setCpf(currentPerson.dadosCadastrais.cpf);
  }, [currentPerson]);

  // Compute heavy lists on memo for prevent unnecessary lag on sliders movements
  const pendenciasRows = useMemo(
    () => generateDynamicRows(PENDENCIAS_FINANCEIRAS_ROWS, pendenciasFonteIICount),
    [pendenciasFonteIICount]
  );

  const restricoesRows = useMemo(
    () => generateDynamicRows(RESTRICOES_FINANCEIRAS_ROWS, restricoesFonteIIICount),
    [restricoesFonteIIICount]
  );

  const protestosRows = useMemo(
    () => generateDynamicRows(TITULOS_PROTESTADOS_ROWS, protestosCount),
    [protestosCount]
  );

  const bancariasRows = useMemo(
    () => generateDynamicRows(PENDENCIAS_BANCARIAS_ROWS, bancariasCount),
    [bancariasCount]
  );

  const processosRows = useMemo(
    () => generateDynamicRows<ProcessoJudicial>(PROCESSOS_JUDICIAIS, processosCount),
    [processosCount]
  );

  const consultasRows = useMemo(
    () => generateDynamicRows<HistoricoConsulta>(HISTORICO_CONSULTAS, consultasCount),
    [consultasCount]
  );

  const { bacenOperacoesRows, totalBacenCredito } = useMemo(
    () => buildBacenOperations(bacenCount),
    [bacenCount]
  );

  const bacenCreditoAVencerRows = useMemo(
    () => scaleBacenDueCredits(BACEN_CREDITO_A_VENCER, totalBacenCredito, bacenCount),
    [totalBacenCredito, bacenCount]
  );

  // Computed financial totals
  const totalPendencias = useMemo(
    () => pendenciasRows.reduce((sum, item) => sum + (item.valor || 0), 0),
    [pendenciasRows]
  );

  const totalRestricoes = useMemo(
    () => restricoesRows.reduce((sum, item) => sum + (item.valor || 0), 0),
    [restricoesRows]
  );

  const totalProtestos = useMemo(
    () => protestosRows.reduce((sum, item) => sum + (item.valor || 0), 0),
    [protestosRows]
  );

  const totalBancarias = useMemo(
    () => bancariasRows.reduce((sum, item) => sum + (item.valor || 0), 0),
    [bancariasRows]
  );

  const totalProcessos = useMemo(
    () => processosRows.reduce((sum, item) => sum + (item.valor || 0), 0),
    [processosRows]
  );

  const totalRestricoesConsolidado = useMemo(
    () => totalPendencias + totalRestricoes + totalProtestos + totalBancarias,
    [totalPendencias, totalRestricoes, totalProtestos, totalBancarias]
  );

  const resetAllFilters = () => {
    setCurrentPerson(PEOPLE_BANK[0]);
    setClientName(PEOPLE_BANK[0].dadosCadastrais.nome);
    setCpf(PEOPLE_BANK[0].dadosCadastrais.cpf);
    setScore(289);
    setProbabilidade(18);
    setNotaFaturas("D");
    setNotaContratos("A");
    setRatingGeral("AUTO");
    setScoreBacenScr(289);
    setSearchQuery("");
    setPendenciasFonteIICount(12);
    setRestricoesFonteIIICount(8);
    setProtestosCount(13);
    setBancariasCount(7);
    setChequesCount(1);
    setProcessosCount(46);
    setConsultasCount(13);
    setBacenCount(10);
    setTipoPessoa("PF");
  };

  const contextValue: CreditReportContextData = {
    currentPerson,
    setCurrentPerson,
    clientName,
    setClientName,
    cpf,
    setCpf,
    tipoPessoa,
    setTipoPessoa,
    score,
    setScore,
    probabilidade,
    setProbabilidade,
    notaFaturas,
    setNotaFaturas,
    notaContratos,
    setNotaContratos,
    ratingGeral,
    setRatingGeral,
    scoreBacenScr,
    setScoreBacenScr,
    pendenciasCount: pendenciasFonteIICount,
    pendenciasFonteIICount,
    setPendenciasFonteIICount,
    restricoesFonteIIICount,
    setRestricoesFonteIIICount,
    protestosCount,
    setProtestosCount,
    bancariasCount,
    setBancariasCount,
    chequesCount,
    setChequesCount,
    processosCount,
    setProcessosCount,
    consultasCount,
    setConsultasCount,
    bacenCount,
    setBacenCount,
    searchQuery,
    setSearchQuery,
    pendenciasRows,
    restricoesRows,
    protestosRows,
    bancariasRows,
    processosRows,
    consultasRows,
    bacenOperacoesRows,
    bacenCreditoAVencerRows,
    totalPendencias,
    totalRestricoes,
    totalProtestos,
    totalBancarias,
    totalProcessos,
    totalBacenCredito,
    totalRestricoesConsolidado,
    resetAllFilters,
  };

  return (
    <CreditReportContext.Provider value={contextValue}>
      {children}
    </CreditReportContext.Provider>
  );
};

export const useCreditReport = (): CreditReportContextData => {
  const contextInstance = useContext(CreditReportContext);
  // Verify if the consumer is wrapped inside the provider for avoid silent runtime bugs
  if (!contextInstance) {
    throw new Error("useCreditReport must be used inside a valid CreditReportProvider tree");
  }
  return contextInstance;
};
