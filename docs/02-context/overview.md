# 02 - Ecossistema / C4 L1

## 1. Diagrama de Contexto de Sistema (C4 L1)

O ecossistema posiciona o **Relatório de Perícia de Crédito** no centro do processo decisório entre analistas, bureaus e comitês de compliance.

```mermaid
flowchart TD
    UserAnalyst[Analista de Risco / Comitê de Crédito]
    UserClient[Cliente / Tomador de Crédito]

    subgraph Platform[PericiaDeCredito - Nexa Risk Platform]
      AppEngine[SPA Web Application - Nexa Client Engine]
      PrintEngine[Browser Paged Media Render Engine]
    end

    Bureaus[Bureaus de Crédito - Fontes II, III e IV]
    BacenSystem[Sistema de Informações de Crédito - SCR BACEN]
    LegalSources[Tribunais de Justiça / Diários Oficiais]
    PDFExport[Arquivo PDF Auditável / Impresso Físico]

    UserAnalyst -->|Simula parâmetros e audita restrições| AppEngine
    AppEngine -.->|Consome registros de inadimplência| Bureaus
    AppEngine -.->|Consome históricos de crédito a vencer| BacenSystem
    AppEngine -.->|Consome processos cíveis e criminais| LegalSources
    AppEngine -->|Dispara geração de documento| PrintEngine
    PrintEngine -->|Exporta folha 210mm x 297mm| PDFExport
    PDFExport -->|Submetido para comprovação| UserClient
```

---

## 2. Atores e Responsabilidades
- **Analista de Risco:** Operador corporativo que avalia pendências, aplica filtros por entidade credora, calibra cenários de estresse de score e emite pareceres.
- **Bureaus de Crédito (Fontes II, III e IV):** Entidades provedoras de pendências financeiras comerciais, restrições cadastrais, títulos protestados e cheques sem provisão de fundos (Motivo 12).
- **Sistema SCR (Banco Central do Brasil):** Registro centralizado que consolida coobrigações, operações ativas por modalidade e montantes a vencer.
