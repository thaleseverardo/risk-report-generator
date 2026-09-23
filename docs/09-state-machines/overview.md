# 09 - State Machines

## 1. Ciclo de Vida do Rating de Risco

A classificação de risco transita de acordo com uma qualidade sintética ponderada:
`quality = (score / 10) * 0.5 + (100 - probabilidade) * 0.5`

```mermaid
stateDiagram-v2
    [*] --> RatingCalculated

    state RatingCalculated {
        [*] --> E_Critico: quality < 25
        [*] --> D_Baixo: quality >= 25 e quality < 45
        [*] --> C_Medio: quality >= 45 e quality < 65
        [*] --> B_Bom: quality >= 65 e quality < 85
        [*] --> A_Excelente: quality >= 85
    }

    E_Critico --> D_Baixo: Incremento de Score ou Redução de Inadimplência
    D_Baixo --> C_Medio: Redução de Apontamentos Comerciais
    C_Medio --> B_Bom: Regularização de Protestos e Pendências Bancárias
    B_Bom --> A_Excelente: Histórico Impecável sem Apontamentos Judiciais
    A_Excelente --> E_Critico: Identificação de Restrições Críticas ou Default Direto
```

---

## 2. Máquina de Estados da Interface (Tabs de Visualização)

```mermaid
stateDiagram-v2
    [*] --> A4_VIEW: Padrão de Inicialização

    A4_VIEW --> DASH_VIEW: Clique na aba 'Dashboard Analytics'
    DASH_VIEW --> A4_VIEW: Clique na aba 'Simulação Folha A4'

    state A4_VIEW {
        [*] --> CompactList: Exibição Padrão (5 a 10 itens)
        CompactList --> ExpandedList: Clique em 'Ver mais'
        ExpandedList --> CompactList: Troca de Cidadão ou Reset
    }

    state DASH_VIEW {
        [*] --> CardsRendered
        CardsRendered --> MetricPulse
    }
```
