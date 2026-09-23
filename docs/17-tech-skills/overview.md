# 17 - Perfil Técnico, Skills & Boas Práticas de Engenharia

Este documento sintetiza para tech leads, recrutadores, auditores de código e novos engenheiros quais **Hard Skills**, **Soft Skills**, **paradigmas de engenharia** e **práticas de versionamento** foram aplicados na construção e evolução da plataforma.

---

## 1. Stack & Frameworks (Hard Skills)
- **Linguagem & Tipagem Estática:** TypeScript 5.8 com configurações estritas (`strict: true`, `isolatedModules: true`, `skipLibCheck: true`) garantindo inferência precisa de dados financeiros e proteção em tempo de compilação.
- **Biblioteca de Interface:** React 19 executado sob o paradigma de componentes funcionais puros, com eliminação completa de métodos de ciclo de vida obsoletos e substituição por Hooks reativos (`useState`, `useEffect`, `useMemo`, `useContext`).
- **Build Tooling & Bundler:** Vite 6 configurado com plugins oficiais de alta velocidade (`@vitejs/plugin-react`), alias de importação absoluto (`@/*`) e hot module replacement ultrarrápido sob compilação nativa com ESNext.
- **Motor de Estilização:** Tailwind CSS v4 via integração nativa de compilador (`@tailwindcss/vite`), utilizando temas estendidos (`--color-nexa-*`, `--font-display`, `--font-mono`), utilitários de isolamento de impressão (`page-break-inside-avoid`) e suporte avançado a *Paged Media* (`@media print`).
- **Animações & Transições:** Motion (`motion/react`) para orquestração fluida de abas, transições de opacidade com `AnimatePresence` e aceleração de hardware sem impacto de renderização.
- **Design System & Iconografia:** Lucide React integrado com abordagem *tree-shaking* ativada para consumo mínimo de payload JavaScript.
- **Hospedagem & CI/CD de Distribuição:** GitHub Pages com pipeline de deploy contínuo em branch de produção, com prefixação de caminho relativo (`base: '/PericiaDeCredito/'`).

---

## 2. Conceitos & Paradigmas de Desenvolvimento
- **Decomposição do "God Component" (Clean Architecture):** Refatoração integral da aplicação de um bloco monolítico legado de 580 linhas para uma arquitetura multicamada com separação nítida entre Casca de Apresentação (`App.tsx`), Orquestração de Estado (`state/`) e Lógica de Negócio (`domain/`).
- **Design Modular em Atomic Design Adaptado:** 
  - *Átomos:* Componentes visuais elementares (`NexaLogo.tsx`).
  - *Moléculas:* Composições com funcionalidade pontual (`PageFooter.tsx` com carimbo de autenticação e numeração de páginas).
  - *Organismos:* Unidades autônomas de alto nível (`Sidebar.tsx`, `DashboardAnalytics.tsx` e as 8 pranchetas individuais de `ReportPages/Page1..8`).
- **Princípios SOLID:**
  - *Single Responsibility Principle (SRP):* Cada página do dossiê A4 é responsável única e exclusivamente pela renderização dos dados do seu domínio específico (Page 1 = Cadastral, Page 6 = Judicial, Page 7/8 = BACEN).
  - *Dependency Inversion:* Componentes dependem da interface abstrata exposta pelo hook `useCreditReport` e não de instâncias concretas de dados.
- **Gerenciamento de Estado Reativo sem Prop Drilling:** Implementação de Context API unificada (`CreditReportContext.tsx`) eliminando o repasse cascateado de mais de 30 propriedades através da árvore de componentes.
- **Performance & Computação Otimizada com useMemo:** Memoização seletiva de cálculos financeiros volumosos (`totalPendencias`, `totalProcessos`, `totalRestricoesConsolidado`) garantindo 60 FPS nos seletores e sliders sem congelamento de tela.
- **Defesa em Profundidade contra Injeção:** Implementação de motor de realce textual (`highlight`) com quebra de nó sintática no React em substituição direta a abordagens inseguras como `innerHTML`.

---

## 3. Versionamento, Git Tags & Workflow
- **Conventional Commits:** Adoção rigorosa de mensagens de commit baseadas na especificação internacional (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `perf:`).
- **Versionamento Semântico (SemVer):** Controle de versões no formato `MAJOR.MINOR.PATCH` ancorado no `package.json` e rastreabilidade total de marcos evolutivos via Git Tags.
- **Estratégia de Branches & Pull Requests:** Modelo baseado em *Trunk-Based Development* / *Feature Branch Workflow*, assegurando integridade da ramificação principal através de validação estática de tipos (`npm run lint` com `tsc --noEmit`).
- **Rastreabilidade de Milestones por Git Tags:**
  - `v1.0.0`: Marco estável de fundação da documentação arquitetural oficial e estabilização das 8 páginas de impressão.
  - `v1.1.0`: Introdução de novos filtros preditivos e simulações com múltiplos perfis de cidadãos.

---

## 4. Soft Skills & Capacidades de Engenharia Demonstradas
- **Visão Sistêmica de Negócio e Compliance:** Compreensão e modelagem de regras regulatórias complexas, incluindo terminologias do SCR do Banco Central, motivos de devolução de cheques (Motivo 12), implicações de polo passivo judicial e exigências da LGPD.
- **Pensamento Crítico para Trade-offs de Tecnologia:** Decisão fundamentada por utilizar o subsistema nativo de impressão vetorial do browser (`window.print` sob CSS paged media) em vez de bibliotecas pesadas de geração de PDF no cliente (`jsPDF` / `html2canvas`), garantindo nitidez vetorial, fidelidade de fontes e zero acréscimo de peso no bundle.
- **Autonomia em Decisões Arquiteturais:** Capacidade de identificar gargalos estruturais no código, propor soluções limpas e executá-las de maneira cirúrgica sem introduzir regressões visuais ou quebra de contratos existentes.
- **Prática Ativa de Documentation as Code:** Comprometimento em manter a documentação viva, detalhada e estruturada de ponta a ponta, viabilizando onboarding ágil e auditabilidade técnica para os próximos 10 anos da plataforma.
