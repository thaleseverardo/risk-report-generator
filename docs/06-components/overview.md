# 06 - Componentes / C4 L3

A arquitetura do front-end está estruturada em três camadas principais: Apresentação, Orquestração de Estado e Serviços de Domínio.

```mermaid
flowchart TD
    subgraph UI_Presentation[Camada de Apresentação]
      AppShell[App.tsx / AppContainer]
      SidebarComp[Sidebar.tsx - Controles e Simulação]
      DashComp[DashboardAnalytics.tsx - Visão Gráfica]
      A4Comp[A4Pages.tsx - Visualizador A4]
      subgraph Pages[Páginas Individuais de Relatório]
        P1[Page1 - Identificação Cadastral]
        P2[Page2 - Avaliação e Síntese]
        P3[Page3 - Faturas e Consultas]
        P4[Page4 - Pendências e Restrições]
        P5[Page5 - Protestos e Bancárias]
        P6[Page6 - Processos Judiciais]
        P7[Page7 - SCR BACEN Resumo]
        P8[Page8 - Modalidades SCR & LGPD]
      end
    end

    subgraph State_Store[Gerenciador de Estado Global]
      Context[CreditReportContext.tsx]
      StateHooks[useCreditReport Hook]
    end

    subgraph Domain_Services[Serviços Puros de Domínio]
      SimService[credit-simulation.service.ts]
      RatingService[rating.ts]
    end

    subgraph Data_Fixtures[Bancos de Dados Sintéticos]
      PeopleBank[peopleBank.ts]
      ReportData[reportData.ts]
      MockBank[mockDataBank.ts]
    end

    AppShell --> SidebarComp
    AppShell --> DashComp
    AppShell --> A4Comp
    A4Comp --> Pages

    SidebarComp <-->|Consome e despacha mutações| StateHooks
    Pages <-->|Lê coleções calculadas| StateHooks
    DashComp <-->|Lê métricas agregadas| StateHooks

    StateHooks --> Context
    Context --> SimService
    Context --> RatingService
    SimService --> DataFixtures
    RatingService -.-> Context
```

---

## Responsabilidades dos Componentes Principais
- **`CreditReportContext`:** Mantém a fonte única da verdade, sincroniza seleções de cidadãos com inputs do usuário e executa memoizações pesadas (`useMemo`) para evitar *re-renders* redundantes.
- **`credit-simulation.service.ts`:** Gera coleções sintéticas com intervalos temporais coerentes, alterando identificadores, datas e valores conforme multiplicadores.
- **`Page1` a `Page8`:** Componentes estritamente visuais que consomem dados do contexto e renderizam layouts blindados com altura mínima `min-h-[297mm]`.
