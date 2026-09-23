# 04 - Capacidades

As capacidades do sistema definem os serviços entregues pela arquitetura tanto para os operadores de negócio quanto para os componentes de software.

```mermaid
mindmap
  root((Capacidades da Plataforma))
    Inteligência Analítica
      Cálculo de Score Dinâmico
      Classificação Qualitativa A-E
      Agregação Multidimensional de Risco
    Auditoria e Perícia
      Emissão de Dossiê Multipágina A4
      Garantia de Não-Sobreposição em Impressão
      Marcação Criptográfica de Protocolo
    Simulação Paramétrica
      Calibração de 10 Controles Isolados
      Benchmarking via 10 Cidadãos Sintéticos
      Simulação de Estresse Financeiro
    Explorabilidade
      Busca Textual em Tempo Real com Highlight
      Dashboard Executivo de Risco Corporativo
```

---

## Matriz de Capacidades

| ID | Capacidade | Módulo Responsável | Nível de Criticidade |
| :--- | :--- | :--- | :--- |
| **CAP-01** | Paginação A4 Determinística | `src/components/organisms/ReportPages/` | Crítica |
| **CAP-02** | Sincronização Reativa Unidirecional | `src/state/CreditReportContext.tsx` | Alta |
| **CAP-03** | Escalonamento Estocástico de Dados | `src/domain/services/credit-simulation.service.ts` | Média |
| **CAP-04** | Normalização e Ponderação de Ratings | `src/utils/rating.ts` | Crítica |
| **CAP-05** | Realce Textual Semântico (Highlight) | `A4Pages.tsx` + Regex Parser | Baixa |
