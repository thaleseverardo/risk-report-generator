# Changelog da Arquitetura e Documentação

Todas as decisões arquiteturais, evoluções de modelo e atualizações documentais da plataforma **Relatório de Perícia de Crédito (Nexa Risk Intelligence Hub)** são registradas neste artefato.

O formato baseia-se no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e adere ao [Semantic Versioning](https://semver.org/).

---

## [Unreleased]
### Planejado
- Integração com backend distribuído para ingestão de dados em tempo real via webhooks bancários.
- Pipeline de renderização headless via Chromium para geração server-side de PDF imutável.

---

## [1.0.0] - 2026-07-20
### Adicionado
- Fundação da documentação técnica e arquitetural em 17 níveis de abstração (*Documentation as Code*).
- Decomposição modular do sistema legado em camadas limpas: State Store (`CreditReportContext`), Domain Service (`credit-simulation.service.ts`) e Presentation Layer em Atomic Design adaptado.
- Motor dinâmico de cálculo de risco e inferência de ratings (`rating.ts`).
- Subsistema de impressão fiel à norma A4 (210mm x 297mm) com isolamento CSS de *paged media* (`@media print`).
- Catálogo de cidadãos simulados (`peopleBank.ts`) para testes estocásticos e testes de conformidade LGPD.
- Especificação formal de perfil técnico de engenharia (`17-tech-skills/overview.md`).
