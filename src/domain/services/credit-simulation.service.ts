/**
 * Dynamic Mock & Risk Simulation Domain Service.
 *
 * This file encapsulates the business logic for simulate financial records,
 * calculate totals and generate realistic dates for the A4 credit report.
 * Generic constraint uses <T extends object> for compatibility with all domain interfaces.
 */

import { FICTIONAL_BANKS_FINANCIALS, FICTIONAL_COMPANIES_CONSULTAS } from "../../data/mockDataBank";
import { OPERACOES_DADOS } from "../../data/reportData";
import { OperacaoResumo, BacenCredito } from "../../types";

/**
 * Generate dynamic staggered rows based on an original template array.
 * Take care on this logic because the legacy system expects exact date intervals.
 */
export function generateDynamicRows<T extends object>(baseRows: T[], targetCount: number): T[] {
  // In case that the requested count is zero or negative, return empty right away
  if (!baseRows || baseRows.length === 0 || targetCount <= 0) {
    return [];
  }

  const generatedList: T[] = [];

  for (let index = 0; index < targetCount; index++) {
    const templateItem = baseRows[index % baseRows.length];
    const itemClone = { ...templateItem } as Record<string, any>;

    // 1. Verify if the row is related to company queries for to generate fictional names
    if ("empresa" in itemClone) {
      itemClone.empresa = FICTIONAL_COMPANIES_CONSULTAS[index % FICTIONAL_COMPANIES_CONSULTAS.length];

      // Base reference date for calculations: 19/07/2026
      const referenceDate = new Date(2026, 6, 19);
      const queryDate = new Date(referenceDate.getTime() - index * 2.5 * 24 * 60 * 60 * 1000);

      const dayFormatted = String(queryDate.getDate()).padStart(2, "0");
      const monthFormatted = String(queryDate.getMonth() + 1).padStart(2, "0");
      const yearFormatted = queryDate.getFullYear();
      itemClone.data = `${dayFormatted}/${monthFormatted}/${yearFormatted}`;

      const differenceInDays = Math.round(
        (referenceDate.getTime() - queryDate.getTime()) / (24 * 60 * 60 * 1000)
      );

      // Verify elapsed period for display friendly label on screen
      if (differenceInDays === 0) {
        itemClone.tempoAtras = "hoje";
      } else if (differenceInDays === 1) {
        itemClone.tempoAtras = "ontem";
      } else if (differenceInDays < 30) {
        itemClone.tempoAtras = `há ${differenceInDays} dias`;
      } else {
        const elapsedMonths = Math.floor(differenceInDays / 30);
        itemClone.tempoAtras = elapsedMonths === 1 ? "há 1 mês" : `há ${elapsedMonths} meses`;
      }
    }

    // 2. Adjust informant bank naming with legacy prefix standard
    if ("informante" in itemClone && typeof itemClone.informante === "string") {
      const containsLegacyZeroPrefix = itemClone.informante.startsWith("0-");
      const simulatedBank = FICTIONAL_BANKS_FINANCIALS[index % FICTIONAL_BANKS_FINANCIALS.length];
      itemClone.informante = containsLegacyZeroPrefix ? `0-${simulatedBank}` : simulatedBank;
    }

    // 3. Make the mutation of identification numbers and values when multiplying entries
    if (index >= baseRows.length) {
      if ("contrato" in itemClone && typeof itemClone.contrato === "string") {
        itemClone.contrato = itemClone.contrato.replace(/\d+/g, (matchedDigits: string) =>
          String(Number(matchedDigits) + index)
        );
      }

      if ("numero" in itemClone && typeof itemClone.numero === "string") {
        itemClone.numero = itemClone.numero.replace(/\d+/g, (matchedDigits: string) =>
          String(Number(matchedDigits) + index)
        );
      }

      if ("valor" in itemClone && typeof itemClone.valor === "number") {
        // We calculate an ascending factor for diversify simulated values
        const scaleMultiplier = 1 + (index % 5) * 0.15;
        itemClone.valor = parseFloat((itemClone.valor * scaleMultiplier).toFixed(2));
      }
    }

    // 4. Handle criminal lawsuits classification rule
    if ("orgao" in itemClone) {
      const isCriminalLawsuit = index % 15 === 14;
      if (isCriminalLawsuit) {
        itemClone.assunto = "CRIMINAL";
        itemClone.classe =
          index % 2 === 0
            ? "ACAO PENAL - PROCEDIMENTO ORDINARIO"
            : "INQUERITO POLICIAL";
        itemClone.valor = 0;
      }
    }

    // 5. Stagger primary occurrence dates to avoid duplicated days on report tables
    if (
      "data" in itemClone &&
      typeof itemClone.data === "string" &&
      itemClone.data.includes("/") &&
      !("empresa" in itemClone)
    ) {
      const [parsedDay, parsedMonth, parsedYear] = itemClone.data.split("/").map(Number);

      if (!isNaN(parsedDay) && !isNaN(parsedMonth) && !isNaN(parsedYear)) {
        const originDate = new Date(parsedYear, parsedMonth - 1, parsedDay);
        const staggeredDate = new Date(originDate.getTime() - index * 1.5 * 24 * 60 * 60 * 1000);

        const dStr = String(staggeredDate.getDate()).padStart(2, "0");
        const mStr = String(staggeredDate.getMonth() + 1).padStart(2, "0");
        const yStr = staggeredDate.getFullYear();
        itemClone.data = `${dStr}/${mStr}/${yStr}`;

        // Keep availability date slightly ahead of creation date
        if ("disponib" in itemClone && typeof itemClone.disponib === "string" && itemClone.disponib.includes("/")) {
          const availDate = new Date(staggeredDate.getTime() + 1.2 * 24 * 60 * 60 * 1000);
          const avDay = String(availDate.getDate()).padStart(2, "0");
          const avMonth = String(availDate.getMonth() + 1).padStart(2, "0");
          const avYear = availDate.getFullYear();
          itemClone.disponib = `${avDay}/${avMonth}/${avYear}`;
        }
      }
    }

    generatedList.push(itemClone as T);
  }

  return generatedList;
}

