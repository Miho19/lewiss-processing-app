import type { Content } from "pdfmake";
import type { KineticsCellularTableEntry } from "../kinetics/cellular/createCellularPDFDocument";
import type { Column, ContentTable } from "pdfmake/interfaces";
import type { KineticsRollerTableEntry } from "../kinetics/roller/createRollerPDFDocument";
import type { WorksheetCostObjectType } from "../kinetics/common";

export type TableEntry = KineticsCellularTableEntry | KineticsRollerTableEntry;

// will go into a common file
function convertTableEntryToStringArray(tableEntry: TableEntry) {
  return Object.keys(tableEntry).map((column) => {
    const columnSplitCapitalised = column
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1));
    return columnSplitCapitalised.join(" ");
  });
}

function generateTableHeader(tableEntry: TableEntry) {
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

function createTable(tableEntry: TableEntry): ContentTable {
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

function generateTableEntryList(tableEntry: TableEntry[]): Content[][] {
  const entries: Content[][] = tableEntry.map((entry) => {
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

export function createBlindSubTotalCostColumn(
  worksheetCostObject: WorksheetCostObjectType,
): Content {
  const blindSubtotalText: Column = {
    text: "Blind Subtotal",
    width: "auto",
    alignment: "left",
    noWrap: true,
  };

  const blindSubtotalCost = worksheetCostObject.blindSubTotal;

  const costText: Column = {
    text: blindSubtotalCost.toFixed(2),
    width: "*",
    alignment: "right",
    noWrap: true,
  };

  const column = {
    columns: [blindSubtotalText, { text: " ", width: "*" }, costText],
  };

  return column;
}

export { createTable, generateTableEntryList };
