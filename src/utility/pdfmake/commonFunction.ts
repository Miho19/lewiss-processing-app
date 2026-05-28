import type { Content } from "pdfmake";
import type { KineticsCellularTableEntry } from "./createCellularPDFDocument";
import type { ContentTable } from "pdfmake/interfaces";

type TableEntry = KineticsCellularTableEntry;

// will go into a common file
function convertTableEntryToStringArray(tableEntry: TableEntry) {
  return Object.keys(tableEntry);
}

function generateTableHeader(tableEntry: TableEntry) {
  const columnStringArray = convertTableEntryToStringArray(tableEntry);

  const tableHeaderArray: Content[] = columnStringArray.map((column) => {
    return { text: column, alignment: "center", verticalAlignment: "middle" };
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
      paddingBottom: (rowIndex) => {
        if (rowIndex === 0) return 5;
        return 5;
      },

      paddingTop: (rowIndex) => {
        if (rowIndex === 1) return 15;
        return 5;
      },

      hLineWidth: () => {
        return 1;
      },

      vLineWidth: () => {
        return 1;
      },
    },
  };

  return table;
}

function generateTableEntryList(tableEntry: TableEntry[]): Content[][] {
  const entries: Content[][] = tableEntry.map((entry) => {
    return Object.values(entry).map((value) => {
      return { text: value, alignment: "center", verticalAlignment: "middle" };
    });
  });

  return entries;
}

export { createTable, generateTableEntryList };