/**
 * Calculate BACEN operations totals and adjust child records scales.
 * It is required for populate Page 7 and Page 8 with realistic SCR percentages.
 */
export function buildBacenOperations(bacenTotalCount: number): {
  bacenOperacoesRows: OperacaoResumo[];
  totalBacenCredito: number;
} {
  const operations = Array.from({ length: Math.max(0, bacenTotalCount) }).map((_, index) => {
    const baseTemplate = OPERACOES_DADOS[index % OPERACOES_DADOS.length];

    // Scale details array values dynamically
    const scaledDetails = (baseTemplate.detalhes || []).map((detail, detailIdx) => {
      const detailScale = 1 + (index % 3) * 0.12 + (detailIdx % 2) * 0.05;
      return {
        ...detail,
        valor: parseFloat((detail.valor * detailScale).toFixed(2)),
      };
    });

    const sumOfDetails = scaledDetails.reduce((accum, curr) => accum + curr.valor, 0);

    return {
      ...baseTemplate,
      descricao: `${baseTemplate.descricao} #${index + 1}`,
      detalhes: scaledDetails,
      total: parseFloat(sumOfDetails.toFixed(2)),
    };
  });

  const totalCredit = operations.reduce((accum, currentOp) => accum + currentOp.total, 0);

  return {
    bacenOperacoesRows: operations,
    totalBacenCredito: parseFloat(totalCredit.toFixed(2)),
  };
}

/**
 * Re-scale upcoming maturities against total BACEN commitment amount.
 */
export function scaleBacenDueCredits(
  baseMaturities: BacenCredito[],
  totalBacenCredit: number,
  limitCount: number
): BacenCredito[] {
  const slicedRows = generateDynamicRows<BacenCredito>(
    baseMaturities,
    Math.min(baseMaturities.length, Math.max(3, limitCount))
  );

  const baseSum = slicedRows.reduce((acc, row) => acc + (row.valor || 0), 0) || 1;
  const ratioFactor = totalBacenCredit / baseSum;

  return slicedRows.map((row) => {
    const adjustedValue = parseFloat(((row.valor || 0) * ratioFactor).toFixed(2));
    const percentage = totalBacenCredit > 0 ? parseFloat(((adjustedValue / totalBacenCredit) * 100).toFixed(1)) : 0;

    return {
      ...row,
      descricao: row.descricao,
      valor: adjustedValue,
      percentual: percentage,
    };
  });
}
