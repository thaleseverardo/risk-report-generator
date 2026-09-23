# 15 - Failure Analysis (FMEA)

Análise de modos de falha, impacto potencial e mecanismos de defesa implementados.

```mermaid
flowchart TD
    subgraph FalhasIdentificadas[Modos de Falha em Potencial]
      F1[Transbordamento de Tabela além de 297mm na Folha]
      F2[Re-render em Massa travando a Interface]
      F3[Execução de Regex Malformada no Campo de Busca]
      F4[Incompatibilidade de Cores na Impressão em Preto e Branco]
    end

    subgraph MitigacoesImplementadas[Defesas Arquiteturais Ativas]
      M1[Botão 'Ver mais' limita linhas iniciais entre 5 e 10]
      M2[Isolamento granular em useMemo no CreditReportContext]
      M3[Escape de caracteres especiais antes da compilação do RegExp]
      M4[Classes CSS com contrastes altos e bordas sólidas]
    end

    F1 --> M1
    F2 --> M2
    F3 --> M3
    F4 --> M4
```

---

## Matriz de Risco e Tratamento

| Risco Técnico | Severidade | Probabilidade | Mitigação |
| :--- | :--- | :--- | :--- |
| **Overflow de Página A4** | Alta | Média | Tabelas extensas contam com limite inicial de exibição (`slice(0, 5)`) e botão de expansão com supressão em impressão (`no-print`). |
| **RegExp ReDoS Attack** | Média | Baixa | O campo de busca atua exclusivamente sobre textos sanitizados locais, sem avaliação recursiva descontrolada. |
| **Perda de Dados por Reload** | Baixa | Alta | O botão "Resetar" permite retorno imediato aos parâmetros padronizados de referência. |
