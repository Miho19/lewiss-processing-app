import type {
  Content,
  ContentText,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import type { ProcessName } from "../../../../type/process/processType";
import { createDocument } from "../../../pdfmake/documentUtility";
import { createWindowWareHeader } from "../../pdf/windowWareHeader";
import {
  createBlindTableTextData,
  createCostTotalColumn,
  createCustomerInformationColumn,
  createTable,
} from "../../../process/pdfUtility";
import type { KineticsRollerTableEntry } from "../../../../type/process/tableEntry/kineticsTableEntryType";

import { defaultKineticsRollerTableEntry } from "./createKineticsRollerTableEntry";
import type {
  CustomerInformation,
  WorksheetCost,
} from "../../../../type/process/worksheetType";

export async function createRollerBlindDocumentAsync(
  processName: ProcessName,
  customerInformation: CustomerInformation,
  tableEntryList: KineticsRollerTableEntry[],
  worksheetCost: WorksheetCost,
): Promise<TDocumentDefinitions | undefined> {
  if (tableEntryList.length === 0) return undefined;

  const content: Content[] = [];
  const windowWareHeader = await createWindowWareHeader();
  content.push(windowWareHeader);

  const title = createOrderTitleString(processName, tableEntryList.length);
  if (typeof title === "undefined") return undefined;
  content.push(title);

  const customerInformationColumn =
    createCustomerInformationColumn(customerInformation);

  content.push(customerInformationColumn);

  const blindInformation = createBlindInformationTable(tableEntryList);

  content.push(blindInformation);

  const costTotal = createCostTotalColumn(worksheetCost);

  content.push(costTotal);

  const { name, reference, salesConsultant } = customerInformation;

  const documentTitle = [name, reference, processName].join("-");

  const document = createDocument(salesConsultant, documentTitle);
  document.content = [...content];
  return document;
}

function createOrderTitleString(
  processName: ProcessName,
  numberOfBlinds: number,
): ContentText | undefined {
  if (numberOfBlinds === 0) return undefined;

  const blindText = numberOfBlinds > 1 ? "blinds" : "blind";

  const content: Content = {
    text: `Lewis's order for custom-made kinetics ${processName} ${blindText}`.toUpperCase(),
    bold: true,
    marginBottom: 14,
  };

  return content;
}

function createBlindInformationTable(
  kineticsRollerTableEntryList: KineticsRollerTableEntry[],
) {
  const tableEntries = createBlindTableTextData(kineticsRollerTableEntryList);

  const table = createTable(defaultKineticsRollerTableEntry);

  table.table.body.push(...tableEntries);

  return table;
}
