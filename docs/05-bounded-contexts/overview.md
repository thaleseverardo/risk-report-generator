# 05 - Bounded Contexts

O isolamento contextual evita contaminação de modelos ubíquos entre os diferentes módulos da plataforma.

```mermaid
flowchart LR
    subgraph BC_Cadastral[Contexto Cadastral]
      PersonEntity[Pessoa / Titular]
      AddressVO[Endereço Fiscal]
    end

    subgraph BC_Scoring[Contexto de Avaliação de Risco]
      ScoreVO[Score 0-1000]
      RatingVO[Rating Letra A-E]
      RiskProbabilityVO[Probabilidade de Default]
    end

    subgraph BC_Occurrences[Contexto de Inadimplência]
      FinancialOccurrence[Pendência Financeira]
      ProtestRecord[Título Protestado]
      BankDefault[Pendência Bancária]
    end

    subgraph BC_Legal[Contexto Judicial]
      LawsuitAggregate[Processo Judicial]
      LegalImpactVO[Impacto Reputacional/Crédito]
    end

    subgraph BC_SCR[Contexto BACEN SCR]
      CreditDueVO[Crédito a Vencer]
      OperationAggregate[Modalidade Operacional SCR]
    end

    BC_Cadastral -->|Fornece Documento Base| BC_Scoring
    BC_Occurrences -->|Soma Valores Restritivos| BC_Scoring
    BC_Legal -->|Sinaliza Litígios Passivos| BC_Scoring
    BC_SCR -->|Sinaliza Comprometimento de Longo Prazo| BC_Scoring
```

---

## Contratos de Contexto
- **Linguagem Ubíqua Comum:** O termo *Ocorrência* no contexto de Inadimplência representa uma anotação em bureau com valor nominal positivo; no contexto de BACEN SCR, representa um apontamento de operação com classificação de restritividade (Sim/Não).
- **Anti-Corruption Layer (ACL):** Implementada no domínio de simulação (`credit-simulation.service.ts`), que sanitiza registros brutos e os converte em coleções de tipos definidos em `src/types.ts`.
