import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type {
  CustomerInformation,
  WorksheetCost,
} from "../../../../../type/process/worksheetType";
import type { LewissAluminiumTableEntry } from "../../../../../type/process/tableEntry/santaFeTableEntryType";

export async function createLewissAluminiumPDFAsync(
  customerInformation: CustomerInformation,
  tableEntryList: LewissAluminiumTableEntry[],
  worksheetCost: WorksheetCost,
): Promise<TDocumentDefinitions | undefined> {
  return undefined;
}
