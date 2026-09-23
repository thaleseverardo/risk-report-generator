# 13 - Integrações

O sistema foi desenhado para atuar em duas frentes de integração:

```mermaid
flowchart LR
    subgraph ClientIntegration[Integrações Client-Side Nativas]
      BrowserPrint[Subsistema window.print / PDF Driver]
      TailwindPrintEngine[Tailwind CSS v4 Print Directives]
    end

    subgraph FutureIntegrations[Próximas Integrações Externas / Roadmap]
      BacenGateway[Gateway SCR Banco Central via API]
      CreditBureauAPI[Webhooks de Bureaus Serasa/Boa Vista]
      JudicialCrawler[API de Processos DataJud/CNJ]
    end

    App[PericiaDeCredito Engine] --> BrowserPrint
    App --> TailwindPrintEngine
    App -.-> BacenGateway
    App -.-> CreditBureauAPI
    App -.-> JudicialCrawler
```

---

## Detalhamento de Integrações Nativas
1. **Subsistema de Impressão do Navegador (`window.print`):** 
   - Habilitado por regras do Tailwind CSS v4 (`print:overflow-visible`, `print:shadow-none`, `print:p-10`).
   - Força fidelidade cromática com a diretiva `-webkit-print-color-adjust: exact !important`.
2. **Font Providers:**
   - **Inter:** Utilizada para textos corridos e legibilidade tabular via Google Fonts.
   - **JetBrains Mono:** Utilizada para CPF, protocolos e dados numéricos tabulados.
   - **Satoshi:** Tipografia de títulos com alto impacto executivo via Fontshare CDN.
