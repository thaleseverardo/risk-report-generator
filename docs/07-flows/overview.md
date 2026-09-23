# 07 - Fluxos

## 1. Fluxo de Recálculo Reativo em Tempo Real

Demonstra a cascata de atualização disparada pela interação do operador nos controles deslizantes da Sidebar.

```mermaid
sequenceDiagram
    autonumber
    actor Analista as Analista de Risco
    participant Sidebar as Sidebar.tsx
    participant Context as CreditReportContext
    participant Engine as credit-simulation.service
    participant RatingUtil as rating.ts
    participant Pages as A4Pages / ReportPages

    Analista->>Sidebar: Altera slider de 'Pendências Fonte II' (ex: 12 -> 45)
    Sidebar->>Context: setPendenciasFonteIICount(45)
    Context->>Engine: generateDynamicRows(PENDENCIAS_FINANCEIRAS_ROWS, 45)
    Engine-->>Context: Retorna nova coleção com 45 linhas interpoladas
    Context->>Context: Recalcula totalPendencias via useMemo
    Context->>Context: Recalcula totalRestricoesConsolidado
    Context->>RatingUtil: getDynamicRating(score, probabilidade)
    RatingUtil-->>Context: Retorna objeto de Rating normalizado
    Context-->>Pages: Dispara re-render dos componentes inscritos
    Pages-->>Analista: Atualiza visualização das páginas A4 e dashboard
```

---

## 2. Fluxo de Impressão Vetorial / Exportação de PDF

```mermaid
sequenceDiagram
    autonumber
    actor Analista as Analista de Risco
    participant Sidebar as Sidebar.tsx
    participant Browser as Browser Window (window.print)
    participant CSSPrint as CSS @media print Subsystem
    participant Printer as Gerador de PDF / Impressora

    Analista->>Sidebar: Clica em "Salvar PDF" ou "Imprimir"
    Sidebar->>Browser: Executa window.print()
    Browser->>CSSPrint: Aplica regras de estilo para mídia de impressão
    CSSPrint->>CSSPrint: Oculta elementos com classe .no-print (Sidebar, Header, Botões)
    CSSPrint->>CSSPrint: Força dimensões de página A4 (210mm x 297mm)
    CSSPrint->>CSSPrint: Executa page-break-after: always para cada Page1..Page8
    CSSPrint->>Printer: Envia buffer vetorial formatado
    Printer-->>Analista: Dossiê PDF gerado sem distorção visual
```
