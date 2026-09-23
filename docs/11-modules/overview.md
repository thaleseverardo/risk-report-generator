# 11 - Organização de Módulos

O código está organizado seguindo separação estruturada por responsabilidades técnicas e funcionais:

```text
src/
├── components/                      # Camada de Apresentação (Atomic Design)
│   ├── atoms/                       # Elementos indivisíveis (Logotipos, Badges)
│   │   └── NexaLogo.tsx
│   ├── molecules/                   # Agrupamentos de átomos com função direta
│   │   └── PageFooter.tsx           # Rodapé padronizado de autenticação e página
│   ├── organisms/                   # Blocos autônomos de interface
│   │   ├── DashboardAnalytics.tsx   # Painel executivo gráfico de risco
│   │   ├── ReportPages/             # As 8 pranchetas individuais do relatório A4
│   │   │   ├── Page1.tsx            # Identificação e dados cadastrais
│   │   │   ├── Page2.tsx            # Avaliação preliminar e síntese de ocorrências
│   │   │   ├── Page3.tsx            # Faturas, novos contratos e histórico de consultas
│   │   │   ├── Page4.tsx            # Detalhamento de pendências financeiras e restrições
│   │   │   ├── Page5.tsx            # Títulos protestados, bancárias e cheques
│   │   │   ├── Page6.tsx            # Ações e processos judiciais ativos
│   │   │   ├── Page7.tsx            # Histórico consolidado do SCR BACEN
│   │   │   └── Page8.tsx            # Detalhamento de modalidades SCR e conformidade LGPD
│   │   └── Sidebar.tsx              # Painel de controle analítico e simulador
│   └── A4Pages.tsx                  # Container vertical das pranchetas A4
│
├── domain/                          # Camada de Negócio e Domínio Puro
│   └── services/
│       └── credit-simulation.service.ts # Escalonamento estocástico e agregação financeira
│
├── state/                           # Orquestração de Estado Reativo
│   └── CreditReportContext.tsx      # Provider global e hook unificado (useCreditReport)
│
├── data/                            # Fixtures e Bancos de Dados Estáticos
│   ├── mockDataBank.ts              # Nomes fictícios para sanitização
│   ├── peopleBank.ts                # Catálogo de 10 perfis para simulação
│   └── reportData.ts                # Dados de base para duplicação escalar
│
├── utils/                           # Utilitários Puros
│   └── rating.ts                    # Algoritmo de classificação de rating
│
├── types.ts                         # Definições de Tipos TypeScript Compartilhados
├── App.tsx                          # Casca Principal da Aplicação
├── main.tsx                         # Ponto de Entrada (Root React 19)
└── index.css                        # Estilos Globais, Fontes e Regras @media print
```
