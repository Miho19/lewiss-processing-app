import type { Content } from "pdfmake";

import type {
  Column,
  ContentColumns,
  ContentStack,
  ContentTable,
} from "pdfmake/interfaces";
import type {
  AdditionalProduct,
  WorksheetCost,
} from "../../type/process/worksheetType";
import type { TableEntry } from "../../type/process/tableEntry/tableEntryType";

export function convertTableEntryToStringArray(tableEntry: TableEntry) {
  return Object.keys(tableEntry).map((column) => {
    const columnSplitCapitalised = column
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1));
    return columnSplitCapitalised.join(" ");
  });
}

export function generateTableHeader(tableEntry: TableEntry) {
  const columnStringArray = convertTableEntryToStringArray(tableEntry);

  const tableHeaderArray: Content[] = columnStringArray.map((column) => {
    return {
      text: column,
      alignment: "center",
      verticalAlignment: "middle",
      fontSize: 8,
      bold: true,
    };
  });

  return tableHeaderArray;
}

export function createTable(tableEntry: TableEntry): ContentTable {
  const tableHeaderArray: Content[] = generateTableHeader(tableEntry);

  const table: ContentTable = {
    table: {
      headerRows: 1,
      widths: Array(tableHeaderArray.length).fill("auto"),
      body: [tableHeaderArray],
    },
    layout: {
      paddingBottom: () => {
        return 2;
      },

      paddingTop: (rowIndex) => {
        if (rowIndex === 1) return 5;
        return 1;
      },

      hLineWidth: () => {
        return 1;
      },

      vLineWidth: () => {
        return 1;
      },
    },
    marginBottom: 14,
  };

  return table;
}

export function createBlindTableTextData(
  tableEntryList: TableEntry[],
): Content[][] {
  const entries: Content[][] = tableEntryList.map((entry) => {
    return Object.values(entry).map((value) => {
      let adjustedValue: string | number;

      try {
        const parsedInt = parseInt(value as string);
        if (parsedInt === 0) {
          adjustedValue = " ";
        } else {
          adjustedValue = value;
        }
      } catch {
        adjustedValue = value;
      }

      return {
        text: adjustedValue,
        alignment: "center",
        verticalAlignment: "middle",
        fontSize: 8,
      };
    });
  });

  return entries;
}

function createColumn(leftContent: Content, rightContent: Content) {
  return { columns: [leftContent, { text: " ", width: "auto" }, rightContent] };
}

export function createBlindSubTotalCostColumn(
  worksheetCost: WorksheetCost,
): Content {
  const blindSubtotalText: Column = {
    text: "Blind Subtotal",
    width: "auto",
    alignment: "left",
    noWrap: true,
    marginBottom: 5,
  };

  const blindSubtotalCost = worksheetCost.blindSubTotal;

  const costText: Column = {
    text: blindSubtotalCost.toFixed(2),
    width: "*",
    alignment: "right",
    noWrap: true,
    marginBottom: 5,
  };

  return createColumn(blindSubtotalText, costText);
}

export function createGSTCostColumn(worksheetCost: WorksheetCost): Content {
  const GSTText: Column = {
    text: "GST",
    width: "auto",
    alignment: "left",
    noWrap: true,
  };

  const GST = worksheetCost.gst;

  const costText: Column = {
    text: GST.toFixed(2),
    width: "*",
    alignment: "right",
    noWrap: true,
  };

  return createColumn(GSTText, costText);
}

export function createTotalCostColumn(worksheetCost: WorksheetCost): Content {
  const totalText: Column = {
    text: "Total (Inc. GST)",
    width: "auto",
    alignment: "left",
    noWrap: true,
    bold: true,
  };

  const total = worksheetCost.total;

  const costText: Column = {
    text: total.toFixed(2),
    width: "*",
    alignment: "right",
    noWrap: true,
    bold: true,
  };

  return createColumn(totalText, costText);
}

function getAdditionalProductNameStack(
  additionalProductList: AdditionalProduct[],
): ContentStack {
  const names: Content = additionalProductList.map((p) => ({
    text: `${p.name} x ${p.quantity}`,
    alignment: "left",
    width: "auto",
    noWrap: true,
    marginBottom: 5,
  }));

  return { stack: [...names] };
}

function getAdditionalProductCostStack(
  additionalProductList: AdditionalProduct[],
): ContentStack {
  const costs: Content = additionalProductList.map((p) => ({
    text: `${(p.cost * p.quantity).toFixed(2)}`,
    alignment: "right",
    width: "*",
    noWrap: true,
    marginBottom: 5,
  }));

  return { stack: [...costs] };
}

export function createAdditionalProductCostColumn(
  worksheetCost: WorksheetCost,
): Content {
  const additionalProductList = worksheetCost.additional;

  const additionalProductNameStack = getAdditionalProductNameStack(
    additionalProductList,
  );

  const additionalProductCostStack = getAdditionalProductCostStack(
    additionalProductList,
  );

  return createColumn(additionalProductNameStack, additionalProductCostStack);
}

export function createCustomerInformation(
  name: string,
  reference: string,
  consultant: string,
): ContentColumns {
  const leftStack1: ContentStack = {
    stack: [{ text: "Client", marginBottom: 4 }, { text: "Reference" }],
  };

  const leftStack2: ContentStack = {
    stack: [{ text: name, marginBottom: 4 }, { text: reference }],
  };

  const leftColumn: Column[] = [
    { width: "auto", ...leftStack1 },
    { width: "auto", ...leftStack2 },
  ];

  const rightStack1: ContentStack = {
    stack: [{ text: "Date", marginBottom: 4 }, { text: "Consultant" }],
  };

  const rightStack2: ContentStack = {
    stack: [
      {
        text: new Date().toLocaleDateString(),
        marginBottom: 4,
        alignment: "right",
      },
      { text: consultant, alignment: "right" },
    ],
  };

  const rightColumn: Column[] = [
    { width: "auto", ...rightStack1 },
    { width: "auto", ...rightStack2 },
  ];

  const customerInformationColumn: Column[] = [
    { width: "auto", columns: [...leftColumn], columnGap: 24 },
    { width: "*", text: " " },
    { width: "auto", columns: [...rightColumn], columnGap: 24 },
  ];

  const content: Content = {
    columns: customerInformationColumn,
    marginBottom: 14,
  };

  return content;
}
