import { 
  Printer, 
  Search, 
  Settings, 
  Navigation, 
  FileText, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  RotateCcw,
  Sliders,
  DollarSign,
  User,
  Shuffle,
  FileDown
} from "lucide-react";
import { PEOPLE_BANK, Person } from "../../data/peopleBank";
import NexaLogo from "../atoms/NexaLogo";

import { useCreditReport } from "../../state/CreditReportContext";

export default function Sidebar() {
  const {
    searchQuery,
    setSearchQuery,
    clientName,
    setClientName,
    score,
    setScore,
    probabilidade,
    setProbabilidade,
    cpf,
    setCpf,
    notaFaturas,
    setNotaFaturas,
    notaContratos,
    setNotaContratos,
    currentPerson,
    setCurrentPerson,
    protestosCount,
    setProtestosCount,
    processosCount,
    setProcessosCount,
    consultasCount,
    setConsultasCount,
    bacenCount,
    setBacenCount,
    totalRestricoesConsolidado,
    totalProcessos,
    totalBacenCredito,
    tipoPessoa,
    setTipoPessoa,
    ratingGeral,
    setRatingGeral,
    pendenciasFonteIICount,
    setPendenciasFonteIICount,
    restricoesFonteIIICount,
    setRestricoesFonteIIICount,
    bancariasCount,
    setBancariasCount,
    chequesCount,
    setChequesCount,
    scoreBacenScr,
    setScoreBacenScr,
    resetAllFilters: onReset,
  } = useCreditReport();

  const triggerPrint = () => {
    window.print();
  };

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
    <div className={`w-full lg:w-80 shrink-0 flex flex-col justify-between p-6 overflow-y-auto h-auto lg:h-screen no-print select-none transition-colors duration-300 bg-white border-r border-gray-200 text-slate-800`}>
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 bg-indigo-600 rounded-none-none flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-indigo-600/20">
            N
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold tracking-tight text-xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                NEXA
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">Credit Intelligence Hub</span>
          </div>
        </div>

        {/* Global Summary Stats Card */}
        <div className="rounded-none-none p-4 border border-gray-200 bg-slate-50/80 space-y-3 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-6 translate-y-6 w-24 h-24 bg-indigo-600/5 rounded-none-none blur-2xl"></div>
          <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-slate-500">
            <span>RESUMO EXECUTIVO</span>
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Restrições Totais:</span>
              <span className="font-mono font-bold text-rose-500">{formatM(totalRestricoesConsolidado)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Processos Judiciais:</span>
              <span className="font-mono font-bold text-rose-500">{formatM(totalProcessos)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Créditos Ativos (BACEN):</span>
              <span className="font-mono font-bold text-emerald-600">{formatM(totalBacenCredito)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons - PDF & Print */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={triggerPrint}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-3 rounded-none font-display font-bold text-[11px] uppercase tracking-wider shadow-sm hover:shadow active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            title="Exportar Relatório para formato PDF"
          >
            <FileDown className="w-4 h-4" />
            Salvar PDF
          </button>
          <button
            onClick={triggerPrint}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 py-2.5 px-3 rounded-none font-display font-bold text-[11px] uppercase tracking-wider active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            title="Imprimir Relatório"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            Imprimir
          </button>
        </div>

        {/* Search tool */}
        <div className="space-y-2">
          <label className={`text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 ${
            isLight ? "text-slate-500" : "text-slate-400"
          }`}>
            <Search className="w-3.5 h-3.5" />
            Buscar no Relatório
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Ex: Bradesco, MS, Cível..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full text-xs py-2 px-3 pl-8 rounded-none-none focus:outline-none focus:border-indigo-500 transition-colors border ${
                isLight 
                  ? "bg-slate-50 border-gray-200 text-slate-800 placeholder-slate-400" 
                  : "bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500"
              }`}
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
          {searchQuery && (
            <span className={`text-[10px] font-mono block ${isLight ? "text-slate-400" : "text-slate-500"}`}>
              Procurando correspondências em tempo real...
            </span>
          )}
        </div>

        {/* Interactive Parameter Sliders */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
            <label className="text-xs font-mono font-bold tracking-widest uppercase text-indigo-600 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              Simular Relatório
            </label>
            <button 
              onClick={onReset}
              className="text-[10px] font-mono flex items-center gap-1 cursor-pointer transition-colors text-slate-400 hover:text-slate-600"
              title="Resetar para os valores originais do PDF"
            >
              <RotateCcw className="w-3 h-3" />
              Resetar
            </button>
          </div>

          {/* Citizen Bank Select Dropdown */}
          <div className="space-y-1.5 p-2 bg-indigo-50/40 rounded-none border border-indigo-100/50">
            <label className="text-[9px] font-mono font-bold text-indigo-600 block">DADOS CADASTRADO (10 PESSOAS)</label>
            <select
              value={PEOPLE_BANK.findIndex(p => p.dadosCadastrais.cpf === currentPerson.dadosCadastrais.cpf)}
              onChange={(e) => {
                const idx = Number(e.target.value);
                if (idx >= 0 && idx < PEOPLE_BANK.length) {
                  setCurrentPerson(PEOPLE_BANK[idx]);
                }
              }}
              className="w-full text-xs py-1 px-1.5 bg-white border border-gray-200 rounded-none focus:outline-none focus:border-indigo-500 font-display text-slate-800"
            >
              {PEOPLE_BANK.map((p, idx) => (
                <option key={idx} value={idx}>
                  {idx + 1}. {p.dadosCadastrais.nome.split(" ")[0]} ({p.dadosCadastrais.cpf.slice(0, 7)}...)
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => {
                let nextIdx = Math.floor(Math.random() * PEOPLE_BANK.length);
                const currentIdx = PEOPLE_BANK.findIndex(p => p.dadosCadastrais.cpf === currentPerson.dadosCadastrais.cpf);
                if (nextIdx === currentIdx) {
                  nextIdx = (nextIdx + 1) % PEOPLE_BANK.length;
                }
                setCurrentPerson(PEOPLE_BANK[nextIdx]);
              }}
              className="w-full py-1 px-2 bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold text-[9px] rounded-none flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
            >
              <Shuffle className="w-3 h-3" />
              GERAR CADASTRO ALEATÓRIO
            </button>
          </div>

          {/* Tipo de Relatório Toggle */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
              Tipo de Relatório
            </label>
            <div className="grid grid-cols-2 gap-1 bg-slate-100 p-0.5 rounded-none border border-gray-200">
              <button
                type="button"
                onClick={() => setTipoPessoa("PF")}
                className={`py-1.5 text-xs font-display font-bold tracking-wider transition-all cursor-pointer rounded-none uppercase ${
                  tipoPessoa === "PF"
                    ? "bg-indigo-600 text-white shadow font-black"
                    : "text-slate-500 hover:text-slate-800 font-medium"
                }`}
              >
                PF (Física)
              </button>
              <button
                type="button"
                onClick={() => setTipoPessoa("PJ")}
                className={`py-1.5 text-xs font-display font-bold tracking-wider transition-all cursor-pointer rounded-none uppercase ${
                  tipoPessoa === "PJ"
                    ? "bg-indigo-600 text-white shadow font-black"
                    : "text-slate-500 hover:text-slate-800 font-medium"
                }`}
              >
                PJ (Jurídica)
              </button>
            </div>
          </div>

          {/* Client Name Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-slate-500">NOME DO CLIENTE</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full text-xs py-1.5 px-2.5 rounded-none-none focus:outline-none focus:border-indigo-500 font-display border bg-slate-50 border-gray-200 text-slate-800"
            />
          </div>

          {/* CPF Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-slate-500">CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full text-xs py-1.5 px-2.5 rounded-none-none focus:outline-none focus:border-indigo-500 font-mono border bg-slate-50 border-gray-200 text-slate-800"
            />
          </div>

          {/* Score Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-slate-500">SCORE DE RISCO</span>
              <span className={`font-bold ${
                score < 300 
                  ? 'text-rose-500' 
                  : score < 600 
                    ? 'text-amber-500' 
                    : 'text-emerald-600'
              }`}>
                {score} / 1000
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* Probabilidade Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-slate-500">INADIMPLÊNCIA</span>
              <span className={`font-bold ${
                probabilidade > 15 
                  ? 'text-rose-500' 
                  : 'text-emerald-600'
              }`}>
                {probabilidade}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={probabilidade}
              onChange={(e) => setProbabilidade(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* Faturas em Atraso Buttons */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono block text-slate-500">
              FATURAS EM ATRASO (NOTA)
            </label>
            <div className="grid grid-cols-5 gap-1 text-center text-xs font-mono">
              {["A", "B", "C", "D", "E"].map((letter) => {
                const isActive = notaFaturas === letter;
                return (
                  <button
                    key={letter}
                    onClick={() => setNotaFaturas(letter)}
                    className={`py-1.5 rounded-none border transition-all cursor-pointer font-bold ${
                      isActive
                        ? letter === "A" || letter === "B"
                          ? "bg-emerald-500 border-emerald-500 text-white shadow"
                          : letter === "C"
                            ? "bg-amber-500 border-amber-500 text-white shadow"
                            : "bg-rose-500 border-rose-500 text-white shadow"
                        : "bg-slate-50 border-gray-200 text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contratos Recentes Buttons */}
          <div className="space-y-1.5 pb-2">
            <label className="text-[10px] font-mono block text-slate-500">
              CONTRATOS RECENTES (NOTA)
            </label>
            <div className="grid grid-cols-5 gap-1 text-center text-xs font-mono">
              {["A", "B", "C", "D", "E"].map((letter) => {
                const isActive = notaContratos === letter;
                return (
                  <button
                    key={letter}
                    onClick={() => setNotaContratos(letter)}
                    className={`py-1.5 rounded-none border transition-all cursor-pointer font-bold ${
                      isActive
                        ? letter === "A" || letter === "B"
                          ? "bg-emerald-500 border-emerald-500 text-white shadow"
                          : letter === "C"
                            ? "bg-amber-500 border-amber-500 text-white shadow"
                            : "bg-rose-500 border-rose-500 text-white shadow"
                        : "bg-slate-50 border-gray-200 text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sliders for dynamic row counts (Replaced with 10 Isolated Controls) */}
          {/* PAINEL DE CONTROLES ISOLADOS (10 INDICADORES EXIGIDOS) */}
          <div className="space-y-4 pt-4 border-t border-gray-150">
            <label className="text-[10px] font-mono font-bold text-indigo-700 block uppercase tracking-wider">
              Controles Isolados (10 Indicadores)
            </label>

            {/* Grupo 1: Avaliação & Score */}
            <div className="p-3 bg-indigo-50/20 rounded-none-none border border-indigo-100/60 space-y-3">
              <span className="text-[9px] font-mono font-bold text-indigo-500 uppercase tracking-widest block">Avaliação & Scores</span>
              
              {/* 1. Rating Geral de Crédito */}
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-700 block">Rating Geral de Crédito</label>
                <select
                  value={ratingGeral}
                  onChange={(e) => setRatingGeral(e.target.value)}
                  className="w-full text-xs py-1 px-1.5 bg-white border border-gray-200 rounded-none text-slate-800 focus:outline-none focus:border-indigo-500 font-mono"
                >
                  <option value="AUTO">Automático (Inteligente)</option>
                  <option value="A">AAA - AA (Excelente - A)</option>
                  <option value="B">B - BB (Bom - B)</option>
                  <option value="C">CC - CCC (Médio - C)</option>
                  <option value="D">D (Baixo - D)</option>
                  <option value="E">E (Crítico - E)</option>
                </select>
              </div>

              {/* 9. Score de Crédito Consolidado SCR */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-500">Score Consolidado SCR</span>
                  <span className="font-bold text-indigo-600">{scoreBacenScr}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={scoreBacenScr}
                  onChange={(e) => setScoreBacenScr(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Grupo 2: Ocorrências de Mercado (Fontes II e III) */}
            <div className="p-3 bg-rose-50/20 rounded-none-none border border-rose-100/60 space-y-3">
              <span className="text-[9px] font-mono font-bold text-rose-500 uppercase tracking-widest block">Ocorrências Fontes II & III</span>

              {/* 3. Detalhamento de Pendências Financeiras FONTE II */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-500">Pendências FONTE II</span>
                  <span className="font-bold text-rose-600">{pendenciasFonteIICount} rows</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  value={pendenciasFonteIICount}
                  onChange={(e) => setPendenciasFonteIICount(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              {/* 4. Detalhamento de Restrições em Aberto FONTE III */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-500">Restrições FONTE III</span>
                  <span className="font-bold text-rose-600">{restricoesFonteIIICount} rows</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  value={restricoesFonteIIICount}
                  onChange={(e) => setRestricoesFonteIIICount(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              {/* 5. Títulos Protestados em Cartório FONTE III */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-500 font-medium">Protestos FONTE III</span>
                  <span className="font-bold text-rose-600">{protestosCount} rows</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  value={protestosCount}
                  onChange={(e) => setProtestosCount(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Grupo 3: Ocorrências Bancárias (Fonte IV) */}
            <div className="p-3 bg-amber-50/25 rounded-none-none border border-amber-100/60 space-y-3">
              <span className="text-[9px] font-mono font-bold text-amber-600 uppercase tracking-widest block">Ocorrências Bancárias Fonte IV</span>

              {/* 6. Pendências Financeiras Bancárias FONTE IV */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-500">Bancárias FONTE IV</span>
                  <span className="font-bold text-amber-600">{bancariasCount} rows</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  value={bancariasCount}
                  onChange={(e) => setBancariasCount(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* 7. Cheques sem Fundos FONTE IV */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-500">Cheques sem Fundos F. IV</span>
                  <span className="font-bold text-amber-600">{chequesCount}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={chequesCount}
                  onChange={(e) => setChequesCount(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Grupo 4: Judicial, Consultas & BACEN */}
            <div className="p-3 bg-slate-50/80 rounded-none-none border border-slate-200/80 space-y-3">
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Judicial & Históricos</span>

              {/* 8. Ações e Processos Judiciais Ativos */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-500">Ações e Processos Ativos</span>
                  <span className="font-bold text-slate-700">{processosCount} rows</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  value={processosCount}
                  onChange={(e) => setProcessosCount(Number(e.target.value))}
                  className="w-full accent-slate-600 cursor-pointer"
                />
              </div>

              {/* 2. Histórico Recente de Consultas */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-500">Histórico de Consultas</span>
                  <span className="font-bold text-slate-700">{consultasCount} rows</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  value={consultasCount}
                  onChange={(e) => setConsultasCount(Number(e.target.value))}
                  className="w-full accent-slate-600 cursor-pointer"
                />
              </div>

              {/* 10. SCR BACEN */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-500">SCR BACEN (Operações)</span>
                  <span className="font-bold text-slate-700">{bacenCount} rows</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  value={bacenCount}
                  onChange={(e) => setBacenCount(Number(e.target.value))}
                  className="w-full accent-slate-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100 text-[10px] font-mono text-center space-y-1.5 text-slate-400">
        <p>A4 Print Simulation Engine v2.1</p>
        <p className="text-slate-500">Nexa Intelligence Ltda.</p>
      </div>
    </div>
  );
}
