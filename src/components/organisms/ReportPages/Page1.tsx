import nexaLogo from '/assets/cnc/nexa_logo_horizontal_flat_white.svg';
import React from 'react';
import { Info, Check } from "lucide-react";
import PageFooter from "../../molecules/PageFooter";
import { Person } from "../../../data/peopleBank";

interface Page1Props {
  clientName: string;
  cpf: string;
  currentPerson: Person;
  highlight: (text: string) => React.ReactNode;
  tipoPessoa: "PF" | "PJ";
}

export default function Page1({ clientName, cpf, currentPerson, highlight, tipoPessoa }: Page1Props) {
  return (
    <div className="print-page w-[210mm] min-h-[297mm] bg-white text-slate-800 p-8 md:p-12 shadow-2xl relative border border-slate-100 flex flex-col justify-between print:shadow-none print:border-none print:p-10 page-break-after">
      <div>
        {/* Header principal */}
        <div className="bg-slate-950 text-white rounded-none -mx-8 -mt-8 md:-mx-12 md:-mt-12 print:-mx-10 print:-mt-10 px-8 py-6 md:px-12 md:py-8 print:px-10 print:py-8 mb-6 relative overflow-hidden border-b border-slate-900 shadow-lg">
          <div className="flex justify-between items-center relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <img 
                  src={nexaLogo}
                  alt="CNC Logo" 
                  className="h-6 object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <h1 className="text-xl md:text-2xl font-display font-black text-white tracking-tight leading-none">
                Análise de Risco Corporativa
              </h1>
              <p className="text-[11px] text-slate-400 mt-1.5 font-sans">
                Relatório analítico e comportamental de crédito individual.
              </p>
            </div>
            
            {/* Tag para identificar se o relatório é para PF ou PJ */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <div className={`w-15 h-15 rounded-full border-2 flex items-center justify-center text-white font-display font-black text-[16px] tracking-wider shadow-lg ${
                tipoPessoa === "PF" 
                  ? "border-cyan-400 bg-cyan-950/40 shadow-cyan-500/10" 
                  : "border-amber-500 bg-amber-950/40 shadow-amber-500/10"
              }`}>
                {tipoPessoa}
              </div>
              <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-1 block">
                TIPO
              </span>
            </div>
          </div>
        </div>

        {/* Informativo */}
        <div className="bg-amber-50/70 border-l-4 border-amber-500 p-4 rounded-none mb-6 text-xs text-slate-700 flex gap-3 items-start">
          <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-950 block mb-0.5">Informativo Importante</span>
            Ressaltamos que a análise de crédito e seu resultado são de responsabilidade exclusiva do cliente associado.
          </div>
        </div>

        {/* DADOS CADASTRAIS */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5 mb-3.5 border-b border-slate-100 pb-2">
            <div className="w-1.5 h-4.5 bg-nexa-blue rounded-none shrink-0"></div>
            <h2 className="text-xs font-display font-black tracking-wider text-nexa-blue uppercase">
              Dados Cadastrais Básicos
            </h2>
          </div>
          <div className="bg-slate-50/50 p-4 rounded-none border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Nome Completo</span>
                <span className="text-lg font-display font-bold text-slate-900">{highlight(clientName)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Situação do CPF</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 text-[10px] font-bold mt-1 uppercase tracking-wider">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-3" />
                  REGULAR
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-mono font-semibold text-slate-400 block">CPF</span>
                <span className="font-mono font-semibold text-slate-800">{highlight(cpf)}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-semibold text-slate-400 block">Data de Nascimento</span>
                <span className="text-slate-800 font-semibold">{highlight(currentPerson.dadosCadastrais.dataNascimento)}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-semibold text-slate-400 block">Idade</span>
                <span className="text-slate-800 font-semibold">{currentPerson.dadosCadastrais.idade}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-semibold text-slate-400 block">Sexo / Gênero</span>
                <span className="text-slate-800 font-semibold">{currentPerson.dadosCadastrais.sexo}</span>
              </div>
            </div>
          </div>
        </div>

        {/* DADOS DE LOCALIZAÇÃO E CONTATO */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5 mb-3.5 border-b border-slate-100 pb-2">
            <div className="w-1.5 h-4.5 bg-nexa-blue rounded-none shrink-0"></div>
            <h2 className="text-xs font-display font-black tracking-wider text-nexa-blue uppercase">
              Dados de Localização e Contato
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
            <div className="md:col-span-2 p-3 bg-slate-50/50 rounded-none border border-slate-100">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Endereço Principal</span>
              <span className="font-semibold text-slate-800 block mt-1">{highlight(currentPerson.localizacao.endereco)}</span>
            </div>
            <div className="p-3 bg-slate-50/50 rounded-none border border-slate-100">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Bairro · CEP</span>
              <span className="font-semibold text-slate-800 block mt-1">{highlight(currentPerson.localizacao.bairro)} · {highlight(currentPerson.localizacao.cep)}</span>
            </div>
            <div className="p-3 bg-slate-50/50 rounded-none border border-slate-100">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Cidade</span>
              <span className="font-semibold text-slate-800 block mt-1">{highlight(currentPerson.localizacao.cidade)}</span>
            </div>
            <div className="p-3 bg-slate-50/50 rounded-none border border-slate-100">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Estado (UF)</span>
              <span className="font-semibold text-slate-800 block mt-1">{highlight(currentPerson.localizacao.uf)}</span>
            </div>
            <div className="p-3 bg-slate-50/50 rounded-none border border-slate-100">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Telefone de Contato</span>
              <span className="font-semibold text-slate-500 block mt-1">{currentPerson.dadosCadastrais.telefone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer da folha */}
      <PageFooter pageNumber={1} totalPages={8} documentId={cpf} />
    </div>
  );
}
